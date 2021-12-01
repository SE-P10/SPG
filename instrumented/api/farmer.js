'use strict'; // call: GET /api/farmer/pruducts

function cov_194vmi0w4y() {
  var path = "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\farmer.js";
  var hash = "e1955d17b188a8cfe18ec956b4a0a3b18d6b7beb";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\farmer.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 19
        },
        end: {
          line: 7,
          column: 66
        }
      },
      "1": {
        start: {
          line: 8,
          column: 20
        },
        end: {
          line: 8,
          column: 41
        }
      },
      "2": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 13,
          column: 5
        }
      },
      "3": {
        start: {
          line: 10,
          column: 7
        },
        end: {
          line: 10,
          column: 22
        }
      },
      "4": {
        start: {
          line: 12,
          column: 7
        },
        end: {
          line: 12,
          column: 21
        }
      },
      "5": {
        start: {
          line: 18,
          column: 2
        },
        end: {
          line: 30,
          column: 5
        }
      },
      "6": {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 29,
          column: 9
        }
      },
      "7": {
        start: {
          line: 24,
          column: 8
        },
        end: {
          line: 28,
          column: 9
        }
      },
      "8": {
        start: {
          line: 25,
          column: 10
        },
        end: {
          line: 25,
          column: 24
        }
      },
      "9": {
        start: {
          line: 27,
          column: 10
        },
        end: {
          line: 27,
          column: 32
        }
      },
      "10": {
        start: {
          line: 33,
          column: 18
        },
        end: {
          line: 36,
          column: 1
        }
      }
    },
    fnMap: {
      "0": {
        name: "getFarmerProducts",
        decl: {
          start: {
            line: 4,
            column: 15
          },
          end: {
            line: 4,
            column: 32
          }
        },
        loc: {
          start: {
            line: 4,
            column: 43
          },
          end: {
            line: 14,
            column: 1
          }
        },
        line: 4
      },
      "1": {
        name: "updateFarmerProducts",
        decl: {
          start: {
            line: 16,
            column: 15
          },
          end: {
            line: 16,
            column: 35
          }
        },
        loc: {
          start: {
            line: 16,
            column: 67
          },
          end: {
            line: 31,
            column: 1
          }
        },
        line: 16
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 18,
            column: 21
          },
          end: {
            line: 18,
            column: 22
          }
        },
        loc: {
          start: {
            line: 18,
            column: 42
          },
          end: {
            line: 30,
            column: 3
          }
        },
        line: 18
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 23,
            column: 14
          },
          end: {
            line: 23,
            column: 15
          }
        },
        loc: {
          start: {
            line: 23,
            column: 28
          },
          end: {
            line: 29,
            column: 7
          }
        },
        line: 23
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 9,
            column: 4
          },
          end: {
            line: 13,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 9,
            column: 4
          },
          end: {
            line: 13,
            column: 5
          }
        }, {
          start: {
            line: 9,
            column: 4
          },
          end: {
            line: 13,
            column: 5
          }
        }],
        line: 9
      },
      "1": {
        loc: {
          start: {
            line: 24,
            column: 8
          },
          end: {
            line: 28,
            column: 9
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 24,
            column: 8
          },
          end: {
            line: 28,
            column: 9
          }
        }, {
          start: {
            line: 24,
            column: 8
          },
          end: {
            line: 28,
            column: 9
          }
        }],
        line: 24
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
      "8": 0,
      "9": 0,
      "10": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "e1955d17b188a8cfe18ec956b4a0a3b18d6b7beb"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_194vmi0w4y = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_194vmi0w4y();

async function getFarmerProducts(farmerID) {
  cov_194vmi0w4y().f[0]++;
  const response = (cov_194vmi0w4y().s[0]++, await fetch('/api/products/farmer/' + farmerID));
  const pFramer = (cov_194vmi0w4y().s[1]++, await response.json());
  cov_194vmi0w4y().s[2]++;

  if (response.ok) {
    cov_194vmi0w4y().b[0][0]++;
    cov_194vmi0w4y().s[3]++;
    return pFramer;
  } else {
    cov_194vmi0w4y().b[0][1]++;
    cov_194vmi0w4y().s[4]++;
    throw pFramer; // an object with the error coming from the server
  }
}

async function updateFarmerProducts(productID, newAmount, farmerId) {
  cov_194vmi0w4y().f[1]++;
  cov_194vmi0w4y().s[5]++;
  return new Promise((resolve, reject) => {
    cov_194vmi0w4y().f[2]++;
    cov_194vmi0w4y().s[6]++;
    fetch('/api/farmer/products/update/' + productID + '/' + newAmount + '/' + farmerId + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      cov_194vmi0w4y().f[3]++;
      cov_194vmi0w4y().s[7]++;

      if (response.ok) {
        cov_194vmi0w4y().b[1][0]++;
        cov_194vmi0w4y().s[8]++;
        resolve(true);
      } else {
        cov_194vmi0w4y().b[1][1]++;
        cov_194vmi0w4y().s[9]++;
        throw response.json();
      }
    });
  });
}

