const url = 'https://qeuvvkjikjoavywzujjs.supabase.co/rest/v1/submissions?select=problem_statement';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldXZ2a2ppa2pvYXZ5d3p1ampzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTUyMzIsImV4cCI6MjA4NzU3MTIzMn0.NErsSNhULR3tCup9oNdXB7lFFRDXGo21rPM6dvWDa9k';

async function test() {
    const res = await fetch(url, {
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`
        }
    });
    const data = await res.json();
    console.log(data);
}
test();
