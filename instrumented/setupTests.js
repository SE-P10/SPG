function cov_7ehigqape() {
  var path = "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\setupTests.js";
  var hash = "d960c38d8b6f75f88e5826b6af90fa277c07dce5";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\setupTests.js",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "d960c38d8b6f75f88e5826b6af90fa277c07dce5"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_7ehigqape = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_7ehigqape();
//Initializing Test Environment
//When app uses a browser API that you need to mock in your tests or if you need a global setup before running your tests,
// add a src/setupTests.js to your project. It will be automatically executed before running your tests.
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
//La importo qui così viene importata prima di ogni test
import '@testing-library/jest-dom'; //Setup example

/* 
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock;
  */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHVwVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZVk7Ozs7Ozs7OztBQWZaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sMkJBQVAsQyxDQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vSW5pdGlhbGl6aW5nIFRlc3QgRW52aXJvbm1lbnRcclxuLy9XaGVuIGFwcCB1c2VzIGEgYnJvd3NlciBBUEkgdGhhdCB5b3UgbmVlZCB0byBtb2NrIGluIHlvdXIgdGVzdHMgb3IgaWYgeW91IG5lZWQgYSBnbG9iYWwgc2V0dXAgYmVmb3JlIHJ1bm5pbmcgeW91ciB0ZXN0cyxcclxuLy8gYWRkIGEgc3JjL3NldHVwVGVzdHMuanMgdG8geW91ciBwcm9qZWN0LiBJdCB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZXhlY3V0ZWQgYmVmb3JlIHJ1bm5pbmcgeW91ciB0ZXN0cy5cclxuLy8gcmVhY3QtdGVzdGluZy1saWJyYXJ5IHJlbmRlcnMgeW91ciBjb21wb25lbnRzIHRvIGRvY3VtZW50LmJvZHksXHJcbi8vIHRoaXMgYWRkcyBqZXN0LWRvbSdzIGN1c3RvbSBhc3NlcnRpb25zXHJcbi8vTGEgaW1wb3J0byBxdWkgY29zw6wgdmllbmUgaW1wb3J0YXRhIHByaW1hIGRpIG9nbmkgdGVzdFxyXG5pbXBvcnQgJ0B0ZXN0aW5nLWxpYnJhcnkvamVzdC1kb20nO1xyXG4vL1NldHVwIGV4YW1wbGVcclxuLyogXHJcbmNvbnN0IGxvY2FsU3RvcmFnZU1vY2sgPSB7XHJcbiAgICBnZXRJdGVtOiBqZXN0LmZuKCksXHJcbiAgICBzZXRJdGVtOiBqZXN0LmZuKCksXHJcbiAgICByZW1vdmVJdGVtOiBqZXN0LmZuKCksXHJcbiAgICBjbGVhcjogamVzdC5mbigpLFxyXG4gIH07XHJcbiAgZ2xvYmFsLmxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZU1vY2s7XHJcbiAgKi8iXX0=