import path from "node:path";

const projectRoot = process.cwd();

const config = {
	plugins: {
		"postcss-import": {},
		"postcss-mixins": {
			mixinsDir: path.resolve(projectRoot, "postcss-mixins"),
		},
		"postcss-nesting": {
			noIsPseudoSelector: true,
		},
		"@csstools/postcss-global-data": {
			files: [path.resolve(projectRoot, "postcss-media/custom-media-queries.css")],
		},
		"postcss-pxtorem": {
			rootValue: 16,
			replace: true,
			propList: ["*"],
		},
		"postcss-discard-comments": {},
		"postcss-custom-media": {},
	},
};

export default config;
