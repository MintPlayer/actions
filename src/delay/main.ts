export async function run(ms: number) {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), ms);
    });
}