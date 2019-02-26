var e;
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
    var ka = {Aa:!0}, la = {};
    try {
      la.__proto__ = ka;
      ja = la.Aa;
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
    var c = p;
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
    this.A = void 0;
    this.a = [];
    var b = this.i();
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
      this.i(function() {
        b.A();
      });
    }
    this.a.push(a);
  };
  var f = p.setTimeout;
  c.prototype.i = function(a) {
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
          this.u(m);
        }
      }
    }
    this.a = null;
  };
  c.prototype.u = function(a) {
    this.i(function() {
      throw a;
    });
  };
  b.prototype.i = function() {
    function a(a) {
      return function(d) {
        c || (c = !0, a.call(b, d));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.Ja), reject:a(this.u)};
  };
  b.prototype.Ja = function(a) {
    if (a === this) {
      this.u(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof b) {
        this.Ka(a);
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
        c ? this.X(a) : this.G(a);
      }
    }
  };
  b.prototype.X = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (n) {
      this.u(n);
      return;
    }
    "function" == typeof b ? this.Ma(b, a) : this.G(a);
  };
  b.prototype.u = function(a) {
    this.H(2, a);
  };
  b.prototype.G = function(a) {
    this.H(1, a);
  };
  b.prototype.H = function(a, b) {
    if (0 != this.f) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.f);
    }
    this.f = a;
    this.A = b;
    this.N();
  };
  b.prototype.N = function() {
    if (null != this.a) {
      for (var a = 0; a < this.a.length; ++a) {
        g.f(this.a[a]);
      }
      this.a = null;
    }
  };
  var g = new c;
  b.prototype.Ka = function(a) {
    var b = this.i();
    a.V(b.resolve, b.reject);
  };
  b.prototype.Ma = function(a, b) {
    var c = this.i();
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
        } catch (C) {
          g(C);
        }
      } : b;
    }
    var f, g, h = new b(function(a, b) {
      f = a;
      g = b;
    });
    this.V(d(a, f), d(c, g));
    return h;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.V = function(a, b) {
    function c() {
      switch(d.f) {
        case 1:
          a(d.A);
          break;
        case 2:
          b(d.A);
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
        d(g.value).V(b, c);
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
        h.push(void 0), k++, d(f.value).V(g(h.length - 1), b), f = c.next();
      } while (!f.done);
    });
  };
  return b;
});
function oa() {
  this.H = !1;
  this.u = null;
  this.a = void 0;
  this.f = 1;
  this.A = this.G = 0;
  this.X = this.i = null;
}
function pa(a) {
  if (a.H) {
    throw new TypeError("Generator is already running");
  }
  a.H = !0;
}
oa.prototype.N = function(a) {
  this.a = a;
};
function qa(a, b) {
  a.i = {va:b, xa:!0};
  a.f = a.G || a.A;
}
oa.prototype.return = function(a) {
  this.i = {return:a};
  this.f = this.A;
};
function x(a, b, c) {
  a.f = c;
  return {value:b};
}
oa.prototype.o = function(a) {
  this.f = a;
};
function A(a, b, c) {
  a.G = b;
  void 0 != c && (a.A = c);
}
function B(a) {
  a.G = 0;
  var b = a.i.va;
  a.i = null;
  return b;
}
function F(a) {
  a.X = [a.i];
  a.G = 0;
  a.A = 0;
}
function G(a, b) {
  var c = a.X.splice(0)[0];
  (c = a.i = a.i || c) ? c.xa ? a.f = a.G || a.A : void 0 != c.o && a.A < c.o ? (a.f = c.o, a.i = null) : a.f = a.A : a.f = b;
}
function ra(a) {
  this.a = new oa;
  this.f = a;
}
function sa(a, b) {
  pa(a.a);
  var c = a.a.u;
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
    var f = b.call(a.a.u, c);
    if (!(f instanceof Object)) {
      throw new TypeError("Iterator result " + f + " is not an object");
    }
    if (!f.done) {
      return a.a.H = !1, f;
    }
    var g = f.value;
  } catch (h) {
    return a.a.u = null, qa(a.a, h), ua(a);
  }
  a.a.u = null;
  d.call(a.a, g);
  return ua(a);
}
function ua(a) {
  for (; a.a.f;) {
    try {
      var b = a.f(a.a);
      if (b) {
        return a.a.H = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.a.a = void 0, qa(a.a, c);
    }
  }
  a.a.H = !1;
  if (a.a.i) {
    b = a.a.i;
    a.a.i = null;
    if (b.xa) {
      throw b.va;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function va(a) {
  this.next = function(b) {
    pa(a.a);
    a.a.u ? b = ta(a, a.a.u.next, b, a.a.N) : (a.a.N(b), b = ua(a));
    return b;
  };
  this.throw = function(b) {
    pa(a.a);
    a.a.u ? b = ta(a, a.a.u["throw"], b, a.a.N) : (qa(a.a, b), b = ua(a));
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
function H(a) {
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
var I = {}, Aa = [], Ba = [];
function J(a, b) {
  var c = Ba, d, f;
  for (f = arguments.length; 2 < f--;) {
    Aa.push(arguments[f]);
  }
  b && null != b.children && (Aa.length || Aa.push(b.children), delete b.children);
  for (; Aa.length;) {
    if ((d = Aa.pop()) && void 0 !== d.pop) {
      for (f = d.length; f--;) {
        Aa.push(d[f]);
      }
    } else {
      "boolean" === typeof d && (d = null);
      if (f = "function" !== typeof a) {
        null == d ? d = "" : "number" === typeof d ? d = String(d) : "string" !== typeof d && (f = !1);
      }
      f && g ? c[c.length - 1] += d : c === Ba ? c = [d] : c.push(d);
      var g = f;
    }
  }
  g = new za;
  g.nodeName = a;
  g.children = c;
  g.attributes = null == b ? void 0 : b;
  g.key = null == b ? void 0 : b.key;
  void 0 !== I.Na && I.Na(g);
  return g;
}
function K(a, b) {
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
  return J(a.nodeName, K(K({}, a.attributes), b), 2 < arguments.length ? [].slice.call(arguments, 2) : a.children);
}
var Fa = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, Ga = [];
function Ha(a) {
  !a.S && (a.S = !0) && 1 == Ga.push(a) && (I.Qa || Da)(Ja);
}
function Ja() {
  for (var a; a = Ga.pop();) {
    a.S && Ka(a);
  }
}
function La(a) {
  var b = K({}, a.attributes);
  b.children = a.children;
  a = a.nodeName.Ra;
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
function Na(a, b, c, d) {
  var f = M;
  "className" === b && (b = "class");
  if ("key" !== b) {
    if ("ref" === b) {
      Ca(c, null), Ca(d, a);
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
              a.style[g] = "number" === typeof d[g] && !1 === Fa.test(g) ? d[g] + "px" : d[g];
            }
          }
        } else {
          if ("dangerouslySetInnerHTML" === b) {
            d && (a.innerHTML = d.ba || "");
          } else {
            if ("o" == b[0] && "n" == b[1]) {
              f = b !== (b = b.replace(/Capture$/, "")), b = b.toLowerCase().substring(2), d ? c || a.addEventListener(b, Oa, f) : a.removeEventListener(b, Oa, f), (a.na || (a.na = {}))[b] = d;
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
function Oa(a) {
  return this.na[a.type](I.event && I.event(a) || a);
}
var Pa = [], Qa = 0, M = !1, Ra = !1;
function Sa() {
  for (var a; a = Pa.shift();) {
    I.Ba && I.Ba(a), a.w && a.w();
  }
}
function Ta(a, b, c, d, f, g) {
  Qa++ || (M = null != f && void 0 !== f.Ta, Ra = null != a && !("__preactattr_" in a));
  a = Ua(a, b, c, d, g);
  f && a.parentNode !== f && f.appendChild(a);
  --Qa || (Ra = !1, g || Sa());
  return a;
}
function Ua(a, b, c, d, f) {
  var g = a, h = M;
  if (null == b || "boolean" === typeof b) {
    b = "";
  }
  if ("string" === typeof b || "number" === typeof b) {
    return a && void 0 !== a.splitText && a.parentNode && (!a.v || f) ? a.nodeValue != b && (a.nodeValue = b) : (g = document.createTextNode(b), a && (a.parentNode && a.parentNode.replaceChild(g, a), N(a, !0))), g.__preactattr_ = !0, g;
  }
  f = b.nodeName;
  if ("function" === typeof f) {
    h = a;
    var k = b;
    g = b = h && h.v;
    var n = h, m = b && h.ca === k.nodeName, q = m;
    for (a = La(k); b && !q && (b = b.oa);) {
      q = b.constructor === k.nodeName;
    }
    b && q && (!d || b.v) ? (Va(b, a, 3, c, d), h = b.C) : (g && !m && (Wa(g), h = n = null), b = Xa(k.nodeName, a, c), h && !b.I && (b.I = h, n = null), Va(b, a, 1, c, d), h = b.C, n && h !== n && (n.v = null, N(n, !1)));
    return h;
  }
  M = "svg" === f ? !0 : "foreignObject" === f ? !1 : M;
  f = String(f);
  if (!a || a.ya !== f && a.nodeName.toLowerCase() !== f.toLowerCase()) {
    if (g = f, f = M ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g), f.ya = g, g = f, a) {
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
    for (var t = g.attributes, E = t.length; E--;) {
      a[t[E].name] = t[E].value;
    }
  }
  if (!Ra && f && 1 === f.length && "string" === typeof f[0] && null != l && void 0 !== l.splitText && null == l.nextSibling) {
    l.nodeValue != f[0] && (l.nodeValue = f[0]);
  } else {
    if (f && f.length || null != l) {
      l = g;
      t = Ra || null != a.Pa;
      E = l.childNodes;
      var L = [], C = {}, y = 0, w = 0, u = E.length, V = 0, Ia = f ? f.length : 0;
      if (0 !== u) {
        for (q = 0; q < u; q++) {
          var z = E[q], P = z.__preactattr_;
          var D = Ia && P ? z.v ? z.v.la : P.key : null;
          if (null != D) {
            y++, C[D] = z;
          } else {
            if (P || (void 0 !== z.splitText ? t ? z.nodeValue.trim() : 1 : t)) {
              L[V++] = z;
            }
          }
        }
      }
      if (0 !== Ia) {
        for (q = 0; q < Ia; q++) {
          u = f[q];
          m = null;
          D = u.key;
          if (null != D) {
            y && void 0 !== C[D] && (m = C[D], C[D] = void 0, y--);
          } else {
            if (w < V) {
              for (D = w; D < V; D++) {
                if (z = void 0 !== L[D]) {
                  if (z = n = L[D], "string" === typeof u || "number" === typeof u) {
                    z = void 0 !== z.splitText;
                  } else {
                    if ("string" === typeof u.nodeName) {
                      if (P = !z.ca) {
                        P = u.nodeName, P = z.ya === P || z.nodeName.toLowerCase() === P.toLowerCase();
                      }
                      z = P;
                    } else {
                      z = t || z.ca === u.nodeName;
                    }
                  }
                }
                if (z) {
                  m = n;
                  L[D] = void 0;
                  D === V - 1 && V--;
                  D === w && w++;
                  break;
                }
              }
            }
          }
          m = Ua(m, u, c, d);
          u = E[q];
          m && m !== l && m !== u && (null == u ? l.appendChild(m) : m === u.nextSibling ? Ma(u) : l.insertBefore(m, u));
        }
      }
      if (y) {
        for (q in C) {
          void 0 !== C[q] && N(C[q], !1);
        }
      }
      for (; w <= V;) {
        void 0 !== (m = L[V--]) && N(m, !1);
      }
    }
  }
  c = g;
  d = b.attributes;
  b = a;
  for (k in b) {
    d && null != d[k] || null == b[k] || Na(c, k, b[k], b[k] = void 0);
  }
  for (k in d) {
    "children" === k || "innerHTML" === k || k in b && d[k] === ("value" === k || "checked" === k ? c[k] : b[k]) || Na(c, k, b[k], b[k] = d[k]);
  }
  M = h;
  return g;
}
function N(a, b) {
  var c = a.v;
  c ? Wa(c) : (null != a.__preactattr_ && Ca(a.__preactattr_.$, null), !1 !== b && null != a.__preactattr_ || Ma(a), Ya(a));
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
  var d = Za.length;
  if (a.prototype && a.prototype.h) {
    var f = new a(b, c);
    O.call(f, b, c);
  } else {
    f = new O(b, c), f.constructor = a, f.h = $a;
  }
  for (; d--;) {
    if (Za[d].constructor === a) {
      f.I = Za[d].I;
      Za.splice(d, 1);
      break;
    }
  }
  return f;
}
function $a(a, b, c) {
  return this.constructor(a, c);
}
function Va(a, b, c, d, f) {
  a.T || (a.T = !0, a.ma = b.$, a.la = b.key, delete b.$, delete b.key, "undefined" === typeof a.constructor.wa && (!a.C || f ? a.ta && a.ta() : a.Fa && a.Fa(b, d)), d && d !== a.context && (a.ga || (a.ga = a.context), a.context = d), a.ha || (a.ha = a.c), a.c = b, a.T = !1, 0 !== c && (1 !== c && !1 === I.Ya && a.C ? Ha(a) : Ka(a, 1, f)), Ca(a.ma, a));
}
function Ka(a, b, c, d) {
  if (!a.T) {
    var f = a.c, g = a.state, h = a.context, k = a.ha || f, n = a.ia || g, m = a.ga || h, q = a.C, l = a.I, t = q || l, E = a.v, L = !1, C = m, y;
    a.constructor.wa && (g = K(K({}, g), a.constructor.wa(f, g)), a.state = g);
    q && (a.c = k, a.state = n, a.context = m, 2 !== b && a.R && !1 === a.R(f, g, h) ? L = !0 : a.ua && a.ua(f, g, h), a.c = f, a.state = g, a.context = h);
    a.ha = a.ia = a.ga = a.I = null;
    a.S = !1;
    if (!L) {
      f = a.h(f, g, h);
      a.ea && (h = K(K({}, h), a.ea()));
      q && a.Ia && (C = a.Ia(k, n));
      g = f && f.nodeName;
      if ("function" === typeof g) {
        var w = La(f);
        if ((y = E) && y.constructor === g && w.key == y.la) {
          Va(y, w, 1, h, !1);
        } else {
          var u = y;
          a.v = y = Xa(g, w, h);
          y.I = y.I || l;
          y.oa = a;
          Va(y, w, 0, h, !1);
          Ka(y, 1, c, !0);
        }
        w = y.C;
      } else {
        l = t;
        if (u = E) {
          l = a.v = null;
        }
        if (t || 1 === b) {
          l && (l.v = null), w = Ta(l, f, h, c || !q, t && t.parentNode, !0);
        }
      }
      t && w !== t && y !== E && (h = t.parentNode) && w !== h && (h.replaceChild(w, t), u || (t.v = null, N(t, !1)));
      u && Wa(u);
      if ((a.C = w) && !d) {
        for (u = t = a; u = u.oa;) {
          (t = u).C = w;
        }
        w.v = t;
        w.ca = t.constructor;
      }
    }
    !q || c ? Pa.push(a) : L || (a.sa && a.sa(k, n, C), I.Ca && I.Ca(a));
    for (; a.U.length;) {
      a.U.pop().call(a);
    }
    Qa || d || Sa();
  }
}
function Wa(a) {
  I.Da && I.Da(a);
  var b = a.C;
  a.T = !0;
  a.da && a.da();
  a.C = null;
  var c = a.v;
  c ? Wa(c) : b && (null != b.__preactattr_ && Ca(b.__preactattr_.$, null), a.I = b, Ma(b), Za.push(a), Ya(b));
  Ca(a.ma, null);
}
function O(a, b) {
  this.S = !0;
  this.context = b;
  this.c = a;
  this.state = this.state || {};
  this.U = [];
}
K(O.prototype, {b:function(a, b) {
  this.ia || (this.ia = this.state);
  this.state = K(K({}, this.state), "function" === typeof a ? a(this.state, this.c) : a);
  b && this.U.push(b);
  Ha(this);
}, Ga:function(a) {
  a && this.U.push(a);
  Ka(this, 2);
}, h:function() {
}});
var ab = {};
function bb(a, b) {
  return a.Z < b.Z ? 1 : a.Z > b.Z ? -1 : a.index - b.index;
}
function cb(a, b) {
  try {
    return a.index = b, a.Z = a.attributes.default ? 0 : db(a.attributes.path).map(eb).join(""), a.attributes;
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
;var Q = null, R = [], fb = [];
function gb() {
  var a;
  Q && Q.location ? a = Q.location : Q && Q.Ha ? a = Q.Ha() : a = "undefined" !== typeof location ? location : {};
  return "" + (a.pathname || "") + (a.search || "");
}
function hb(a) {
  for (var b = !1, c = 0; c < R.length; c++) {
    !0 === ib(R[c], a) && (b = !0);
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
        for (var d = R.length; d--;) {
          if (0 < kb(R[d].c.children, a, !1).length) {
            a = !0;
            break a;
          }
        }
        a = !1;
      }
      if (a) {
        if (a = b, c = c ? "replace" : "push", c = void 0 === c ? "push" : c, Q && Q[c]) {
          Q[c](a);
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
  ob || ("function" === typeof addEventListener && (Q || addEventListener("popstate", function() {
    hb(gb());
  }), addEventListener("click", nb)), ob = !0);
}
function qb(a) {
  O.call(this, a);
  a.history && (Q = a.history);
  this.state = {url:a.url || gb()};
  pb();
}
v(qb, O);
e = qb.prototype;
e.R = function(a) {
  return !0 !== a.Wa ? !0 : a.url !== this.c.url || a.s !== this.c.s;
};
function ib(a, b) {
  a.a = !1;
  a.b({url:b});
  if (a.updating) {
    return 0 < kb(a.c.children, b, !1).length;
  }
  a.Ga();
  return a.a;
}
e.ta = function() {
  R.push(this);
  this.updating = !0;
};
e.w = function() {
  var a = this;
  Q && (this.f = Q.Sa(function(b) {
    ib(a, "" + (b.pathname || "") + (b.search || ""));
  }));
  this.updating = !1;
};
e.da = function() {
  "function" === typeof this.f && this.f();
  R.splice(R.indexOf(this), 1);
};
e.ua = function() {
  this.updating = !0;
};
e.sa = function() {
  this.updating = !1;
};
function kb(a, b, c) {
  return a.filter(cb).sort(bb).map(function(a) {
    var d = b;
    var g = a.attributes.path, h = a.attributes, k = /(?:\?([^#]*))?(#.*)?$/, n = d.match(k), m = {};
    if (n && n[1]) {
      n = n[1].split("&");
      for (var q = 0; q < n.length; q++) {
        var l = n[q].split("=");
        m[decodeURIComponent(l[0])] = decodeURIComponent(l.slice(1).join("="));
      }
    }
    d = db(d.replace(k, ""));
    g = db(g || "");
    k = Math.max(d.length, g.length);
    for (n = 0; n < k; n++) {
      if (g[n] && ":" === g[n].charAt(0)) {
        q = g[n].replace(/(^:|[+*?]+$)/g, "");
        l = (g[n].match(/[+*?]+$/) || ab)[0] || "";
        var t = ~l.indexOf("+"), E = ~l.indexOf("*"), L = d[n] || "";
        if (!L && !E && (0 > l.indexOf("?") || t)) {
          var C = !1;
          break;
        }
        m[q] = decodeURIComponent(L);
        if (t || E) {
          m[q] = d.slice(n).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (g[n] !== d[n]) {
          C = !1;
          break;
        }
      }
    }
    if (d = !0 !== h.default && !1 === C ? !1 : m) {
      return !1 !== c ? (d = Object.assign({}, {url:b, matches:d}, d), delete d.$, delete d.key, Ea(a, d)) : a;
    }
  }).filter(Boolean);
}
e.h = function(a, b) {
  var c = a.s;
  b = b.url;
  a = kb(a.children, b, !0);
  var d = a[0] || null;
  this.a = !!d;
  var f = this.i;
  b !== f && (this.i = b, "function" === typeof c && c({Va:this, url:b, Ua:f, active:a, current:d}));
  return d;
};
function rb(a) {
  return J("a", Object.assign({}, a, {onClick:lb}));
}
function sb() {
  O.call(this);
  this.a = this.a.bind(this);
}
v(sb, O);
sb.prototype.a = function(a) {
  this.f = a;
  this.b({});
};
sb.prototype.w = function() {
  fb.push(this.a);
};
sb.prototype.da = function() {
  fb.splice(fb.indexOf(this.a) >>> 0, 1);
};
sb.prototype.h = function(a) {
  var b = this.f || gb(), c = b.replace(/\?.+$/, "");
  this.f = null;
  var d = a.children.filter(function(a) {
    return "function" == typeof a;
  });
  return d[0] && d[0]({url:b, path:c, matches:c === a.path});
};
function S(a) {
  var b = Object.assign({}, a), c = void 0 === a.pa ? "active" : a.pa;
  a = a.path;
  var d = (delete b.pa, delete b.path, b);
  return J(sb, {path:a || d.href}, function(a) {
    return J(rb, Object.assign({}, d, {className:[d.Oa || d.className, a.matches && c].filter(Boolean).join(" ")}));
  });
}
;function tb(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return J("div", Object.assign({}, b, {className:"row" + (a ? " " + a : "")}), c);
}
function T(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return J("div", Object.assign({}, b, {className:"col" + (a ? " " + a : "")}), c);
}
function ub(a) {
  var b = a.ka, c = a.type, d = a.value;
  a = {required:a.required, name:a.name, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), id:a.id, "aria-describedby":a.F};
  return b ? J("textarea", Object.assign({}, a, {rows:"number" == typeof b ? b : 3}), d) : J("input", Object.assign({}, a, d ? {value:d} : {}, {type:c}));
}
function vb(a) {
  var b = a.label, c = void 0 === a.type ? "text" : a.type, d = a.placeholder, f = a.j, g = a.ka, h = a.file, k = a.options, n = a.La, m = "i" + 100000 * Math.random(), q = "h" + m;
  a = {F:q, id:m, value:a.value, name:a.name, required:a.required};
  c = k ? J(wb, Object.assign({}, a, {options:k, La:n})) : J(ub, Object.assign({}, a, {ka:g, placeholder:d, type:c, file:h}));
  return J("div", {className:"form-group"}, J("label", {htmlFor:m}, b), c, f && J("small", {id:q, dangerouslySetInnerHTML:{ba:f}, className:"form-text text-muted"}));
}
function wb(a) {
  var b = a.options, c = a.value;
  return J("select", {name:a.name, value:c, required:a.required, className:"custom-select", id:a.id, "aria-describedby":a.F}, J("option"), b.map(function(a) {
    var b = a.value;
    return J("option", {key:b, value:b, selected:b == c}, a.title);
  }));
}
function U(a) {
  return J("span", {}, J("i", {className:a.icon}), " ");
}
;function xb() {
  return J("nav", {className:"nav flex-column"}, J(S, {className:"nav-link", href:"/admin"}, J("i", {className:"fab fa-kickstarter-k"}), " Главная"), J(S, {className:"nav-link", href:"/admin/objects"}, J("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), J(S, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, J("i", {className:"fas fa-home"}), " Новая Недвижимость"), J(S, {className:"nav-link", href:"/admin/categories"}, J("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), J(S, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, J("i", {className:"fas fa-folder-plus"}), " Добавить"), J(S, {className:"nav-link", href:"/admin/pages"}, J("i", {className:"fas fa-font"}), " Статьи"), J(S, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, J("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), J(S, {className:"nav-link", href:"/admin/special"}, J("i", {className:"fas fa-bolt"}), " Специальные Предложения"), 
  J(S, {className:"nav-link", href:"/admin/offers"}, J("i", {className:"fas fa-grip-lines"}), " Акции"));
}
;function W(a, b) {
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
;function yb() {
  O.call(this);
  this.state = {g:!1};
}
v(yb, O);
function zb(a) {
  var b, c, d, f;
  return H(function(g) {
    switch(g.f) {
      case 1:
        return a.b({g:!0}), A(g, 2, 3), x(g, fetch("/admin-data?" + a.c.path, {method:"POST"}), 5);
      case 5:
        return b = g.a, x(g, b.json(), 6);
      case 6:
        c = g.a, (d = c.error) ? a.b({error:d}) : (a.c.O(), a.c.Y());
      case 3:
        F(g);
        a.b({g:!1});
        G(g, 0);
        break;
      case 2:
        f = B(g), a.b({error:f}), g.o(3);
    }
  });
}
yb.prototype.h = function() {
  var a = this, b = this.c, c = b.text, d = b.O, f = void 0 === b.M ? "primary" : b.M, g = b.W, h = void 0 === b.Ea ? "Отмена" : b.Ea;
  return J("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, J("div", {className:"modal-dialog", role:"document"}, J("div", {className:"modal-content"}, J("div", {className:"modal-header"}, J("h5", {className:"modal-title"}, b.title), J("button", {onClick:d, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, J("span", {"aria-hidden":"true"}, "×"))), J("div", {className:"modal-body"}, J("p", {}, c)), J("div", {className:"modal-footer"}, 
  J("button", {onClick:d, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, h), J("button", {disabled:this.state.g, type:"button", className:"btn btn-" + f, onClick:function() {
    return zb(a);
  }}, this.state.g ? "Отправка..." : g)))));
};
function Ab() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
v(Ab, O);
Ab.prototype.w = function() {
  var a = this;
  return H(function(b) {
    return x(b, a.load(), 0);
  });
};
Ab.prototype.load = function() {
  var a = this, b, c, d, f, g;
  return H(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), A(h, 2, 3), x(h, W("/admin-data?categories"), 5);
      case 5:
        return b = h.a, x(h, b.json(), 6);
      case 6:
        c = h.a, d = c.error, f = c.data, d ? a.b({error:d}) : a.b({data:f});
      case 3:
        F(h);
        a.b({g:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.o(3);
    }
  });
};
Ab.prototype.h = function() {
  var a = this;
  return J(T, {}, J("h1", {}, "Категории Каталога"), J("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), this.state.g && J("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return J(Bb, Object.assign({}, c, {key:b, id:b, P:function() {
      return a.load();
    }}));
  }));
};
function Bb() {
  O.call(this);
  this.state = {l:null};
}
v(Bb, O);
Bb.prototype.h = function() {
  var a = this, b = this.c, c = b.title, d = b.description, f = b.seo, g = b.id, h = b.P;
  return J(tb, {className:"CategoryRow"}, J(T, {className:"col-3 col-sm-4 "}, J("img", {src:b.image, className:"img-fluid p-1"})), J(T, {}, J("h2", {}, c), J("em", {}, "knedv.ru/", f), J("p", {}, d)), J(T, {className:"col-1 CategoryMeta"}, J("a", {href:"/admin/add-category/" + g, style:"color:brown;"}, J(U, {icon:"fas fa-pen"})), J("br"), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({l:{text:J("span", {}, "Вы действительно хотите удалить категорию ", J("strong", {}, c), "?"), W:"Удалить", title:"Удаление Категории", path:"categories&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, J(U, {icon:"far fa-trash-alt"}))), this.state.l && J(yb, Object.assign({}, this.state.l, {O:function() {
    a.b({l:null});
  }, M:"danger", Y:h})));
};
function Cb() {
  O.call(this);
  this.c = this.c;
}
v(Cb, O);
Cb.prototype.R = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Cb.prototype.w = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.s;
  c && void 0 !== b && c(a, b);
};
Cb.prototype.h = function(a) {
  var b = a.options, c = a.name, d = a.value, f = this.context, g = f.s, h = void 0 === f.values ? {} : f.values;
  return J("select", {name:c, value:c in h ? h[c] : d, required:a.required, className:"custom-select", id:f.id, "aria-describedby":f.F, onChange:function(a) {
    g(c, a.currentTarget.value);
  }}, J("option"), b.map(function(a) {
    var b = a.value;
    return J("option", {key:b, value:b, selected:b == d}, a.title);
  }));
};
function Db() {
  O.call(this);
  this.c = this.c;
}
v(Db, O);
Db.prototype.R = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Db.prototype.w = function() {
  var a = this.c, b = r(a.children).next().value;
  a = a.name;
  var c = this.context.s;
  b && c(a, b.trim());
};
Db.prototype.h = function(a) {
  var b = a.name, c = a.children, d = this.context, f = d.s, g = void 0 === d.values ? {} : d.values;
  return J("textarea", {required:a.required, name:b, placeholder:a.placeholder, "aria-describedby":d.F, className:"form-control", id:d.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }, rows:void 0 === a.rows ? 3 : a.rows}, b in g ? g[b] : c);
};
function Eb() {
  O.call(this);
  this.c = this.c;
}
v(Eb, O);
Eb.prototype.R = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Eb.prototype.w = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.s;
  void 0 !== b && c(a, b);
};
Eb.prototype.h = function(a) {
  var b = a.required, c = a.name, d = a.placeholder, f = void 0 === a.type ? "text" : a.type, g = a.file;
  a = a.value;
  console.log("required: %s", b);
  var h = this.context, k = h.s, n = void 0 === h.values ? {} : h.values;
  return J("input", {required:b, name:c, placeholder:d, className:"form-control" + (g ? "-file" : ""), value:c in n ? n[c] : a, type:f, "aria-describedby":h.F, id:h.id, onChange:function(a) {
    k(c, a.currentTarget.value);
  }});
};
function X() {
  O.call(this);
  this.state = {values:{}};
  this.c = this.c;
}
v(X, O);
X.prototype.ea = function() {
  return {values:this.state.values, s:this.s.bind(this)};
};
X.prototype.s = function(a, b) {
  var c = {};
  this.b({values:Object.assign({}, this.state.values, (c[a] = b, c))});
  this.c.s && this.c.s(this.state.values);
};
X.prototype.h = function(a) {
  var b = Object.assign({}, a), c = a.children, d = a.J;
  a = a.K;
  b = (delete b.children, delete b.J, delete b.K, b);
  return J("form", Object.assign({}, b, {ref:d, onSubmit:a}), c);
};
function Y() {
  O.call(this);
  this.id = "i" + Math.floor(100000 * Math.random());
  this.F = "h" + this.id;
  this.c = this.c;
}
v(Y, O);
Y.prototype.ea = function() {
  return {id:this.id, F:this.F};
};
Y.prototype.h = function() {
  var a = this.c, b = a.children, c = a.label;
  a = a.j;
  return J("div", {className:"form-group"}, c && J("label", {htmlFor:this.id}, c), b, a && J("small", {id:this.F, dangerouslySetInnerHTML:{ba:a}, className:"form-text text-muted"}));
};
var Z = {get za() {
  return Cb;
}, get aa() {
  return Db;
}, get B() {
  return Eb;
}};
function Fb(a) {
  var b = a.article, c = a.fa;
  return J("div", {className:"form-group"}, J("label", {}, "Статья"), J("div", {dangerouslySetInnerHTML:{ba:b}, style:"background: #edeee8;", className:"mb-3"}), J("a", {onClick:function(a) {
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
  O.call(this);
  this.state = {g:!1, data:{}, hint:"москва-новостройки", article:""};
}
v(Hb, O);
Hb.prototype.w = function() {
  var a = this, b, c, d, f, g, h, k, n;
  return H(function(m) {
    switch(m.f) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return m.return();
        }
        a.b({D:1, g:!0});
        A(m, 2, 3);
        return x(m, W("/admin-data?categories&id=" + a.c.id), 5);
      case 5:
        return c = m.a, x(m, c.json(), 6);
      case 6:
        d = m.a, f = d.error, g = d.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, hint:k.seo, article:k.article}));
      case 3:
        F(m);
        a.b({g:!1});
        G(m, 0);
        break;
      case 2:
        n = B(m), a.b({error:n}), m.o(3);
    }
  });
};
Hb.prototype.a = function(a) {
  var b = this, c, d, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({m:!0}), A(k, 2, 3), x(k, W("/admin-data?categories", {method:"POST", body:c}), 5);
      case 5:
        return d = k.a, x(k, d.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({L:1});
      case 3:
        F(k);
        b.b({m:!1});
        G(k, 4);
        break;
      case 2:
        h = B(k);
        b.b({error:h});
        k.o(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Hb.prototype.h = function() {
  var a = this, b = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.", c = this.state, d = c.D;
  c = c.ja;
  return J(T, {}, J("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Категорию"), d && this.state.g && J("span", {className:"echo-loader"}, "Loading…"), !(d && this.state.g) && J(X, {s:function(a) {
    console.log(a);
    console.log(a.seo);
  }, J:function(b) {
    a.form = b;
  }, K:this.a.bind(this)}, J(Y, {label:"Название", j:"Название для меню слева."}, J(Z.B, {value:this.state.data.title, name:"title", placeholder:"Москва Новостройки", required:!0})), J(Y, {j:b, label:"СЕО Название"}, J(Z.B, {required:!0, value:this.state.data.seo, name:"seo", placeholder:"москва-новостройки"})), J(Y, {label:"Описание", j:"Краткое описание для главной страницы."}, J(Z.aa, {required:!0, rows:"3", name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  this.state.data.description)), d && !c && J(Y, {label:"Изображение"}, J("br"), J("img", {src:this.state.data.cdnImage, className:"img-fluid"}), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({ja:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!d || c) && J(Y, {label:"Изображение", j:"Картинка, отображаемая на главной странице."}, J(Z.B, {required:!0, name:"image", type:"file", file:"1"})), J(Fb, {article:this.state.article, fa:function(b) {
    a.b({article:b});
  }}), d && J("input", {value:this.c.id, type:"hidden", name:"id"}), J("button", {disabled:this.state.m, type:"submit", className:"btn btn-primary"}, this.state.m ? "Загрузка..." : d ? "Сохранить" : "Добавить"), this.state.error && J("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.L && J("div", {className:"alert alert-success mt-3", role:"alert"}, "Категория успешно ", d ? "сохранена" : "создана", "!")));
};
function Ib() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
v(Ib, O);
Ib.prototype.w = function() {
  var a = this;
  return H(function(b) {
    return x(b, a.load(), 0);
  });
};
Ib.prototype.load = function() {
  var a = this, b, c, d, f, g;
  return H(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), A(h, 2, 3), x(h, W("/admin-data?objects"), 5);
      case 5:
        return b = h.a, x(h, b.json(), 6);
      case 6:
        c = h.a, d = c.error, f = c.data, d ? a.b({error:d}) : a.b({data:f});
      case 3:
        F(h);
        a.b({g:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.o(3);
    }
  });
};
Ib.prototype.h = function() {
  var a = this;
  return J(T, {}, J("h1", {}, "Объекты Недвижимости"), J("p", {}, "На сайт добалены следующие объекты:"), this.state.g && J("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return J(Jb, Object.assign({}, c, {key:b, id:b, P:function() {
      return a.load();
    }}));
  }));
};
function Jb() {
  O.call(this);
  this.state = {l:null};
}
v(Jb, O);
Jb.prototype.h = function() {
  var a = this, b = this.c, c = b.title, d = b.description, f = b.seo, g = b.id, h = b.P, k = b.categorySeo;
  return J(tb, {className:"CategoryRow"}, J(T, {className:"col-3 col-sm-4 "}, J("img", {src:b.image, className:"img-fluid p-1"})), J(T, {}, J("h2", {}, c), J("em", {}, "knedv.ru/", k, "/", f), J("p", {}, d)), J(T, {className:"col-1 CategoryMeta"}, J("a", {href:"/admin/add-object/" + g, style:"color:brown;"}, J(U, {icon:"fas fa-pen"})), J("br"), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({l:{text:J("span", {}, "Вы действительно хотите удалить объект ", J("strong", {}, c), "?"), W:"Удалить", title:"Удаление Объекта", path:"objects&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, J(U, {icon:"far fa-trash-alt"}))), this.state.l && J(yb, Object.assign({}, this.state.l, {O:function() {
    a.b({l:null});
  }, M:"danger", Y:h})));
};
function Kb() {
  O.call(this);
  this.state = {g:!1, data:{}, ra:[], hint:"1-комнатные-апартаменты-воскресенское", qa:"апартаменты", article:""};
}
v(Kb, O);
function Lb(a) {
  var b, c, d, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        return a.b({g:!0}), A(k, 2, 3), x(k, W("/admin-data?categories"), 5);
      case 5:
        return b = k.a, x(k, b.json(), 6);
      case 6:
        c = k.a, d = c.error, f = c.data, d ? a.b({error:d}) : (g = f.map(function(a) {
          return {value:a._id, title:a.title};
        }), a.b({ra:g}));
      case 3:
        F(k);
        a.b({g:!1});
        G(k, 0);
        break;
      case 2:
        h = B(k), a.b({error:h}), k.o(3);
    }
  });
}
Kb.prototype.w = function() {
  var a = this, b, c, d, f, g, h, k, n, m, q;
  return H(function(l) {
    switch(l.f) {
      case 1:
        return x(l, Lb(a), 2);
      case 2:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({D:1, g:!0});
        A(l, 3, 4);
        return x(l, W("/admin-data?objects&id=" + a.c.id), 6);
      case 6:
        return c = l.a, x(l, c.json(), 7);
      case 7:
        d = l.a, f = d.error, g = d.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, hint:k.seo, qa:k.categorySeo, article:k.article}));
      case 4:
        F(l);
        a.b({g:!1});
        G(l, 0);
        break;
      case 3:
        m = n = B(l), q = m.message, a.b({error:q}), l.o(4);
    }
  });
};
Kb.prototype.a = function(a) {
  var b = this, c, d, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({m:!0}), A(k, 2, 3), x(k, W("/admin-data?objects", {method:"POST", body:c}), 5);
      case 5:
        return d = k.a, x(k, d.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({L:1});
      case 3:
        F(k);
        b.b({m:!1});
        G(k, 4);
        break;
      case 2:
        h = B(k);
        b.b({error:h});
        k.o(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Kb.prototype.h = function() {
  var a = this, b = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.qa + "/<strong>" + this.state.hint + "</strong>.", c = this.state, d = c.D, f = c.ja;
  c = c.ra;
  return this.state.g ? J(T, {}, J("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Объект"), J("span", {className:"echo-loader"}, "Loading…")) : J(T, {}, J("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Объект"), !(d && this.state.g) && J(X, {J:function(b) {
    return a.form = b;
  }, K:this.a.bind(this)}, J(Y, {j:"Название для каталога недвижимости.", label:"Название"}, J(Z.B, {required:!0, name:"title", value:this.state.data.title, placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское"})), J(Y, {j:b, label:"СЕО Название"}, J(Z.B, {required:!0, name:"seo", value:this.state.data.seo, placeholder:"1-комнатные-апартаменты-воскресенское"})), J(Y, {j:"Описание объекта.", label:"Описание"}, J(Z.aa, {rows:10, required:!0, name:"description", placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично)."}, 
  this.state.data.description)), d && !f && J("div", {className:"form-group"}, J("label", {}, "Изображение"), J("br"), J("img", {src:this.state.data.cdnImage, className:"img-fluid"}), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({ja:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!d || f) && J(Y, {label:"Изображение", j:"Картинка, отображаемая на главной странице."}, J(Z.B, {required:!0, name:"image", file:"1", type:"file"})), J(Fb, {article:this.state.article, fa:function(b) {
    a.b({article:b});
  }}), d && J("input", {value:this.c.id, type:"hidden", name:"id"}), J(Y, {label:"Раздел", j:"Категория в каталоге"}, J(Z.za, {options:c, name:"category", required:!0, value:this.state.data.category})), J("button", {disabled:this.state.m, type:"submit", className:"btn btn-primary"}, this.state.m ? "Загрузка..." : d ? "Сохранить" : "Добавить"), J(Mb, {error:this.state.error}), this.state.L && J("div", {className:"alert alert-success mt-3", role:"alert"}, "Объект успешно ", d ? "сохранен" : "создан", 
  "!")));
};
function Mb(a) {
  return (a = a.error) ? J("div", {className:"alert alert-danger mt-3", role:"alert"}, a) : null;
}
;function Nb() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
v(Nb, O);
Nb.prototype.w = function() {
  var a = this;
  return H(function(b) {
    return x(b, a.load(), 0);
  });
};
Nb.prototype.load = function() {
  var a = this, b, c, d, f, g;
  return H(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), A(h, 2, 3), x(h, W("/admin-data?pages"), 5);
      case 5:
        return b = h.a, x(h, b.json(), 6);
      case 6:
        c = h.a, d = c.error, f = c.data, d ? a.b({error:d}) : a.b({data:f});
      case 3:
        F(h);
        a.b({g:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.o(3);
    }
  });
};
Nb.prototype.h = function() {
  var a = this;
  return J(T, {}, J("h1", {}, "Материалы Сайта"), J("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.g && J("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return J(Ob, Object.assign({}, c, {key:b, id:b, P:function() {
      return a.load();
    }}));
  }));
};
function Ob() {
  O.call(this);
  this.state = {l:null};
}
v(Ob, O);
Ob.prototype.h = function() {
  var a = this, b = this.c, c = b.seo, d = b.id, f = b.description, g = b.P, h = b.title;
  return J(tb, {className:"CategoryRow"}, J(T, {}, J("h2", {}, h), J("em", {}, "knedv.ru/", c), J("p", {}, f)), J(T, {className:"col-1 CategoryMeta"}, J("a", {href:"/admin/add-page/" + d, style:"color:brown;"}, J(U, {icon:"fas fa-pen"})), J("br"), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({l:{text:J("span", {}, "Вы действительно хотите удалить страницу ", J("strong", {}, h), "?"), W:"Удалить", title:"Удаление Страницы", path:"pages&id=" + d + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, J(U, {icon:"far fa-trash-alt"}))), this.state.l && J(yb, Object.assign({}, this.state.l, {O:function() {
    a.b({l:null});
  }, M:"danger", Y:g})));
};
function Pb() {
  O.call(this);
  this.state = {g:!1, data:{}, article:""};
}
v(Pb, O);
Pb.prototype.w = function() {
  var a = this, b, c, d, f, g, h, k, n, m, q;
  return H(function(l) {
    switch(l.f) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({D:1, g:!0});
        A(l, 2, 3);
        return x(l, W("/admin-data?pages&id=" + a.c.id), 5);
      case 5:
        return c = l.a, x(l, c.json(), 6);
      case 6:
        d = l.a, f = d.error, g = d.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, article:k.article}));
      case 3:
        F(l);
        a.b({g:!1});
        G(l, 0);
        break;
      case 2:
        m = n = B(l), q = m.message, a.b({error:q}), l.o(3);
    }
  });
};
Pb.prototype.a = function(a) {
  var b = this, c, d, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({m:!0}), A(k, 2, 3), x(k, W("/admin-data?pages", {method:"POST", body:c}), 5);
      case 5:
        return d = k.a, x(k, d.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({L:1});
      case 3:
        F(k);
        b.b({m:!1});
        G(k, 4);
        break;
      case 2:
        h = B(k);
        b.b({error:h});
        k.o(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Pb.prototype.h = function() {
  var a = this, b = this.state.D;
  return J(T, {}, J("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Страницу"), b && this.state.g && J("span", {className:"echo-loader"}, "Loading…"), !(b && this.state.g) && J("form", {ref:function(b) {
    return a.form = b;
  }, onSubmit:this.a.bind(this)}, J(vb, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", j:"Название для администратора.", required:"1"}), J(vb, {j:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), J(vb, {ka:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", j:"Описание страницы.", value:this.state.data.description, required:"1"}), 
  J(Fb, {article:this.state.article, fa:function(b) {
    a.b({article:b});
  }}), b && J("input", {value:this.c.id, type:"hidden", name:"id"}), J("button", {disabled:this.state.m, type:"submit", className:"btn btn-primary"}, this.state.m ? "Загрузка..." : b ? "Сохранить" : "Добавить"), this.state.error && J("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.L && J("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", b ? "сохранена" : "создана", "!")));
};
function Qb() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
v(Qb, O);
Qb.prototype.w = function() {
  var a = this;
  return H(function(b) {
    return x(b, a.load(), 0);
  });
};
Qb.prototype.load = function() {
  var a = this, b, c, d, f, g;
  return H(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), A(h, 2, 3), x(h, W("/admin-data?specials"), 5);
      case 5:
        return b = h.a, x(h, b.json(), 6);
      case 6:
        c = h.a, d = c.error, f = c.data, d ? a.b({error:d}) : a.b({data:f});
      case 3:
        F(h);
        a.b({g:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.o(3);
    }
  });
};
Qb.prototype.a = function(a) {
  var b = this, c, d, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), b.b({m:!0}), A(k, 2, 3), x(k, W("/admin-data?specials", {method:"POST", body:c}), 5);
      case 5:
        return d = k.a, x(k, d.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({L:1});
      case 3:
        F(k);
        b.b({m:!1});
        G(k, 4);
        break;
      case 2:
        h = B(k);
        b.b({error:h});
        k.o(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Qb.prototype.h = function() {
  var a = this;
  if (this.state.g) {
    return J(T, {}, J("h1", {}, "Специальные Предложения"), J("span", {className:"echo-loader"}, "Loading…"));
  }
  var b = J("details", {}, J("summary", {}, J("h3", {style:"display: inline-block;vertical-align: middle;"}, "Создать Новое Предложение")), J(Rb, {m:this.state.m, K:this.a.bind(this), J:function(b) {
    a.form = b;
  }}));
  return this.state.data.length ? J(T, {}, J("h1", {}, "Специальные Предложения"), J("div", {style:"max-height:25rem;overflow:scroll;background:wheat; padding:0.5rem;"}, this.state.data.map(function(b, d) {
    return J("div", {key:d, style:"border-bottom:1px solid brown;border-top:1px solid lightcoral;"}, J("h4", {}, b.title), J("p", {}, J("img", {src:b.cdnImage}), b.description, J("span", {style:"font-weight: bold;"}, " ", b.price)), J("a", {onClick:function(c) {
      c.preventDefault();
      a.b({l:{text:J("span", {}, "Вы действительно хотите удалить предложение ", J("strong", {}, b.title), "?"), W:"Удалить", title:"Удаление Предложения", path:"specials&id=" + b._id + "&delete"}});
      return !1;
    }, style:"color:brown;", href:"#"}, J(U, {icon:"far fa-trash-alt"})), a.state.l && J(yb, Object.assign({}, a.state.l, {O:function() {
      a.b({l:null});
    }, M:"danger", Y:a.load.bind(a)})));
  })), J("hr"), b) : J(T, {}, J("h1", {}, "Специальные Предложения"), "Нет специальных предложений.", J("hr"), b);
};
function Rb(a) {
  var b = a.m;
  return J(X, {K:a.K, J:a.J}, J(Y, {label:"Название", j:"Заголовок для главной страницы, напр., Ленинский проспект, дом 114"}, J(Z.B, {placeholder:"Название акции", name:"title", required:1})), J(Y, {label:"Описание", j:"Введите описание акции..."}, J(Z.aa, {required:!0, name:"description", placeholder:"Описание акции"})), J(Y, {label:"Изображение", j:"Выберите изображение..."}, J(Z.B, {required:!0, name:"image", type:"file", file:"1"})), J(Y, {label:"Цена", j:"Задайте цену..."}, J(Z.B, {name:"price", 
  placeholder:"55 000 000 руб."})), J(Y, {label:"Переход", j:"Ссылка на страницу каталога, или сайта."}, J(Z.B, {name:"href", placeholder:"/каталог/москва-элитная/лениниский-проспект-дом-114"})), J("button", {disabled:b, type:"submit", className:"btn btn-primary"}, b ? "Загрузка..." : "Добавить"));
}
;function Sb() {
  return J(T, {}, J("h1", {}, "Добро Пожаловать!"));
}
;var Tb = J(function() {
  return J(tb, {id:"App"}, J(T, {className:"col-md-4"}, J(xb)), J(qb, {s:function(a) {
    a.current && a.current.attributes.title && (document.title = a.current.attributes.title);
  }}, J(Sb, {path:"/admin", title:"Главная"}), J(Ib, {path:"/admin/objects", title:"Объекты Недвижимости"}), J(Kb, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), J(Ab, {path:"/admin/categories", title:"Категории Каталога"}), J(Hb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), J(Nb, {path:"/admin/pages", title:"Статьи"}), J(Pb, {path:"/admin/add-page/:id?", title:"Добавить Страницу"}), J(Qb, {path:"/admin/special", title:"Специальные Предложения"})));
});
Ta(document.querySelector("#App"), Tb, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map