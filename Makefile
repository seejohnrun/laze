test:
	npm test

coverage:
	jscoverage --no-highlight lib lib-cov
	LAZY_COV=1 mocha -r should -R html-cov > coverage.html
	rm -rf lib-cov

.PHONY: test
