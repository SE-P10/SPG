function cov_17k3z63pc0() {
  var path = "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\wallet.js";
  var hash = "008c2964613aa1d2cbf0060008b8806c6764968b";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "H:\\Michele\\Universit\xE0\\Magistrale Polito\\Software Engineering II\\SPG\\SPG\\client\\src\\api\\wallet.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 19
        },
        end: {
          line: 12,
          column: 4
        }
      },
      "1": {
        start: {
          line: 13,
          column: 2
        },
        end: {
          line: 17,
          column: 3
        }
      },
      "2": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 27
        }
      },
      "3": {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 16,
          column: 32
        }
      },
      "4": {
        start: {
          line: 23,
          column: 19
        },
        end: {
          line: 23,
          column: 53
        }
      },
      "5": {
        start: {
          line: 24,
          column: 21
        },
        end: {
          line: 24,
          column: 42
        }
      },
      "6": {
        start: {
          line: 25,
          column: 2
        },
        end: {
          line: 29,
          column: 3
        }
      },
      "7": {
        start: {
          line: 26,
          column: 4
        },
        end: {
          line: 26,
          column: 29
        }
      },
      "8": {
        start: {
          line: 28,
          column: 4
        },
        end: {
          line: 28,
          column: 21
        }
      },
      "9": {
        start: {
          line: 32,
          column: 18
        },
        end: {
          line: 35,
          column: 1
        }
      }
    },
    fnMap: {
      "0": {
        name: "updateWallet",
        decl: {
          start: {
            line: 2,
            column: 15
          },
          end: {
            line: 2,
            column: 27
          }
        },
        loc: {
          start: {
            line: 2,
            column: 50
          },
          end: {
            line: 18,
            column: 1
          }
        },
        line: 2
      },
      "1": {
        name: "getWalletByMail",
        decl: {
          start: {
            line: 21,
            column: 15
          },
          end: {
            line: 21,
            column: 30
          }
        },
        loc: {
          start: {
            line: 21,
            column: 37
          },
          end: {
            line: 30,
            column: 1
          }
        },
        line: 21
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 13,
            column: 2
          },
          end: {
            line: 17,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 13,
            column: 2
          },
          end: {
            line: 17,
            column: 3
          }
        }, {
          start: {
            line: 13,
            column: 2
          },
          end: {
            line: 17,
            column: 3
          }
        }],
        line: 13
      },
      "1": {
        loc: {
          start: {
            line: 25,
            column: 2
          },
          end: {
            line: 29,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 25,
            column: 2
          },
          end: {
            line: 29,
            column: 3
          }
        }, {
          start: {
            line: 25,
            column: 2
          },
          end: {
            line: 29,
            column: 3
          }
        }],
        line: 25
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
      "9": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "008c2964613aa1d2cbf0060008b8806c6764968b"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_17k3z63pc0 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_17k3z63pc0();

async function updateWallet(amount, client_email) {
  cov_17k3z63pc0().f[0]++;
  const response = (cov_17k3z63pc0().s[0]++, await fetch("/api/wallet/update/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: amount,
      client_email: client_email
    })
  }));
  cov_17k3z63pc0().s[1]++;

  if (response.ok) {
    cov_17k3z63pc0().b[0][0]++;
    cov_17k3z63pc0().s[2]++;
    return response.json();
  } else {
    cov_17k3z63pc0().b[0][1]++;
    cov_17k3z63pc0().s[3]++;
    throw await response.json();
  }
} // Return the wallet value of the user associated with the given mail 


async function getWalletByMail(mail) {
  cov_17k3z63pc0().f[1]++;
  // call: GET /api/products
  const response = (cov_17k3z63pc0().s[4]++, await fetch('/api/wallet/' + mail));
  const walletJson = (cov_17k3z63pc0().s[5]++, await response.json());
  cov_17k3z63pc0().s[6]++;

  if (response.ok) {
    cov_17k3z63pc0().b[1][0]++;
    cov_17k3z63pc0().s[7]++;
    return walletJson.wallet;
  } else {
    cov_17k3z63pc0().b[1][1]++;
    cov_17k3z63pc0().s[8]++;
    throw walletJson; // an object with the error coming from the server
  }
}

