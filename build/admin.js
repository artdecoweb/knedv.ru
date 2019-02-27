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
  a.bb = b.prototype;
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
    this.f = 0;
    this.A = void 0;
    this.a = [];
    var b = this.j();
    try {
      a(b.resolve, b.reject);
    } catch (m) {
      b.reject(m);
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
  c.prototype.f = function(a) {
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
        } catch (n) {
          this.v(n);
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
        c ? this.Z(a) : this.J(a);
      }
    }
  };
  b.prototype.Z = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (m) {
      this.v(m);
      return;
    }
    "function" == typeof b ? this.Ra(b, a) : this.J(a);
  };
  b.prototype.v = function(a) {
    this.K(2, a);
  };
  b.prototype.J = function(a) {
    this.K(1, a);
  };
  b.prototype.K = function(a, b) {
    if (0 != this.f) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.f);
    }
    this.f = a;
    this.A = b;
    this.S();
  };
  b.prototype.S = function() {
    if (null != this.a) {
      for (var a = 0; a < this.a.length; ++a) {
        g.f(this.a[a]);
      }
      this.a = null;
    }
  };
  var g = new c;
  b.prototype.Pa = function(a) {
    var b = this.j();
    a.X(b.resolve, b.reject);
  };
  b.prototype.Ra = function(a, b) {
    var c = this.j();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (n) {
      c.reject(n);
    }
  };
  b.prototype.then = function(a, c) {
    function e(a, b) {
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
    this.X(e(a, f), e(c, g));
    return h;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.X = function(a, b) {
    function c() {
      switch(e.f) {
        case 1:
          a(e.A);
          break;
        case 2:
          b(e.A);
          break;
        default:
          throw Error("Unexpected state: " + e.f);
      }
    }
    var e = this;
    null == this.a ? g.f(c) : this.a.push(c);
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
        e(g.value).X(b, c);
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
        h.push(void 0), k++, e(f.value).X(g(h.length - 1), b), f = c.next();
      } while (!f.done);
    });
  };
  return b;
});
function oa() {
  this.K = !1;
  this.v = null;
  this.a = void 0;
  this.f = 1;
  this.A = this.J = 0;
  this.Z = this.j = null;
}
function pa(a) {
  if (a.K) {
    throw new TypeError("Generator is already running");
  }
  a.K = !0;
}
oa.prototype.S = function(a) {
  this.a = a;
};
function qa(a, b) {
  a.j = {Aa:b, Ca:!0};
  a.f = a.J || a.A;
}
oa.prototype.return = function(a) {
  this.j = {return:a};
  this.f = this.A;
};
function w(a, b, c) {
  a.f = c;
  return {value:b};
}
oa.prototype.m = function(a) {
  this.f = a;
};
function A(a, b, c) {
  a.J = b;
  void 0 != c && (a.A = c);
}
function B(a) {
  a.J = 0;
  var b = a.j.Aa;
  a.j = null;
  return b;
}
function E(a) {
  a.Z = [a.j];
  a.J = 0;
  a.A = 0;
}
function G(a, b) {
  var c = a.Z.splice(0)[0];
  (c = a.j = a.j || c) ? c.Ca ? a.f = a.J || a.A : void 0 != c.m && a.A < c.m ? (a.f = c.m, a.j = null) : a.f = a.A : a.f = b;
}
function ra(a) {
  this.a = new oa;
  this.f = a;
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
      return a.a.K = !1, f;
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
  for (; a.a.f;) {
    try {
      var b = a.f(a.a);
      if (b) {
        return a.a.K = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.a.a = void 0, qa(a.a, c);
    }
  }
  a.a.K = !1;
  if (a.a.j) {
    b = a.a.j;
    a.a.j = null;
    if (b.Ca) {
      throw b.Aa;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function va(a) {
  this.next = function(b) {
    pa(a.a);
    a.a.v ? b = ta(a, a.a.v.next, b, a.a.S) : (a.a.S(b), b = ua(a));
    return b;
  };
  this.throw = function(b) {
    pa(a.a);
    a.a.v ? b = ta(a, a.a.v["throw"], b, a.a.S) : (qa(a.a, b), b = ua(a));
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
var I = {}, Aa = [], Ba = [];
function J(a, b) {
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
  void 0 !== I.Sa && I.Sa(g);
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
  !a.U && (a.U = !0) && 1 == Ga.push(a) && (I.Va || Da)(Ia);
}
function Ia() {
  for (var a; a = Ga.pop();) {
    a.U && Ja(a);
  }
}
function La(a) {
  var b = K({}, a.attributes);
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
  var f = L;
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
            e && (a.innerHTML = e.ea || "");
          } else {
            if ("o" == b[0] && "n" == b[1]) {
              f = b !== (b = b.replace(/Capture$/, "")), b = b.toLowerCase().substring(2), e ? c || a.addEventListener(b, Oa, f) : a.removeEventListener(b, Oa, f), (a.ra || (a.ra = {}))[b] = e;
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
  return this.ra[a.type](I.event && I.event(a) || a);
}
var Pa = [], Qa = 0, L = !1, Ra = !1;
function Sa() {
  for (var a; a = Pa.shift();) {
    I.Ha && I.Ha(a), a.s && a.s();
  }
}
function Ta(a, b, c, e, f, g) {
  Qa++ || (L = null != f && void 0 !== f.Ya, Ra = null != a && !("__preactattr_" in a));
  a = Ua(a, b, c, e, g);
  f && a.parentNode !== f && f.appendChild(a);
  --Qa || (Ra = !1, g || Sa());
  return a;
}
function Ua(a, b, c, e, f) {
  var g = a, h = L;
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
    var m = h, n = b && h.fa === k.nodeName, q = n;
    for (a = La(k); b && !q && (b = b.sa);) {
      q = b.constructor === k.nodeName;
    }
    b && q && (!e || b.w) ? (Va(b, a, 3, c, e), h = b.G) : (g && !n && (Wa(g), h = m = null), b = Xa(k.nodeName, a, c), h && !b.L && (b.L = h, m = null), Va(b, a, 1, c, e), h = b.G, m && h !== m && (m.w = null, N(m, !1)));
    return h;
  }
  L = "svg" === f ? !0 : "foreignObject" === f ? !1 : L;
  f = String(f);
  if (!a || a.Da !== f && a.nodeName.toLowerCase() !== f.toLowerCase()) {
    if (g = f, f = L ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g), f.Da = g, g = f, a) {
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
      var M = [], C = {}, y = 0, x = 0, u = F.length, W = 0, Ka = f ? f.length : 0;
      if (0 !== u) {
        for (q = 0; q < u; q++) {
          var z = F[q], Q = z.__preactattr_;
          var D = Ka && Q ? z.w ? z.w.pa : Q.key : null;
          if (null != D) {
            y++, C[D] = z;
          } else {
            if (Q || (void 0 !== z.splitText ? t ? z.nodeValue.trim() : 1 : t)) {
              M[W++] = z;
            }
          }
        }
      }
      if (0 !== Ka) {
        for (q = 0; q < Ka; q++) {
          u = f[q];
          n = null;
          D = u.key;
          if (null != D) {
            y && void 0 !== C[D] && (n = C[D], C[D] = void 0, y--);
          } else {
            if (x < W) {
              for (D = x; D < W; D++) {
                if (z = void 0 !== M[D]) {
                  if (z = m = M[D], "string" === typeof u || "number" === typeof u) {
                    z = void 0 !== z.splitText;
                  } else {
                    if ("string" === typeof u.nodeName) {
                      if (Q = !z.fa) {
                        Q = u.nodeName, Q = z.Da === Q || z.nodeName.toLowerCase() === Q.toLowerCase();
                      }
                      z = Q;
                    } else {
                      z = t || z.fa === u.nodeName;
                    }
                  }
                }
                if (z) {
                  n = m;
                  M[D] = void 0;
                  D === W - 1 && W--;
                  D === x && x++;
                  break;
                }
              }
            }
          }
          n = Ua(n, u, c, e);
          u = F[q];
          n && n !== l && n !== u && (null == u ? l.appendChild(n) : n === u.nextSibling ? Ma(u) : l.insertBefore(n, u));
        }
      }
      if (y) {
        for (q in C) {
          void 0 !== C[q] && N(C[q], !1);
        }
      }
      for (; x <= W;) {
        void 0 !== (n = M[W--]) && N(n, !1);
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
  L = h;
  return g;
}
function N(a, b) {
  var c = a.w;
  c ? Wa(c) : (null != a.__preactattr_ && Ca(a.__preactattr_.ca, null), !1 !== b && null != a.__preactattr_ || Ma(a), Ya(a));
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
      f.L = Za[e].L;
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
  a.V || (a.V = !0, a.qa = b.ca, a.pa = b.key, delete b.ca, delete b.key, "undefined" === typeof a.constructor.Ba && (!a.G || f ? a.xa && a.xa() : a.Ka && a.Ka(b, e)), e && e !== a.context && (a.ka || (a.ka = a.context), a.context = e), a.la || (a.la = a.c), a.c = b, a.V = !1, 0 !== c && (1 !== c && !1 === I.cb && a.G ? Ha(a) : Ja(a, 1, f)), Ca(a.qa, a));
}
function Ja(a, b, c, e) {
  if (!a.V) {
    var f = a.c, g = a.state, h = a.context, k = a.la || f, m = a.ma || g, n = a.ka || h, q = a.G, l = a.L, t = q || l, F = a.w, M = !1, C = n, y;
    a.constructor.Ba && (g = K(K({}, g), a.constructor.Ba(f, g)), a.state = g);
    q && (a.c = k, a.state = m, a.context = n, 2 !== b && a.P && !1 === a.P(f, g, h) ? M = !0 : a.ya && a.ya(f, g, h), a.c = f, a.state = g, a.context = h);
    a.la = a.ma = a.ka = a.L = null;
    a.U = !1;
    if (!M) {
      f = a.h(f, g, h);
      a.ia && (h = K(K({}, h), a.ia()));
      q && a.Na && (C = a.Na(k, m));
      g = f && f.nodeName;
      if ("function" === typeof g) {
        var x = La(f);
        if ((y = F) && y.constructor === g && x.key == y.pa) {
          Va(y, x, 1, h, !1);
        } else {
          var u = y;
          a.w = y = Xa(g, x, h);
          y.L = y.L || l;
          y.sa = a;
          Va(y, x, 0, h, !1);
          Ja(y, 1, c, !0);
        }
        x = y.G;
      } else {
        l = t;
        if (u = F) {
          l = a.w = null;
        }
        if (t || 1 === b) {
          l && (l.w = null), x = Ta(l, f, h, c || !q, t && t.parentNode, !0);
        }
      }
      t && x !== t && y !== F && (h = t.parentNode) && x !== h && (h.replaceChild(x, t), u || (t.w = null, N(t, !1)));
      u && Wa(u);
      if ((a.G = x) && !e) {
        for (u = t = a; u = u.sa;) {
          (t = u).G = x;
        }
        x.w = t;
        x.fa = t.constructor;
      }
    }
    !q || c ? Pa.push(a) : M || (a.wa && a.wa(k, m, C), I.Ia && I.Ia(a));
    for (; a.W.length;) {
      a.W.pop().call(a);
    }
    Qa || e || Sa();
  }
}
function Wa(a) {
  I.Ja && I.Ja(a);
  var b = a.G;
  a.V = !0;
  a.ga && a.ga();
  a.G = null;
  var c = a.w;
  c ? Wa(c) : b && (null != b.__preactattr_ && Ca(b.__preactattr_.ca, null), a.L = b, Ma(b), Za.push(a), Ya(b));
  Ca(a.qa, null);
}
function O(a, b) {
  this.U = !0;
  this.context = b;
  this.c = a;
  this.state = this.state || {};
  this.W = [];
}
K(O.prototype, {b:function(a, b) {
  this.ma || (this.ma = this.state);
  this.state = K(K({}, this.state), "function" === typeof a ? a(this.state, this.c) : a);
  b && this.W.push(b);
  Ha(this);
}, La:function(a) {
  a && this.W.push(a);
  Ja(this, 2);
}, h:function() {
}});
var ab = {};
function bb(a, b) {
  return a.ba < b.ba ? 1 : a.ba > b.ba ? -1 : a.index - b.index;
}
function cb(a, b) {
  try {
    return a.index = b, a.ba = a.attributes.default ? 0 : db(a.attributes.path).map(eb).join(""), a.attributes;
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
;var P = null, R = [], fb = [];
function gb() {
  var a;
  P && P.location ? a = P.location : P && P.Ma ? a = P.Ma() : a = "undefined" !== typeof location ? location : {};
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
        for (var e = R.length; e--;) {
          if (0 < kb(R[e].c.children, a, !1).length) {
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
d.P = function(a) {
  return !0 !== a.ab ? !0 : a.url !== this.c.url || a.l !== this.c.l;
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
d.xa = function() {
  R.push(this);
  this.updating = !0;
};
d.s = function() {
  var a = this;
  P && (this.f = P.Xa(function(b) {
    ib(a, "" + (b.pathname || "") + (b.search || ""));
  }));
  this.updating = !1;
};
d.ga = function() {
  "function" === typeof this.f && this.f();
  R.splice(R.indexOf(this), 1);
};
d.ya = function() {
  this.updating = !0;
};
d.wa = function() {
  this.updating = !1;
};
function kb(a, b, c) {
  return a.filter(cb).sort(bb).map(function(a) {
    var e = b;
    var g = a.attributes.path, h = a.attributes, k = /(?:\?([^#]*))?(#.*)?$/, m = e.match(k), n = {};
    if (m && m[1]) {
      m = m[1].split("&");
      for (var q = 0; q < m.length; q++) {
        var l = m[q].split("=");
        n[decodeURIComponent(l[0])] = decodeURIComponent(l.slice(1).join("="));
      }
    }
    e = db(e.replace(k, ""));
    g = db(g || "");
    k = Math.max(e.length, g.length);
    for (m = 0; m < k; m++) {
      if (g[m] && ":" === g[m].charAt(0)) {
        q = g[m].replace(/(^:|[+*?]+$)/g, "");
        l = (g[m].match(/[+*?]+$/) || ab)[0] || "";
        var t = ~l.indexOf("+"), F = ~l.indexOf("*"), M = e[m] || "";
        if (!M && !F && (0 > l.indexOf("?") || t)) {
          var C = !1;
          break;
        }
        n[q] = decodeURIComponent(M);
        if (t || F) {
          n[q] = e.slice(m).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (g[m] !== e[m]) {
          C = !1;
          break;
        }
      }
    }
    if (e = !0 !== h.default && !1 === C ? !1 : n) {
      return !1 !== c ? (e = Object.assign({}, {url:b, matches:e}, e), delete e.ca, delete e.key, Ea(a, e)) : a;
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
  b !== f && (this.j = b, "function" === typeof c && c({$a:this, url:b, Za:f, active:a, current:e}));
  return e;
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
sb.prototype.s = function() {
  fb.push(this.a);
};
sb.prototype.ga = function() {
  fb.splice(fb.indexOf(this.a) >>> 0, 1);
};
sb.prototype.h = function(a) {
  var b = this.f || gb(), c = b.replace(/\?.+$/, "");
  this.f = null;
  var e = a.children.filter(function(a) {
    return "function" == typeof a;
  });
  return e[0] && e[0]({url:b, path:c, matches:c === a.path});
};
function S(a) {
  var b = Object.assign({}, a), c = void 0 === a.ta ? "active" : a.ta;
  a = a.path;
  var e = (delete b.ta, delete b.path, b);
  return J(sb, {path:a || e.href}, function(a) {
    return J(rb, Object.assign({}, e, {className:[e.Ta || e.className, a.matches && c].filter(Boolean).join(" ")}));
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
  var b = a.oa, c = a.type, e = a.value;
  a = {required:a.required, name:a.name, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), id:a.id, "aria-describedby":a.F};
  return b ? J("textarea", Object.assign({}, a, {rows:"number" == typeof b ? b : 3}), e) : J("input", Object.assign({}, a, e ? {value:e} : {}, {type:c}));
}
function vb(a) {
  var b = a.label, c = void 0 === a.type ? "text" : a.type, e = a.placeholder, f = a.i, g = a.oa, h = a.file, k = a.options, m = a.Qa, n = "i" + 100000 * Math.random(), q = "h" + n;
  a = {F:q, id:n, value:a.value, name:a.name, required:a.required};
  c = k ? J(wb, Object.assign({}, a, {options:k, Qa:m})) : J(ub, Object.assign({}, a, {oa:g, placeholder:e, type:c, file:h}));
  return J("div", {className:"form-group"}, J("label", {htmlFor:n}, b), c, f && J("small", {id:q, dangerouslySetInnerHTML:{ea:f}, className:"form-text text-muted"}));
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
function xb(a) {
  O.apply(this, arguments);
}
v(xb, O);
xb.prototype.P = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
xb.prototype.s = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  void 0 !== b && c(a, b);
};
xb.prototype.h = function(a) {
  var b = a.name, c = a.label, e = a.value, f = this.context, g = f.id, h = f.l, k = void 0 === f.values ? {} : f.values;
  return J("div", {className:"custom-control custom-switch"}, J("input", {required:void 0 !== a.required, name:b, checked:b in k ? k[b] : e, id:g, type:"checkbox", className:"custom-control-input", "aria-described-by":f.F, onChange:function(a) {
    h(b, a.currentTarget.checked);
  }}), J("label", {htmlFor:g, className:"custom-control-label"}, c));
};
function yb() {
  return J("nav", {className:"nav flex-column"}, J(S, {className:"nav-link", href:"/admin"}, J("i", {className:"fab fa-kickstarter-k"}), " Главная"), J(S, {className:"nav-link", href:"/admin/objects"}, J("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), J(S, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, J("i", {className:"fas fa-home"}), " Новая Недвижимость"), J(S, {className:"nav-link", href:"/admin/categories"}, J("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), J(S, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, J("i", {className:"fas fa-folder-plus"}), " Добавить"), J(S, {className:"nav-link", href:"/admin/pages"}, J("i", {className:"fas fa-font"}), " Статьи"), J(S, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, J("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), J(S, {className:"nav-link", href:"/admin/special"}, J("i", {className:"fas fa-bolt"}), " Спец. Предложения"), 
  J(S, {className:"nav-link", href:"/admin/offers"}, J("i", {className:"fas fa-grip-lines"}), " Акции"));
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
;function zb() {
  O.call(this);
  this.state = {g:!1};
}
v(zb, O);
function Ab(a) {
  var b, c, e, f;
  return H(function(g) {
    switch(g.f) {
      case 1:
        return a.b({g:!0}), A(g, 2, 3), w(g, fetch("/admin-data?" + a.c.path, {method:"POST"}), 5);
      case 5:
        return b = g.a, w(g, b.json(), 6);
      case 6:
        c = g.a, (e = c.error) ? a.b({error:e}) : (a.c.H(), a.c.$());
      case 3:
        E(g);
        a.b({g:!1});
        G(g, 0);
        break;
      case 2:
        f = B(g), a.b({error:f}), g.m(3);
    }
  });
}
zb.prototype.h = function(a) {
  var b = this, c = a.text, e = a.H, f = void 0 === a.R ? "primary" : a.R, g = a.I, h = void 0 === a.Y ? "Отмена" : a.Y;
  return J("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, J("div", {className:"modal-dialog", role:"document"}, J("div", {className:"modal-content"}, J("div", {className:"modal-header"}, J("h5", {className:"modal-title"}, a.title), J("button", {onClick:e, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, J("span", {"aria-hidden":"true"}, "×"))), J("div", {className:"modal-body"}, J("p", {}, c)), J("div", {className:"modal-footer"}, 
  J("button", {onClick:e, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, h), J("button", {disabled:this.state.g, type:"button", className:"btn btn-" + f, onClick:function() {
    return Ab(b);
  }}, this.state.g ? "Отправка..." : g)))));
};
function Bb(a) {
  O.apply(this, arguments);
}
v(Bb, O);
Bb.prototype.h = function(a) {
  var b = a.children, c = a.H;
  return J("div", {className:"EditModal modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, J("div", {className:"modal-dialog", role:"document"}, J("div", {className:"modal-content"}, J("div", {className:"modal-header"}, J("h5", {className:"modal-title"}, a.title), J("button", {onClick:c, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, J("span", {"aria-hidden":"true"}, "×"))), J("div", {className:"modal-body"}, b))));
};
function Cb() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
v(Cb, O);
Cb.prototype.s = function() {
  var a = this;
  return H(function(b) {
    return w(b, a.load(), 0);
  });
};
Cb.prototype.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), A(h, 2, 3), w(h, V("/admin-data?categories"), 5);
      case 5:
        return b = h.a, w(h, b.json(), 6);
      case 6:
        c = h.a, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        E(h);
        a.b({g:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.m(3);
    }
  });
};
Cb.prototype.h = function() {
  var a = this;
  return J(T, {}, J("h1", {}, "Категории Каталога"), J("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), this.state.g && J("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return J(Db, Object.assign({}, c, {key:b, id:b, T:function() {
      return a.load();
    }}));
  }));
};
function Db() {
  O.call(this);
  this.state = {o:null};
}
v(Db, O);
Db.prototype.h = function() {
  var a = this, b = this.c, c = b.title, e = b.description, f = b.seo, g = b.id, h = b.T;
  return J(tb, {className:"CategoryRow"}, J(T, {className:"col-3 col-sm-4 "}, J("img", {src:b.image, className:"img-fluid p-1"})), J(T, {}, J("h2", {}, c), J("em", {}, "knedv.ru/", f), J("p", {}, e)), J(T, {className:"col-1 CategoryMeta"}, J("a", {href:"/admin/add-category/" + g, style:"color:brown;"}, J(U, {icon:"fas fa-pen"})), J("br"), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:J("span", {}, "Вы действительно хотите удалить категорию ", J("strong", {}, c), "?"), I:"Удалить", title:"Удаление Категории", path:"categories&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, J(U, {icon:"far fa-trash-alt"}))), this.state.o && J(zb, Object.assign({}, this.state.o, {H:function() {
    a.b({o:null});
  }, R:"danger", $:h})));
};
function Eb() {
  O.call(this);
  this.c = this.c;
}
v(Eb, O);
Eb.prototype.P = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Eb.prototype.s = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  c && void 0 !== b && c(a, b);
};
Eb.prototype.h = function(a) {
  var b = a.options, c = a.name, e = a.value, f = this.context, g = f.l, h = void 0 === f.values ? {} : f.values;
  return J("select", {name:c, value:c in h ? h[c] : e, required:a.required, className:"custom-select", id:f.id, "aria-describedby":f.F, onChange:function(a) {
    g(c, a.currentTarget.value);
  }}, J("option"), b.map(function(a) {
    var b = a.value;
    return J("option", {key:b, value:b, selected:b == e}, a.title);
  }));
};
function Fb() {
  O.call(this);
  this.c = this.c;
}
v(Fb, O);
Fb.prototype.P = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Fb.prototype.s = function() {
  var a = this.c, b = r(a.children).next().value;
  a = a.name;
  var c = this.context.l;
  b && c(a, b.trim());
};
Fb.prototype.h = function(a) {
  var b = a.name, c = a.children, e = this.context, f = e.l, g = void 0 === e.values ? {} : e.values;
  return J("textarea", {required:a.required, name:b, placeholder:a.placeholder, "aria-describedby":e.F, className:"form-control", id:e.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }, rows:void 0 === a.rows ? 3 : a.rows}, b in g ? g[b] : c);
};
function Gb() {
  O.call(this);
  this.c = this.c;
}
v(Gb, O);
Gb.prototype.P = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Gb.prototype.s = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  void 0 !== b && c(a, b);
};
Gb.prototype.h = function(a) {
  var b = a.required, c = a.name, e = a.placeholder, f = void 0 === a.type ? "text" : a.type, g = a.file;
  a = a.value;
  console.log("required: %s", b);
  var h = this.context, k = h.l, m = void 0 === h.values ? {} : h.values;
  return J("input", {required:b, name:c, placeholder:e, className:"form-control" + (g ? "-file" : ""), value:c in m ? m[c] : a, type:f, "aria-describedby":h.F, id:h.id, onChange:function(a) {
    k(c, a.currentTarget.value);
  }});
};
function X() {
  O.call(this);
  this.state = {values:{}};
  this.c = this.c;
}
v(X, O);
X.prototype.ia = function() {
  return {values:this.state.values, l:this.l.bind(this)};
};
X.prototype.l = function(a, b) {
  var c = {};
  this.b({values:Object.assign({}, this.state.values, (c[a] = b, c))});
  this.c.l && this.c.l(this.state.values);
};
X.prototype.h = function(a) {
  var b = Object.assign({}, a), c = a.children, e = a.ha;
  a = a.aa;
  b = (delete b.children, delete b.ha, delete b.aa, b);
  return J("form", Object.assign({}, b, {ref:e, onSubmit:a}), c);
};
function Y() {
  O.call(this);
  this.id = "i" + Math.floor(100000 * Math.random());
  this.F = "h" + this.id;
  this.c = this.c;
}
v(Y, O);
Y.prototype.ia = function() {
  return {id:this.id, F:this.F};
};
Y.prototype.h = function() {
  var a = this.c, b = a.children, c = a.label;
  a = a.i;
  return J("div", {className:"form-group"}, c && J("label", {htmlFor:this.id}, c), b, a && J("small", {id:this.F, dangerouslySetInnerHTML:{ea:a}, className:"form-text text-muted"}));
};
var Z = {get Fa() {
  return Eb;
}, get da() {
  return Fb;
}, get D() {
  return Gb;
}};
function Hb(a) {
  var b = a.article, c = a.ja;
  return J("div", {className:"form-group"}, J("label", {}, "Статья"), J("div", {dangerouslySetInnerHTML:{ea:b}, style:"background: #edeee8;", className:"mb-3"}), J("a", {onClick:function(a) {
    a.preventDefault();
    window.editorCallback = function(a) {
      e.close();
      c(a);
    };
    window.editorGetData = function() {
      return b;
    };
    var e = Ib();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"));
}
function Ib() {
  var a = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (a.outerHeight / 2 + a.screenY - 325 - 50) + ",left=" + (a.outerWidth / 2 + a.screenX - 450));
}
;function Jb() {
  O.call(this);
  this.state = {g:!1, data:{}, hint:"москва-новостройки", article:""};
}
v(Jb, O);
Jb.prototype.s = function() {
  var a = this, b, c, e, f, g, h, k, m;
  return H(function(n) {
    switch(n.f) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return n.return();
        }
        a.b({B:1, g:!0});
        A(n, 2, 3);
        return w(n, V("/admin-data?categories&id=" + a.c.id), 5);
      case 5:
        return c = n.a, w(n, c.json(), 6);
      case 6:
        e = n.a, f = e.error, g = e.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, hint:k.seo, article:k.article}));
      case 3:
        E(n);
        a.b({g:!1});
        G(n, 0);
        break;
      case 2:
        m = B(n), a.b({error:m}), n.m(3);
    }
  });
};
Jb.prototype.a = function(a) {
  var b = this, c, e, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({u:!0}), A(k, 2, 3), w(k, V("/admin-data?categories", {method:"POST", body:c}), 5);
      case 5:
        return e = k.a, w(k, e.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({C:1});
      case 3:
        E(k);
        b.b({u:!1});
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
Jb.prototype.h = function() {
  var a = this, b = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.", c = this.state, e = c.B;
  c = c.O;
  return J(T, {}, J("h1", {}, this.state.B ? "Редактировать" : "Добавить", " Категорию"), e && this.state.g && J("span", {className:"echo-loader"}, "Loading…"), !(e && this.state.g) && J(X, {l:function(a) {
    console.log(a);
    console.log(a.seo);
  }, ha:function(b) {
    a.form = b;
  }, aa:this.a.bind(this)}, J(Y, {label:"Название", i:"Название для меню слева."}, J(Z.D, {value:this.state.data.title, name:"title", placeholder:"Москва Новостройки", required:!0})), J(Y, {i:b, label:"СЕО Название"}, J(Z.D, {required:!0, value:this.state.data.seo, name:"seo", placeholder:"москва-новостройки"})), J(Y, {label:"Описание", i:"Краткое описание для главной страницы."}, J(Z.da, {required:!0, rows:"3", name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  this.state.data.description)), e && !c && J(Y, {label:"Изображение"}, J("br"), J("img", {src:this.state.data.cdnImage, className:"img-fluid"}), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({O:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!e || c) && J(Y, {label:"Изображение", i:"Картинка, отображаемая на главной странице."}, J(Z.D, {required:!0, name:"image", type:"file", file:"1"})), J(Hb, {article:this.state.article, ja:function(b) {
    a.b({article:b});
  }}), e && J("input", {value:this.c.id, type:"hidden", name:"id"}), J("button", {disabled:this.state.u, type:"submit", className:"btn btn-primary"}, this.state.u ? "Загрузка..." : e ? "Сохранить" : "Добавить"), this.state.error && J("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.C && J("div", {className:"alert alert-success mt-3", role:"alert"}, "Категория успешно ", e ? "сохранена" : "создана", "!")));
};
function Kb() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
v(Kb, O);
Kb.prototype.s = function() {
  var a = this;
  return H(function(b) {
    return w(b, a.load(), 0);
  });
};
Kb.prototype.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), A(h, 2, 3), w(h, V("/admin-data?objects"), 5);
      case 5:
        return b = h.a, w(h, b.json(), 6);
      case 6:
        c = h.a, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        E(h);
        a.b({g:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.m(3);
    }
  });
};
Kb.prototype.h = function() {
  var a = this;
  return J(T, {}, J("h1", {}, "Объекты Недвижимости"), J("p", {}, "На сайт добалены следующие объекты:"), this.state.g && J("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return J(Lb, Object.assign({}, c, {key:b, id:b, T:function() {
      return a.load();
    }}));
  }));
};
function Lb() {
  O.call(this);
  this.state = {o:null};
}
v(Lb, O);
Lb.prototype.h = function() {
  var a = this, b = this.c, c = b.title, e = b.description, f = b.seo, g = b.id, h = b.T, k = b.categorySeo;
  return J(tb, {className:"CategoryRow"}, J(T, {className:"col-3 col-sm-4 "}, J("img", {src:b.image, className:"img-fluid p-1"})), J(T, {}, J("h2", {}, c), J("em", {}, "knedv.ru/", k, "/", f), J("p", {}, e)), J(T, {className:"col-1 CategoryMeta"}, J("a", {href:"/admin/add-object/" + g, style:"color:brown;"}, J(U, {icon:"fas fa-pen"})), J("br"), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:J("span", {}, "Вы действительно хотите удалить объект ", J("strong", {}, c), "?"), I:"Удалить", title:"Удаление Объекта", path:"objects&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, J(U, {icon:"far fa-trash-alt"}))), this.state.o && J(zb, Object.assign({}, this.state.o, {H:function() {
    a.b({o:null});
  }, R:"danger", $:h})));
};
function Mb() {
  O.call(this);
  this.state = {g:!1, data:{}, va:[], hint:"1-комнатные-апартаменты-воскресенское", ua:"апартаменты", article:""};
}
v(Mb, O);
function Nb(a) {
  var b, c, e, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        return a.b({g:!0}), A(k, 2, 3), w(k, V("/admin-data?categories"), 5);
      case 5:
        return b = k.a, w(k, b.json(), 6);
      case 6:
        c = k.a, e = c.error, f = c.data, e ? a.b({error:e}) : (g = f.map(function(a) {
          return {value:a._id, title:a.title};
        }), a.b({va:g}));
      case 3:
        E(k);
        a.b({g:!1});
        G(k, 0);
        break;
      case 2:
        h = B(k), a.b({error:h}), k.m(3);
    }
  });
}
Mb.prototype.s = function() {
  var a = this, b, c, e, f, g, h, k, m, n, q;
  return H(function(l) {
    switch(l.f) {
      case 1:
        return w(l, Nb(a), 2);
      case 2:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({B:1, g:!0});
        A(l, 3, 4);
        return w(l, V("/admin-data?objects&id=" + a.c.id), 6);
      case 6:
        return c = l.a, w(l, c.json(), 7);
      case 7:
        e = l.a, f = e.error, g = e.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, hint:k.seo, ua:k.categorySeo, article:k.article}));
      case 4:
        E(l);
        a.b({g:!1});
        G(l, 0);
        break;
      case 3:
        n = m = B(l), q = n.message, a.b({error:q}), l.m(4);
    }
  });
};
Mb.prototype.a = function(a) {
  var b = this, c, e, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({u:!0}), A(k, 2, 3), w(k, V("/admin-data?objects", {method:"POST", body:c}), 5);
      case 5:
        return e = k.a, w(k, e.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({C:1});
      case 3:
        E(k);
        b.b({u:!1});
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
Mb.prototype.h = function() {
  var a = this, b = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.ua + "/<strong>" + this.state.hint + "</strong>.", c = this.state, e = c.B, f = c.O;
  c = c.va;
  return this.state.g ? J(T, {}, J("h1", {}, this.state.B ? "Редактировать" : "Добавить", " Объект"), J("span", {className:"echo-loader"}, "Loading…")) : J(T, {}, J("h1", {}, this.state.B ? "Редактировать" : "Добавить", " Объект"), !(e && this.state.g) && J(X, {ha:function(b) {
    return a.form = b;
  }, aa:this.a.bind(this)}, J(Y, {i:"Название для каталога недвижимости.", label:"Название"}, J(Z.D, {required:!0, name:"title", value:this.state.data.title, placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское"})), J(Y, {i:b, label:"СЕО Название"}, J(Z.D, {required:!0, name:"seo", value:this.state.data.seo, placeholder:"1-комнатные-апартаменты-воскресенское"})), J(Y, {i:"Описание объекта.", label:"Описание"}, J(Z.da, {rows:10, required:!0, name:"description", placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично)."}, 
  this.state.data.description)), e && !f && J("div", {className:"form-group"}, J("label", {}, "Изображение"), J("br"), J("img", {src:this.state.data.cdnImage, className:"img-fluid"}), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({O:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!e || f) && J(Y, {label:"Изображение", i:"Картинка, отображаемая на главной странице."}, J(Z.D, {required:!0, name:"image", file:"1", type:"file"})), J(Hb, {article:this.state.article, ja:function(b) {
    a.b({article:b});
  }}), e && J("input", {value:this.c.id, type:"hidden", name:"id"}), J(Y, {label:"Раздел", i:"Категория в каталоге"}, J(Z.Fa, {options:c, name:"category", required:!0, value:this.state.data.category})), J("button", {disabled:this.state.u, type:"submit", className:"btn btn-primary"}, this.state.u ? "Загрузка..." : e ? "Сохранить" : "Добавить"), J(Ob, {error:this.state.error}), this.state.C && J("div", {className:"alert alert-success mt-3", role:"alert"}, "Объект успешно ", e ? "сохранен" : "создан", 
  "!")));
};
function Ob(a) {
  return (a = a.error) ? J("div", {className:"alert alert-danger mt-3", role:"alert"}, a) : null;
}
;function Pb() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
v(Pb, O);
Pb.prototype.s = function() {
  var a = this;
  return H(function(b) {
    return w(b, a.load(), 0);
  });
};
Pb.prototype.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), A(h, 2, 3), w(h, V("/admin-data?pages"), 5);
      case 5:
        return b = h.a, w(h, b.json(), 6);
      case 6:
        c = h.a, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        E(h);
        a.b({g:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.m(3);
    }
  });
};
Pb.prototype.h = function() {
  var a = this;
  return J(T, {}, J("h1", {}, "Материалы Сайта"), J("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.g && J("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return J(Qb, Object.assign({}, c, {key:b, id:b, T:function() {
      return a.load();
    }}));
  }));
};
function Qb() {
  O.call(this);
  this.state = {o:null};
}
v(Qb, O);
Qb.prototype.h = function() {
  var a = this, b = this.c, c = b.seo, e = b.id, f = b.description, g = b.T, h = b.title;
  return J(tb, {className:"CategoryRow"}, J(T, {}, J("h2", {}, h), J("em", {}, "knedv.ru/", c), J("p", {}, f)), J(T, {className:"col-1 CategoryMeta"}, J("a", {href:"/admin/add-page/" + e, style:"color:brown;"}, J(U, {icon:"fas fa-pen"})), J("br"), J("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:J("span", {}, "Вы действительно хотите удалить страницу ", J("strong", {}, h), "?"), I:"Удалить", title:"Удаление Страницы", path:"pages&id=" + e + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, J(U, {icon:"far fa-trash-alt"}))), this.state.o && J(zb, Object.assign({}, this.state.o, {H:function() {
    a.b({o:null});
  }, R:"danger", $:g})));
};
function Rb() {
  O.call(this);
  this.state = {g:!1, data:{}, article:""};
}
v(Rb, O);
Rb.prototype.s = function() {
  var a = this, b, c, e, f, g, h, k, m, n, q;
  return H(function(l) {
    switch(l.f) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({B:1, g:!0});
        A(l, 2, 3);
        return w(l, V("/admin-data?pages&id=" + a.c.id), 5);
      case 5:
        return c = l.a, w(l, c.json(), 6);
      case 6:
        e = l.a, f = e.error, g = e.data, f ? a.b({error:f}) : (h = r(g), k = h.next().value, a.b({data:k, article:k.article}));
      case 3:
        E(l);
        a.b({g:!1});
        G(l, 0);
        break;
      case 2:
        n = m = B(l), q = n.message, a.b({error:q}), l.m(3);
    }
  });
};
Rb.prototype.a = function(a) {
  var b = this, c, e, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({u:!0}), A(k, 2, 3), w(k, V("/admin-data?pages", {method:"POST", body:c}), 5);
      case 5:
        return e = k.a, w(k, e.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({C:1});
      case 3:
        E(k);
        b.b({u:!1});
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
Rb.prototype.h = function() {
  var a = this, b = this.state.B;
  return J(T, {}, J("h1", {}, this.state.B ? "Редактировать" : "Добавить", " Страницу"), b && this.state.g && J("span", {className:"echo-loader"}, "Loading…"), !(b && this.state.g) && J("form", {ref:function(b) {
    return a.form = b;
  }, onSubmit:this.a.bind(this)}, J(vb, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", i:"Название для администратора.", required:"1"}), J(vb, {i:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), J(vb, {oa:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", i:"Описание страницы.", value:this.state.data.description, required:"1"}), 
  J(Hb, {article:this.state.article, ja:function(b) {
    a.b({article:b});
  }}), b && J("input", {value:this.c.id, type:"hidden", name:"id"}), J("button", {disabled:this.state.u, type:"submit", className:"btn btn-primary"}, this.state.u ? "Загрузка..." : b ? "Сохранить" : "Добавить"), this.state.error && J("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.C && J("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", b ? "сохранена" : "создана", "!")));
};
function Sb() {
  O.call(this);
  this.state = {O:!1};
}
v(Sb, O);
Sb.prototype.h = function(a) {
  var b = this, c = a.B, e = a.required, f = a.image;
  a = a.i;
  var g = this.state.O;
  if (c && !g) {
    return J(Y, {i:a, label:"Изображение"}, J("br"), J("img", {src:f, className:"img-fluid"}), J("a", {onClick:function(a) {
      a.preventDefault();
      b.b({O:!0});
      return !1;
    }, href:"#", className:"btn btn-outline-warning"}, "Изменить"));
  }
  if (!c || g) {
    return J(Y, {i:a, label:"Изображение"}, J(Z.D, {required:void 0 !== e, name:"image", type:"file", file:"1"}));
  }
};
function Tb(a) {
  O.apply(this, arguments);
}
v(Tb, O);
Tb.prototype.a = function(a) {
  var b = this, c, e, f, g, h;
  return H(function(k) {
    switch(k.f) {
      case 1:
        a.preventDefault();
        if (!b.c.path) {
          return b.b({error:"Form Path is not included"}), k.return(!1);
        }
        b.b({error:null, C:null});
        c = new FormData(a.target);
        b.b({u:!0});
        A(k, 2, 3);
        return w(k, fetch(b.c.path, {method:"POST", body:c}), 5);
      case 5:
        return e = k.a, w(k, e.json(), 6);
      case 6:
        f = k.a, (g = f.error) ? b.b({error:g}) : b.b({C:1});
      case 3:
        E(k);
        b.b({u:!1});
        G(k, 4);
        break;
      case 2:
        h = B(k);
        b.b({error:h});
        k.m(3);
        break;
      case 4:
        if (!b.c.na) {
          k.m(7);
          break;
        }
        return w(k, b.c.na(), 7);
      case 7:
        return k.return(!1);
    }
  });
};
function Ub() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
v(Ub, O);
d = Ub.prototype;
d.s = function() {
  var a = this;
  return H(function(b) {
    return w(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(h) {
    switch(h.f) {
      case 1:
        return a.b({g:!0}), A(h, 2, 3), w(h, V("/admin-data?specials"), 5);
      case 5:
        return b = h.a, w(h, b.json(), 6);
      case 6:
        c = h.a, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        E(h);
        a.b({g:!1});
        G(h, 0);
        break;
      case 2:
        g = B(h), a.b({error:g}), h.m(3);
    }
  });
};
d.N = function(a) {
  this.b({o:a});
};
d.M = function(a) {
  this.b({za:a});
};
d.h = function() {
  var a = this, b = J("details", {}, J("summary", {}, J("h3", {style:"display: inline-block;vertical-align: middle;"}, "Создать Новое Предложение")), J(Vb, {na:function() {
    a.load();
  }, path:"/admin-data?specials", Ea:"Предложение успешно создано!", I:"Добавить"}));
  return J(T, {}, J("h1", {}, "Специальные Предложения"), J(Wb, {data:this.state.data, g:this.state.g, N:this.N.bind(this), M:this.M.bind(this)}), J("hr"), b, this.state.o && J(zb, Object.assign({}, this.state.o, {H:this.N.bind(this, null), R:"danger", $:this.load.bind(this)})), this.state.za && J(Bb, {H:this.M.bind(this, null), title:"Редактирование"}, J(Vb, {item:this.state.za, na:this.load.bind(this), H:this.M.bind(this, null), path:"/admin-data?specials", Y:"Отмена", Ea:"Предложение успешно отредактировано!", 
  I:"Сохранить"})));
};
function Wb(a) {
  var b = a.data, c = a.N, e = a.M;
  a = a.g;
  return J("div", {style:"height:25rem;overflow:scroll;background:wheat; padding:0.5rem;"}, a && J("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет специальных предложений.", b.map(function(a) {
    return J(Xb, {item:a, key:a._id, N:c, M:e});
  }));
}
function Xb(a) {
  var b = a.item, c = a.N, e = a.M, f = b._id, g = b.title;
  a = b.cdnImage;
  var h = b.description, k = b.price, m = "on" == b.show_on_main;
  return J("div", {className:m ? "IsShownOnMain" : "", style:"border-bottom:1px solid brown;border-top:1px solid lightcoral;"}, J("h4", {}, g, " ", m && J("span", {className:"badge badge-danger"}, "На главной")), J("p", {}, J("img", {src:a, style:"display:block;"}), h, J("span", {style:"font-weight: bold;"}, " ", k)), J("a", {onClick:function(a) {
    a.preventDefault();
    c({text:J("span", {}, "Вы действительно хотите удалить предложение ", J("strong", {}, g), "?"), I:"Удалить", title:"Удаление Предложения", path:"specials&id=" + f + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, J(U, {icon:"far fa-trash-alt"})), J("a", {onClick:function(a) {
    a.preventDefault();
    e(b);
    return a;
  }, style:"color:brown;", href:"#"}, J(U, {icon:"fas fa-pen"})));
}
function Vb(a) {
  Tb.apply(this, arguments);
}
v(Vb, Tb);
Vb.prototype.h = function(a) {
  var b = this, c = a.item, e = a.H, f = void 0 === a.Y ? "Отмена" : a.Y, g = a.Ea;
  a = void 0 === a.I ? "Добавить" : a.I;
  var h = c || {}, k = this.state.u;
  return J(X, {aa:this.a.bind(this), l:function() {
    b.b({error:null, C:null});
  }}, J(Y, {label:"Название", i:"Заголовок для главной страницы, напр., Ленинский проспект, дом 114"}, J(Z.D, {value:h.title, placeholder:"Название акции", name:"title", required:1})), J(Y, {label:"Описание", i:"Введите описание акции..."}, J(Z.da, {required:!0, name:"description", placeholder:"Описание акции"}, h.description)), J(Sb, {B:c, i:"Картинка, отображаемая на главной странице.", required:1, image:h.cdnImage}), J(Y, {label:"Цена", i:"Задайте цену..."}, J(Z.D, {value:h.price, name:"price", 
  placeholder:"55 000 000 руб."})), J(Y, {label:"Переход", i:"Ссылка на страницу каталога, или сайта."}, J(Z.D, {value:h.href, name:"href", placeholder:"/каталог/москва-элитная/лениниский-проспект-дом-114"})), J(Y, {i:"Добавить в специальные предложения на главной."}, J(xb, {value:h.show_on_main, label:"Отображать на главной", name:"show_on_main"})), c && J("input", {value:h._id, type:"hidden", name:"id"}), J(Yb, {error:this.state.error}), J(Zb, {C:this.state.C, message:g}), J("button", {disabled:k, 
  type:"submit", className:"btn btn-primary"}, k ? "Загрузка..." : a), e && J("button", {onClick:e, type:"button", className:"FormCancelBtn btn btn-secondary"}, f));
};
function Yb(a) {
  return (a = a.error) ? J("div", {className:"alert alert-danger mt-3", role:"alert"}, a) : null;
}
function Zb(a) {
  var b = a.C;
  return b ? J("div", {className:"alert alert-success mt-3", role:"alert"}, a.message || b) : null;
}
;function $b() {
  return J(T, {}, J("h1", {}, "Добро Пожаловать!"));
}
;var ac = J(function() {
  return J(tb, {id:"App"}, J(T, {className:"col-md-4"}, J(yb)), J(qb, {l:function(a) {
    a.current && a.current.attributes.title && (document.title = a.current.attributes.title);
  }}, J($b, {path:"/admin", title:"Главная"}), J(Kb, {path:"/admin/objects", title:"Объекты Недвижимости"}), J(Mb, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), J(Cb, {path:"/admin/categories", title:"Категории Каталога"}), J(Jb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), J(Pb, {path:"/admin/pages", title:"Статьи"}), J(Rb, {path:"/admin/add-page/:id?", title:"Добавить Страницу"}), J(Ub, {path:"/admin/special", title:"Специальные Предложения"})));
});
Ta(document.querySelector("#App"), ac, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map