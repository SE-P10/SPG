function cov_22ev8yy0kq() {
  var path = "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\testAPI.js";
  var hash = "5f5475ee07fba1ca8494081789a3f1fb1efa08dd";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\testAPI.js",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 2
        },
        end: {
          line: 23,
          column: 5
        }
      },
      "1": {
        start: {
          line: 3,
          column: 4
        },
        end: {
          line: 22,
          column: 9
        }
      },
      "2": {
        start: {
          line: 7,
          column: 8
        },
        end: {
          line: 18,
          column: 9
        }
      },
      "3": {
        start: {
          line: 8,
          column: 10
        },
        end: {
          line: 8,
          column: 24
        }
      },
      "4": {
        start: {
          line: 10,
          column: 10
        },
        end: {
          line: 17,
          column: 15
        }
      },
      "5": {
        start: {
          line: 13,
          column: 14
        },
        end: {
          line: 13,
          column: 30
        }
      },
      "6": {
        start: {
          line: 16,
          column: 14
        },
        end: {
          line: 16,
          column: 65
        }
      },
      "7": {
        start: {
          line: 21,
          column: 8
        },
        end: {
          line: 21,
          column: 65
        }
      },
      "8": {
        start: {
          line: 26,
          column: 16
        },
        end: {
          line: 28,
          column: 1
        }
      }
    },
    fnMap: {
      "0": {
        name: "restoreTables",
        decl: {
          start: {
            line: 1,
            column: 15
          },
          end: {
            line: 1,
            column: 28
          }
        },
        loc: {
          start: {
            line: 1,
            column: 31
          },
          end: {
            line: 24,
            column: 1
          }
        },
        line: 1
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 2,
            column: 21
          },
          end: {
            line: 2,
            column: 22
          }
        },
        loc: {
          start: {
            line: 2,
            column: 42
          },
          end: {
            line: 23,
            column: 3
          }
        },
        line: 2
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 6,
            column: 12
          },
          end: {
            line: 6,
            column: 13
          }
        },
        loc: {
          start: {
            line: 6,
            column: 26
          },
          end: {
            line: 19,
            column: 7
          }
        },
        line: 6
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 12,
            column: 18
          },
          end: {
            line: 12,
            column: 19
          }
        },
        loc: {
          start: {
            line: 12,
            column: 31
          },
          end: {
            line: 14,
            column: 13
          }
        },
        line: 12
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 15,
            column: 19
          },
          end: {
            line: 15,
            column: 20
          }
        },
        loc: {
          start: {
            line: 15,
            column: 25
          },
          end: {
            line: 17,
            column: 13
          }
        },
        line: 15
      },
      "5": {
        name: "(anonymous_5)",
        decl: {
          start: {
            line: 20,
            column: 13
          },
          end: {
            line: 20,
            column: 14
          }
        },
        loc: {
          start: {
            line: 20,
            column: 19
          },
          end: {
            line: 22,
            column: 7
          }
        },
        line: 20
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 7,
            column: 8
          },
          end: {
            line: 18,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 7,
            column: 8
          },
          end: {
            line: 18,
            column: 9
          }
        }, {
          start: {
            line: 7,
            column: 8
          },
          end: {
            line: 18,
            column: 9
          }
        }],
        line: 7
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "5f5475ee07fba1ca8494081789a3f1fb1efa08dd"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_22ev8yy0kq = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_22ev8yy0kq();

async function restoreTables() {
  cov_22ev8yy0kq().f[0]++;
  cov_22ev8yy0kq().s[0]++;
  return new Promise((resolve, reject) => {
    cov_22ev8yy0kq().f[1]++;
    cov_22ev8yy0kq().s[1]++;
    fetch("/api/test/restoretables/", {
      method: "DELETE"
    }).then(response => {
      cov_22ev8yy0kq().f[2]++;
      cov_22ev8yy0kq().s[2]++;

      if (response.ok) {
        cov_22ev8yy0kq().b[0][0]++;
        cov_22ev8yy0kq().s[3]++;
        resolve(null);
      } else {
        cov_22ev8yy0kq().b[0][1]++;
        cov_22ev8yy0kq().s[4]++;
        response.json().then(message => {
          cov_22ev8yy0kq().f[3]++;
          cov_22ev8yy0kq().s[5]++;
          reject(message);
        }) // error message in the response body
        .catch(() => {
          cov_22ev8yy0kq().f[4]++;
          cov_22ev8yy0kq().s[6]++;
          reject({
            error: "Cannot parse server response."
          });
        }); // something else
      }
    }).catch(() => {
      cov_22ev8yy0kq().f[5]++;
      cov_22ev8yy0kq().s[7]++;
      reject({
        error: "Cannot communicate with the server."
      });
    }); // connection errors
  });
}

