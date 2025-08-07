declare module "astro:actions" {
	type Actions = typeof import("/home/sauraki/dev/itexpress4africa/site2/it4a/src/actions/index.ts")["server"];

	export const actions: Actions;
}