'use strict';

function cov_22ev8yy0kq() {
  var path = "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\testAPI.js";
  var hash = "dbe94eface4e5d3dd10775bf070b8d9eebf8e03a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\testAPI.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 1
        },
        end: {
          line: 16,
          column: 6
        }
      },
      "1": {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 15,
          column: 79
        }
      },
      "2": {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 14,
          column: 4
        }
      },
      "3": {
        start: {
          line: 9,
          column: 3
        },
        end: {
          line: 9,
          column: 17
        }
      },
      "4": {
        start: {
          line: 11,
          column: 3
        },
        end: {
          line: 13,
          column: 74
        }
      },
      "5": {
        start: {
          line: 12,
          column: 26
        },
        end: {
          line: 12,
          column: 42
        }
      },
      "6": {
        start: {
          line: 13,
          column: 20
        },
        end: {
          line: 13,
          column: 70
        }
      },
      "7": {
        start: {
          line: 15,
          column: 19
        },
        end: {
          line: 15,
          column: 75
        }
      },
      "8": {
        start: {
          line: 19,
          column: 16
        },
        end: {
          line: 21,
          column: 3
        }
      }
    },
    fnMap: {
      "0": {
        name: "restoreTables",
        decl: {
          start: {
            line: 3,
            column: 15
          },
          end: {
            line: 3,
            column: 28
          }
        },
        loc: {
          start: {
            line: 3,
            column: 31
          },
          end: {
            line: 17,
            column: 1
          }
        },
        line: 3
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 4,
            column: 20
          },
          end: {
            line: 4,
            column: 21
          }
        },
        loc: {
          start: {
            line: 4,
            column: 41
          },
          end: {
            line: 16,
            column: 4
          }
        },
        line: 4
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 7,
            column: 10
          },
          end: {
            line: 7,
            column: 11
          }
        },
        loc: {
          start: {
            line: 7,
            column: 24
          },
          end: {
            line: 15,
            column: 3
          }
        },
        line: 7
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 12,
            column: 11
          },
          end: {
            line: 12,
            column: 12
          }
        },
        loc: {
          start: {
            line: 12,
            column: 24
          },
          end: {
            line: 12,
            column: 44
          }
        },
        line: 12
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 13,
            column: 12
          },
          end: {
            line: 13,
            column: 13
          }
        },
        loc: {
          start: {
            line: 13,
            column: 18
          },
          end: {
            line: 13,
            column: 72
          }
        },
        line: 13
      },
      "5": {
        name: "(anonymous_5)",
        decl: {
          start: {
            line: 15,
            column: 11
          },
          end: {
            line: 15,
            column: 12
          }
        },
        loc: {
          start: {
            line: 15,
            column: 17
          },
          end: {
            line: 15,
            column: 77
          }
        },
        line: 15
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 14,
            column: 4
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 14,
            column: 4
          }
        }, {
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 14,
            column: 4
          }
        }],
        line: 8
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
    hash: "dbe94eface4e5d3dd10775bf070b8d9eebf8e03a"
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
    fetch('/api/test/restoretables/', {
      method: 'DELETE'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RBUEkuanMiXSwibmFtZXMiOlsicmVzdG9yZVRhYmxlcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmV0Y2giLCJtZXRob2QiLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsImpzb24iLCJtZXNzYWdlIiwiY2F0Y2giLCJlcnJvciIsInRlc3RBUEkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlWTs7Ozs7Ozs7OztBQWJaLGVBQWVBLGFBQWYsR0FBK0I7QUFBQTtBQUFBO0FBQzlCLFNBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUFBO0FBQUE7QUFDdkNDLElBQUFBLEtBQUssQ0FBQywwQkFBRCxFQUE2QjtBQUNoQ0MsTUFBQUEsTUFBTSxFQUFFO0FBRHdCLEtBQTdCLENBQUwsQ0FFR0MsSUFGSCxDQUVTQyxRQUFELElBQWM7QUFBQTtBQUFBOztBQUNwQixVQUFJQSxRQUFRLENBQUNDLEVBQWIsRUFBaUI7QUFBQTtBQUFBO0FBQ2xCTixRQUFBQSxPQUFPLENBQUMsSUFBRCxDQUFQO0FBQ0UsT0FGRCxNQUVPO0FBQUE7QUFBQTtBQUNSSyxRQUFBQSxRQUFRLENBQUNFLElBQVQsR0FDR0gsSUFESCxDQUNTSSxPQUFELElBQWE7QUFBQTtBQUFBO0FBQUVQLFVBQUFBLE1BQU0sQ0FBQ08sT0FBRCxDQUFOO0FBQWtCLFNBRHpDLEVBQzJDO0FBRDNDLFNBRUdDLEtBRkgsQ0FFUyxNQUFNO0FBQUE7QUFBQTtBQUFFUixVQUFBQSxNQUFNLENBQUM7QUFBRVMsWUFBQUEsS0FBSyxFQUFFO0FBQVQsV0FBRCxDQUFOO0FBQW9ELFNBRnJFLEVBRFEsQ0FHZ0U7QUFDdkU7QUFDRCxLQVZELEVBVUdELEtBVkgsQ0FVUyxNQUFNO0FBQUE7QUFBQTtBQUFFUixNQUFBQSxNQUFNLENBQUM7QUFBRVMsUUFBQUEsS0FBSyxFQUFFO0FBQVQsT0FBRCxDQUFOO0FBQTBELEtBVjNFLEVBRHVDLENBV3VDO0FBQzVFLEdBWkksQ0FBUDtBQWFBOztBQUVELE1BQU1DLE9BQU8sNkJBQUc7QUFDWmIsRUFBQUE7QUFEWSxDQUFILENBQWI7QUFHRSxlQUFlYSxPQUFmIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5hc3luYyBmdW5jdGlvbiByZXN0b3JlVGFibGVzKCkge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRmZXRjaCgnL2FwaS90ZXN0L3Jlc3RvcmV0YWJsZXMvJywge1xyXG5cdFx0ICBtZXRob2Q6ICdERUxFVEUnLFxyXG5cdFx0fSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHRcdCAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcblx0XHRcdHJlc29sdmUobnVsbCk7XHJcblx0XHQgIH0gZWxzZSB7XHJcblx0XHRcdHJlc3BvbnNlLmpzb24oKVxyXG5cdFx0XHQgIC50aGVuKChtZXNzYWdlKSA9PiB7IHJlamVjdChtZXNzYWdlKTsgfSkgLy8gZXJyb3IgbWVzc2FnZSBpbiB0aGUgcmVzcG9uc2UgYm9keVxyXG5cdFx0XHQgIC5jYXRjaCgoKSA9PiB7IHJlamVjdCh7IGVycm9yOiBcIkNhbm5vdCBwYXJzZSBzZXJ2ZXIgcmVzcG9uc2UuXCIgfSkgfSk7IC8vIHNvbWV0aGluZyBlbHNlXHJcblx0XHRcdH1cclxuXHRcdH0pLmNhdGNoKCgpID0+IHsgcmVqZWN0KHsgZXJyb3I6IFwiQ2Fubm90IGNvbW11bmljYXRlIHdpdGggdGhlIHNlcnZlci5cIiB9KSB9KTsgLy8gY29ubmVjdGlvbiBlcnJvcnNcclxuXHQgIH0pO1xyXG59XHJcblxyXG5jb25zdCB0ZXN0QVBJID0ge1xyXG4gICAgcmVzdG9yZVRhYmxlc1xyXG4gIH1cclxuICBleHBvcnQgZGVmYXVsdCB0ZXN0QVBJOyJdfQ==