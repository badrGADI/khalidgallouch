
import React, { useEffect, useState } from 'react';
import { supabase } from '../src/lib/supabase';

const DebugSupabase: React.FC = () => {
  const [status, setStatus] = useState('Checking...');
  const [error, setError] = useState<string | null>(null);
  const [envCheck, setEnvCheck] = useState<any>({});
  
  // Gallery Debug State
  const [galleryStatus, setGalleryStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [galleryError, setGalleryError] = useState<string>('');
  const [galleryCount, setGalleryCount] = useState<number>(0);

  useEffect(() => {
    const checkConnection = async () => {
      // Check Env Vars
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      setEnvCheck({
        hasUrl: !!url,
        hasKey: !!key,
        urlLength: url?.length,
        keyLength: key?.length
      });

      if (!url || !key) {
        setStatus('Failed: Missing Environment Variables');
        return;
      }

      try {
        const { data, error } = await supabase.from('activities').select('count', { count: 'exact', head: true });
        
        if (error) {
          setStatus('Error connecting to Supabase');
          setError(JSON.stringify(error, null, 2));
          if (error.code === '42P01') {
             setStatus('Connection OK, but Table "activities" does not exist.');
          }
        } else {
          // Check Storage
          const { data: storageData, error: storageError } = await supabase.storage.from('activities').list();
          if (storageError) {
             setStatus('Connected to DB, but "activities" Storage Bucket is missing or not public.');
             setError(JSON.stringify(storageError, null, 2));
          } else {
             setStatus('Success! Connected to Supabase DB and "activities" Storage Bucket found.');
          }
        }
      } catch (err: any) {
        setStatus('Unexpected Error');
        setError(err.message);
      }
    };
    
    const checkGallery = async () => {
      try {
        // 1. Check basic fetch
        const { data, error } = await supabase.from('gallery_items').select('*');
        if (error) throw error;
        
        setGalleryCount(data.length);
        
        // 2. Check Join Fetch (Simulate public view)
        const { error: joinError } = await supabase
          .from('gallery_items')
          .select('*, activities(title)')
          .limit(1);
          
        if (joinError) throw new Error(`Join Query Failed: ${joinError.message}`);

        setGalleryStatus('success');
      } catch (err: any) {
        console.error('Gallery debug error:', err);
        setGalleryStatus('error');
        setGalleryError(err.message || 'Unknown error');
      }
    };

    checkConnection();
    checkGallery();
  }, []);

  const handleTestUpload = async () => {
    try {
      setStatus('Attempting Test Upload...');
      const dummyFile = new File(['test'], 'debug_test.txt', { type: 'text/plain' });
      const { data, error } = await supabase.storage
        .from('activities')
        .upload(`debug_test_${Date.now()}.txt`, dummyFile);

      if (error) {
        setStatus('Test Upload Failed');
        setError(JSON.stringify(error, null, 2));
      } else {
        setStatus('Test Upload SUCCESS! Storage is working.');
        setError(null);
      }
    } catch (err: any) {
      setStatus('Test Upload Error');
      setError(err.message);
    }
  };

  return (
    <div className="p-10 font-mono">
      <h1 className="text-2xl font-bold mb-4">Supabase Debugger</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="font-bold">Environment Variables:</h2>
        <pre>{JSON.stringify(envCheck, null, 2)}</pre>
        {(!envCheck.hasUrl || !envCheck.hasKey) && (
           <p className="text-red-600 font-bold mt-2">
             ⚠️ You must restart the dev server after adding .env variables!
           </p>
        )}
      </div>

      <div className={`p-4 rounded text-white ${status.startsWith('Success') ? 'bg-green-600' : 'bg-red-600'} mb-6`}>
        <h2 className="font-bold">Connection Status:</h2>
        <p className="text-xl">{status}</p>
      </div>

      <button 
        onClick={handleTestUpload}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors mb-6"
      >
        Test Upload (Click Me)
      </button>

      {/* Bucket List */}
      <div className="mb-6 p-4 bg-gray-100 rounded border border-gray-300">
         <h2 className="font-bold text-gray-700 mb-2">Available Storage Buckets:</h2>
         <BucketList />
      </div>

      {error && (
        <div className="mt-6 p-4 bg-yellow-100 rounded border border-yellow-300">
          <h2 className="font-bold text-yellow-800">Error Details:</h2>
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}

      {/* Gallery Debug Section */}
      <div className={`mt-6 p-6 rounded-2xl border ${
        galleryStatus === 'success' ? 'bg-green-50 border-green-200' : 
        galleryStatus === 'error' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-[#0d2137]">Gallery Debug Status</h2>
        </div>
        
        <div className="space-y-2 text-sm">
           <p><strong>Status:</strong> {galleryStatus.toUpperCase()}</p>
           <p><strong>Items Found:</strong> {galleryCount}</p>
           {galleryError && (
             <div className="bg-white p-3 rounded border border-red-200 text-red-600 font-mono mt-2">
               Error: {galleryError}
             </div>
           )}
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Fix Missing Bucket</h2>
        <p className="mb-4 text-blue-800">If the 'activities' bucket is missing, run this SQL in your Supabase Dashboard &gt; SQL Editor:</p>
        <pre className="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create the 'activities' bucket
insert into storage.buckets (id, name, public)
values ('activities', 'activities', true);

-- Allow public access to the bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'activities' );

-- Allow authenticated uploads
create policy "Authenticated Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'activities' );
`}
        </pre>
      </div>
    </div>
  );
};

const BucketList = () => {
    const [buckets, setBuckets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string>('');

    useEffect(() => {
        const fetchBuckets = async () => {
            const { data, error } = await supabase.storage.listBuckets();
            setLoading(false);
            if (error) {
                setErr(error.message);
            } else {
                setBuckets(data || []);
            }
        };
        fetchBuckets();
    }, []);

    if (loading) return <div>Loading buckets...</div>;
    if (err) return <div className="text-red-500">Error listing buckets: {err}</div>;
    if (buckets.length === 0) return <div className="text-red-500 font-bold">No buckets found. You MUST create 'activities' bucket.</div>;

    return (
        <ul className="list-disc pl-5">
            {buckets.map(b => (
                <li key={b.id} className={b.name === 'activities' ? 'text-green-600 font-bold' : 'text-gray-800'}>
                    {b.name} {b.public ? '(Public)' : '(Private)'}
                    {b.name === 'activities' && ' ✅ Correct'}
                </li>
            ))}
        </ul>
    );
};

export default DebugSupabase;
