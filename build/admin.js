var d;
function aa(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
}, p = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function ca() {
  ca = function() {
  };
  p.Symbol || (p.Symbol = da);
}
var da = function() {
  var a = 0;
  return function(b) {
    return "jscomp_symbol_" + (b || "") + a++;
  };
}();
function ea() {
  ca();
  var a = p.Symbol.iterator;
  a || (a = p.Symbol.iterator = p.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && ba(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return fa(aa(this));
  }});
  ea = function() {
  };
}
function fa(a) {
  ea();
  a = {next:a};
  a[p.Symbol.iterator] = function() {
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
    var ka = {Ga:!0}, la = {};
    try {
      la.__proto__ = ka;
      ja = la.Ga;
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
function v(a, b) {
  a.prototype = ha(b.prototype);
  a.prototype.constructor = a;
  if (ma) {
    ma(a, b);
  } else {
    for (var c in b) {
      if ("prototype" != c) {
        if (Object.defineProperties) {
          var e = Object.getOwnPropertyDescriptor(b, c);
          e && Object.defineProperty(a, c, e);
        } else {
          a[c] = b[c];
        }
      }
    }
  }
  a.cb = b.prototype;
}
function na(a, b) {
  if (b) {
    var c = p;
    a = a.split(".");
    for (var e = 0; e < a.length - 1; e++) {
      var f = a[e];
      f in c || (c[f] = {});
      c = c[f];
    }
    a = a[a.length - 1];
    e = c[a];
    b = b(e);
    b != e && null != b && ba(c, a, {configurable:!0, writable:!0, value:b});
  }
}
na("Promise", function(a) {
  function b(a) {
    this.g = 0;
    this.A = void 0;
    this.a = [];
    var b = this.j();
    try {
      a(b.resolve, b.reject);
    } catch (n) {
      b.reject(n);
    }
  }
  function c() {
    this.a = null;
  }
  function e(a) {
    return a instanceof b ? a : new b(function(b) {
      b(a);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.g = function(a) {
    if (null == this.a) {
      this.a = [];
      var b = this;
      this.j(function() {
        b.A();
      });
    }
    this.a.push(a);
  };
  var f = p.setTimeout;
  c.prototype.j = function(a) {
    f(a, 0);
  };
  c.prototype.A = function() {
    for (; this.a && this.a.length;) {
      var a = this.a;
      this.a = [];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        a[b] = null;
        try {
          c();
        } catch (m) {
          this.v(m);
        }
      }
    }
    this.a = null;
  };
  c.prototype.v = function(a) {
    this.j(function() {
      throw a;
    });
  };
  b.prototype.j = function() {
    function a(a) {
      return function(e) {
        c || (c = !0, a.call(b, e));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.Oa), reject:a(this.v)};
  };
  b.prototype.Oa = function(a) {
    if (a === this) {
      this.v(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof b) {
        this.Pa(a);
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
        c ? this.$(a) : this.L(a);
      }
    }
  };
  b.prototype.$ = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (n) {
      this.v(n);
      return;
    }
    "function" == typeof b ? this.Ra(b, a) : this.L(a);
  };
  b.prototype.v = function(a) {
    this.M(2, a);
  };
  b.prototype.L = function(a) {
    this.M(1, a);
  };
  b.prototype.M = function(a, b) {
    if (0 != this.g) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.g);
    }
    this.g = a;
    this.A = b;
    this.T();
  };
  b.prototype.T = function() {
    if (null != this.a) {
      for (var a = 0; a < this.a.length; ++a) {
        g.g(this.a[a]);
      }
      this.a = null;
    }
  };
  var g = new c;
  b.prototype.Pa = function(a) {
    var b = this.j();
    a.Z(b.resolve, b.reject);
  };
  b.prototype.Ra = function(a, b) {
    var c = this.j();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (m) {
      c.reject(m);
    }
  };
  b.prototype.then = function(a, c) {
    function e(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          f(a(b));
        } catch (D) {
          g(D);
        }
      } : b;
    }
    var f, g, h = new b(function(a, b) {
      f = a;
      g = b;
    });
    this.Z(e(a, f), e(c, g));
    return h;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.Z = function(a, b) {
    function c() {
      switch(e.g) {
        case 1:
          a(e.A);
          break;
        case 2:
          b(e.A);
          break;
        default:
          throw Error("Unexpected state: " + e.g);
      }
    }
    var e = this;
    null == this.a ? g.g(c) : this.a.push(c);
  };
  b.resolve = e;
  b.reject = function(a) {
    return new b(function(b, c) {
      c(a);
    });
  };
  b.race = function(a) {
    return new b(function(b, c) {
      for (var f = r(a), g = f.next(); !g.done; g = f.next()) {
        e(g.value).Z(b, c);
      }
    });
  };
  b.all = function(a) {
    var c = r(a), f = c.next();
    return f.done ? e([]) : new b(function(a, b) {
      function g(b) {
        return function(c) {
          h[b] = c;
          k--;
          0 == k && a(h);
        };
      }
      var h = [], k = 0;
      do {
        h.push(void 0), k++, e(f.value).Z(g(h.length - 1), b), f = c.next();
      } while (!f.done);
    });
  };
  return b;
});
function oa() {
  this.M = !1;
  this.v = null;
  this.a = void 0;
  this.g = 1;
  this.A = this.L = 0;
  this.$ = this.j = null;
}
function pa(a) {
  if (a.M) {
    throw new TypeError("Generator is already running");
  }
  a.M = !0;
}
oa.prototype.T = function(a) {
  this.a = a;
};
function qa(a, b) {
  a.j = {Aa:b, Da:!0};
  a.g = a.L || a.A;
}
oa.prototype.return = function(a) {
  this.j = {return:a};
  this.g = this.A;
};
function w(a, b, c) {
  a.g = c;
  return {value:b};
}
oa.prototype.m = function(a) {
  this.g = a;
};
function x(a, b, c) {
  a.L = b;
  void 0 != c && (a.A = c);
}
function B(a) {
  a.L = 0;
  var b = a.j.Aa;
  a.j = null;
  return b;
}
function C(a) {
  a.$ = [a.j];
  a.L = 0;
  a.A = 0;
}
function G(a, b) {
  var c = a.$.splice(0)[0];
  (c = a.j = a.j || c) ? c.Da ? a.g = a.L || a.A : void 0 != c.m && a.A < c.m ? (a.g = c.m, a.j = null) : a.g = a.A : a.g = b;
}
function ra(a) {
  this.a = new oa;
  this.g = a;
}
function sa(a, b) {
  pa(a.a);
  var c = a.a.v;
  if (c) {
    return ta(a, "return" in c ? c["return"] : function(a) {
      return {value:a, done:!0};
    }, b, a.a.return);
  }
  a.a.return(b);
  return ua(a);
}
function ta(a, b, c, e) {
  try {
    var f = b.call(a.a.v, c);
    if (!(f instanceof Object)) {
      throw new TypeError("Iterator result " + f + " is not an object");
    }
    if (!f.done) {
      return a.a.M = !1, f;
    }
    var g = f.value;
  } catch (h) {
    return a.a.v = null, qa(a.a, h), ua(a);
  }
  a.a.v = null;
  e.call(a.a, g);
  return ua(a);
}
function ua(a) {
  for (; a.a.g;) {
    try {
      var b = a.g(a.a);
      if (b) {
        return a.a.M = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.a.a = void 0, qa(a.a, c);
    }
  }
  a.a.M = !1;
  if (a.a.j) {
    b = a.a.j;
    a.a.j = null;
    if (b.Da) {
      throw b.Aa;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function va(a) {
  this.next = function(b) {
    pa(a.a);
    a.a.v ? b = ta(a, a.a.v.next, b, a.a.T) : (a.a.T(b), b = ua(a));
    return b;
  };
  this.throw = function(b) {
    pa(a.a);
    a.a.v ? b = ta(a, a.a.v["throw"], b, a.a.T) : (qa(a.a, b), b = ua(a));
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
  return new Promise(function(e, f) {
    function g(a) {
      a.done ? e(a.value) : Promise.resolve(a.value).then(b, c).then(g, f);
    }
    g(a.next());
  });
}
function H(a) {
  return wa(new va(new ra(a)));
}
var xa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var e = arguments[c];
    if (e) {
      for (var f in e) {
        Object.prototype.hasOwnProperty.call(e, f) && (a[f] = e[f]);
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
  var c = 0, e = {next:function() {
    if (c < a.length) {
      var f = c++;
      return {value:b(f, a[f]), done:!1};
    }
    e.next = function() {
      return {done:!0, value:void 0};
    };
    return e.next();
  }};
  e[Symbol.iterator] = function() {
    return e;
  };
  return e;
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
var J = {}, Aa = [], Ba = [];
function K(a, b) {
  var c = Ba, e, f;
  for (f = arguments.length; 2 < f--;) {
    Aa.push(arguments[f]);
  }
  b && null != b.children && (Aa.length || Aa.push(b.children), delete b.children);
  for (; Aa.length;) {
    if ((e = Aa.pop()) && void 0 !== e.pop) {
      for (f = e.length; f--;) {
        Aa.push(e[f]);
      }
    } else {
      "boolean" === typeof e && (e = null);
      if (f = "function" !== typeof a) {
        null == e ? e = "" : "number" === typeof e ? e = String(e) : "string" !== typeof e && (f = !1);
      }
      f && g ? c[c.length - 1] += e : c === Ba ? c = [e] : c.push(e);
      var g = f;
    }
  }
  g = new za;
  g.nodeName = a;
  g.children = c;
  g.attributes = null == b ? void 0 : b;
  g.key = null == b ? void 0 : b.key;
  void 0 !== J.Sa && J.Sa(g);
  return g;
}
function L(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
  return a;
}
function Ca(a, b) {
  null != a && ("function" == typeof a ? a(b) : a.current = b);
}
var Da = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
function Ea(a, b) {
  return K(a.nodeName, L(L({}, a.attributes), b), 2 < arguments.length ? [].slice.call(arguments, 2) : a.children);
}
var Fa = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, Ga = [];
function Ha(a) {
  !a.W && (a.W = !0) && 1 == Ga.push(a) && (J.Va || Da)(Ia);
}
function Ia() {
  for (var a; a = Ga.pop();) {
    a.W && Ja(a);
  }
}
function Ka(a) {
  var b = L({}, a.attributes);
  b.children = a.children;
  a = a.nodeName.Wa;
  if (void 0 !== a) {
    for (var c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
function Ma(a) {
  var b = a.parentNode;
  b && b.removeChild(a);
}
function Na(a, b, c, e) {
  var f = M;
  "className" === b && (b = "class");
  if ("key" !== b) {
    if ("ref" === b) {
      Ca(c, null), Ca(e, a);
    } else {
      if ("class" !== b || f) {
        if ("style" === b) {
          if (e && "string" !== typeof e && "string" !== typeof c || (a.style.cssText = e || ""), e && "object" === typeof e) {
            if ("string" !== typeof c) {
              for (var g in c) {
                g in e || (a.style[g] = "");
              }
            }
            for (g in e) {
              a.style[g] = "number" === typeof e[g] && !1 === Fa.test(g) ? e[g] + "px" : e[g];
            }
          }
        } else {
          if ("dangerouslySetInnerHTML" === b) {
            e && (a.innerHTML = e.ga || "");
          } else {
            if ("o" == b[0] && "n" == b[1]) {
              f = b !== (b = b.replace(/Capture$/, "")), b = b.toLowerCase().substring(2), e ? c || a.addEventListener(b, Oa, f) : a.removeEventListener(b, Oa, f), (a.sa || (a.sa = {}))[b] = e;
            } else {
              if ("list" !== b && "type" !== b && !f && b in a) {
                try {
                  a[b] = null == e ? "" : e;
                } catch (h) {
                }
                null != e && !1 !== e || "spellcheck" == b || a.removeAttribute(b);
              } else {
                c = f && b !== (b = b.replace(/^xlink:?/, "")), null == e || !1 === e ? c ? a.removeAttributeNS("http://www.w3.org/1999/xlink", b.toLowerCase()) : a.removeAttribute(b) : "function" !== typeof e && (c ? a.setAttributeNS("http://www.w3.org/1999/xlink", b.toLowerCase(), e) : a.setAttribute(b, e));
              }
            }
          }
        }
      } else {
        a.className = e || "";
      }
    }
  }
}
function Oa(a) {
  return this.sa[a.type](J.event && J.event(a) || a);
}
var Pa = [], Qa = 0, M = !1, Ra = !1;
function Sa() {
  for (var a; a = Pa.shift();) {
    J.Ha && J.Ha(a), a.u && a.u();
  }
}
function Ta(a, b, c, e, f, g) {
  Qa++ || (M = null != f && void 0 !== f.Za, Ra = null != a && !("__preactattr_" in a));
  a = Ua(a, b, c, e, g);
  f && a.parentNode !== f && f.appendChild(a);
  --Qa || (Ra = !1, g || Sa());
  return a;
}
function Ua(a, b, c, e, f) {
  var g = a, h = M;
  if (null == b || "boolean" === typeof b) {
    b = "";
  }
  if ("string" === typeof b || "number" === typeof b) {
    return a && void 0 !== a.splitText && a.parentNode && (!a.w || f) ? a.nodeValue != b && (a.nodeValue = b) : (g = document.createTextNode(b), a && (a.parentNode && a.parentNode.replaceChild(g, a), N(a, !0))), g.__preactattr_ = !0, g;
  }
  f = b.nodeName;
  if ("function" === typeof f) {
    h = a;
    var k = b;
    g = b = h && h.w;
    var n = h, m = b && h.ha === k.nodeName, q = m;
    for (a = Ka(k); b && !q && (b = b.ta);) {
      q = b.constructor === k.nodeName;
    }
    b && q && (!e || b.w) ? (Va(b, a, 3, c, e), h = b.K) : (g && !m && (Wa(g), h = n = null), b = Xa(k.nodeName, a, c), h && !b.N && (b.N = h, n = null), Va(b, a, 1, c, e), h = b.K, n && h !== n && (n.w = null, N(n, !1)));
    return h;
  }
  M = "svg" === f ? !0 : "foreignObject" === f ? !1 : M;
  f = String(f);
  if (!a || a.Ea !== f && a.nodeName.toLowerCase() !== f.toLowerCase()) {
    if (g = f, f = M ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g), f.Ea = g, g = f, a) {
      for (; a.firstChild;) {
        g.appendChild(a.firstChild);
      }
      a.parentNode && a.parentNode.replaceChild(g, a);
      N(a, !0);
    }
  }
  var l = g.firstChild;
  a = g.__preactattr_;
  f = b.children;
  if (null == a) {
    a = g.__preactattr_ = {};
    for (var t = g.attributes, F = t.length; F--;) {
      a[t[F].name] = t[F].value;
    }
  }
  if (!Ra && f && 1 === f.length && "string" === typeof f[0] && null != l && void 0 !== l.splitText && null == l.nextSibling) {
    l.nodeValue != f[0] && (l.nodeValue = f[0]);
  } else {
    if (f && f.length || null != l) {
      l = g;
      t = Ra || null != a.Ua;
      F = l.childNodes;
      var I = [], D = {}, z = 0, y = 0, u = F.length, W = 0, La = f ? f.length : 0;
      if (0 !== u) {
        for (q = 0; q < u; q++) {
          var A = F[q], R = A.__preactattr_;
          var E = La && R ? A.w ? A.w.qa : R.key : null;
          if (null != E) {
            z++, D[E] = A;
          } else {
            if (R || (void 0 !== A.splitText ? t ? A.nodeValue.trim() : 1 : t)) {
              I[W++] = A;
            }
          }
        }
      }
      if (0 !== La) {
        for (q = 0; q < La; q++) {
          u = f[q];
          m = null;
          E = u.key;
          if (null != E) {
            z && void 0 !== D[E] && (m = D[E], D[E] = void 0, z--);
          } else {
            if (y < W) {
              for (E = y; E < W; E++) {
                if (A = void 0 !== I[E]) {
                  if (A = n = I[E], "string" === typeof u || "number" === typeof u) {
                    A = void 0 !== A.splitText;
                  } else {
                    if ("string" === typeof u.nodeName) {
                      if (R = !A.ha) {
                        R = u.nodeName, R = A.Ea === R || A.nodeName.toLowerCase() === R.toLowerCase();
                      }
                      A = R;
                    } else {
                      A = t || A.ha === u.nodeName;
                    }
                  }
                }
                if (A) {
                  m = n;
                  I[E] = void 0;
                  E === W - 1 && W--;
                  E === y && y++;
                  break;
                }
              }
            }
          }
          m = Ua(m, u, c, e);
          u = F[q];
          m && m !== l && m !== u && (null == u ? l.appendChild(m) : m === u.nextSibling ? Ma(u) : l.insertBefore(m, u));
        }
      }
      if (z) {
        for (q in D) {
          void 0 !== D[q] && N(D[q], !1);
        }
      }
      for (; y <= W;) {
        void 0 !== (m = I[W--]) && N(m, !1);
      }
    }
  }
  c = g;
  e = b.attributes;
  b = a;
  for (k in b) {
    e && null != e[k] || null == b[k] || Na(c, k, b[k], b[k] = void 0);
  }
  for (k in e) {
    "children" === k || "innerHTML" === k || k in b && e[k] === ("value" === k || "checked" === k ? c[k] : b[k]) || Na(c, k, b[k], b[k] = e[k]);
  }
  M = h;
  return g;
}
function N(a, b) {
  var c = a.w;
  c ? Wa(c) : (null != a.__preactattr_ && Ca(a.__preactattr_.da, null), !1 !== b && null != a.__preactattr_ || Ma(a), Ya(a));
}
function Ya(a) {
  for (a = a.lastChild; a;) {
    var b = a.previousSibling;
    N(a, !0);
    a = b;
  }
}
var Za = [];
function Xa(a, b, c) {
  var e = Za.length;
  if (a.prototype && a.prototype.h) {
    var f = new a(b, c);
    O.call(f, b, c);
  } else {
    f = new O(b, c), f.constructor = a, f.h = $a;
  }
  for (; e--;) {
    if (Za[e].constructor === a) {
      f.N = Za[e].N;
      Za.splice(e, 1);
      break;
    }
  }
  return f;
}
function $a(a, b, c) {
  return this.constructor(a, c);
}
function Va(a, b, c, e, f) {
  a.X || (a.X = !0, a.ra = b.da, a.qa = b.key, delete b.da, delete b.key, "undefined" === typeof a.constructor.Ca && (!a.K || f ? a.ya && a.ya() : a.Ka && a.Ka(b, e)), e && e !== a.context && (a.ma || (a.ma = a.context), a.context = e), a.na || (a.na = a.c), a.c = b, a.X = !1, 0 !== c && (1 !== c && !1 === J.eb && a.K ? Ha(a) : Ja(a, 1, f)), Ca(a.ra, a));
}
function Ja(a, b, c, e) {
  if (!a.X) {
    var f = a.c, g = a.state, h = a.context, k = a.na || f, n = a.oa || g, m = a.ma || h, q = a.K, l = a.N, t = q || l, F = a.w, I = !1, D = m, z;
    a.constructor.Ca && (g = L(L({}, g), a.constructor.Ca(f, g)), a.state = g);
    q && (a.c = k, a.state = n, a.context = m, 2 !== b && a.R && !1 === a.R(f, g, h) ? I = !0 : a.za && a.za(f, g, h), a.c = f, a.state = g, a.context = h);
    a.na = a.oa = a.ma = a.N = null;
    a.W = !1;
    if (!I) {
      f = a.h(f, g, h);
      a.ja && (h = L(L({}, h), a.ja()));
      q && a.Na && (D = a.Na(k, n));
      g = f && f.nodeName;
      if ("function" === typeof g) {
        var y = Ka(f);
        if ((z = F) && z.constructor === g && y.key == z.qa) {
          Va(z, y, 1, h, !1);
        } else {
          var u = z;
          a.w = z = Xa(g, y, h);
          z.N = z.N || l;
          z.ta = a;
          Va(z, y, 0, h, !1);
          Ja(z, 1, c, !0);
        }
        y = z.K;
      } else {
        l = t;
        if (u = F) {
          l = a.w = null;
        }
        if (t || 1 === b) {
          l && (l.w = null), y = Ta(l, f, h, c || !q, t && t.parentNode, !0);
        }
      }
      t && y !== t && z !== F && (h = t.parentNode) && y !== h && (h.replaceChild(y, t), u || (t.w = null, N(t, !1)));
      u && Wa(u);
      if ((a.K = y) && !e) {
        for (u = t = a; u = u.ta;) {
          (t = u).K = y;
        }
        y.w = t;
        y.ha = t.constructor;
      }
    }
    !q || c ? Pa.push(a) : I || (a.xa && a.xa(k, n, D), J.Ia && J.Ia(a));
    for (; a.Y.length;) {
      a.Y.pop().call(a);
    }
    Qa || e || Sa();
  }
}
function Wa(a) {
  J.Ja && J.Ja(a);
  var b = a.K;
  a.X = !0;
  a.ia && a.ia();
  a.K = null;
  var c = a.w;
  c ? Wa(c) : b && (null != b.__preactattr_ && Ca(b.__preactattr_.da, null), a.N = b, Ma(b), Za.push(a), Ya(b));
  Ca(a.ra, null);
}
function O(a, b) {
  this.W = !0;
  this.context = b;
  this.c = a;
  this.state = this.state || {};
  this.Y = [];
}
L(O.prototype, {b:function(a, b) {
  this.oa || (this.oa = this.state);
  this.state = L(L({}, this.state), "function" === typeof a ? a(this.state, this.c) : a);
  b && this.Y.push(b);
  Ha(this);
}, La:function(a) {
  a && this.Y.push(a);
  Ja(this, 2);
}, h:function() {
}});
var ab = {};
function bb(a, b) {
  return a.ca < b.ca ? 1 : a.ca > b.ca ? -1 : a.index - b.index;
}
function cb(a, b) {
  try {
    return a.index = b, a.ca = a.attributes.default ? 0 : db(a.attributes.path).map(eb).join(""), a.attributes;
  } catch (c) {
    return !1;
  }
}
function db(a) {
  return a.replace(/(^\/+|\/+$)/g, "").split("/");
}
function eb(a) {
  return ":" == a.charAt(0) ? 1 + "*+?".indexOf(a.charAt(a.length - 1)) || 4 : 5;
}
;var P = null, Q = [], fb = [];
function gb() {
  var a;
  P && P.location ? a = P.location : P && P.Ma ? a = P.Ma() : a = "undefined" !== typeof location ? location : {};
  return "" + (a.pathname || "") + (a.search || "");
}
function hb(a) {
  for (var b = !1, c = 0; c < Q.length; c++) {
    !0 === ib(Q[c], a) && (b = !0);
  }
  for (c = fb.length; c--;) {
    fb[c](a);
  }
  return b;
}
function jb(a) {
  if (a && a.getAttribute) {
    var b = a.getAttribute("href");
    a = a.getAttribute("target");
    if (b && b.match(/^\//g) && (!a || a.match(/^_?self$/i))) {
      var c = void 0 === c ? !1 : c;
      "string" !== typeof b && b.url && (c = b.replace, b = b.url);
      a: {
        a = b;
        for (var e = Q.length; e--;) {
          if (0 < kb(Q[e].c.children, a, !1).length) {
            a = !0;
            break a;
          }
        }
        a = !1;
      }
      if (a) {
        if (a = b, c = c ? "replace" : "push", c = void 0 === c ? "push" : c, P && P[c]) {
          P[c](a);
        } else {
          if ("undefined" !== typeof history && history[c + "State"]) {
            history[c + "State"](null, null, a);
          }
        }
      }
      return hb(b);
    }
  }
}
function lb(a) {
  if (0 == a.button) {
    return jb(a.currentTarget || a.target || this), mb(a);
  }
}
function mb(a) {
  a && (a.stopImmediatePropagation && a.stopImmediatePropagation(), a.stopPropagation && a.stopPropagation(), a.preventDefault());
  return !1;
}
function nb(a) {
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
        if (jb(b)) {
          return mb(a);
        }
      }
    } while (b = b.parentNode);
  }
}
var ob = !1;
function pb() {
  ob || ("function" === typeof addEventListener && (P || addEventListener("popstate", function() {
    hb(gb());
  }), addEventListener("click", nb)), ob = !0);
}
function qb(a) {
  O.call(this, a);
  a.history && (P = a.history);
  this.state = {url:a.url || gb()};
  pb();
}
v(qb, O);
d = qb.prototype;
d.R = function(a) {
  return !0 !== a.bb ? !0 : a.url !== this.c.url || a.l !== this.c.l;
};
function ib(a, b) {
  a.a = !1;
  a.b({url:b});
  if (a.updating) {
    return 0 < kb(a.c.children, b, !1).length;
  }
  a.La();
  return a.a;
}
d.ya = function() {
  Q.push(this);
  this.updating = !0;
};
d.u = function() {
  var a = this;
  P && (this.g = P.Xa(function(b) {
    ib(a, "" + (b.pathname || "") + (b.search || ""));
  }));
  this.updating = !1;
};
d.ia = function() {
  "function" === typeof this.g && this.g();
  Q.splice(Q.indexOf(this), 1);
};
d.za = function() {
  this.updating = !0;
};
d.xa = function() {
  this.updating = !1;
};
function kb(a, b, c) {
  return a.filter(cb).sort(bb).map(function(a) {
    var e = b;
    var g = a.attributes.path, h = a.attributes, k = /(?:\?([^#]*))?(#.*)?$/, n = e.match(k), m = {};
    if (n && n[1]) {
      n = n[1].split("&");
      for (var q = 0; q < n.length; q++) {
        var l = n[q].split("=");
        m[decodeURIComponent(l[0])] = decodeURIComponent(l.slice(1).join("="));
      }
    }
    e = db(e.replace(k, ""));
    g = db(g || "");
    k = Math.max(e.length, g.length);
    for (n = 0; n < k; n++) {
      if (g[n] && ":" === g[n].charAt(0)) {
        q = g[n].replace(/(^:|[+*?]+$)/g, "");
        l = (g[n].match(/[+*?]+$/) || ab)[0] || "";
        var t = ~l.indexOf("+"), F = ~l.indexOf("*"), I = e[n] || "";
        if (!I && !F && (0 > l.indexOf("?") || t)) {
          var D = !1;
          break;
        }
        m[q] = decodeURIComponent(I);
        if (t || F) {
          m[q] = e.slice(n).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (g[n] !== e[n]) {
          D = !1;
          break;
        }
      }
    }
    if (e = !0 !== h.default && !1 === D ? !1 : m) {
      return !1 !== c ? (e = Object.assign({}, {url:b, matches:e}, e), delete e.da, delete e.key, Ea(a, e)) : a;
    }
  }).filter(Boolean);
}
d.h = function(a, b) {
  var c = a.l;
  b = b.url;
  a = kb(a.children, b, !0);
  var e = a[0] || null;
  this.a = !!e;
  var f = this.j;
  b !== f && (this.j = b, "function" === typeof c && c({ab:this, url:b, $a:f, active:a, current:e}));
  return e;
};
function rb(a) {
  return K("a", Object.assign({}, a, {onClick:lb}));
}
function sb() {
  O.call(this);
  this.a = this.a.bind(this);
}
v(sb, O);
sb.prototype.a = function(a) {
  this.g = a;
  this.b({});
};
sb.prototype.u = function() {
  fb.push(this.a);
};
sb.prototype.ia = function() {
  fb.splice(fb.indexOf(this.a) >>> 0, 1);
};
sb.prototype.h = function(a) {
  var b = this.g || gb(), c = b.replace(/\?.+$/, "");
  this.g = null;
  var e = a.children.filter(function(a) {
    return "function" == typeof a;
  });
  return e[0] && e[0]({url:b, path:c, matches:c === a.path});
};
function S(a) {
  var b = Object.assign({}, a), c = void 0 === a.ua ? "active" : a.ua;
  a = a.path;
  var e = (delete b.ua, delete b.path, b);
  return K(sb, {path:a || e.href}, function(a) {
    return K(rb, Object.assign({}, e, {className:[e.Ta || e.className, a.matches && c].filter(Boolean).join(" ")}));
  });
}
;function tb(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return K("div", Object.assign({}, b, {className:"row" + (a ? " " + a : "")}), c);
}
function T(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return K("div", Object.assign({}, b, {className:"col" + (a ? " " + a : "")}), c);
}
function ub(a) {
  var b = a.pa, c = a.type, e = a.value;
  a = {required:a.required, name:a.name, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), id:a.id, "aria-describedby":a.J};
  return b ? K("textarea", Object.assign({}, a, {rows:"number" == typeof b ? b : 3}), e) : K("input", Object.assign({}, a, e ? {value:e} : {}, {type:c}));
}
function vb(a) {
  var b = a.label, c = void 0 === a.type ? "text" : a.type, e = a.placeholder, f = a.i, g = a.pa, h = a.file, k = a.options, n = a.Qa, m = "i" + 100000 * Math.random(), q = "h" + m;
  a = {J:q, id:m, value:a.value, name:a.name, required:a.required};
  c = k ? K(wb, Object.assign({}, a, {options:k, Qa:n})) : K(ub, Object.assign({}, a, {pa:g, placeholder:e, type:c, file:h}));
  return K("div", {className:"form-group"}, K("label", {htmlFor:m}, b), c, f && K("small", {id:q, dangerouslySetInnerHTML:{ga:f}, className:"form-text text-muted"}));
}
function wb(a) {
  var b = a.options, c = a.value;
  return K("select", {name:a.name, value:c, required:a.required, className:"custom-select", id:a.id, "aria-describedby":a.J}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == c}, a.title);
  }));
}
function U(a) {
  return K("span", {}, K("i", {className:a.icon}), " ");
}
function xb(a) {
  O.apply(this, arguments);
}
v(xb, O);
xb.prototype.R = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
xb.prototype.u = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  void 0 !== b && c(a, b);
};
xb.prototype.h = function(a) {
  var b = a.name, c = a.label, e = a.value, f = this.context, g = f.id, h = f.l, k = void 0 === f.values ? {} : f.values;
  return K("div", {className:"custom-control custom-switch"}, K("input", {required:void 0 !== a.required, name:b, checked:b in k ? k[b] : e, id:g, type:"checkbox", className:"custom-control-input", "aria-described-by":f.J, onChange:function(a) {
    h(b, a.currentTarget.checked);
  }}), K("label", {htmlFor:g, className:"custom-control-label"}, c));
};
function yb(a) {
  return (a = a.error) ? K("div", {className:"alert alert-danger mt-3", role:"alert"}, a) : null;
}
function zb(a) {
  var b = a.H;
  return b ? K("div", {className:"alert alert-success mt-3", role:"alert"}, a.message || b) : null;
}
;function Ab() {
  return K("nav", {className:"nav flex-column"}, K(S, {className:"nav-link", href:"/admin"}, K("i", {className:"fab fa-kickstarter-k"}), " Главная"), K(S, {className:"nav-link", href:"/admin/objects"}, K("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), K(S, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, K("i", {className:"fas fa-home"}), " Новая Недвижимость"), K(S, {className:"nav-link", href:"/admin/categories"}, K("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), K(S, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, K("i", {className:"fas fa-folder-plus"}), " Добавить"), K(S, {className:"nav-link", href:"/admin/pages"}, K("i", {className:"fas fa-font"}), " Статьи"), K(S, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, K("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), K(S, {className:"nav-link", href:"/admin/special"}, K("i", {className:"fas fa-bolt"}), " Спец. Предложения"), 
  K(S, {className:"nav-link", href:"/admin/offers"}, K("i", {className:"fas fa-grip-lines"}), " Акции"));
}
;function V(a, b) {
  return b = b || {}, new Promise(function(c, e) {
    function f() {
      var a, b = [], c = [], e = {};
      return g.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(f, g, h) {
        b.push(g = g.toLowerCase());
        c.push([g, h]);
        e[g] = (a = e[g]) ? a + "," + h : h;
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
        return e[a.toLowerCase()];
      }, has:function(a) {
        return a.toLowerCase() in e;
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
    g.onerror = e;
    g.send(b.body || null);
  });
}
;function Bb() {
  O.call(this);
  this.state = {f:!1};
}
v(Bb, O);
function Cb(a) {
  var b, c, e, f;
  return H(function(g) {
    switch(g.g) {
      case 1:
        return a.b({f:!0}), x(g, 2, 3), w(g, fetch("/admin-data?" + a.c.path, {method:"POST"}), 5);
      case 5:
        return b = g.a, w(g, b.json(), 6);
      case 6:
        c = g.a, (e = c.error) ? a.b({error:e}) : (a.c.F(), a.c.aa());
      case 3:
        C(g);
        a.b({f:!1});
        G(g, 0);
        break;
      case 2:
        f = B(g), a.b({error:f}), g.m(3);
    }
  });
}
Bb.prototype.h = function(a) {
  var b = this, c = a.text, e = a.F, f = void 0 === a.S ? "primary" : a.S, g = a.C, h = void 0 === a.O ? "Отмена" : a.O;
  return K("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:e, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, K("p", {}, c)), K("div", {className:"modal-footer"}, 
  K("button", {onClick:e, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, h), K("button", {disabled:this.state.f, type:"button", className:"btn btn-" + f, onClick:function() {
    return Cb(b);
  }}, this.state.f ? "Отправка..." : g)))));
};
function Db(a) {
  O.apply(this, arguments);
}
v(Db, O);
Db.prototype.h = function(a) {
  var b = a.children, c = a.F;
  return K("div", {className:"EditModal modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:c, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, b))));
};
function Eb() {
  O.call(this);
  this.state = {f:!1, data:[]};
}
v(Eb, O);
Eb.prototype.u = function() {
  var a = this;
  return H(function(b) {
    return w(b, a.load(), 0);
  });
};
Eb.prototype.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(h) {
    switch(h.g) {
      case 1:
        return a.b({f:!0}), x(h, 2, 3), w(h, V("/admin-data?categories"), 5);
      case 5:
        return b = h.a, w(h, b.json(), 6);
      case 6:
        c = h.a, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        C(h);
        a.b({f:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.m(3);
    }
  });
};
Eb.prototype.h = function() {
  var a = this;
  return K(T, {}, K("h1", {}, "Категории Каталога"), K("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), this.state.f && K("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return K(Fb, Object.assign({}, c, {key:b, id:b, ka:function() {
      return a.load();
    }}));
  }));
};
function Fb() {
  O.call(this);
  this.state = {o:null};
}
v(Fb, O);
Fb.prototype.h = function() {
  var a = this, b = this.c, c = b.title, e = b.description, f = b.seo, g = b.id, h = b.ka;
  return K(tb, {className:"CategoryRow"}, K(T, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"})), K(T, {}, K("h2", {}, c), K("em", {}, "knedv.ru/", f), K("p", {}, e)), K(T, {className:"col-1 CategoryMeta"}, K("a", {href:"/admin/add-category/" + g, style:"color:brown;"}, K(U, {icon:"fas fa-pen"})), K("br"), K("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:K("span", {}, "Вы действительно хотите удалить категорию ", K("strong", {}, c), "?"), C:"Удалить", title:"Удаление Категории", path:"categories&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"far fa-trash-alt"}))), this.state.o && K(Bb, Object.assign({}, this.state.o, {F:function() {
    a.b({o:null});
  }, S:"danger", aa:h})));
};
function Gb() {
  O.call(this);
  this.c = this.c;
}
v(Gb, O);
Gb.prototype.R = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Gb.prototype.u = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  c && void 0 !== b && c(a, b);
};
Gb.prototype.h = function(a) {
  var b = a.options, c = a.name, e = a.value, f = this.context, g = f.l, h = void 0 === f.values ? {} : f.values;
  return K("select", {name:c, value:c in h ? h[c] : e, required:a.required, className:"custom-select", id:f.id, "aria-describedby":f.J, onChange:function(a) {
    g(c, a.currentTarget.value);
  }}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == e}, a.title);
  }));
};
function Hb() {
  O.call(this);
  this.c = this.c;
}
v(Hb, O);
Hb.prototype.R = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Hb.prototype.u = function() {
  var a = this.c, b = r(a.children).next().value;
  a = a.name;
  var c = this.context.l;
  b && c(a, b.trim());
};
Hb.prototype.h = function(a) {
  var b = a.name, c = a.children, e = this.context, f = e.l, g = void 0 === e.values ? {} : e.values;
  return K("textarea", {required:a.required, name:b, placeholder:a.placeholder, "aria-describedby":e.J, className:"form-control", id:e.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }, rows:void 0 === a.rows ? 3 : a.rows}, b in g ? g[b] : c);
};
function Ib() {
  O.call(this);
  this.c = this.c;
}
v(Ib, O);
Ib.prototype.R = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Ib.prototype.u = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  void 0 !== b && c(a, b);
};
Ib.prototype.h = function(a) {
  var b = a.name, c = a.value, e = this.context, f = e.l, g = void 0 === e.values ? {} : e.values;
  return K("input", {required:a.required, name:b, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), value:b in g ? g[b] : c, type:void 0 === a.type ? "text" : a.type, "aria-describedby":e.J, id:e.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }});
};
function X() {
  O.call(this);
  this.state = {values:{}};
  this.c = this.c;
}
v(X, O);
X.prototype.ja = function() {
  return {values:this.state.values, l:this.l.bind(this)};
};
X.prototype.l = function(a, b) {
  var c = {};
  this.b({values:Object.assign({}, this.state.values, (c[a] = b, c))});
  this.c.l && this.c.l(this.state.values);
};
X.prototype.h = function(a) {
  var b = Object.assign({}, a), c = a.children, e = a.Ba;
  a = a.ba;
  b = (delete b.children, delete b.Ba, delete b.ba, b);
  return K("form", Object.assign({}, b, {ref:e, onSubmit:a}), c);
};
function Y() {
  O.call(this);
  this.id = "i" + Math.floor(100000 * Math.random());
  this.J = "h" + this.id;
  this.c = this.c;
}
v(Y, O);
Y.prototype.ja = function() {
  return {id:this.id, J:this.J};
};
Y.prototype.h = function() {
  var a = this.c, b = a.children, c = a.label;
  a = a.i;
  return K("div", {className:"form-group"}, c && K("label", {htmlFor:this.id}, c), b, a && K("small", {id:this.J, dangerouslySetInnerHTML:{ga:a}, className:"form-text text-muted"}));
};
var Z = {get Fa() {
  return Gb;
}, get fa() {
  return Hb;
}, get I() {
  return Ib;
}};
function Jb(a) {
  var b = a.article, c = a.la;
  a = a.name;
  return K("div", {className:"form-group"}, K("label", {}, "Статья"), K("div", {dangerouslySetInnerHTML:{ga:b}, style:"background: #edeee8;", className:"mb-3"}), K("a", {onClick:function(a) {
    a.preventDefault();
    window.editorCallback = function(a) {
      e.close();
      c(a);
    };
    window.editorGetData = function() {
      return b;
    };
    var e = Kb();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"), K("input", {name:a, type:"hidden", value:b}));
}
function Kb() {
  var a = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (a.outerHeight / 2 + a.screenY - 325 - 50) + ",left=" + (a.outerWidth / 2 + a.screenX - 450));
}
;function Lb() {
  O.call(this);
  this.state = {f:!1, data:{}, hint:"москва-новостройки", article:""};
}
v(Lb, O);
Lb.prototype.u = function() {
  var a = this, b, c, e, f, g, h, k, n;
  return H(function(m) {
    switch(m.g) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return m.return();
        }
        a.b({D:1, f:!0});
        x(m, 2, 3);
        return w(m, V("/admin-data?categories&id=" + a.c.id), 5);
      case 5:
        return c = m.a, w(m, c.json(), 6);
      case 6:
        e = m.a, f = e.error, g = e.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, hint:k.seo, article:k.article}));
      case 3:
        C(m);
        a.b({f:!1});
        G(m, 0);
        break;
      case 2:
        n = B(m), a.b({error:n}), m.m(3);
    }
  });
};
Lb.prototype.a = function(a) {
  var b = this, c, e, f, g, h;
  return H(function(k) {
    switch(k.g) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({G:!0}), x(k, 2, 3), w(k, V("/admin-data?categories", {method:"POST", body:c}), 5);
      case 5:
        return e = k.a, w(k, e.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({H:1});
      case 3:
        C(k);
        b.b({G:!1});
        G(k, 4);
        break;
      case 2:
        h = B(k);
        b.b({error:h});
        k.m(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Lb.prototype.h = function() {
  var a = this, b = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.", c = this.state, e = c.D;
  c = c.ea;
  return K(T, {}, K("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Категорию"), e && this.state.f && K("span", {className:"echo-loader"}, "Loading…"), !(e && this.state.f) && K(X, {l:function(a) {
    console.log(a);
    console.log(a.seo);
  }, Ba:function(b) {
    a.form = b;
  }, ba:this.a.bind(this)}, K(Y, {label:"Название", i:"Название для меню слева."}, K(Z.I, {value:this.state.data.title, name:"title", placeholder:"Москва Новостройки", required:!0})), K(Y, {i:b, label:"СЕО Название"}, K(Z.I, {required:!0, value:this.state.data.seo, name:"seo", placeholder:"москва-новостройки"})), K(Y, {label:"Описание", i:"Краткое описание для главной страницы."}, K(Z.fa, {required:!0, rows:"3", name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  this.state.data.description)), e && !c && K(Y, {label:"Изображение"}, K("br"), K("img", {src:this.state.data.cdnImage, className:"img-fluid"}), K("a", {onClick:function(b) {
    b.preventDefault();
    a.b({ea:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!e || c) && K(Y, {label:"Изображение", i:"Картинка, отображаемая на главной странице."}, K(Z.I, {required:!0, name:"image", type:"file", file:"1"})), K(Jb, {article:this.state.article, la:function(b) {
    a.b({article:b});
  }}), e && K("input", {value:this.c.id, type:"hidden", name:"id"}), K("button", {disabled:this.state.G, type:"submit", className:"btn btn-primary"}, this.state.G ? "Загрузка..." : e ? "Сохранить" : "Добавить"), this.state.error && K("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.H && K("div", {className:"alert alert-success mt-3", role:"alert"}, "Категория успешно ", e ? "сохранена" : "создана", "!")));
};
function Mb() {
  O.call(this);
  this.state = {ea:!1};
}
v(Mb, O);
Mb.prototype.h = function(a) {
  var b = this, c = a.D, e = a.required, f = a.image;
  a = a.i;
  var g = this.state.ea;
  if (c && !g) {
    return K(Y, {i:a, label:"Изображение"}, K("br"), K("img", {src:f, className:"img-fluid"}), K("a", {onClick:function(a) {
      a.preventDefault();
      b.b({ea:!0});
      return !1;
    }, href:"#", className:"btn btn-outline-warning"}, "Изменить"));
  }
  if (!c || g) {
    return K(Y, {i:a, label:"Изображение"}, K(Z.I, {required:void 0 !== e, name:"image", type:"file", file:"1"}));
  }
};
function Nb(a) {
  O.apply(this, arguments);
}
v(Nb, O);
Nb.prototype.a = function(a) {
  var b = this, c, e, f, g, h;
  return H(function(k) {
    switch(k.g) {
      case 1:
        a.preventDefault();
        if (!b.c.path) {
          return b.b({error:"Form Path is not included"}), k.return(!1);
        }
        b.b({error:null, H:null});
        c = new FormData(a.target);
        b.b({G:!0});
        x(k, 2, 3);
        return w(k, fetch(b.c.path, {method:"POST", body:c}), 5);
      case 5:
        return e = k.a, w(k, e.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({H:1});
      case 3:
        C(k);
        b.b({G:!1});
        G(k, 4);
        break;
      case 2:
        h = B(k);
        b.b({error:h});
        k.m(3);
        break;
      case 4:
        if (!b.c.U) {
          k.m(7);
          break;
        }
        return w(k, b.c.U(), 7);
      case 7:
        return k.return(!1);
    }
  });
};
function Ob(a) {
  return K(Pb, {U:a.Ya, title:"Добавить Объект", path:"/admin-data?objects", V:"Объект успешно добавлен!", C:"Добавить"});
}
function Pb() {
  Nb.call(this);
  this.state = {f:!1, data:{}, wa:[], hint:"1-комнатные-апартаменты-воскресенское", va:"апартаменты", article:""};
}
v(Pb, Nb);
Pb.prototype.u = function() {
  var a = this, b, c, e, f, g, h, k, n, m, q;
  return H(function(l) {
    switch(l.g) {
      case 1:
        return w(l, Qb(a), 2);
      case 2:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({D:1, f:!0});
        x(l, 3, 4);
        return w(l, V("/admin-data?objects&id=" + a.c.id), 6);
      case 6:
        return c = l.a, w(l, c.json(), 7);
      case 7:
        e = l.a, f = e.error, g = e.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, hint:k.seo, va:k.categorySeo, article:k.article}));
      case 4:
        C(l);
        a.b({f:!1});
        G(l, 0);
        break;
      case 3:
        m = n = B(l), q = m.message, a.b({error:q}), l.m(4);
    }
  });
};
function Qb(a) {
  var b, c, e, f, g, h;
  return H(function(k) {
    switch(k.g) {
      case 1:
        return a.b({f:!0}), x(k, 2, 3), w(k, V("/admin-data?categories"), 5);
      case 5:
        return b = k.a, w(k, b.json(), 6);
      case 6:
        c = k.a, e = c.error, f = c.data, e ? a.b({error:e}) : (g = f.map(function(a) {
          return {value:a._id, title:a.title};
        }), a.b({wa:g}));
      case 3:
        C(k);
        a.b({f:!1});
        G(k, 0);
        break;
      case 2:
        h = B(k), a.b({error:h}), k.m(3);
    }
  });
}
Pb.prototype.h = function(a) {
  var b = this, c = a.F, e = void 0 === a.O ? "Отмена" : a.O, f = a.V, g = void 0 === a.C ? "Добавить" : a.C;
  a = a.title;
  var h = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.va + "/<strong>" + this.state.hint + "</strong>.", k = this.state, n = k.wa, m = k.G, q = k.data, l = k.f, t = k.error;
  k = k.H;
  c = K(X, {ba:this.a.bind(this)}, K(Y, {i:"Название для каталога недвижимости.", label:"Название"}, K(Z.I, {required:!0, name:"title", value:q.title, placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское"})), K(Y, {i:"Цена объекта", label:"Цена"}, K(Z.I, {required:!0, name:"price", value:q.price, placeholder:"3 000 000 руб."})), K(Y, {i:h, label:"СЕО Название"}, K(Z.I, {required:!0, name:"seo", value:q.seo, placeholder:"1-комнатные-апартаменты-воскресенское"})), K(Y, {i:"Описание объекта.", label:"Описание"}, 
  K(Z.fa, {rows:10, required:!0, name:"description", placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично)."}, 
  q.description)), K(Mb, {D:this.D, i:"Картинка, отображаемая на главной странице.", required:1, image:q.cdnImage}), K(Jb, {article:this.state.article, name:"article", la:function(a) {
    b.b({article:a});
  }}), this.D && K("input", {value:this.c.id, type:"hidden", name:"id"}), K(Y, {label:"Раздел", i:"Категория в каталоге"}, K(Z.Fa, {options:n, name:"category", required:!0, value:q.category})), K(yb, {error:t}), K(zb, {H:k, message:f}), K("button", {disabled:m, type:"submit", className:"btn btn-primary"}, m ? "Загрузка..." : g), c && K("button", {onClick:c, type:"button", className:"FormCancelBtn btn btn-secondary"}, e));
  return K(T, {}, a && K("h1", {}, a), l && K("span", {className:"echo-loader"}, "Loading…"), !l && c);
};
p.Object.defineProperties(Pb.prototype, {D:{configurable:!0, enumerable:!0, get:function() {
  return !!this.c.id;
}}});
function Rb() {
  O.call(this);
  this.state = {f:!1, data:[], o:null, P:null};
}
v(Rb, O);
d = Rb.prototype;
d.u = function() {
  var a = this;
  return H(function(b) {
    return w(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(h) {
    switch(h.g) {
      case 1:
        return a.b({f:!0}), x(h, 2, 3), w(h, V("/admin-data?objects"), 5);
      case 5:
        return b = h.a, w(h, b.json(), 6);
      case 6:
        c = h.a, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        C(h);
        a.b({f:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.m(3);
    }
  });
};
d.B = function(a) {
  this.b({o:a});
};
d.s = function(a) {
  this.b({P:a});
};
d.h = function() {
  return K(T, {}, K("h1", {}, "Объекты Недвижимости"), K("p", {}, "На сайт добалены следующие объекты:"), K(Sb, {data:this.state.data, f:this.state.f, B:this.B.bind(this), s:this.s.bind(this)}), this.state.o && K(Bb, Object.assign({}, this.state.o, {F:this.B.bind(this, null), S:"danger", aa:this.load.bind(this)})), this.state.P && K(Db, {F:this.s.bind(this, null), title:"Редактирование Объекта"}, K(Pb, {id:this.state.P._id, U:this.load.bind(this), F:this.s.bind(this, null), path:"/admin-data?objects", 
  O:"Отмена", V:"Объект успешно отредактирован!", C:"Сохранить"})));
};
function Sb(a) {
  var b = a.data, c = a.B, e = a.s;
  a = a.f;
  return K("div", {}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет объектов недвижимости.", b.map(function(a) {
    return K(Tb, {item:a, key:a._id, B:c, s:e});
  }));
}
function Tb(a) {
  O.apply(this, arguments);
}
v(Tb, O);
Tb.prototype.h = function(a) {
  var b = a.item, c = a.B, e = a.s, f = b.title;
  a = b.description;
  var g = b._id, h = b.price, k = "/каталог/" + b.categorySeo + "/" + b.seo, n = "knedv.ru" + k;
  return K(tb, {className:"CategoryRow"}, K(T, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"}), h && "Цена: " + h), K(T, {}, K("h2", {}, f), K("em", {}, K("a", {href:k}, n)), K("p", {}, a)), K(T, {className:"col-1 CategoryMeta"}, K("br"), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить объект ", K("strong", {}, f), "?"), C:"Удалить", title:"Удаление Объекта", path:"objects&id=" + g + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    e(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"fas fa-pen"}))));
};
function Ub() {
  O.call(this);
  this.state = {f:!1, data:[]};
}
v(Ub, O);
Ub.prototype.u = function() {
  var a = this;
  return H(function(b) {
    return w(b, a.load(), 0);
  });
};
Ub.prototype.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(h) {
    switch(h.g) {
      case 1:
        return a.b({f:!0}), x(h, 2, 3), w(h, V("/admin-data?pages"), 5);
      case 5:
        return b = h.a, w(h, b.json(), 6);
      case 6:
        c = h.a, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        C(h);
        a.b({f:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.m(3);
    }
  });
};
Ub.prototype.h = function() {
  var a = this;
  return K(T, {}, K("h1", {}, "Материалы Сайта"), K("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.f && K("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return K(Vb, Object.assign({}, c, {key:b, id:b, ka:function() {
      return a.load();
    }}));
  }));
};
function Vb() {
  O.call(this);
  this.state = {o:null};
}
v(Vb, O);
Vb.prototype.h = function() {
  var a = this, b = this.c, c = b.seo, e = b.id, f = b.description, g = b.ka, h = b.title;
  return K(tb, {className:"CategoryRow"}, K(T, {}, K("h2", {}, h), K("em", {}, "knedv.ru/", c), K("p", {}, f)), K(T, {className:"col-1 CategoryMeta"}, K("a", {href:"/admin/add-page/" + e, style:"color:brown;"}, K(U, {icon:"fas fa-pen"})), K("br"), K("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:K("span", {}, "Вы действительно хотите удалить страницу ", K("strong", {}, h), "?"), C:"Удалить", title:"Удаление Страницы", path:"pages&id=" + e + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"far fa-trash-alt"}))), this.state.o && K(Bb, Object.assign({}, this.state.o, {F:function() {
    a.b({o:null});
  }, S:"danger", aa:g})));
};
function Wb() {
  O.call(this);
  this.state = {f:!1, data:{}, article:""};
}
v(Wb, O);
Wb.prototype.u = function() {
  var a = this, b, c, e, f, g, h, k, n, m, q;
  return H(function(l) {
    switch(l.g) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({D:1, f:!0});
        x(l, 2, 3);
        return w(l, V("/admin-data?pages&id=" + a.c.id), 5);
      case 5:
        return c = l.a, w(l, c.json(), 6);
      case 6:
        e = l.a, f = e.error, g = e.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, article:k.article}));
      case 3:
        C(l);
        a.b({f:!1});
        G(l, 0);
        break;
      case 2:
        m = n = B(l), q = m.message, a.b({error:q}), l.m(3);
    }
  });
};
Wb.prototype.a = function(a) {
  var b = this, c, e, f, g, h;
  return H(function(k) {
    switch(k.g) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({G:!0}), x(k, 2, 3), w(k, V("/admin-data?pages", {method:"POST", body:c}), 5);
      case 5:
        return e = k.a, w(k, e.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({H:1});
      case 3:
        C(k);
        b.b({G:!1});
        G(k, 4);
        break;
      case 2:
        h = B(k);
        b.b({error:h});
        k.m(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Wb.prototype.h = function() {
  var a = this, b = this.state.D;
  return K(T, {}, K("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Страницу"), b && this.state.f && K("span", {className:"echo-loader"}, "Loading…"), !(b && this.state.f) && K("form", {ref:function(b) {
    return a.form = b;
  }, onSubmit:this.a.bind(this)}, K(vb, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", i:"Название для администратора.", required:"1"}), K(vb, {i:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), K(vb, {pa:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", i:"Описание страницы.", value:this.state.data.description, required:"1"}), 
  K(Jb, {article:this.state.article, la:function(b) {
    a.b({article:b});
  }}), b && K("input", {value:this.c.id, type:"hidden", name:"id"}), K("button", {disabled:this.state.G, type:"submit", className:"btn btn-primary"}, this.state.G ? "Загрузка..." : b ? "Сохранить" : "Добавить"), this.state.error && K("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.H && K("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", b ? "сохранена" : "создана", "!")));
};
function Xb() {
  O.call(this);
  this.state = {f:!1, data:[]};
}
v(Xb, O);
d = Xb.prototype;
d.u = function() {
  var a = this;
  return H(function(b) {
    return w(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(h) {
    switch(h.g) {
      case 1:
        return a.b({f:!0}), x(h, 2, 3), w(h, V("/admin-data?specials"), 5);
      case 5:
        return b = h.a, w(h, b.json(), 6);
      case 6:
        c = h.a, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        C(h);
        a.b({f:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.m(3);
    }
  });
};
d.B = function(a) {
  this.b({o:a});
};
d.s = function(a) {
  this.b({P:a});
};
d.h = function() {
  var a = this, b = K("details", {}, K("summary", {}, K("h3", {style:"display: inline-block;vertical-align: middle;"}, "Создать Новое Предложение")), K(Yb, {U:function() {
    a.load();
  }, path:"/admin-data?specials", V:"Предложение успешно создано!", C:"Добавить"}));
  return K(T, {}, K("h1", {}, "Специальные Предложения"), K(Zb, {data:this.state.data, f:this.state.f, B:this.B.bind(this), s:this.s.bind(this)}), K("hr"), b, this.state.o && K(Bb, Object.assign({}, this.state.o, {F:this.B.bind(this, null), S:"danger", aa:this.load.bind(this)})), this.state.P && K(Db, {F:this.s.bind(this, null), title:"Редактирование"}, K(Yb, {item:this.state.P, U:this.load.bind(this), F:this.s.bind(this, null), path:"/admin-data?specials", O:"Отмена", V:"Предложение успешно отредактировано!", 
  C:"Сохранить"})));
};
function Zb(a) {
  var b = a.data, c = a.B, e = a.s;
  a = a.f;
  return K("div", {style:"height:25rem;overflow:scroll;background:wheat; padding:0.5rem;"}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет специальных предложений.", b.map(function(a) {
    return K($b, {item:a, key:a._id, B:c, s:e});
  }));
}
function $b(a) {
  var b = a.item, c = a.B, e = a.s, f = b._id, g = b.title;
  a = b.cdnImage;
  var h = b.description, k = b.price, n = "on" == b.show_on_main;
  return K("div", {className:n ? "IsShownOnMain" : "", style:"border-bottom:1px solid brown;border-top:1px solid lightcoral;"}, K("h4", {}, g, " ", n && K("span", {className:"badge badge-danger"}, "На главной")), K("p", {}, K("img", {src:a, style:"display:block;"}), h, K("span", {style:"font-weight: bold;"}, " ", k)), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить предложение ", K("strong", {}, g), "?"), C:"Удалить", title:"Удаление Предложения", path:"specials&id=" + f + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    e(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"fas fa-pen"})));
}
function Yb(a) {
  Nb.apply(this, arguments);
}
v(Yb, Nb);
Yb.prototype.h = function(a) {
  var b = this, c = a.item, e = a.F, f = void 0 === a.O ? "Отмена" : a.O, g = a.V;
  a = void 0 === a.C ? "Добавить" : a.C;
  var h = c || {}, k = this.state.G;
  return K(X, {ba:this.a.bind(this), l:function() {
    b.b({error:null, H:null});
  }}, K(Y, {label:"Название", i:"Заголовок для главной страницы, напр., Ленинский проспект, дом 114"}, K(Z.I, {value:h.title, placeholder:"Название акции", name:"title", required:1})), K(Y, {label:"Описание", i:"Введите описание акции..."}, K(Z.fa, {required:!0, name:"description", placeholder:"Описание акции"}, h.description)), K(Mb, {D:c, i:"Картинка, отображаемая на главной странице.", required:1, image:h.cdnImage}), K(Y, {label:"Цена", i:"Задайте цену..."}, K(Z.I, {value:h.price, name:"price", 
  placeholder:"55 000 000 руб."})), K(Y, {label:"Переход", i:"Ссылка на страницу каталога, или сайта."}, K(Z.I, {value:h.href, name:"href", placeholder:"/каталог/москва-элитная/лениниский-проспект-дом-114"})), K(Y, {i:"Добавить в специальные предложения на главной."}, K(xb, {value:h.show_on_main, label:"Отображать на главной", name:"show_on_main"})), c && K("input", {value:h._id, type:"hidden", name:"id"}), K(yb, {error:this.state.error}), K(zb, {H:this.state.H, message:g}), K("button", {disabled:k, 
  type:"submit", className:"btn btn-primary"}, k ? "Загрузка..." : a), e && K("button", {onClick:e, type:"button", className:"FormCancelBtn btn btn-secondary"}, f));
};
function ac() {
  return K(T, {}, K("h1", {}, "Добро Пожаловать!"));
}
;var bc = K(function() {
  return K(tb, {id:"App"}, K(T, {className:"col-md-4"}, K(Ab)), K(qb, {l:function(a) {
    a.current && a.current.attributes.title && (document.title = a.current.attributes.title);
  }}, K(ac, {path:"/admin", title:"Главная"}), K(Rb, {path:"/admin/objects", title:"Объекты Недвижимости"}), K(Ob, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), K(Eb, {path:"/admin/categories", title:"Категории Каталога"}), K(Lb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), K(Ub, {path:"/admin/pages", title:"Статьи"}), K(Wb, {path:"/admin/add-page/:id?", title:"Добавить Страницу"}), K(Xb, {path:"/admin/special", title:"Специальные Предложения"})));
});
Ta(document.querySelector("#App"), bc, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map