const walletAPI = (cov_17k3z63pc0().s[9]++, {
  updateWallet,
  getWalletByMail
});
export default walletAPI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhbGxldC5qcyJdLCJuYW1lcyI6WyJ1cGRhdGVXYWxsZXQiLCJhbW91bnQiLCJjbGllbnRfZW1haWwiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJqc29uIiwiZ2V0V2FsbGV0QnlNYWlsIiwibWFpbCIsIndhbGxldEpzb24iLCJ3YWxsZXQiLCJ3YWxsZXRBUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVZOzs7Ozs7Ozs7O0FBZFosZUFBZUEsWUFBZixDQUE0QkMsTUFBNUIsRUFBb0NDLFlBQXBDLEVBQWtEO0FBQUE7QUFDaEQsUUFBTUMsUUFBUSw2QkFBRyxNQUFNQyxLQUFLLENBQUMscUJBQUQsRUFBd0I7QUFDbERDLElBQUFBLE1BQU0sRUFBRSxNQUQwQztBQUVsREMsSUFBQUEsT0FBTyxFQUFFO0FBQ1Asc0JBQWdCO0FBRFQsS0FGeUM7QUFLbERDLElBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDbkJSLE1BQUFBLE1BQU0sRUFBRUEsTUFEVztBQUVuQkMsTUFBQUEsWUFBWSxFQUFFQTtBQUZLLEtBQWY7QUFMNEMsR0FBeEIsQ0FBZCxDQUFkO0FBRGdEOztBQVdoRCxNQUFJQyxRQUFRLENBQUNPLEVBQWIsRUFBaUI7QUFBQTtBQUFBO0FBQ2YsV0FBT1AsUUFBUSxDQUFDUSxJQUFULEVBQVA7QUFDRCxHQUZELE1BRU87QUFBQTtBQUFBO0FBQ0wsVUFBTSxNQUFNUixRQUFRLENBQUNRLElBQVQsRUFBWjtBQUNEO0FBQ0YsQyxDQUVEOzs7QUFDQSxlQUFlQyxlQUFmLENBQStCQyxJQUEvQixFQUFxQztBQUFBO0FBQ25DO0FBQ0EsUUFBTVYsUUFBUSw2QkFBRyxNQUFNQyxLQUFLLENBQUMsaUJBQWlCUyxJQUFsQixDQUFkLENBQWQ7QUFDQSxRQUFNQyxVQUFVLDZCQUFHLE1BQU1YLFFBQVEsQ0FBQ1EsSUFBVCxFQUFULENBQWhCO0FBSG1DOztBQUluQyxNQUFJUixRQUFRLENBQUNPLEVBQWIsRUFBaUI7QUFBQTtBQUFBO0FBQ2YsV0FBT0ksVUFBVSxDQUFDQyxNQUFsQjtBQUNELEdBRkQsTUFFTztBQUFBO0FBQUE7QUFDTCxVQUFNRCxVQUFOLENBREssQ0FDYztBQUNwQjtBQUNGOztBQUVELE1BQU1FLFNBQVMsNkJBQUc7QUFDaEJoQixFQUFBQSxZQURnQjtBQUVoQlksRUFBQUE7QUFGZ0IsQ0FBSCxDQUFmO0FBSUEsZUFBZUksU0FBZiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVXYWxsZXQoYW1vdW50LCBjbGllbnRfZW1haWwpIHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS93YWxsZXQvdXBkYXRlL1wiLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgIH0sXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGFtb3VudDogYW1vdW50LFxyXG4gICAgICBjbGllbnRfZW1haWw6IGNsaWVudF9lbWFpbCxcclxuICAgIH0pLFxyXG4gIH0pO1xyXG4gIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUmV0dXJuIHRoZSB3YWxsZXQgdmFsdWUgb2YgdGhlIHVzZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBtYWlsIFxyXG5hc3luYyBmdW5jdGlvbiBnZXRXYWxsZXRCeU1haWwobWFpbCkge1xyXG4gIC8vIGNhbGw6IEdFVCAvYXBpL3Byb2R1Y3RzXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS93YWxsZXQvJyArIG1haWwpO1xyXG4gIGNvbnN0IHdhbGxldEpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICByZXR1cm4gd2FsbGV0SnNvbi53YWxsZXQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IHdhbGxldEpzb247ICAvLyBhbiBvYmplY3Qgd2l0aCB0aGUgZXJyb3IgY29taW5nIGZyb20gdGhlIHNlcnZlclxyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgd2FsbGV0QVBJID0ge1xyXG4gIHVwZGF0ZVdhbGxldCxcclxuICBnZXRXYWxsZXRCeU1haWxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgd2FsbGV0QVBJO1xyXG4iXX0=