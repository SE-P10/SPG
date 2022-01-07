function cov_f2wse09q9() {
  var path = "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\notificationAPI.js";
  var hash = "6f31cb0d03e994ea0f33412962fc4c0b316d5cce";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\notificationAPI.js",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 13,
          column: 6
        }
      },
      "1": {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 26,
          column: 6
        }
      },
      "2": {
        start: {
          line: 36,
          column: 4
        },
        end: {
          line: 40,
          column: 6
        }
      },
      "3": {
        start: {
          line: 44,
          column: 24
        },
        end: {
          line: 48,
          column: 1
        }
      }
    },
    fnMap: {
      "0": {
        name: "getNotification",
        decl: {
          start: {
            line: 8,
            column: 15
          },
          end: {
            line: 8,
            column: 30
          }
        },
        loc: {
          start: {
            line: 8,
            column: 39
          },
          end: {
            line: 14,
            column: 1
          }
        },
        line: 8
      },
      "1": {
        name: "setSeenNotification",
        decl: {
          start: {
            line: 21,
            column: 15
          },
          end: {
            line: 21,
            column: 34
          }
        },
        loc: {
          start: {
            line: 21,
            column: 51
          },
          end: {
            line: 27,
            column: 1
          }
        },
        line: 21
      },
      "2": {
        name: "addNotification",
        decl: {
          start: {
            line: 35,
            column: 15
          },
          end: {
            line: 35,
            column: 30
          }
        },
        loc: {
          start: {
            line: 35,
            column: 61
          },
          end: {
            line: 41,
            column: 1
          }
        },
        line: 35
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 35,
            column: 48
          },
          end: {
            line: 35,
            column: 59
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 35,
            column: 57
          },
          end: {
            line: 35,
            column: 59
          }
        }],
        line: 35
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
      "1": 0,
      "2": 0
    },
    b: {
      "0": [0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "6f31cb0d03e994ea0f33412962fc4c0b316d5cce"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_f2wse09q9 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_f2wse09q9();
import { handleFetch, parseResponse } from "./utility";
/**
 *
 * @param {Number} userID
 * @returns {Array} [{id:0, message: '', object: '', seen:0}, ...]
 */

async function getNotification(userID) {
  cov_f2wse09q9().f[0]++;
  cov_f2wse09q9().s[0]++;
  return parseResponse(await handleFetch("/api/notification/" + userID, {}, "GET"), "array", []);
}
/**
 *
 * @param {Number} notificationID
 * @returns {Boolean} 
 */


async function setSeenNotification(notificationID) {
  cov_f2wse09q9().f[1]++;
  cov_f2wse09q9().s[1]++;
  return parseResponse(await handleFetch("/api/notification/" + notificationID, {}, "PUT"), "boolean", []);
}
/**
 *
 * @param {Number} userID 
 * @param {String} message
 * @returns {Boolean} 
 */


async function addNotification(userID, message, object = (cov_f2wse09q9().b[0][0]++, '')) {
  cov_f2wse09q9().f[2]++;
  cov_f2wse09q9().s[2]++;
  return parseResponse(await handleFetch("/api/notification/" + userID, {
    message: message,
    object: object
  }, "POST"), "boolean", []);
}

const notificationAPI = (cov_f2wse09q9().s[3]++, {
  setSeenNotification,
  addNotification,
  getNotification
});
export default notificationAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbkFQSS5qcyJdLCJuYW1lcyI6WyJoYW5kbGVGZXRjaCIsInBhcnNlUmVzcG9uc2UiLCJnZXROb3RpZmljYXRpb24iLCJ1c2VySUQiLCJzZXRTZWVuTm90aWZpY2F0aW9uIiwibm90aWZpY2F0aW9uSUQiLCJhZGROb3RpZmljYXRpb24iLCJtZXNzYWdlIiwib2JqZWN0Iiwibm90aWZpY2F0aW9uQVBJIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlWTs7Ozs7Ozs7O0FBZlosU0FBU0EsV0FBVCxFQUFzQkMsYUFBdEIsUUFBMkMsV0FBM0M7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLGVBQWVDLGVBQWYsQ0FBK0JDLE1BQS9CLEVBQXVDO0FBQUE7QUFBQTtBQUNuQyxTQUFPRixhQUFhLENBQ2hCLE1BQU1ELFdBQVcsQ0FBQyx1QkFBdUJHLE1BQXhCLEVBQWdDLEVBQWhDLEVBQW9DLEtBQXBDLENBREQsRUFFaEIsT0FGZ0IsRUFHaEIsRUFIZ0IsQ0FBcEI7QUFLSDtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLGVBQWVDLG1CQUFmLENBQW1DQyxjQUFuQyxFQUFtRDtBQUFBO0FBQUE7QUFDL0MsU0FBT0osYUFBYSxDQUNoQixNQUFNRCxXQUFXLENBQUMsdUJBQXVCSyxjQUF4QixFQUF3QyxFQUF4QyxFQUE0QyxLQUE1QyxDQURELEVBRWhCLFNBRmdCLEVBR2hCLEVBSGdCLENBQXBCO0FBS0g7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLGVBQWVDLGVBQWYsQ0FBK0JILE1BQS9CLEVBQXVDSSxPQUF2QyxFQUFnREMsTUFBTSwrQkFBRyxFQUFILENBQXRELEVBQTZEO0FBQUE7QUFBQTtBQUN6RCxTQUFPUCxhQUFhLENBQ2hCLE1BQU1ELFdBQVcsQ0FBQyx1QkFBdUJHLE1BQXhCLEVBQWdDO0FBQUVJLElBQUFBLE9BQU8sRUFBRUEsT0FBWDtBQUFvQkMsSUFBQUEsTUFBTSxFQUFFQTtBQUE1QixHQUFoQyxFQUFzRSxNQUF0RSxDQURELEVBRWhCLFNBRmdCLEVBR2hCLEVBSGdCLENBQXBCO0FBS0g7O0FBR0QsTUFBTUMsZUFBZSw0QkFBRztBQUNwQkwsRUFBQUEsbUJBRG9CO0FBRXBCRSxFQUFBQSxlQUZvQjtBQUdwQkosRUFBQUE7QUFIb0IsQ0FBSCxDQUFyQjtBQU1BLGVBQWVPLGVBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVGZXRjaCwgcGFyc2VSZXNwb25zZSB9IGZyb20gXCIuL3V0aWxpdHlcIjtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gdXNlcklEXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gW3tpZDowLCBtZXNzYWdlOiAnJywgb2JqZWN0OiAnJywgc2VlbjowfSwgLi4uXVxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2V0Tm90aWZpY2F0aW9uKHVzZXJJRCkge1xyXG4gICAgcmV0dXJuIHBhcnNlUmVzcG9uc2UoXHJcbiAgICAgICAgYXdhaXQgaGFuZGxlRmV0Y2goXCIvYXBpL25vdGlmaWNhdGlvbi9cIiArIHVzZXJJRCwge30sIFwiR0VUXCIpLFxyXG4gICAgICAgIFwiYXJyYXlcIixcclxuICAgICAgICBbXVxyXG4gICAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBub3RpZmljYXRpb25JRFxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBzZXRTZWVuTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbklEKSB7XHJcbiAgICByZXR1cm4gcGFyc2VSZXNwb25zZShcclxuICAgICAgICBhd2FpdCBoYW5kbGVGZXRjaChcIi9hcGkvbm90aWZpY2F0aW9uL1wiICsgbm90aWZpY2F0aW9uSUQsIHt9LCBcIlBVVFwiKSxcclxuICAgICAgICBcImJvb2xlYW5cIixcclxuICAgICAgICBbXVxyXG4gICAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB1c2VySUQgXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGFkZE5vdGlmaWNhdGlvbih1c2VySUQsIG1lc3NhZ2UsIG9iamVjdCA9ICcnKSB7XHJcbiAgICByZXR1cm4gcGFyc2VSZXNwb25zZShcclxuICAgICAgICBhd2FpdCBoYW5kbGVGZXRjaChcIi9hcGkvbm90aWZpY2F0aW9uL1wiICsgdXNlcklELCB7IG1lc3NhZ2U6IG1lc3NhZ2UsIG9iamVjdDogb2JqZWN0IH0sIFwiUE9TVFwiKSxcclxuICAgICAgICBcImJvb2xlYW5cIixcclxuICAgICAgICBbXVxyXG4gICAgKTtcclxufVxyXG5cclxuXHJcbmNvbnN0IG5vdGlmaWNhdGlvbkFQSSA9IHtcclxuICAgIHNldFNlZW5Ob3RpZmljYXRpb24sXHJcbiAgICBhZGROb3RpZmljYXRpb24sXHJcbiAgICBnZXROb3RpZmljYXRpb24sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBub3RpZmljYXRpb25BUEk7Il19