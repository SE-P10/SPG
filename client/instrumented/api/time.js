function cov_gezhi1nn3() {
  var path = "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\time.js";
  var hash = "767e39bdf9d435261a2f3ff7399429aba86dbd15";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\time.js",
    statementMap: {
      "0": {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 16,
          column: 6
        }
      },
      "1": {
        start: {
          line: 27,
          column: 22
        },
        end: {
          line: 27,
          column: 70
        }
      },
      "2": {
        start: {
          line: 29,
          column: 4
        },
        end: {
          line: 29,
          column: 116
        }
      },
      "3": {
        start: {
          line: 32,
          column: 16
        },
        end: {
          line: 35,
          column: 1
        }
      }
    },
    fnMap: {
      "0": {
        name: "setTime",
        decl: {
          start: {
            line: 12,
            column: 15
          },
          end: {
            line: 12,
            column: 22
          }
        },
        loc: {
          start: {
            line: 12,
            column: 33
          },
          end: {
            line: 17,
            column: 1
          }
        },
        line: 12
      },
      "1": {
        name: "getTime",
        decl: {
          start: {
            line: 25,
            column: 15
          },
          end: {
            line: 25,
            column: 22
          }
        },
        loc: {
          start: {
            line: 25,
            column: 39
          },
          end: {
            line: 30,
            column: 1
          }
        },
        line: 25
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 12,
            column: 23
          },
          end: {
            line: 12,
            column: 31
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 12,
            column: 30
          },
          end: {
            line: 12,
            column: 31
          }
        }],
        line: 12
      },
      "1": {
        loc: {
          start: {
            line: 25,
            column: 23
          },
          end: {
            line: 25,
            column: 37
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 25,
            column: 32
          },
          end: {
            line: 25,
            column: 37
          }
        }],
        line: 25
      },
      "2": {
        loc: {
          start: {
            line: 29,
            column: 26
          },
          end: {
            line: 29,
            column: 72
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 29,
            column: 35
          },
          end: {
            line: 29,
            column: 53
          }
        }, {
          start: {
            line: 29,
            column: 56
          },
          end: {
            line: 29,
            column: 72
          }
        }],
        line: 29
      },
      "3": {
        loc: {
          start: {
            line: 29,
            column: 86
          },
          end: {
            line: 29,
            column: 113
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 29,
            column: 95
          },
          end: {
            line: 29,
            column: 96
          }
        }, {
          start: {
            line: 29,
            column: 99
          },
          end: {
            line: 29,
            column: 113
          }
        }],
        line: 29
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0],
      "1": [0],
      "2": [0, 0],
      "3": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "767e39bdf9d435261a2f3ff7399429aba86dbd15"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_gezhi1nn3 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_gezhi1nn3();
import { handleFetch, parseResponse } from "./utility";
import dayjs from 'dayjs';
/**
 * Frontend interface API
 * 
 * Handle Virtual clock time in user session
 * accepts both datetime '2021-12-07' and unix timestamp (milliseconds or not)
 * 
 * @returns {Number} offset from now
 */

async function setTime(time = (cov_gezhi1nn3().b[0][0]++, 0)) {
  cov_gezhi1nn3().f[0]++;
  cov_gezhi1nn3().s[0]++;
  return parseResponse(await handleFetch("/api/debug/time/" + time, {}, "PUT"), "number");
}
/**
 * Return virtual timestamp or an offset from real one
 * 
 * @param {Number} offset 
 * @returns 
 */


async function getTime(offset = (cov_gezhi1nn3().b[1][0]++, false)) {
  cov_gezhi1nn3().f[1]++;
  let virtualTime = (cov_gezhi1nn3().s[1]++, await handleFetch("/api/debug/time/", {}, "GET"));
  cov_gezhi1nn3().s[2]++;
  return parseResponse(offset ? (cov_gezhi1nn3().b[2][0]++, virtualTime.offset) : (cov_gezhi1nn3().b[2][1]++, virtualTime.time), "number", offset ? (cov_gezhi1nn3().b[3][0]++, 0) : (cov_gezhi1nn3().b[3][1]++, dayjs().unix()));
}