const farmerAPI = (cov_194vmi0w4y().s[10]++, {
  getFarmerProducts,
  updateFarmerProducts
});
export default farmerAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhcm1lci5qcyJdLCJuYW1lcyI6WyJnZXRGYXJtZXJQcm9kdWN0cyIsImZhcm1lcklEIiwicmVzcG9uc2UiLCJmZXRjaCIsInBGcmFtZXIiLCJqc29uIiwib2siLCJ1cGRhdGVGYXJtZXJQcm9kdWN0cyIsInByb2R1Y3RJRCIsIm5ld0Ftb3VudCIsImZhcm1lcklkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJtZXRob2QiLCJoZWFkZXJzIiwidGhlbiIsImZhcm1lckFQSSJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhWTs7Ozs7Ozs7OztBQVpaLGVBQWVBLGlCQUFmLENBQWlDQyxRQUFqQyxFQUEyQztBQUFBO0FBR3pDLFFBQU1DLFFBQVEsNkJBQUcsTUFBTUMsS0FBSyxDQUFDLDBCQUEwQkYsUUFBM0IsQ0FBZCxDQUFkO0FBQ0UsUUFBTUcsT0FBTyw2QkFBRyxNQUFNRixRQUFRLENBQUNHLElBQVQsRUFBVCxDQUFiO0FBSnVDOztBQUt2QyxNQUFJSCxRQUFRLENBQUNJLEVBQWIsRUFBaUI7QUFBQTtBQUFBO0FBQ2QsV0FBT0YsT0FBUDtBQUNGLEdBRkQsTUFFTztBQUFBO0FBQUE7QUFDSixVQUFNQSxPQUFOLENBREksQ0FDWTtBQUNsQjtBQUNKOztBQUVELGVBQWVHLG9CQUFmLENBQW9DQyxTQUFwQyxFQUErQ0MsU0FBL0MsRUFBeURDLFFBQXpELEVBQW1FO0FBQUE7QUFBQTtBQUVqRSxTQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFBQTtBQUFBO0FBQ3RDVixJQUFBQSxLQUFLLENBQUMsaUNBQStCSyxTQUEvQixHQUF5QyxHQUF6QyxHQUE2Q0MsU0FBN0MsR0FBdUQsR0FBdkQsR0FBMkRDLFFBQTNELEdBQW9FLEdBQXJFLEVBQ0g7QUFDRUksTUFBQUEsTUFBTSxFQUFFLEtBRFY7QUFFRUMsTUFBQUEsT0FBTyxFQUFFO0FBQUUsd0JBQWdCO0FBQWxCO0FBRlgsS0FERyxDQUFMLENBSUtDLElBSkwsQ0FJV2QsUUFBRCxJQUFjO0FBQUE7QUFBQTs7QUFDcEIsVUFBSUEsUUFBUSxDQUFDSSxFQUFiLEVBQWlCO0FBQUE7QUFBQTtBQUNmTSxRQUFBQSxPQUFPLENBQUMsSUFBRCxDQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQUE7QUFBQTtBQUNMLGNBQU1WLFFBQVEsQ0FBQ0csSUFBVCxFQUFOO0FBQ0Q7QUFDRixLQVZIO0FBV0QsR0FaTSxDQUFQO0FBYUQ7O0FBRUQsTUFBTVksU0FBUyw4QkFBRztBQUNoQmpCLEVBQUFBLGlCQURnQjtBQUVoQk8sRUFBQUE7QUFGZ0IsQ0FBSCxDQUFmO0FBSUEsZUFBZVUsU0FBZiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIGNhbGw6IEdFVCAvYXBpL2Zhcm1lci9wcnVkdWN0c1xyXG5hc3luYyBmdW5jdGlvbiBnZXRGYXJtZXJQcm9kdWN0cyhmYXJtZXJJRCkge1xyXG5cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9wcm9kdWN0cy9mYXJtZXIvJyArIGZhcm1lcklEKTtcclxuICAgIGNvbnN0IHBGcmFtZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgXHRyZXR1cm4gcEZyYW1lcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFx0dGhyb3cgcEZyYW1lcjsgIC8vIGFuIG9iamVjdCB3aXRoIHRoZSBlcnJvciBjb21pbmcgZnJvbSB0aGUgc2VydmVyXHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUZhcm1lclByb2R1Y3RzKHByb2R1Y3RJRCwgbmV3QW1vdW50LGZhcm1lcklkKSB7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBmZXRjaCgnL2FwaS9mYXJtZXIvcHJvZHVjdHMvdXBkYXRlLycrcHJvZHVjdElEKycvJytuZXdBbW91bnQrJy8nK2Zhcm1lcklkKycvJyxcclxuICAgICAge1xyXG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCB9LFxyXG4gICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGZhcm1lckFQSSA9IHtcclxuICBnZXRGYXJtZXJQcm9kdWN0cyxcclxuICB1cGRhdGVGYXJtZXJQcm9kdWN0cyxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBmYXJtZXJBUEk7XHJcbiJdfQ==