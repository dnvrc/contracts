.PHONY: help

help:
	@echo "  coverage       		generate coverage report"
	@echo "  deployable       	generate contract abi and bytecode"

coverage:
	./node_modules/.bin/solidity-coverage

deployable:
	truffle test deployable.js
