export async function run(ms: number) {
    console.log(`Waiting for ${ms} ms`);

    await new Promise((resolve) => {
        setTimeout(() => resolve(true), ms);
    });
    
    console.log(`Done`);
}