const testAPI = (cov_22ev8yy0kq().s[8]++, {
  restoreTables
});
export default testAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RBUEkuanMiXSwibmFtZXMiOlsicmVzdG9yZVRhYmxlcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsImpzb24iLCJtZXNzYWdlIiwiY2F0Y2giLCJlcnJvciIsInRlc3RBUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlWTs7Ozs7Ozs7OztBQWZaLGVBQWVBLGFBQWYsR0FBK0I7QUFBQTtBQUFBO0FBQzdCLFNBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUFBO0FBQUE7QUFDdENDLElBQUFBLEtBQUssQ0FBQywwQkFBRCxFQUE2QjtBQUNoQ0MsTUFBQUEsTUFBTSxFQUFFO0FBRHdCLEtBQTdCLENBQUwsQ0FHR0MsSUFISCxDQUdTQyxRQUFELElBQWM7QUFBQTtBQUFBOztBQUNsQixVQUFJQSxRQUFRLENBQUNDLEVBQWIsRUFBaUI7QUFBQTtBQUFBO0FBQ2ZOLFFBQUFBLE9BQU8sQ0FBQyxJQUFELENBQVA7QUFDRCxPQUZELE1BRU87QUFBQTtBQUFBO0FBQ0xLLFFBQUFBLFFBQVEsQ0FDTEUsSUFESCxHQUVHSCxJQUZILENBRVNJLE9BQUQsSUFBYTtBQUFBO0FBQUE7QUFDakJQLFVBQUFBLE1BQU0sQ0FBQ08sT0FBRCxDQUFOO0FBQ0QsU0FKSCxFQUlLO0FBSkwsU0FLR0MsS0FMSCxDQUtTLE1BQU07QUFBQTtBQUFBO0FBQ1hSLFVBQUFBLE1BQU0sQ0FBQztBQUFFUyxZQUFBQSxLQUFLLEVBQUU7QUFBVCxXQUFELENBQU47QUFDRCxTQVBILEVBREssQ0FRQztBQUNQO0FBQ0YsS0FoQkgsRUFpQkdELEtBakJILENBaUJTLE1BQU07QUFBQTtBQUFBO0FBQ1hSLE1BQUFBLE1BQU0sQ0FBQztBQUFFUyxRQUFBQSxLQUFLLEVBQUU7QUFBVCxPQUFELENBQU47QUFDRCxLQW5CSCxFQURzQyxDQW9CaEM7QUFDUCxHQXJCTSxDQUFQO0FBc0JEOztBQUVELE1BQU1DLE9BQU8sNkJBQUc7QUFDZGIsRUFBQUE7QUFEYyxDQUFILENBQWI7QUFHQSxlQUFlYSxPQUFmIiwic291cmNlc0NvbnRlbnQiOlsiYXN5bmMgZnVuY3Rpb24gcmVzdG9yZVRhYmxlcygpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgZmV0Y2goXCIvYXBpL3Rlc3QvcmVzdG9yZXRhYmxlcy9cIiwge1xyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICB9KVxyXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIC5qc29uKClcclxuICAgICAgICAgICAgLnRoZW4oKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgICByZWplY3QobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pIC8vIGVycm9yIG1lc3NhZ2UgaW4gdGhlIHJlc3BvbnNlIGJvZHlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICByZWplY3QoeyBlcnJvcjogXCJDYW5ub3QgcGFyc2Ugc2VydmVyIHJlc3BvbnNlLlwiIH0pO1xyXG4gICAgICAgICAgICB9KTsgLy8gc29tZXRoaW5nIGVsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KHsgZXJyb3I6IFwiQ2Fubm90IGNvbW11bmljYXRlIHdpdGggdGhlIHNlcnZlci5cIiB9KTtcclxuICAgICAgfSk7IC8vIGNvbm5lY3Rpb24gZXJyb3JzXHJcbiAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHRlc3RBUEkgPSB7XHJcbiAgcmVzdG9yZVRhYmxlcyxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgdGVzdEFQSTtcclxuIl19