.PHONY: help

help:
	@echo "  coverage       		generate coverage report"
	@echo "  deployable       		generate contract abi and bytecode"
	@echo "	 test 					run truffle tests"

coverage:
	./node_modules/.bin/solidity-coverage

deployable:
	truffle test deployable.js

test:
	truffle test
