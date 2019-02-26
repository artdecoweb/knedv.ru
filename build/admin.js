var e;
function aa(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
}, q = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function ca() {
  ca = function() {
  };
  q.Symbol || (q.Symbol = da);
}
var da = function() {
  var a = 0;
  return function(b) {
    return "jscomp_symbol_" + (b || "") + a++;
  };
}();
function ea() {
  ca();
  var a = q.Symbol.iterator;
  a || (a = q.Symbol.iterator = q.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && ba(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return fa(aa(this));
  }});
  ea = function() {
  };
}
function fa(a) {
  ea();
  a = {next:a};
  a[q.Symbol.iterator] = function() {
    return this;
  };
  return a;
}
function r(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : {next:aa(a)};
}
var ha = "function" == typeof Object.create ? Object.create : function(a) {
  function b() {
  }
  b.prototype = a;
  return new b;
}, ia;
if ("function" == typeof Object.setPrototypeOf) {
  ia = Object.setPrototypeOf;
} else {
  var ja;
  a: {
    var ka = {za:!0}, la = {};
    try {
      la.__proto__ = ka;
      ja = la.za;
      break a;
    } catch (a) {
    }
    ja = !1;
  }
  ia = ja ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) {
      throw new TypeError(a + " is not extensible");
    }
    return a;
  } : null;
}
var ma = ia;
function y(a, b) {
  a.prototype = ha(b.prototype);
  a.prototype.constructor = a;
  if (ma) {
    ma(a, b);
  } else {
    for (var c in b) {
      if ("prototype" != c) {
        if (Object.defineProperties) {
          var d = Object.getOwnPropertyDescriptor(b, c);
          d && Object.defineProperty(a, c, d);
        } else {
          a[c] = b[c];
        }
      }
    }
  }
  a.Xa = b.prototype;
}
function na(a, b) {
  if (b) {
    var c = q;
    a = a.split(".");
    for (var d = 0; d < a.length - 1; d++) {
      var f = a[d];
      f in c || (c[f] = {});
      c = c[f];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && ba(c, a, {configurable:!0, writable:!0, value:b});
  }
}
na("Promise", function(a) {
  function b(a) {
    this.f = 0;
    this.u = void 0;
    this.a = [];
    var b = this.h();
    try {
      a(b.resolve, b.reject);
    } catch (n) {
      b.reject(n);
    }
  }
  function c() {
    this.a = null;
  }
  function d(a) {
    return a instanceof b ? a : new b(function(b) {
      b(a);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.f = function(a) {
    if (null == this.a) {
      this.a = [];
      var b = this;
      this.h(function() {
        b.u();
      });
    }
    this.a.push(a);
  };
  var f = q.setTimeout;
  c.prototype.h = function(a) {
    f(a, 0);
  };
  c.prototype.u = function() {
    for (; this.a && this.a.length;) {
      var a = this.a;
      this.a = [];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        a[b] = null;
        try {
          c();
        } catch (m) {
          this.l(m);
        }
      }
    }
    this.a = null;
  };
  c.prototype.l = function(a) {
    this.h(function() {
      throw a;
    });
  };
  b.prototype.h = function() {
    function a(a) {
      return function(d) {
        c || (c = !0, a.call(b, d));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.Ia), reject:a(this.l)};
  };
  b.prototype.Ia = function(a) {
    if (a === this) {
      this.l(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof b) {
        this.Ja(a);
      } else {
        a: {
          switch(typeof a) {
            case "object":
              var c = null != a;
              break a;
            case "function":
              c = !0;
              break a;
            default:
              c = !1;
          }
        }
        c ? this.S(a) : this.F(a);
      }
    }
  };
  b.prototype.S = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (n) {
      this.l(n);
      return;
    }
    "function" == typeof b ? this.La(b, a) : this.F(a);
  };
  b.prototype.l = function(a) {
    this.G(2, a);
  };
  b.prototype.F = function(a) {
    this.G(1, a);
  };
  b.prototype.G = function(a, b) {
    if (0 != this.f) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.f);
    }
    this.f = a;
    this.u = b;
    this.I();
  };
  b.prototype.I = function() {
    if (null != this.a) {
      for (var a = 0; a < this.a.length; ++a) {
        g.f(this.a[a]);
      }
      this.a = null;
    }
  };
  var g = new c;
  b.prototype.Ja = function(a) {
    var b = this.h();
    a.R(b.resolve, b.reject);
  };
  b.prototype.La = function(a, b) {
    var c = this.h();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (m) {
      c.reject(m);
    }
  };
  b.prototype.then = function(a, c) {
    function d(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          f(a(b));
        } catch (A) {
          g(A);
        }
      } : b;
    }
    var f, g, h = new b(function(a, b) {
      f = a;
      g = b;
    });
    this.R(d(a, f), d(c, g));
    return h;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.R = function(a, b) {
    function c() {
      switch(d.f) {
        case 1:
          a(d.u);
          break;
        case 2:
          b(d.u);
          break;
        default:
          throw Error("Unexpected state: " + d.f);
      }
    }
    var d = this;
    null == this.a ? g.f(c) : this.a.push(c);
  };
  b.resolve = d;
  b.reject = function(a) {
    return new b(function(b, c) {
      c(a);
    });
  };
  b.race = function(a) {
    return new b(function(b, c) {
      for (var f = r(a), g = f.next(); !g.done; g = f.next()) {
        d(g.value).R(b, c);
      }
    });
  };
  b.all = function(a) {
    var c = r(a), f = c.next();
    return f.done ? d([]) : new b(function(a, b) {
      function g(b) {
        return function(c) {
          h[b] = c;
          k--;
          0 == k && a(h);
        };
      }
      var h = [], k = 0;
      do {
        h.push(void 0), k++, d(f.value).R(g(h.length - 1), b), f = c.next();
      } while (!f.done);
    });
  };
  return b;
});
function oa() {
  this.G = !1;
  this.l = null;
  this.a = void 0;
  this.f = 1;
  this.u = this.F = 0;
  this.S = this.h = null;
}
function pa(a) {
  if (a.G) {
    throw new TypeError("Generator is already running");
  }
  a.G = !0;
}
oa.prototype.I = function(a) {
  this.a = a;
};
function qa(a, b) {
  a.h = {sa:b, va:!0};
  a.f = a.F || a.u;
}
oa.prototype.return = function(a) {
  this.h = {return:a};
  this.f = this.u;
};
function z(a, b, c) {
  a.f = c;
  return {value:b};
}
oa.prototype.m = function(a) {
  this.f = a;
};
function D(a, b, c) {
  a.F = b;
  void 0 != c && (a.u = c);
}
function E(a) {
  a.F = 0;
  var b = a.h.sa;
  a.h = null;
  return b;
}
function G(a) {
  a.S = [a.h];
  a.F = 0;
  a.u = 0;
}
function H(a, b) {
  var c = a.S.splice(0)[0];
  (c = a.h = a.h || c) ? c.va ? a.f = a.F || a.u : void 0 != c.m && a.u < c.m ? (a.f = c.m, a.h = null) : a.f = a.u : a.f = b;
}
function ra(a) {
  this.a = new oa;
  this.f = a;
}
function sa(a, b) {
  pa(a.a);
  var c = a.a.l;
  if (c) {
    return ta(a, "return" in c ? c["return"] : function(a) {
      return {value:a, done:!0};
    }, b, a.a.return);
  }
  a.a.return(b);
  return ua(a);
}
function ta(a, b, c, d) {
  try {
    var f = b.call(a.a.l, c);
    if (!(f instanceof Object)) {
      throw new TypeError("Iterator result " + f + " is not an object");
    }
    if (!f.done) {
      return a.a.G = !1, f;
    }
    var g = f.value;
  } catch (h) {
    return a.a.l = null, qa(a.a, h), ua(a);
  }
  a.a.l = null;
  d.call(a.a, g);
  return ua(a);
}
function ua(a) {
  for (; a.a.f;) {
    try {
      var b = a.f(a.a);
      if (b) {
        return a.a.G = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.a.a = void 0, qa(a.a, c);
    }
  }
  a.a.G = !1;
  if (a.a.h) {
    b = a.a.h;
    a.a.h = null;
    if (b.va) {
      throw b.sa;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function va(a) {
  this.next = function(b) {
    pa(a.a);
    a.a.l ? b = ta(a, a.a.l.next, b, a.a.I) : (a.a.I(b), b = ua(a));
    return b;
  };
  this.throw = function(b) {
    pa(a.a);
    a.a.l ? b = ta(a, a.a.l["throw"], b, a.a.I) : (qa(a.a, b), b = ua(a));
    return b;
  };
  this.return = function(b) {
    return sa(a, b);
  };
  ea();
  this[Symbol.iterator] = function() {
    return this;
  };
}
function wa(a) {
  function b(b) {
    return a.next(b);
  }
  function c(b) {
    return a.throw(b);
  }
  return new Promise(function(d, f) {
    function g(a) {
      a.done ? d(a.value) : Promise.resolve(a.value).then(b, c).then(g, f);
    }
    g(a.next());
  });
}
function I(a) {
  return wa(new va(new ra(a)));
}
var xa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d) {
      for (var f in d) {
        Object.prototype.hasOwnProperty.call(d, f) && (a[f] = d[f]);
      }
    }
  }
  return a;
};
na("Object.assign", function(a) {
  return a || xa;
});
function ya(a, b) {
  ea();
  a instanceof String && (a += "");
  var c = 0, d = {next:function() {
    if (c < a.length) {
      var f = c++;
      return {value:b(f, a[f]), done:!1};
    }
    d.next = function() {
      return {done:!0, value:void 0};
    };
    return d.next();
  }};
  d[Symbol.iterator] = function() {
    return d;
  };
  return d;
}
na("Array.prototype.values", function(a) {
  return a ? a : function() {
    return ya(this, function(a, c) {
      return c;
    });
  };
});
function za() {
}
var J = {}, K = [], Aa = [];
function L(a, b) {
  var c = Aa, d, f;
  for (f = arguments.length; 2 < f--;) {
    K.push(arguments[f]);
  }
  b && null != b.children && (K.length || K.push(b.children), delete b.children);
  for (; K.length;) {
    if ((d = K.pop()) && void 0 !== d.pop) {
      for (f = d.length; f--;) {
        K.push(d[f]);
      }
    } else {
      "boolean" === typeof d && (d = null);
      if (f = "function" !== typeof a) {
        null == d ? d = "" : "number" === typeof d ? d = String(d) : "string" !== typeof d && (f = !1);
      }
      f && g ? c[c.length - 1] += d : c === Aa ? c = [d] : c.push(d);
      var g = f;
    }
  }
  g = new za;
  g.nodeName = a;
  g.children = c;
  g.attributes = null == b ? void 0 : b;
  g.key = null == b ? void 0 : b.key;
  void 0 !== J.Ma && J.Ma(g);
  return g;
}
function M(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
  return a;
}
function O(a, b) {
  null != a && ("function" == typeof a ? a(b) : a.current = b);
}
var Ba = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
function Ca(a, b) {
  return L(a.nodeName, M(M({}, a.attributes), b), 2 < arguments.length ? [].slice.call(arguments, 2) : a.children);
}
var Da = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, Ea = [];
function Fa(a) {
  !a.M && (a.M = !0) && 1 == Ea.push(a) && (J.Qa || Ba)(Ga);
}
function Ga() {
  for (var a; a = Ea.pop();) {
    a.M && Ia(a);
  }
}
function Ja(a) {
  var b = M({}, a.attributes);
  b.children = a.children;
  a = a.nodeName.Ra;
  if (void 0 !== a) {
    for (var c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
function Ka(a) {
  var b = a.parentNode;
  b && b.removeChild(a);
}
function La(a, b, c, d) {
  var f = P;
  "className" === b && (b = "class");
  if ("key" !== b) {
    if ("ref" === b) {
      O(c, null), O(d, a);
    } else {
      if ("class" !== b || f) {
        if ("style" === b) {
          if (d && "string" !== typeof d && "string" !== typeof c || (a.style.cssText = d || ""), d && "object" === typeof d) {
            if ("string" !== typeof c) {
              for (var g in c) {
                g in d || (a.style[g] = "");
              }
            }
            for (g in d) {
              a.style[g] = "number" === typeof d[g] && !1 === Da.test(g) ? d[g] + "px" : d[g];
            }
          }
        } else {
          if ("dangerouslySetInnerHTML" === b) {
            d && (a.innerHTML = d.X || "");
          } else {
            if ("o" == b[0] && "n" == b[1]) {
              f = b !== (b = b.replace(/Capture$/, "")), b = b.toLowerCase().substring(2), d ? c || a.addEventListener(b, Ma, f) : a.removeEventListener(b, Ma, f), (a.ka || (a.ka = {}))[b] = d;
            } else {
              if ("list" !== b && "type" !== b && !f && b in a) {
                try {
                  a[b] = null == d ? "" : d;
                } catch (h) {
                }
                null != d && !1 !== d || "spellcheck" == b || a.removeAttribute(b);
              } else {
                c = f && b !== (b = b.replace(/^xlink:?/, "")), null == d || !1 === d ? c ? a.removeAttributeNS("http://www.w3.org/1999/xlink", b.toLowerCase()) : a.removeAttribute(b) : "function" !== typeof d && (c ? a.setAttributeNS("http://www.w3.org/1999/xlink", b.toLowerCase(), d) : a.setAttribute(b, d));
              }
            }
          }
        }
      } else {
        a.className = d || "";
      }
    }
  }
}
function Ma(a) {
  return this.ka[a.type](J.event && J.event(a) || a);
}
var Na = [], Oa = 0, P = !1, Pa = !1;
function Qa() {
  for (var a; a = Na.shift();) {
    J.Aa && J.Aa(a), a.w && a.w();
  }
}
function Ra(a, b, c, d, f, g) {
  Oa++ || (P = null != f && void 0 !== f.Ta, Pa = null != a && !("__preactattr_" in a));
  a = Sa(a, b, c, d, g);
  f && a.parentNode !== f && f.appendChild(a);
  --Oa || (Pa = !1, g || Qa());
  return a;
}
function Sa(a, b, c, d, f) {
  var g = a, h = P;
  if (null == b || "boolean" === typeof b) {
    b = "";
  }
  if ("string" === typeof b || "number" === typeof b) {
    return a && void 0 !== a.splitText && a.parentNode && (!a.s || f) ? a.nodeValue != b && (a.nodeValue = b) : (g = document.createTextNode(b), a && (a.parentNode && a.parentNode.replaceChild(g, a), Q(a, !0))), g.__preactattr_ = !0, g;
  }
  f = b.nodeName;
  if ("function" === typeof f) {
    h = a;
    var k = b;
    g = b = h && h.s;
    var n = h, m = b && h.Y === k.nodeName, p = m;
    for (a = Ja(k); b && !p && (b = b.la);) {
      p = b.constructor === k.nodeName;
    }
    b && p && (!d || b.s) ? (Ta(b, a, 3, c, d), h = b.B) : (g && !m && (Ua(g), h = n = null), b = Va(k.nodeName, a, c), h && !b.H && (b.H = h, n = null), Ta(b, a, 1, c, d), h = b.B, n && h !== n && (n.s = null, Q(n, !1)));
    return h;
  }
  P = "svg" === f ? !0 : "foreignObject" === f ? !1 : P;
  f = String(f);
  if (!a || a.wa !== f && a.nodeName.toLowerCase() !== f.toLowerCase()) {
    if (g = f, f = P ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g), f.wa = g, g = f, a) {
      for (; a.firstChild;) {
        g.appendChild(a.firstChild);
      }
      a.parentNode && a.parentNode.replaceChild(g, a);
      Q(a, !0);
    }
  }
  var l = g.firstChild;
  a = g.__preactattr_;
  f = b.children;
  if (null == a) {
    a = g.__preactattr_ = {};
    for (var t = g.attributes, C = t.length; C--;) {
      a[t[C].name] = t[C].value;
    }
  }
  if (!Pa && f && 1 === f.length && "string" === typeof f[0] && null != l && void 0 !== l.splitText && null == l.nextSibling) {
    l.nodeValue != f[0] && (l.nodeValue = f[0]);
  } else {
    if (f && f.length || null != l) {
      l = g;
      t = Pa || null != a.Pa;
      C = l.childNodes;
      var F = [], A = {}, w = 0, v = 0, u = C.length, U = 0, Ha = f ? f.length : 0;
      if (0 !== u) {
        for (p = 0; p < u; p++) {
          var x = C[p], N = x.__preactattr_;
          var B = Ha && N ? x.s ? x.s.ia : N.key : null;
          if (null != B) {
            w++, A[B] = x;
          } else {
            if (N || (void 0 !== x.splitText ? t ? x.nodeValue.trim() : 1 : t)) {
              F[U++] = x;
            }
          }
        }
      }
      if (0 !== Ha) {
        for (p = 0; p < Ha; p++) {
          u = f[p];
          m = null;
          B = u.key;
          if (null != B) {
            w && void 0 !== A[B] && (m = A[B], A[B] = void 0, w--);
          } else {
            if (v < U) {
              for (B = v; B < U; B++) {
                if (x = void 0 !== F[B]) {
                  if (x = n = F[B], "string" === typeof u || "number" === typeof u) {
                    x = void 0 !== x.splitText;
                  } else {
                    if ("string" === typeof u.nodeName) {
                      if (N = !x.Y) {
                        N = u.nodeName, N = x.wa === N || x.nodeName.toLowerCase() === N.toLowerCase();
                      }
                      x = N;
                    } else {
                      x = t || x.Y === u.nodeName;
                    }
                  }
                }
                if (x) {
                  m = n;
                  F[B] = void 0;
                  B === U - 1 && U--;
                  B === v && v++;
                  break;
                }
              }
            }
          }
          m = Sa(m, u, c, d);
          u = C[p];
          m && m !== l && m !== u && (null == u ? l.appendChild(m) : m === u.nextSibling ? Ka(u) : l.insertBefore(m, u));
        }
      }
      if (w) {
        for (p in A) {
          void 0 !== A[p] && Q(A[p], !1);
        }
      }
      for (; v <= U;) {
        void 0 !== (m = F[U--]) && Q(m, !1);
      }
    }
  }
  c = g;
  d = b.attributes;
  b = a;
  for (k in b) {
    d && null != d[k] || null == b[k] || La(c, k, b[k], b[k] = void 0);
  }
  for (k in d) {
    "children" === k || "innerHTML" === k || k in b && d[k] === ("value" === k || "checked" === k ? c[k] : b[k]) || La(c, k, b[k], b[k] = d[k]);
  }
  P = h;
  return g;
}
function Q(a, b) {
  var c = a.s;
  c ? Ua(c) : (null != a.__preactattr_ && O(a.__preactattr_.V, null), !1 !== b && null != a.__preactattr_ || Ka(a), Wa(a));
}
function Wa(a) {
  for (a = a.lastChild; a;) {
    var b = a.previousSibling;
    Q(a, !0);
    a = b;
  }
}
var Xa = [];
function Va(a, b, c) {
  var d = Xa.length;
  if (a.prototype && a.prototype.i) {
    var f = new a(b, c);
    R.call(f, b, c);
  } else {
    f = new R(b, c), f.constructor = a, f.i = Ya;
  }
  for (; d--;) {
    if (Xa[d].constructor === a) {
      f.H = Xa[d].H;
      Xa.splice(d, 1);
      break;
    }
  }
  return f;
}
function Ya(a, b, c) {
  return this.constructor(a, c);
}
function Ta(a, b, c, d, f) {
  a.N || (a.N = !0, a.ja = b.V, a.ia = b.key, delete b.V, delete b.key, "undefined" === typeof a.constructor.ua && (!a.B || f ? a.qa && a.qa() : a.Ea && a.Ea(b, d)), d && d !== a.context && (a.da || (a.da = a.context), a.context = d), a.ea || (a.ea = a.c), a.c = b, a.N = !1, 0 !== c && (1 !== c && !1 === J.Ya && a.B ? Fa(a) : Ia(a, 1, f)), O(a.ja, a));
}
function Ia(a, b, c, d) {
  if (!a.N) {
    var f = a.c, g = a.state, h = a.context, k = a.ea || f, n = a.fa || g, m = a.da || h, p = a.B, l = a.H, t = p || l, C = a.s, F = !1, A = m, w;
    a.constructor.ua && (g = M(M({}, g), a.constructor.ua(f, g)), a.state = g);
    p && (a.c = k, a.state = n, a.context = m, 2 !== b && a.K && !1 === a.K(f, g, h) ? F = !0 : a.ra && a.ra(f, g, h), a.c = f, a.state = g, a.context = h);
    a.ea = a.fa = a.da = a.H = null;
    a.M = !1;
    if (!F) {
      f = a.i(f, g, h);
      a.aa && (h = M(M({}, h), a.aa()));
      p && a.Ha && (A = a.Ha(k, n));
      g = f && f.nodeName;
      if ("function" === typeof g) {
        var v = Ja(f);
        if ((w = C) && w.constructor === g && v.key == w.ia) {
          Ta(w, v, 1, h, !1);
        } else {
          var u = w;
          a.s = w = Va(g, v, h);
          w.H = w.H || l;
          w.la = a;
          Ta(w, v, 0, h, !1);
          Ia(w, 1, c, !0);
        }
        v = w.B;
      } else {
        l = t;
        if (u = C) {
          l = a.s = null;
        }
        if (t || 1 === b) {
          l && (l.s = null), v = Ra(l, f, h, c || !p, t && t.parentNode, !0);
        }
      }
      t && v !== t && w !== C && (h = t.parentNode) && v !== h && (h.replaceChild(v, t), u || (t.s = null, Q(t, !1)));
      u && Ua(u);
      if ((a.B = v) && !d) {
        for (u = t = a; u = u.la;) {
          (t = u).B = v;
        }
        v.s = t;
        v.Y = t.constructor;
      }
    }
    !p || c ? Na.push(a) : F || (a.pa && a.pa(k, n, A), J.Ba && J.Ba(a));
    for (; a.O.length;) {
      a.O.pop().call(a);
    }
    Oa || d || Qa();
  }
}
function Ua(a) {
  J.Ca && J.Ca(a);
  var b = a.B;
  a.N = !0;
  a.Z && a.Z();
  a.B = null;
  var c = a.s;
  c ? Ua(c) : b && (null != b.__preactattr_ && O(b.__preactattr_.V, null), a.H = b, Ka(b), Xa.push(a), Wa(b));
  O(a.ja, null);
}
function R(a, b) {
  this.M = !0;
  this.context = b;
  this.c = a;
  this.state = this.state || {};
  this.O = [];
}
M(R.prototype, {b:function(a, b) {
  this.fa || (this.fa = this.state);
  this.state = M(M({}, this.state), "function" === typeof a ? a(this.state, this.c) : a);
  b && this.O.push(b);
  Fa(this);
}, Fa:function(a) {
  a && this.O.push(a);
  Ia(this, 2);
}, i:function() {
}});
var Za = {};
function $a(a, b) {
  return a.U < b.U ? 1 : a.U > b.U ? -1 : a.index - b.index;
}
function ab(a, b) {
  try {
    return a.index = b, a.U = a.attributes.default ? 0 : bb(a.attributes.path).map(cb).join(""), a.attributes;
  } catch (c) {
    return !1;
  }
}
function bb(a) {
  return a.replace(/(^\/+|\/+$)/g, "").split("/");
}
function cb(a) {
  return ":" == a.charAt(0) ? 1 + "*+?".indexOf(a.charAt(a.length - 1)) || 4 : 5;
}
;var S = null, T = [], db = [];
function eb() {
  var a;
  S && S.location ? a = S.location : S && S.Ga ? a = S.Ga() : a = "undefined" !== typeof location ? location : {};
  return "" + (a.pathname || "") + (a.search || "");
}
function fb(a) {
  for (var b = !1, c = 0; c < T.length; c++) {
    !0 === gb(T[c], a) && (b = !0);
  }
  for (c = db.length; c--;) {
    db[c](a);
  }
  return b;
}
function hb(a) {
  if (a && a.getAttribute) {
    var b = a.getAttribute("href");
    a = a.getAttribute("target");
    if (b && b.match(/^\//g) && (!a || a.match(/^_?self$/i))) {
      var c = void 0 === c ? !1 : c;
      "string" !== typeof b && b.url && (c = b.replace, b = b.url);
      a: {
        a = b;
        for (var d = T.length; d--;) {
          if (0 < ib(T[d].c.children, a, !1).length) {
            a = !0;
            break a;
          }
        }
        a = !1;
      }
      if (a) {
        if (a = b, c = c ? "replace" : "push", c = void 0 === c ? "push" : c, S && S[c]) {
          S[c](a);
        } else {
          if ("undefined" !== typeof history && history[c + "State"]) {
            history[c + "State"](null, null, a);
          }
        }
      }
      return fb(b);
    }
  }
}
function jb(a) {
  if (0 == a.button) {
    return hb(a.currentTarget || a.target || this), kb(a);
  }
}
function kb(a) {
  a && (a.stopImmediatePropagation && a.stopImmediatePropagation(), a.stopPropagation && a.stopPropagation(), a.preventDefault());
  return !1;
}
function lb(a) {
  if (!(a.ctrlKey || a.metaKey || a.altKey || a.shiftKey || 0 !== a.button)) {
    var b = a.target;
    do {
      var c;
      if (c = "A" === String(b.nodeName).toUpperCase() && b.getAttribute("href")) {
        c = b, ca(), ca(), c = null != c.__preactattr_ || "undefined" !== typeof Symbol && null != c[Symbol.for("preactattr")];
      }
      if (c) {
        if (b.hasAttribute("native")) {
          break;
        }
        if (hb(b)) {
          return kb(a);
        }
      }
    } while (b = b.parentNode);
  }
}
var mb = !1;
function nb() {
  mb || ("function" === typeof addEventListener && (S || addEventListener("popstate", function() {
    fb(eb());
  }), addEventListener("click", lb)), mb = !0);
}
function ob(a) {
  R.call(this, a);
  a.history && (S = a.history);
  this.state = {url:a.url || eb()};
  nb();
}
y(ob, R);
e = ob.prototype;
e.K = function(a) {
  return !0 !== a.Wa ? !0 : a.url !== this.c.url || a.j !== this.c.j;
};
function gb(a, b) {
  a.a = !1;
  a.b({url:b});
  if (a.updating) {
    return 0 < ib(a.c.children, b, !1).length;
  }
  a.Fa();
  return a.a;
}
e.qa = function() {
  T.push(this);
  this.updating = !0;
};
e.w = function() {
  var a = this;
  S && (this.f = S.Sa(function(b) {
    gb(a, "" + (b.pathname || "") + (b.search || ""));
  }));
  this.updating = !1;
};
e.Z = function() {
  "function" === typeof this.f && this.f();
  T.splice(T.indexOf(this), 1);
};
e.ra = function() {
  this.updating = !0;
};
e.pa = function() {
  this.updating = !1;
};
function ib(a, b, c) {
  return a.filter(ab).sort($a).map(function(a) {
    var d = b;
    var g = a.attributes.path, h = a.attributes, k = /(?:\?([^#]*))?(#.*)?$/, n = d.match(k), m = {};
    if (n && n[1]) {
      n = n[1].split("&");
      for (var p = 0; p < n.length; p++) {
        var l = n[p].split("=");
        m[decodeURIComponent(l[0])] = decodeURIComponent(l.slice(1).join("="));
      }
    }
    d = bb(d.replace(k, ""));
    g = bb(g || "");
    k = Math.max(d.length, g.length);
    for (n = 0; n < k; n++) {
      if (g[n] && ":" === g[n].charAt(0)) {
        p = g[n].replace(/(^:|[+*?]+$)/g, "");
        l = (g[n].match(/[+*?]+$/) || Za)[0] || "";
        var t = ~l.indexOf("+"), C = ~l.indexOf("*"), F = d[n] || "";
        if (!F && !C && (0 > l.indexOf("?") || t)) {
          var A = !1;
          break;
        }
        m[p] = decodeURIComponent(F);
        if (t || C) {
          m[p] = d.slice(n).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (g[n] !== d[n]) {
          A = !1;
          break;
        }
      }
    }
    if (d = !0 !== h.default && !1 === A ? !1 : m) {
      return !1 !== c ? (d = Object.assign({}, {url:b, matches:d}, d), delete d.V, delete d.key, Ca(a, d)) : a;
    }
  }).filter(Boolean);
}
e.i = function(a, b) {
  var c = a.j;
  b = b.url;
  a = ib(a.children, b, !0);
  var d = a[0] || null;
  this.a = !!d;
  var f = this.h;
  b !== f && (this.h = b, "function" === typeof c && c({Va:this, url:b, Ua:f, active:a, current:d}));
  return d;
};
function pb(a) {
  return L("a", Object.assign({}, a, {onClick:jb}));
}
function qb() {
  R.call(this);
  this.a = this.a.bind(this);
}
y(qb, R);
qb.prototype.a = function(a) {
  this.f = a;
  this.b({});
};
qb.prototype.w = function() {
  db.push(this.a);
};
qb.prototype.Z = function() {
  db.splice(db.indexOf(this.a) >>> 0, 1);
};
qb.prototype.i = function(a) {
  var b = this.f || eb(), c = b.replace(/\?.+$/, "");
  this.f = null;
  var d = a.children.filter(function(a) {
    return "function" == typeof a;
  });
  return d[0] && d[0]({url:b, path:c, matches:c === a.path});
};
function V(a) {
  var b = Object.assign({}, a), c = void 0 === a.ma ? "active" : a.ma;
  a = a.path;
  var d = (delete b.ma, delete b.path, b);
  return L(qb, {path:a || d.href}, function(a) {
    return L(pb, Object.assign({}, d, {className:[d.Oa || d.className, a.matches && c].filter(Boolean).join(" ")}));
  });
}
;function rb(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return L("div", Object.assign({}, b, {className:"row" + (a ? " " + a : "")}), c);
}
function W(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return L("div", Object.assign({}, b, {className:"col" + (a ? " " + a : "")}), c);
}
function sb(a) {
  var b = a.W, c = a.type, d = a.value;
  a = {required:a.required, name:a.name, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), id:a.id, "aria-describedby":a.C};
  return b ? L("textarea", Object.assign({}, a, {rows:"number" == typeof b ? b : 3}), d) : L("input", Object.assign({}, a, d ? {value:d} : {}, {type:c}));
}
function X(a) {
  var b = a.label, c = void 0 === a.type ? "text" : a.type, d = a.placeholder, f = a.v, g = a.W, h = a.file, k = a.options, n = a.Ka, m = "i" + 100000 * Math.random(), p = "h" + m;
  a = {C:p, id:m, value:a.value, name:a.name, required:a.required};
  c = k ? L(tb, Object.assign({}, a, {options:k, Ka:n})) : L(sb, Object.assign({}, a, {W:g, placeholder:d, type:c, file:h}));
  return L("div", {className:"form-group"}, L("label", {htmlFor:m}, b), c, f && L("small", {id:p, dangerouslySetInnerHTML:{X:f}, className:"form-text text-muted"}));
}
function tb(a) {
  var b = a.options, c = a.value;
  return L("select", {name:a.name, value:c, required:a.required, className:"custom-select", id:a.id, "aria-describedby":a.C}, L("option"), b.map(function(a) {
    var b = a.value;
    return L("option", {key:b, value:b, selected:b == c}, a.title);
  }));
}
function ub(a) {
  return L("span", {}, L("i", {className:a.icon}), " ");
}
;function vb() {
  return L("nav", {className:"nav flex-column"}, L(V, {className:"nav-link", href:"/admin"}, L("i", {className:"fab fa-kickstarter-k"}), " Главная"), L(V, {className:"nav-link", href:"/admin/objects"}, L("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), L(V, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, L("i", {className:"fas fa-home"}), " Новая Недвижимость"), L(V, {className:"nav-link", href:"/admin/categories"}, L("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), L(V, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, L("i", {className:"fas fa-folder-plus"}), " Добавить"), L(V, {className:"nav-link", href:"/admin/pages"}, L("i", {className:"fas fa-font"}), " Статьи"), L(V, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, L("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), L(V, {className:"nav-link", href:"/admin/special"}, L("i", {className:"fas fa-bolt"}), " Специальные Предложения"), 
  L(V, {className:"nav-link", href:"/admin/offers"}, L("i", {className:"fas fa-grip-lines"}), " Акции"));
}
;function Y(a, b) {
  return b = b || {}, new Promise(function(c, d) {
    function f() {
      var a, b = [], c = [], d = {};
      return g.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(f, g, h) {
        b.push(g = g.toLowerCase());
        c.push([g, h]);
        d[g] = (a = d[g]) ? a + "," + h : h;
      }), {ok:2 == (g.status / 100 | 0), status:g.status, statusText:g.statusText, url:g.responseURL, clone:f, text:function() {
        return Promise.resolve(g.responseText);
      }, json:function() {
        return Promise.resolve(g.responseText).then(JSON.parse);
      }, blob:function() {
        return Promise.resolve(new Blob([g.response]));
      }, headers:{keys:function() {
        return b;
      }, entries:function() {
        return c;
      }, get:function(a) {
        return d[a.toLowerCase()];
      }, has:function(a) {
        return a.toLowerCase() in d;
      }}};
    }
    var g = new XMLHttpRequest, h;
    for (h in g.open(b.method || "get", a, !0), b.headers) {
      g.setRequestHeader(h, b.headers[h]);
    }
    g.withCredentials = "include" == b.credentials;
    g.onload = function() {
      c(f());
    };
    g.onerror = d;
    g.send(b.body || null);
  });
}
;function wb() {
  R.call(this);
  this.state = {g:!1};
}
y(wb, R);
function xb(a) {
  var b, c, d, f;
  return I(function(g) {
    switch(g.f) {
      case 1:
        return a.b({g:!0}), D(g, 2, 3), z(g, fetch("/admin-data?" + a.c.path, {method:"POST"}), 5);
      case 5:
        return b = g.a, z(g, b.json(), 6);
      case 6:
        c = g.a, (d = c.error) ? a.b({error:d}) : (a.c.T(), a.c.ba());
      case 3:
        G(g);
        a.b({g:!1});
        H(g, 0);
        break;
      case 2:
        f = E(g), a.b({error:f}), g.m(3);
    }
  });
}
wb.prototype.i = function() {
  var a = this, b = this.c, c = b.text, d = b.T, f = void 0 === b.P ? "primary" : b.P, g = b.$, h = void 0 === b.Da ? "Отмена" : b.Da;
  return L("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, L("div", {className:"modal-dialog", role:"document"}, L("div", {className:"modal-content"}, L("div", {className:"modal-header"}, L("h5", {className:"modal-title"}, b.title), L("button", {onClick:d, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, L("span", {"aria-hidden":"true"}, "×"))), L("div", {className:"modal-body"}, L("p", {}, c)), L("div", {className:"modal-footer"}, 
  L("button", {onClick:d, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, h), L("button", {disabled:this.state.g, type:"button", className:"btn btn-" + f, onClick:function() {
    return xb(a);
  }}, this.state.g ? "Отправка..." : g)))));
};
function yb() {
  R.call(this);
  this.state = {g:!1, data:[]};
}
y(yb, R);
yb.prototype.w = function() {
  var a = this;
  return I(function(b) {
    return z(b, a.load(), 0);
  });
};
yb.prototype.load = function() {
  var a = this, b, c, d, f, g;
  return I(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), D(h, 2, 3), z(h, Y("/admin-data?categories"), 5);
      case 5:
        return b = h.a, z(h, b.json(), 6);
      case 6:
        c = h.a, d = c.error, f = c.data, d ? a.b({error:d}) : a.b({data:f});
      case 3:
        G(h);
        a.b({g:!1});
        H(h, 0);
        break;
      case 2:
        g = E(h), a.b({error:g}), h.m(3);
    }
  });
};
yb.prototype.i = function() {
  var a = this;
  return L(W, {}, L("h1", {}, "Категории Каталога"), L("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), this.state.g && L("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return L(zb, Object.assign({}, c, {key:b, id:b, J:function() {
      return a.load();
    }}));
  }));
};
function zb() {
  R.call(this);
  this.state = {o:null};
}
y(zb, R);
zb.prototype.i = function() {
  var a = this, b = this.c, c = b.title, d = b.description, f = b.seo, g = b.id, h = b.J;
  return L(rb, {className:"CategoryRow"}, L(W, {className:"col-3 col-sm-4 "}, L("img", {src:b.image, className:"img-fluid p-1"})), L(W, {}, L("h2", {}, c), L("em", {}, "knedv.ru/", f), L("p", {}, d)), L(W, {className:"col-1 CategoryMeta"}, L("a", {href:"/admin/add-category/" + g, style:"color:brown;"}, L(ub, {icon:"fas fa-pen"})), L("br"), L("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:L("span", {}, "Вы действительно хотите удалить категорию ", L("strong", {}, c), "?"), $:"Удалить", title:"Удаление Категории", path:"categories&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, L(ub, {icon:"far fa-trash-alt"}))), this.state.o && L(wb, Object.assign({}, this.state.o, {T:function() {
    a.b({o:null});
  }, P:"danger", ba:h})));
};
function Ab() {
  R.call(this);
  this.c = this.c;
}
y(Ab, R);
Ab.prototype.K = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Ab.prototype.w = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.j;
  c && void 0 !== b && c(a, b);
};
Ab.prototype.i = function(a) {
  var b = a.options, c = a.name, d = a.value, f = this.context, g = f.j, h = void 0 === f.values ? {} : f.values;
  return L("select", {name:c, value:c in h ? h[c] : d, required:a.required, className:"custom-select", id:f.id, "aria-describedby":f.C, onChange:function(a) {
    g(c, a.currentTarget.value);
  }}, L("option"), b.map(function(a) {
    var b = a.value;
    return L("option", {key:b, value:b, selected:b == d}, a.title);
  }));
};
function Bb() {
  R.call(this);
  this.c = this.c;
}
y(Bb, R);
Bb.prototype.K = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Bb.prototype.w = function() {
  var a = this.c, b = r(a.children).next().value;
  a = a.name;
  var c = this.context.j;
  b && c(a, b.trim());
};
Bb.prototype.i = function(a) {
  var b = a.name, c = a.children, d = this.context, f = d.j, g = void 0 === d.values ? {} : d.values;
  return L("textarea", {required:a.required, name:b, placeholder:a.placeholder, "aria-describedby":d.C, className:"form-control", id:d.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }, rows:void 0 === a.rows ? 3 : a.rows}, b in g ? g[b] : c);
};
function Cb() {
  R.call(this);
  this.c = this.c;
}
y(Cb, R);
Cb.prototype.K = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Cb.prototype.w = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.j;
  void 0 !== b && c(a, b);
};
Cb.prototype.i = function(a) {
  var b = a.name, c = a.value, d = this.context, f = d.j, g = void 0 === d.values ? {} : d.values;
  return L("input", {required:a.required, name:b, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), value:b in g ? g[b] : c, type:void 0 === a.type ? "text" : a.type, "aria-describedby":d.C, id:d.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }});
};
function Db() {
  R.call(this);
  this.state = {values:{}};
  this.c = this.c;
}
y(Db, R);
Db.prototype.aa = function() {
  return {values:this.state.values, j:this.j.bind(this)};
};
Db.prototype.j = function(a, b) {
  var c = {};
  this.b({values:Object.assign({}, this.state.values, (c[a] = b, c))});
  this.c.j && this.c.j(this.state.values);
};
Db.prototype.i = function(a) {
  var b = Object.assign({}, a), c = a.children, d = a.ta;
  a = a.xa;
  b = (delete b.children, delete b.ta, delete b.xa, b);
  return L("form", Object.assign({}, b, {ref:d, onSubmit:a}), c);
};
function Z() {
  R.call(this);
  this.id = "i" + Math.floor(100000 * Math.random());
  this.C = "h" + this.id;
  this.c = this.c;
}
y(Z, R);
Z.prototype.aa = function() {
  return {id:this.id, C:this.C};
};
Z.prototype.i = function() {
  var a = this.c, b = a.children, c = a.label;
  a = a.v;
  return L("div", {className:"form-group"}, c && L("label", {htmlFor:this.id}, c), b, a && L("small", {id:this.C, dangerouslySetInnerHTML:{X:a}, className:"form-text text-muted"}));
};
var Eb = {get Na() {
  return Ab;
}, get ya() {
  return Bb;
}, get ha() {
  return Cb;
}};
function Fb(a) {
  var b = a.article, c = a.ca;
  return L("div", {className:"form-group"}, L("label", {}, "Статья"), L("div", {dangerouslySetInnerHTML:{X:b}, style:"background: #edeee8;", className:"mb-3"}), L("a", {onClick:function(a) {
    a.preventDefault();
    window.editorCallback = function(a) {
      d.close();
      c(a);
    };
    window.editorGetData = function() {
      return b;
    };
    var d = Gb();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"));
}
function Gb() {
  var a = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (a.outerHeight / 2 + a.screenY - 325 - 50) + ",left=" + (a.outerWidth / 2 + a.screenX - 450));
}
;function Hb() {
  R.call(this);
  this.state = {g:!1, data:{}, hint:"москва-новостройки", article:""};
}
y(Hb, R);
Hb.prototype.w = function() {
  var a = this, b, c, d, f, g, h, k, n;
  return I(function(m) {
    switch(m.f) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return m.return();
        }
        a.b({D:1, g:!0});
        D(m, 2, 3);
        return z(m, Y("/admin-data?categories&id=" + a.c.id), 5);
      case 5:
        return c = m.a, z(m, c.json(), 6);
      case 6:
        d = m.a, f = d.error, g = d.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, hint:k.seo, article:k.article}));
      case 3:
        G(m);
        a.b({g:!1});
        H(m, 0);
        break;
      case 2:
        n = E(m), a.b({error:n}), m.m(3);
    }
  });
};
Hb.prototype.a = function(a) {
  var b = this, c, d, f, g, h;
  return I(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({A:!0}), D(k, 2, 3), z(k, Y("/admin-data?categories", {method:"POST", body:c}), 5);
      case 5:
        return d = k.a, z(k, d.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({L:1});
      case 3:
        G(k);
        b.b({A:!1});
        H(k, 4);
        break;
      case 2:
        h = E(k);
        b.b({error:h});
        k.m(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Hb.prototype.i = function() {
  var a = this, b = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.", c = this.state, d = c.D;
  c = c.ga;
  return L(W, {}, L("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Категорию"), d && this.state.g && L("span", {className:"echo-loader"}, "Loading…"), !(d && this.state.g) && L(Db, {j:function(a) {
    console.log(a);
    console.log(a.seo);
  }, ta:function(b) {
    a.form = b;
  }, xa:this.a.bind(this)}, L(Z, {label:"Название", v:"Название для меню слева."}, L(Eb.ha, {value:this.state.data.title, name:"title", placeholder:"Москва Новостройки", required:"1"})), L(Z, {v:b, label:"СЕО Название"}, L(Eb.ha, {value:this.state.data.seo, required:"1", name:"seo", placeholder:"москва-новостройки"})), L(Z, {label:"Описание", v:"Краткое описание для главной страницы."}, L(Eb.ya, {rows:"3", required:1, name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  this.state.data.description)), d && !c && L(Z, {label:"Изображение"}, L("br"), L("img", {src:this.state.data.cdnImage, className:"img-fluid"}), L("a", {onClick:function(b) {
    b.preventDefault();
    a.b({ga:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!d || c) && L(X, {name:"image", label:"Изображение", v:"Картинка, отображаемая на главной странице.", file:"1", type:"file", required:"1"}), L(Fb, {article:this.state.article, ca:function(b) {
    a.b({article:b});
  }}), d && L("input", {value:this.c.id, type:"hidden", name:"id"}), L("button", {disabled:this.state.A, type:"submit", className:"btn btn-primary"}, this.state.A ? "Загрузка..." : d ? "Сохранить" : "Добавить"), this.state.error && L("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.L && L("div", {className:"alert alert-success mt-3", role:"alert"}, "Категория успешно ", d ? "сохранена" : "создана", "!")));
};
function Ib() {
  R.call(this);
  this.state = {g:!1, data:[]};
}
y(Ib, R);
Ib.prototype.w = function() {
  var a = this;
  return I(function(b) {
    return z(b, a.load(), 0);
  });
};
Ib.prototype.load = function() {
  var a = this, b, c, d, f, g;
  return I(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), D(h, 2, 3), z(h, Y("/admin-data?objects"), 5);
      case 5:
        return b = h.a, z(h, b.json(), 6);
      case 6:
        c = h.a, d = c.error, f = c.data, d ? a.b({error:d}) : a.b({data:f});
      case 3:
        G(h);
        a.b({g:!1});
        H(h, 0);
        break;
      case 2:
        g = E(h), a.b({error:g}), h.m(3);
    }
  });
};
Ib.prototype.i = function() {
  var a = this;
  return L(W, {}, L("h1", {}, "Объекты Недвижимости"), L("p", {}, "На сайт добалены следующие объекты:"), this.state.g && L("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return L(Jb, Object.assign({}, c, {key:b, id:b, J:function() {
      return a.load();
    }}));
  }));
};
function Jb() {
  R.call(this);
  this.state = {o:null};
}
y(Jb, R);
Jb.prototype.i = function() {
  var a = this, b = this.c, c = b.title, d = b.description, f = b.seo, g = b.id, h = b.J, k = b.categorySeo;
  return L(rb, {className:"CategoryRow"}, L(W, {className:"col-3 col-sm-4 "}, L("img", {src:b.image, className:"img-fluid p-1"})), L(W, {}, L("h2", {}, c), L("em", {}, "knedv.ru/", k, "/", f), L("p", {}, d)), L(W, {className:"col-1 CategoryMeta"}, L("a", {href:"/admin/add-object/" + g, style:"color:brown;"}, L(ub, {icon:"fas fa-pen"})), L("br"), L("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:L("span", {}, "Вы действительно хотите удалить объект ", L("strong", {}, c), "?"), $:"Удалить", title:"Удаление Объекта", path:"objects&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, L(ub, {icon:"far fa-trash-alt"}))), this.state.o && L(wb, Object.assign({}, this.state.o, {T:function() {
    a.b({o:null});
  }, P:"danger", ba:h})));
};
function Kb() {
  R.call(this);
  this.state = {g:!1, data:{}, oa:[], hint:"1-комнатные-апартаменты-воскресенское", na:"апартаменты", article:""};
}
y(Kb, R);
function Lb(a) {
  var b, c, d, f, g, h;
  return I(function(k) {
    switch(k.f) {
      case 1:
        return a.b({g:!0}), D(k, 2, 3), z(k, Y("/admin-data?categories"), 5);
      case 5:
        return b = k.a, z(k, b.json(), 6);
      case 6:
        c = k.a, d = c.error, f = c.data, d ? a.b({error:d}) : (g = f.map(function(a) {
          return {value:a._id, title:a.title};
        }), a.b({oa:g}));
      case 3:
        G(k);
        a.b({g:!1});
        H(k, 0);
        break;
      case 2:
        h = E(k), a.b({error:h}), k.m(3);
    }
  });
}
Kb.prototype.w = function() {
  var a = this, b, c, d, f, g, h, k, n, m, p;
  return I(function(l) {
    switch(l.f) {
      case 1:
        return z(l, Lb(a), 2);
      case 2:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({D:1, g:!0});
        D(l, 3, 4);
        return z(l, Y("/admin-data?objects&id=" + a.c.id), 6);
      case 6:
        return c = l.a, z(l, c.json(), 7);
      case 7:
        d = l.a, f = d.error, g = d.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, hint:k.seo, na:k.categorySeo, article:k.article}));
      case 4:
        G(l);
        a.b({g:!1});
        H(l, 0);
        break;
      case 3:
        m = n = E(l), p = m.message, a.b({error:p}), l.m(4);
    }
  });
};
Kb.prototype.a = function(a) {
  var b = this, c, d, f, g, h;
  return I(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({A:!0}), D(k, 2, 3), z(k, Y("/admin-data?objects", {method:"POST", body:c}), 5);
      case 5:
        return d = k.a, z(k, d.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({L:1});
      case 3:
        G(k);
        b.b({A:!1});
        H(k, 4);
        break;
      case 2:
        h = E(k);
        b.b({error:h});
        k.m(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Kb.prototype.i = function() {
  var a = this, b = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.na + "/<strong>" + this.state.hint + "</strong>.", c = this.state, d = c.D;
  c = c.ga;
  return L(W, {}, L("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Объект"), d && this.state.g && L("span", {className:"echo-loader"}, "Loading…"), !(d && this.state.g) && L("form", {ref:function(b) {
    return a.form = b;
  }, onSubmit:this.a.bind(this)}, L(X, Object.assign({}, d ? {value:this.state.data.title} : {}, {name:"title", placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское", label:"Название", v:"Название для каталога недвижимости.", required:"1"})), L(X, Object.assign({}, d ? {value:this.state.data.seo} : {}, {v:b, name:"seo", placeholder:"1-комнатные-апартаменты-воскресенское", label:"СЕО Название", required:"1"})), L(X, {W:10, name:"description", placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично).", 
  label:"Описание", v:"Описание объекта.", value:this.state.data.description, required:"1"}), d && !c && L("div", {className:"form-group"}, L("label", {}, "Изображение"), L("br"), L("img", {src:this.state.data.cdnImage, className:"img-fluid"}), L("a", {onClick:function(b) {
    b.preventDefault();
    a.b({ga:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!d || c) && L(X, {name:"image", label:"Изображение", v:"Картинка, отображаемая на главной странице.", file:"1", type:"file", required:"1"}), L(Fb, {article:this.state.article, ca:function(b) {
    a.b({article:b});
  }}), d && L("input", {value:this.c.id, type:"hidden", name:"id"}), L(X, {options:this.state.oa, name:"category", label:"Раздел", v:"Категория в каталоге", value:this.state.data.category, required:"1"}), L("button", {disabled:this.state.A, type:"submit", className:"btn btn-primary"}, this.state.A ? "Загрузка..." : d ? "Сохранить" : "Добавить"), this.state.error && L("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.L && L("div", {className:"alert alert-success mt-3", 
  role:"alert"}, "Объект успешно ", d ? "сохранен" : "создан", "!")));
};
function Mb() {
  R.call(this);
  this.state = {g:!1, data:[]};
}
y(Mb, R);
Mb.prototype.w = function() {
  var a = this;
  return I(function(b) {
    return z(b, a.load(), 0);
  });
};
Mb.prototype.load = function() {
  var a = this, b, c, d, f, g;
  return I(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), D(h, 2, 3), z(h, Y("/admin-data?pages"), 5);
      case 5:
        return b = h.a, z(h, b.json(), 6);
      case 6:
        c = h.a, d = c.error, f = c.data, d ? a.b({error:d}) : a.b({data:f});
      case 3:
        G(h);
        a.b({g:!1});
        H(h, 0);
        break;
      case 2:
        g = E(h), a.b({error:g}), h.m(3);
    }
  });
};
Mb.prototype.i = function() {
  var a = this;
  return L(W, {}, L("h1", {}, "Материалы Сайта"), L("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.g && L("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return L(Nb, Object.assign({}, c, {key:b, id:b, J:function() {
      return a.load();
    }}));
  }));
};
function Nb() {
  R.call(this);
  this.state = {o:null};
}
y(Nb, R);
Nb.prototype.i = function() {
  var a = this, b = this.c, c = b.seo, d = b.id, f = b.description, g = b.J, h = b.title;
  return L(rb, {className:"CategoryRow"}, L(W, {}, L("h2", {}, h), L("em", {}, "knedv.ru/", c), L("p", {}, f)), L(W, {className:"col-1 CategoryMeta"}, L("a", {href:"/admin/add-page/" + d, style:"color:brown;"}, L(ub, {icon:"fas fa-pen"})), L("br"), L("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:L("span", {}, "Вы действительно хотите удалить страницу ", L("strong", {}, h), "?"), $:"Удалить", title:"Удаление Страницы", path:"pages&id=" + d + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, L(ub, {icon:"far fa-trash-alt"}))), this.state.o && L(wb, Object.assign({}, this.state.o, {T:function() {
    a.b({o:null});
  }, P:"danger", ba:g})));
};
function Ob() {
  R.call(this);
  this.state = {g:!1, data:{}, article:""};
}
y(Ob, R);
Ob.prototype.w = function() {
  var a = this, b, c, d, f, g, h, k, n, m, p;
  return I(function(l) {
    switch(l.f) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({D:1, g:!0});
        D(l, 2, 3);
        return z(l, Y("/admin-data?pages&id=" + a.c.id), 5);
      case 5:
        return c = l.a, z(l, c.json(), 6);
      case 6:
        d = l.a, f = d.error, g = d.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, article:k.article}));
      case 3:
        G(l);
        a.b({g:!1});
        H(l, 0);
        break;
      case 2:
        m = n = E(l), p = m.message, a.b({error:p}), l.m(3);
    }
  });
};
Ob.prototype.a = function(a) {
  var b = this, c, d, f, g, h;
  return I(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({A:!0}), D(k, 2, 3), z(k, Y("/admin-data?pages", {method:"POST", body:c}), 5);
      case 5:
        return d = k.a, z(k, d.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({L:1});
      case 3:
        G(k);
        b.b({A:!1});
        H(k, 4);
        break;
      case 2:
        h = E(k);
        b.b({error:h});
        k.m(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Ob.prototype.i = function() {
  var a = this, b = this.state.D;
  return L(W, {}, L("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Страницу"), b && this.state.g && L("span", {className:"echo-loader"}, "Loading…"), !(b && this.state.g) && L("form", {ref:function(b) {
    return a.form = b;
  }, onSubmit:this.a.bind(this)}, L(X, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", v:"Название для администратора.", required:"1"}), L(X, {v:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), L(X, {W:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", v:"Описание страницы.", value:this.state.data.description, required:"1"}), L(Fb, 
  {article:this.state.article, ca:function(b) {
    a.b({article:b});
  }}), b && L("input", {value:this.c.id, type:"hidden", name:"id"}), L("button", {disabled:this.state.A, type:"submit", className:"btn btn-primary"}, this.state.A ? "Загрузка..." : b ? "Сохранить" : "Добавить"), this.state.error && L("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.L && L("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", b ? "сохранена" : "создана", "!")));
};
function Pb() {
  return L(W, {}, L("h1", {}, "Добро Пожаловать!"));
}
;var Qb = L(function() {
  return L(rb, {id:"App"}, L(W, {className:"col-md-4"}, L(vb)), L(ob, {j:function(a) {
    a.current && a.current.attributes.title && (document.title = a.current.attributes.title);
  }}, L(Pb, {path:"/admin", title:"Главная"}), L(Ib, {path:"/admin/objects", title:"Объекты Недвижимости"}), L(Kb, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), L(yb, {path:"/admin/categories", title:"Категории Каталога"}), L(Hb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), L(Mb, {path:"/admin/pages", title:"Статьи"}), L(Ob, {path:"/admin/add-page/:id?", title:"Добавить Страницу"})));
});
Ra(document.querySelector("#App"), Qb, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map