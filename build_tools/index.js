/**
 * 
 */

const { writeFile, readFile } = require('node:fs/promises');

/**
 * 
 */

class TypeParser {

	//
	#parser;
	#callbacks = {};

	//
	parseArg(rawArg) {
		const {groups: {arg, ...vals}} = this.#parser.exec(rawArg);
		const [type, value] = Object.entries(vals).find(([_, value]) => !!value);
		return [arg, type, this.#callbacks[type](value)];
	}

	//
	constructor(typeDefinitions) {

		//
		let regexParts = [];
		Object.entries(typeDefinitions).forEach(([type, [regexString, callback = (a) => a]]) => {
			regexParts.push(`(?<${type}>${regexString})`);
			this.#callbacks[type] = callback;
		});

		//
		this.#parser = RegExp(`(?<arg>[\\w]+):(?:${regexParts.join('|')})`);
	}
}

//
//
//

class ArgumentValidator {

	//
	#validatorRules;

	//
	#validateArg(arg) {
		return this.#validatorRules.find(([validatorRegex]) => arg.match(validatorRegex))
	}

	//
	#validateType(matchedArg, type) {
		return matchedArg[1][0] === type;
	}

	//
	validateDoCallback(arg, type, value) {

		//
		const matchedArg = this.#validateArg(arg);
		if(!matchedArg) {
			return false;
		}

		//
		const matchedType = this.#validateType(matchedArg, type);
		if(!matchedType) {
			return false;
		}

		//
		return matchedArg[1][1](value);
	}

	//
	constructor(validatorDefinitions) {

		//
		this.#validatorRules = Object.entries(validatorDefinitions).map(([argRegexString, [type, callback]]) => {
			const argRegex = RegExp(`^${argRegexString}`);
			return [argRegex, [type, callback]];
		});
	}
}

//
//
//

function validateArgs(rawArgs, typeDefinitions, validatorDefinitions) {
	
	//
	const typeParser = new TypeParser(typeDefinitions);

	//
	const validator = new ArgumentValidator(validatorDefinitions);

	//
	rawArgs.forEach((rawArg) => {
		//
		const [arg, type, value] = typeParser.parseArg(rawArg);

		//
		validator.validateDoCallback(arg, type, value);
	});
}

/**
 * 
 */

async function incramentCallback(value) {
	const versionMatch = value.match(/^(major|minor|revision)$/);
	if(versionMatch) {

		//
		const version = versionMatch[0];

		//
		const versionSearch = /Version: (?:(?<major>[\d]+)\.(?<minor>[\d]+)\.(?<revision>[\d]+))/;

		//
		const fileContent = await readFile('./h2ml-animate.php', 'utf8');

		//
		const newVersion = Number(versionSearch.exec(fileContent).groups[version]) + 1;
		const updatedFile = fileContent.replace(versionSearch, `Version: ${version === 'major' ? newVersion : '$<major>'}.${version === 'minor' ? newVersion : '$<minor>'}.${version === 'revision' ? newVersion : '$<revision>'}`);
	
		//
		writeFile('./h2ml-animate.php', updatedFile);
	}
}

/**
 * 
 */

const typeDefinitions = {
	'float': ['[\\d]*\\.[\\d]*', (v) => Number(v)],
	'int': ['[\\d]+', (v) => Number(v)],
	'string': ['.+']
}

const validatorDefinitions = {
	'i|increment': ['string', incramentCallback]
}

async function main() {
	validateArgs(process.argv.slice(2), typeDefinitions, validatorDefinitions);
}

main();