const timeAPI = (cov_gezhi1nn3().s[3]++, {
  setTime,
  getTime
});
export default timeAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWUuanMiXSwibmFtZXMiOlsiaGFuZGxlRmV0Y2giLCJwYXJzZVJlc3BvbnNlIiwiZGF5anMiLCJzZXRUaW1lIiwidGltZSIsImdldFRpbWUiLCJvZmZzZXQiLCJ2aXJ0dWFsVGltZSIsInVuaXgiLCJ0aW1lQVBJIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVZOzs7Ozs7Ozs7QUFmWixTQUFTQSxXQUFULEVBQXNCQyxhQUF0QixRQUEyQyxXQUEzQztBQUNBLE9BQU9DLEtBQVAsTUFBa0IsT0FBbEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWVDLE9BQWYsQ0FBdUJDLElBQUksK0JBQUcsQ0FBSCxDQUEzQixFQUFpQztBQUFBO0FBQUE7QUFDN0IsU0FBT0gsYUFBYSxDQUNoQixNQUFNRCxXQUFXLENBQUMscUJBQXFCSSxJQUF0QixFQUE0QixFQUE1QixFQUFnQyxLQUFoQyxDQURELEVBRWhCLFFBRmdCLENBQXBCO0FBSUg7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLGVBQWVDLE9BQWYsQ0FBdUJDLE1BQU0sK0JBQUcsS0FBSCxDQUE3QixFQUF1QztBQUFBO0FBRW5DLE1BQUlDLFdBQVcsNEJBQUcsTUFBTVAsV0FBVyxDQUFDLGtCQUFELEVBQXFCLEVBQXJCLEVBQXlCLEtBQXpCLENBQXBCLENBQWY7QUFGbUM7QUFJbkMsU0FBT0MsYUFBYSxDQUFFSyxNQUFNLCtCQUFHQyxXQUFXLENBQUNELE1BQWYsZ0NBQXdCQyxXQUFXLENBQUNILElBQXBDLENBQVIsRUFBbUQsUUFBbkQsRUFBOERFLE1BQU0sK0JBQUcsQ0FBSCxnQ0FBT0osS0FBSyxHQUFHTSxJQUFSLEVBQVAsQ0FBcEUsQ0FBcEI7QUFDSDs7QUFFRCxNQUFNQyxPQUFPLDRCQUFHO0FBQ1pOLEVBQUFBLE9BRFk7QUFFWkUsRUFBQUE7QUFGWSxDQUFILENBQWI7QUFLQSxlQUFlSSxPQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGFuZGxlRmV0Y2gsIHBhcnNlUmVzcG9uc2UgfSBmcm9tIFwiLi91dGlsaXR5XCI7XHJcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XHJcblxyXG4vKipcclxuICogRnJvbnRlbmQgaW50ZXJmYWNlIEFQSVxyXG4gKiBcclxuICogSGFuZGxlIFZpcnR1YWwgY2xvY2sgdGltZSBpbiB1c2VyIHNlc3Npb25cclxuICogYWNjZXB0cyBib3RoIGRhdGV0aW1lICcyMDIxLTEyLTA3JyBhbmQgdW5peCB0aW1lc3RhbXAgKG1pbGxpc2Vjb25kcyBvciBub3QpXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBvZmZzZXQgZnJvbSBub3dcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHNldFRpbWUodGltZSA9IDApIHtcclxuICAgIHJldHVybiBwYXJzZVJlc3BvbnNlKFxyXG4gICAgICAgIGF3YWl0IGhhbmRsZUZldGNoKFwiL2FwaS9kZWJ1Zy90aW1lL1wiICsgdGltZSwge30sIFwiUFVUXCIpLFxyXG4gICAgICAgIFwibnVtYmVyXCJcclxuICAgICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdmlydHVhbCB0aW1lc3RhbXAgb3IgYW4gb2Zmc2V0IGZyb20gcmVhbCBvbmVcclxuICogXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2V0VGltZShvZmZzZXQgPSBmYWxzZSkge1xyXG5cclxuICAgIGxldCB2aXJ0dWFsVGltZSA9IGF3YWl0IGhhbmRsZUZldGNoKFwiL2FwaS9kZWJ1Zy90aW1lL1wiLCB7fSwgXCJHRVRcIik7XHJcblxyXG4gICAgcmV0dXJuIHBhcnNlUmVzcG9uc2UoKG9mZnNldCA/IHZpcnR1YWxUaW1lLm9mZnNldCA6IHZpcnR1YWxUaW1lLnRpbWUpLCBcIm51bWJlclwiLCAob2Zmc2V0ID8gMCA6IGRheWpzKCkudW5peCgpKSk7XHJcbn1cclxuXHJcbmNvbnN0IHRpbWVBUEkgPSB7XHJcbiAgICBzZXRUaW1lLFxyXG4gICAgZ2V0VGltZVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGltZUFQSTsiXX0=