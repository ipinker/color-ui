export const isDev: boolean = process.env.NODE_ENV === 'production';
export class Config {

	static URL = isDev ? "" : "/test";

}
