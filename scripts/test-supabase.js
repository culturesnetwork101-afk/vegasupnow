
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qeqvkttwytyywabtzeyx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlcXZrdHR3eXR5eXdhYnR6ZXl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2ODM4OTIsImV4cCI6MjA4MTI1OTg5Mn0.DwpN8dzoLxLcHnEtmMJWdTJ4_az_j3xmngM3YbWQguo';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConfig() {
    console.log("Testing Supabase connection...");

    try {
        // Test 1: Track Plays Log Count
        console.log("\n--- query: track_plays_log (count) ---");
        const { count, error: countError } = await sb
            .from('track_plays_log')
            .select('*', { count: 'exact', head: true });

        if (countError) console.error("Error fetching count:", countError);
        else console.log("Total plays count:", count);

        // Test 2: Counters Table
        console.log("\n--- query: counters (all) ---");
        const { data: counters, error: countersError } = await sb
            .from('counters')
            .select('*');

        if (countersError) console.error("Error fetching counters:", countersError);
        else console.log("Counters data:", counters);

    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

testConfig();
