var d;
function aa(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
}, m = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function ca() {
  ca = function() {
  };
  m.Symbol || (m.Symbol = da);
}
var da = function() {
  var a = 0;
  return function(b) {
    return "jscomp_symbol_" + (b || "") + a++;
  };
}();
function ea() {
  ca();
  var a = m.Symbol.iterator;
  a || (a = m.Symbol.iterator = m.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && ba(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return fa(aa(this));
  }});
  ea = function() {
  };
}
function fa(a) {
  ea();
  a = {next:a};
  a[m.Symbol.iterator] = function() {
    return this;
  };
  return a;
}
function r(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : {next:aa(a)};
}
function ha(a) {
  for (var b, c = []; !(b = a.next()).done;) {
    c.push(b.value);
  }
  return c;
}
function ia(a) {
  return a instanceof Array ? a : ha(r(a));
}
var ja = "function" == typeof Object.create ? Object.create : function(a) {
  function b() {
  }
  b.prototype = a;
  return new b;
}, ka;
if ("function" == typeof Object.setPrototypeOf) {
  ka = Object.setPrototypeOf;
} else {
  var la;
  a: {
    var ma = {Ja:!0}, na = {};
    try {
      na.__proto__ = ma;
      la = na.Ja;
      break a;
    } catch (a) {
    }
    la = !1;
  }
  ka = la ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) {
      throw new TypeError(a + " is not extensible");
    }
    return a;
  } : null;
}
var oa = ka;
function t(a, b) {
  a.prototype = ja(b.prototype);
  a.prototype.constructor = a;
  if (oa) {
    oa(a, b);
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
  a.kb = b.prototype;
}
function pa(a, b) {
  if (b) {
    var c = m;
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
pa("Promise", function(a) {
  function b(a) {
    this.f = 0;
    this.A = void 0;
    this.a = [];
    var b = this.j();
    try {
      a(b.resolve, b.reject);
    } catch (p) {
      b.reject(p);
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
  var f = m.setTimeout;
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
          this.w(n);
        }
      }
    }
    this.a = null;
  };
  c.prototype.w = function(a) {
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
    return {resolve:a(this.Sa), reject:a(this.w)};
  };
  b.prototype.Sa = function(a) {
    if (a === this) {
      this.w(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof b) {
        this.Ua(a);
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
        c ? this.ca(a) : this.M(a);
      }
    }
  };
  b.prototype.ca = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (p) {
      this.w(p);
      return;
    }
    "function" == typeof b ? this.Wa(b, a) : this.M(a);
  };
  b.prototype.w = function(a) {
    this.N(2, a);
  };
  b.prototype.M = function(a) {
    this.N(1, a);
  };
  b.prototype.N = function(a, b) {
    if (0 != this.f) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.f);
    }
    this.f = a;
    this.A = b;
    this.V();
  };
  b.prototype.V = function() {
    if (null != this.a) {
      for (var a = 0; a < this.a.length; ++a) {
        g.f(this.a[a]);
      }
      this.a = null;
    }
  };
  var g = new c;
  b.prototype.Ua = function(a) {
    var b = this.j();
    a.aa(b.resolve, b.reject);
  };
  b.prototype.Wa = function(a, b) {
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
        } catch (E) {
          g(E);
        }
      } : b;
    }
    var f, g, h = new b(function(a, b) {
      f = a;
      g = b;
    });
    this.aa(e(a, f), e(c, g));
    return h;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.aa = function(a, b) {
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
        e(g.value).aa(b, c);
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
        h.push(void 0), k++, e(f.value).aa(g(h.length - 1), b), f = c.next();
      } while (!f.done);
    });
  };
  return b;
});
function qa() {
  this.N = !1;
  this.A = null;
  this.f = void 0;
  this.a = 1;
  this.w = this.M = 0;
  this.ca = this.j = null;
}
function ra(a) {
  if (a.N) {
    throw new TypeError("Generator is already running");
  }
  a.N = !0;
}
qa.prototype.V = function(a) {
  this.f = a;
};
function sa(a, b) {
  a.j = {Da:b, Fa:!0};
  a.a = a.M || a.w;
}
qa.prototype.return = function(a) {
  this.j = {return:a};
  this.a = this.w;
};
function v(a, b, c) {
  a.a = c;
  return {value:b};
}
qa.prototype.u = function(a) {
  this.a = a;
};
function x(a, b, c) {
  a.M = b;
  void 0 != c && (a.w = c);
}
function ta(a) {
  a.M = 0;
  a.w = 3;
}
function y(a) {
  a.M = 0;
  var b = a.j.Da;
  a.j = null;
  return b;
}
function z(a) {
  a.ca = [a.j];
  a.M = 0;
  a.w = 0;
}
function D(a, b) {
  var c = a.ca.splice(0)[0];
  (c = a.j = a.j || c) ? c.Fa ? a.a = a.M || a.w : void 0 != c.u && a.w < c.u ? (a.a = c.u, a.j = null) : a.a = a.w : a.a = b;
}
function ua(a) {
  this.a = new qa;
  this.f = a;
}
function va(a, b) {
  ra(a.a);
  var c = a.a.A;
  if (c) {
    return wa(a, "return" in c ? c["return"] : function(a) {
      return {value:a, done:!0};
    }, b, a.a.return);
  }
  a.a.return(b);
  return xa(a);
}
function wa(a, b, c, e) {
  try {
    var f = b.call(a.a.A, c);
    if (!(f instanceof Object)) {
      throw new TypeError("Iterator result " + f + " is not an object");
    }
    if (!f.done) {
      return a.a.N = !1, f;
    }
    var g = f.value;
  } catch (k) {
    return a.a.A = null, sa(a.a, k), xa(a);
  }
  a.a.A = null;
  e.call(a.a, g);
  return xa(a);
}
function xa(a) {
  for (; a.a.a;) {
    try {
      var b = a.f(a.a);
      if (b) {
        return a.a.N = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.a.f = void 0, sa(a.a, c);
    }
  }
  a.a.N = !1;
  if (a.a.j) {
    b = a.a.j;
    a.a.j = null;
    if (b.Fa) {
      throw b.Da;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function ya(a) {
  this.next = function(b) {
    ra(a.a);
    a.a.A ? b = wa(a, a.a.A.next, b, a.a.V) : (a.a.V(b), b = xa(a));
    return b;
  };
  this.throw = function(b) {
    ra(a.a);
    a.a.A ? b = wa(a, a.a.A["throw"], b, a.a.V) : (sa(a.a, b), b = xa(a));
    return b;
  };
  this.return = function(b) {
    return va(a, b);
  };
  ea();
  this[Symbol.iterator] = function() {
    return this;
  };
}
function za(a) {
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
  return za(new ya(new ua(a)));
}
var Aa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
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
pa("Object.assign", function(a) {
  return a || Aa;
});
function Ba(a, b) {
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
pa("Array.prototype.values", function(a) {
  return a ? a : function() {
    return Ba(this, function(a, c) {
      return c;
    });
  };
});
function Ca() {
}
var J = {}, Da = [], Ea = [];
function K(a, b) {
  var c = Ea, e, f;
  for (f = arguments.length; 2 < f--;) {
    Da.push(arguments[f]);
  }
  b && null != b.children && (Da.length || Da.push(b.children), delete b.children);
  for (; Da.length;) {
    if ((e = Da.pop()) && void 0 !== e.pop) {
      for (f = e.length; f--;) {
        Da.push(e[f]);
      }
    } else {
      "boolean" === typeof e && (e = null);
      if (f = "function" !== typeof a) {
        null == e ? e = "" : "number" === typeof e ? e = String(e) : "string" !== typeof e && (f = !1);
      }
      f && g ? c[c.length - 1] += e : c === Ea ? c = [e] : c.push(e);
      var g = f;
    }
  }
  g = new Ca;
  g.nodeName = a;
  g.children = c;
  g.attributes = null == b ? void 0 : b;
  g.key = null == b ? void 0 : b.key;
  void 0 !== J.Xa && J.Xa(g);
  return g;
}
function L(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
  return a;
}
function Fa(a, b) {
  null != a && ("function" == typeof a ? a(b) : a.current = b);
}
var Ga = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
function Ha(a, b) {
  return K(a.nodeName, L(L({}, a.attributes), b), 2 < arguments.length ? [].slice.call(arguments, 2) : a.children);
}
var Ia = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, Ja = [];
function Ka(a) {
  !a.Y && (a.Y = !0) && 1 == Ja.push(a) && (J.$a || Ga)(La);
}
function La() {
  for (var a; a = Ja.pop();) {
    a.Y && Ma(a);
  }
}
function Na(a) {
  var b = L({}, a.attributes);
  b.children = a.children;
  a = a.nodeName.ab;
  if (void 0 !== a) {
    for (var c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
function Pa(a) {
  var b = a.parentNode;
  b && b.removeChild(a);
}
function Qa(a, b, c, e) {
  var f = M;
  "className" === b && (b = "class");
  if ("key" !== b) {
    if ("ref" === b) {
      Fa(c, null), Fa(e, a);
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
              a.style[g] = "number" === typeof e[g] && !1 === Ia.test(g) ? e[g] + "px" : e[g];
            }
          }
        } else {
          if ("dangerouslySetInnerHTML" === b) {
            e && (a.innerHTML = e.ia || "");
          } else {
            if ("o" == b[0] && "n" == b[1]) {
              f = b !== (b = b.replace(/Capture$/, "")), b = b.toLowerCase().substring(2), e ? c || a.addEventListener(b, Ra, f) : a.removeEventListener(b, Ra, f), (a.ua || (a.ua = {}))[b] = e;
            } else {
              if ("list" !== b && "type" !== b && !f && b in a) {
                try {
                  a[b] = null == e ? "" : e;
                } catch (k) {
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
function Ra(a) {
  return this.ua[a.type](J.event && J.event(a) || a);
}
var Sa = [], Ta = 0, M = !1, Ua = !1;
function Va() {
  for (var a; a = Sa.shift();) {
    J.Ka && J.Ka(a), a.m && a.m();
  }
}
function Wa(a, b, c, e, f, g) {
  Ta++ || (M = null != f && void 0 !== f.gb, Ua = null != a && !("__preactattr_" in a));
  a = Xa(a, b, c, e, g);
  f && a.parentNode !== f && f.appendChild(a);
  --Ta || (Ua = !1, g || Va());
  return a;
}
function Xa(a, b, c, e, f) {
  var g = a, k = M;
  if (null == b || "boolean" === typeof b) {
    b = "";
  }
  if ("string" === typeof b || "number" === typeof b) {
    return a && void 0 !== a.splitText && a.parentNode && (!a.C || f) ? a.nodeValue != b && (a.nodeValue = b) : (g = document.createTextNode(b), a && (a.parentNode && a.parentNode.replaceChild(g, a), N(a, !0))), g.__preactattr_ = !0, g;
  }
  f = b.nodeName;
  if ("function" === typeof f) {
    k = a;
    var h = b;
    g = b = k && k.C;
    var p = k, n = b && k.ja === h.nodeName, q = n;
    for (a = Na(h); b && !q && (b = b.va);) {
      q = b.constructor === h.nodeName;
    }
    b && q && (!e || b.C) ? (Ya(b, a, 3, c, e), k = b.K) : (g && !n && (Za(g), k = p = null), b = $a(h.nodeName, a, c), k && !b.O && (b.O = k, p = null), Ya(b, a, 1, c, e), k = b.K, p && k !== p && (p.C = null, N(p, !1)));
    return k;
  }
  M = "svg" === f ? !0 : "foreignObject" === f ? !1 : M;
  f = String(f);
  if (!a || a.Ga !== f && a.nodeName.toLowerCase() !== f.toLowerCase()) {
    if (g = f, f = M ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g), f.Ga = g, g = f, a) {
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
    for (var u = g.attributes, G = u.length; G--;) {
      a[u[G].name] = u[G].value;
    }
  }
  if (!Ua && f && 1 === f.length && "string" === typeof f[0] && null != l && void 0 !== l.splitText && null == l.nextSibling) {
    l.nodeValue != f[0] && (l.nodeValue = f[0]);
  } else {
    if (f && f.length || null != l) {
      l = g;
      u = Ua || null != a.Za;
      G = l.childNodes;
      var I = [], E = {}, B = 0, A = 0, w = G.length, Z = 0, Oa = f ? f.length : 0;
      if (0 !== w) {
        for (q = 0; q < w; q++) {
          var C = G[q], R = C.__preactattr_;
          var F = Oa && R ? C.C ? C.C.sa : R.key : null;
          if (null != F) {
            B++, E[F] = C;
          } else {
            if (R || (void 0 !== C.splitText ? u ? C.nodeValue.trim() : 1 : u)) {
              I[Z++] = C;
            }
          }
        }
      }
      if (0 !== Oa) {
        for (q = 0; q < Oa; q++) {
          w = f[q];
          n = null;
          F = w.key;
          if (null != F) {
            B && void 0 !== E[F] && (n = E[F], E[F] = void 0, B--);
          } else {
            if (A < Z) {
              for (F = A; F < Z; F++) {
                if (C = void 0 !== I[F]) {
                  if (C = p = I[F], "string" === typeof w || "number" === typeof w) {
                    C = void 0 !== C.splitText;
                  } else {
                    if ("string" === typeof w.nodeName) {
                      if (R = !C.ja) {
                        R = w.nodeName, R = C.Ga === R || C.nodeName.toLowerCase() === R.toLowerCase();
                      }
                      C = R;
                    } else {
                      C = u || C.ja === w.nodeName;
                    }
                  }
                }
                if (C) {
                  n = p;
                  I[F] = void 0;
                  F === Z - 1 && Z--;
                  F === A && A++;
                  break;
                }
              }
            }
          }
          n = Xa(n, w, c, e);
          w = G[q];
          n && n !== l && n !== w && (null == w ? l.appendChild(n) : n === w.nextSibling ? Pa(w) : l.insertBefore(n, w));
        }
      }
      if (B) {
        for (q in E) {
          void 0 !== E[q] && N(E[q], !1);
        }
      }
      for (; A <= Z;) {
        void 0 !== (n = I[Z--]) && N(n, !1);
      }
    }
  }
  c = g;
  e = b.attributes;
  b = a;
  for (h in b) {
    e && null != e[h] || null == b[h] || Qa(c, h, b[h], b[h] = void 0);
  }
  for (h in e) {
    "children" === h || "innerHTML" === h || h in b && e[h] === ("value" === h || "checked" === h ? c[h] : b[h]) || Qa(c, h, b[h], b[h] = e[h]);
  }
  M = k;
  return g;
}
function N(a, b) {
  var c = a.C;
  c ? Za(c) : (null != a.__preactattr_ && Fa(a.__preactattr_.fa, null), !1 !== b && null != a.__preactattr_ || Pa(a), ab(a));
}
function ab(a) {
  for (a = a.lastChild; a;) {
    var b = a.previousSibling;
    N(a, !0);
    a = b;
  }
}
var bb = [];
function $a(a, b, c) {
  var e = bb.length;
  if (a.prototype && a.prototype.h) {
    var f = new a(b, c);
    O.call(f, b, c);
  } else {
    f = new O(b, c), f.constructor = a, f.h = cb;
  }
  for (; e--;) {
    if (bb[e].constructor === a) {
      f.O = bb[e].O;
      bb.splice(e, 1);
      break;
    }
  }
  return f;
}
function cb(a, b, c) {
  return this.constructor(a, c);
}
function Ya(a, b, c, e, f) {
  a.Z || (a.Z = !0, a.ta = b.fa, a.sa = b.key, delete b.fa, delete b.key, "undefined" === typeof a.constructor.Ea && (!a.K || f ? a.Ba && a.Ba() : a.Na && a.Na(b, e)), e && e !== a.context && (a.na || (a.na = a.context), a.context = e), a.oa || (a.oa = a.c), a.c = b, a.Z = !1, 0 !== c && (1 !== c && !1 === J.lb && a.K ? Ka(a) : Ma(a, 1, f)), Fa(a.ta, a));
}
function Ma(a, b, c, e) {
  if (!a.Z) {
    var f = a.c, g = a.state, k = a.context, h = a.oa || f, p = a.pa || g, n = a.na || k, q = a.K, l = a.O, u = q || l, G = a.C, I = !1, E = n, B;
    a.constructor.Ea && (g = L(L({}, g), a.constructor.Ea(f, g)), a.state = g);
    q && (a.c = h, a.state = p, a.context = n, 2 !== b && a.S && !1 === a.S(f, g, k) ? I = !0 : a.Ca && a.Ca(f, g, k), a.c = f, a.state = g, a.context = k);
    a.oa = a.pa = a.na = a.O = null;
    a.Y = !1;
    if (!I) {
      f = a.h(f, g, k);
      a.ka && (k = L(L({}, k), a.ka()));
      q && a.Ra && (E = a.Ra(h, p));
      g = f && f.nodeName;
      if ("function" === typeof g) {
        var A = Na(f);
        if ((B = G) && B.constructor === g && A.key == B.sa) {
          Ya(B, A, 1, k, !1);
        } else {
          var w = B;
          a.C = B = $a(g, A, k);
          B.O = B.O || l;
          B.va = a;
          Ya(B, A, 0, k, !1);
          Ma(B, 1, c, !0);
        }
        A = B.K;
      } else {
        l = u;
        if (w = G) {
          l = a.C = null;
        }
        if (u || 1 === b) {
          l && (l.C = null), A = Wa(l, f, k, c || !q, u && u.parentNode, !0);
        }
      }
      u && A !== u && B !== G && (k = u.parentNode) && A !== k && (k.replaceChild(A, u), w || (u.C = null, N(u, !1)));
      w && Za(w);
      if ((a.K = A) && !e) {
        for (w = u = a; w = w.va;) {
          (u = w).K = A;
        }
        A.C = u;
        A.ja = u.constructor;
      }
    }
    !q || c ? Sa.push(a) : I || (a.Aa && a.Aa(h, p, E), J.La && J.La(a));
    for (; a.$.length;) {
      a.$.pop().call(a);
    }
    Ta || e || Va();
  }
}
function Za(a) {
  J.Ma && J.Ma(a);
  var b = a.K;
  a.Z = !0;
  a.ba && a.ba();
  a.K = null;
  var c = a.C;
  c ? Za(c) : b && (null != b.__preactattr_ && Fa(b.__preactattr_.fa, null), a.O = b, Pa(b), bb.push(a), ab(b));
  Fa(a.ta, null);
}
function O(a, b) {
  this.Y = !0;
  this.context = b;
  this.c = a;
  this.state = this.state || {};
  this.$ = [];
}
L(O.prototype, {b:function(a, b) {
  this.pa || (this.pa = this.state);
  this.state = L(L({}, this.state), "function" === typeof a ? a(this.state, this.c) : a);
  b && this.$.push(b);
  Ka(this);
}, Oa:function(a) {
  a && this.$.push(a);
  Ma(this, 2);
}, h:function() {
}});
var db = {};
function eb(a, b) {
  return a.ea < b.ea ? 1 : a.ea > b.ea ? -1 : a.index - b.index;
}
function fb(a, b) {
  try {
    return a.index = b, a.ea = a.attributes.default ? 0 : gb(a.attributes.path).map(hb).join(""), a.attributes;
  } catch (c) {
    return !1;
  }
}
function gb(a) {
  return a.replace(/(^\/+|\/+$)/g, "").split("/");
}
function hb(a) {
  return ":" == a.charAt(0) ? 1 + "*+?".indexOf(a.charAt(a.length - 1)) || 4 : 5;
}
;var P = null, ib = [], jb = [];
function kb() {
  var a;
  P && P.location ? a = P.location : P && P.Qa ? a = P.Qa() : a = "undefined" !== typeof location ? location : {};
  return "" + (a.pathname || "") + (a.search || "");
}
function lb(a) {
  for (var b = !1, c = 0; c < ib.length; c++) {
    !0 === mb(ib[c], a) && (b = !0);
  }
  for (c = jb.length; c--;) {
    jb[c](a);
  }
  return b;
}
function nb(a) {
  if (a && a.getAttribute) {
    var b = a.getAttribute("href");
    a = a.getAttribute("target");
    if (b && b.match(/^\//g) && (!a || a.match(/^_?self$/i))) {
      var c = void 0 === c ? !1 : c;
      "string" !== typeof b && b.url && (c = b.replace, b = b.url);
      a: {
        a = b;
        for (var e = ib.length; e--;) {
          if (0 < ob(ib[e].c.children, a, !1).length) {
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
      return lb(b);
    }
  }
}
function pb(a) {
  if (0 == a.button) {
    return nb(a.currentTarget || a.target || this), qb(a);
  }
}
function qb(a) {
  a && (a.stopImmediatePropagation && a.stopImmediatePropagation(), a.stopPropagation && a.stopPropagation(), a.preventDefault());
  return !1;
}
function rb(a) {
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
        if (nb(b)) {
          return qb(a);
        }
      }
    } while (b = b.parentNode);
  }
}
var sb = !1;
function tb() {
  sb || ("function" === typeof addEventListener && (P || addEventListener("popstate", function() {
    lb(kb());
  }), addEventListener("click", rb)), sb = !0);
}
function ub(a) {
  O.call(this, a);
  a.history && (P = a.history);
  this.state = {url:a.url || kb()};
  tb();
}
t(ub, O);
d = ub.prototype;
d.S = function(a) {
  return !0 !== a.jb ? !0 : a.url !== this.c.url || a.l !== this.c.l;
};
function mb(a, b) {
  a.a = !1;
  a.b({url:b});
  if (a.updating) {
    return 0 < ob(a.c.children, b, !1).length;
  }
  a.Oa();
  return a.a;
}
d.Ba = function() {
  ib.push(this);
  this.updating = !0;
};
d.m = function() {
  var a = this;
  P && (this.f = P.eb(function(b) {
    mb(a, "" + (b.pathname || "") + (b.search || ""));
  }));
  this.updating = !1;
};
d.ba = function() {
  "function" === typeof this.f && this.f();
  ib.splice(ib.indexOf(this), 1);
};
d.Ca = function() {
  this.updating = !0;
};
d.Aa = function() {
  this.updating = !1;
};
function ob(a, b, c) {
  return a.filter(fb).sort(eb).map(function(a) {
    var e = b;
    var g = a.attributes.path, k = a.attributes, h = /(?:\?([^#]*))?(#.*)?$/, p = e.match(h), n = {};
    if (p && p[1]) {
      p = p[1].split("&");
      for (var q = 0; q < p.length; q++) {
        var l = p[q].split("=");
        n[decodeURIComponent(l[0])] = decodeURIComponent(l.slice(1).join("="));
      }
    }
    e = gb(e.replace(h, ""));
    g = gb(g || "");
    h = Math.max(e.length, g.length);
    for (p = 0; p < h; p++) {
      if (g[p] && ":" === g[p].charAt(0)) {
        q = g[p].replace(/(^:|[+*?]+$)/g, "");
        l = (g[p].match(/[+*?]+$/) || db)[0] || "";
        var u = ~l.indexOf("+"), G = ~l.indexOf("*"), I = e[p] || "";
        if (!I && !G && (0 > l.indexOf("?") || u)) {
          var E = !1;
          break;
        }
        n[q] = decodeURIComponent(I);
        if (u || G) {
          n[q] = e.slice(p).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (g[p] !== e[p]) {
          E = !1;
          break;
        }
      }
    }
    if (e = !0 !== k.default && !1 === E ? !1 : n) {
      return !1 !== c ? (e = Object.assign({}, {url:b, matches:e}, e), delete e.fa, delete e.key, Ha(a, e)) : a;
    }
  }).filter(Boolean);
}
d.h = function(a, b) {
  var c = a.l;
  b = b.url;
  a = ob(a.children, b, !0);
  var e = a[0] || null;
  this.a = !!e;
  var f = this.j;
  b !== f && (this.j = b, "function" === typeof c && c({ib:this, url:b, hb:f, active:a, current:e}));
  return e;
};
function vb(a) {
  return K("a", Object.assign({}, a, {onClick:pb}));
}
function wb() {
  O.call(this);
  this.a = this.a.bind(this);
}
t(wb, O);
wb.prototype.a = function(a) {
  this.f = a;
  this.b({});
};
wb.prototype.m = function() {
  jb.push(this.a);
};
wb.prototype.ba = function() {
  jb.splice(jb.indexOf(this.a) >>> 0, 1);
};
wb.prototype.h = function(a) {
  var b = this.f || kb(), c = b.replace(/\?.+$/, "");
  this.f = null;
  var e = a.children.filter(function(a) {
    return "function" == typeof a;
  });
  return e[0] && e[0]({url:b, path:c, matches:c === a.path});
};
function Q(a) {
  var b = Object.assign({}, a), c = void 0 === a.wa ? "active" : a.wa;
  a = a.path;
  var e = (delete b.wa, delete b.path, b);
  return K(wb, {path:a || e.href}, function(a) {
    return K(vb, Object.assign({}, e, {className:[e.Ya || e.className, a.matches && c].filter(Boolean).join(" ")}));
  });
}
;function xb(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return K("div", Object.assign({}, b, {className:"row" + (a ? " " + a : "")}), c);
}
function S(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return K("div", Object.assign({}, b, {className:"col" + (a ? " " + a : "")}), c);
}
function yb(a) {
  var b = a.ra, c = a.type, e = a.value;
  a = {required:a.required, name:a.name, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), id:a.id, "aria-describedby":a.J};
  return b ? K("textarea", Object.assign({}, a, {rows:"number" == typeof b ? b : 3}), e) : K("input", Object.assign({}, a, e ? {value:e} : {}, {type:c}));
}
function zb(a) {
  var b = a.label, c = void 0 === a.type ? "text" : a.type, e = a.placeholder, f = a.i, g = a.ra, k = a.file, h = a.options, p = a.Va, n = "i" + 100000 * Math.random(), q = "h" + n;
  a = {J:q, id:n, value:a.value, name:a.name, required:a.required};
  c = h ? K(Ab, Object.assign({}, a, {options:h, Va:p})) : K(yb, Object.assign({}, a, {ra:g, placeholder:e, type:c, file:k}));
  return K("div", {className:"form-group"}, K("label", {htmlFor:n}, b), c, f && K("small", {id:q, dangerouslySetInnerHTML:{ia:f}, className:"form-text text-muted"}));
}
function Ab(a) {
  var b = a.options, c = a.value;
  return K("select", {name:a.name, value:c, required:a.required, className:"custom-select", id:a.id, "aria-describedby":a.J}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == c}, a.title);
  }));
}
function T(a) {
  return K("span", {}, K("i", {className:a.icon}), " ");
}
function Bb(a) {
  O.apply(this, arguments);
}
t(Bb, O);
Bb.prototype.S = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Bb.prototype.m = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  void 0 !== b && c(a, b);
};
Bb.prototype.h = function(a) {
  var b = a.name, c = a.label, e = a.value, f = this.context, g = f.id, k = f.l, h = void 0 === f.values ? {} : f.values;
  return K("div", {className:"custom-control custom-switch"}, K("input", {required:void 0 !== a.required, name:b, checked:b in h ? h[b] : e, id:g, type:"checkbox", className:"custom-control-input", "aria-described-by":f.J, onChange:function(a) {
    k(b, a.currentTarget.checked);
  }}), K("label", {htmlFor:g, className:"custom-control-label"}, c));
};
function Cb(a) {
  return (a = a.error) ? K("div", {className:"alert alert-danger mt-3", role:"alert"}, a) : null;
}
function Db(a) {
  var b = a.B;
  return b ? K("div", {className:"alert alert-success mt-3", role:"alert"}, a.message || b) : null;
}
;function Eb() {
  return K("nav", {className:"nav flex-column"}, K(Q, {className:"nav-link", href:"/admin"}, K("i", {className:"fab fa-kickstarter-k"}), " Главная"), K(Q, {className:"nav-link", href:"/admin/objects"}, K("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), K(Q, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, K("i", {className:"fas fa-home"}), " Новая Недвижимость"), K(Q, {className:"nav-link", href:"/admin/categories"}, K("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), K(Q, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, K("i", {className:"fas fa-folder-plus"}), " Добавить"), K(Q, {className:"nav-link", href:"/admin/pages"}, K("i", {className:"fas fa-font"}), " Статьи"), K(Q, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, K("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), K(Q, {className:"nav-link", href:"/admin/special"}, K("i", {className:"fas fa-bolt"}), " Спец. Предложения"), 
  K(Q, {className:"nav-link", href:"/admin/offers"}, K("i", {className:"fas fa-grip-lines"}), " Акции"), K(Q, {className:"nav-link", href:"/admin/galleries/"}, K("i", {className:"fas fa-camera-retro"}), " Галереи"));
}
;function U(a, b) {
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
    var g = new XMLHttpRequest, k;
    for (k in g.open(b.method || "get", a, !0), b.headers) {
      g.setRequestHeader(k, b.headers[k]);
    }
    g.withCredentials = "include" == b.credentials;
    g.onload = function() {
      c(f());
    };
    g.onerror = e;
    g.send(b.body || null);
  });
}
;function Fb() {
  O.call(this);
  this.state = {g:!1};
}
t(Fb, O);
function Gb(a) {
  var b, c, e, f;
  return H(function(g) {
    switch(g.a) {
      case 1:
        return a.b({g:!0}), x(g, 2, 3), v(g, fetch("/admin-data?" + a.c.path, {method:"POST"}), 5);
      case 5:
        return b = g.f, v(g, b.json(), 6);
      case 6:
        c = g.f, (e = c.error) ? a.b({error:e}) : (a.c.F(), a.c.da());
      case 3:
        z(g);
        a.b({g:!1});
        D(g, 0);
        break;
      case 2:
        f = y(g), a.b({error:f}), g.u(3);
    }
  });
}
Fb.prototype.h = function(a) {
  var b = this, c = a.text, e = a.F, f = void 0 === a.U ? "primary" : a.U, g = a.s, k = void 0 === a.L ? "Отмена" : a.L;
  return K("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:e, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, K("p", {}, c)), K("div", {className:"modal-footer"}, 
  K("button", {onClick:e, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, k), K("button", {disabled:this.state.g, type:"button", className:"btn btn-" + f, onClick:function() {
    return Gb(b);
  }}, this.state.g ? "Отправка..." : g)))));
};
function Hb(a) {
  O.apply(this, arguments);
}
t(Hb, O);
Hb.prototype.h = function(a) {
  var b = a.children, c = a.F;
  return K("div", {className:"EditModal modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:c, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, b))));
};
function Ib() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
t(Ib, O);
Ib.prototype.m = function() {
  var a = this;
  return H(function(b) {
    return v(b, a.load(), 0);
  });
};
Ib.prototype.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(k) {
    switch(k.a) {
      case 1:
        return a.b({g:!0}), x(k, 2, 3), v(k, U("/admin-data?categories"), 5);
      case 5:
        return b = k.f, v(k, b.json(), 6);
      case 6:
        c = k.f, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        z(k);
        a.b({g:!1});
        D(k, 0);
        break;
      case 2:
        g = y(k), a.b({error:g}), k.u(3);
    }
  });
};
Ib.prototype.h = function() {
  var a = this;
  return K(S, {}, K("h1", {}, "Категории Каталога"), K("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), this.state.g && K("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return K(Jb, Object.assign({}, c, {key:b, id:b, la:function() {
      return a.load();
    }}));
  }));
};
function Jb() {
  O.call(this);
  this.state = {o:null};
}
t(Jb, O);
Jb.prototype.h = function() {
  var a = this, b = this.c, c = b.title, e = b.description, f = b.seo, g = b.id, k = b.la;
  return K(xb, {className:"CategoryRow"}, K(S, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"})), K(S, {}, K("h2", {}, c), K("em", {}, "knedv.ru/", f), K("p", {}, e)), K(S, {className:"col-1 CategoryMeta"}, K("a", {href:"/admin/add-category/" + g, style:"color:brown;"}, K(T, {icon:"fas fa-pen"})), K("br"), K("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:K("span", {}, "Вы действительно хотите удалить категорию ", K("strong", {}, c), "?"), s:"Удалить", title:"Удаление Категории", path:"categories&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, K(T, {icon:"far fa-trash-alt"}))), this.state.o && K(Fb, Object.assign({}, this.state.o, {F:function() {
    a.b({o:null});
  }, U:"danger", da:k})));
};
function Kb() {
  O.call(this);
  this.c = this.c;
}
t(Kb, O);
Kb.prototype.S = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Kb.prototype.m = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  c && void 0 !== b && c(a, b);
};
Kb.prototype.h = function(a) {
  var b = a.options, c = a.name, e = a.value, f = this.context, g = f.l, k = void 0 === f.values ? {} : f.values;
  return K("select", {name:c, value:c in k ? k[c] : e, required:a.required, className:"custom-select", id:f.id, "aria-describedby":f.J, onChange:function(a) {
    g(c, a.currentTarget.value);
  }}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == e}, a.title);
  }));
};
function Lb() {
  O.call(this);
  this.c = this.c;
}
t(Lb, O);
Lb.prototype.S = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Lb.prototype.m = function() {
  var a = this.c, b = r(a.children).next().value;
  a = a.name;
  var c = this.context.l;
  b && c(a, b.trim());
};
Lb.prototype.h = function(a) {
  var b = a.name, c = a.children, e = this.context, f = e.l, g = void 0 === e.values ? {} : e.values;
  return K("textarea", {required:a.required, name:b, placeholder:a.placeholder, "aria-describedby":e.J, className:"form-control", id:e.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }, rows:void 0 === a.rows ? 3 : a.rows}, b in g ? g[b] : c);
};
function Mb() {
  O.call(this);
  this.c = this.c;
}
t(Mb, O);
Mb.prototype.S = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Mb.prototype.m = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  void 0 !== b && c(a, b);
};
Mb.prototype.h = function(a) {
  var b = a.name, c = a.value, e = this.context, f = e.l, g = void 0 === e.values ? {} : e.values;
  return K("input", {required:a.required, name:b, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), value:b in g ? g[b] : c, type:void 0 === a.type ? "text" : a.type, "aria-describedby":e.J, id:e.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }});
};
function V() {
  O.call(this);
  this.state = {values:{}};
  this.c = this.c;
}
t(V, O);
V.prototype.ka = function() {
  return {values:this.state.values, l:this.l.bind(this)};
};
V.prototype.l = function(a, b) {
  var c = {};
  this.b({values:Object.assign({}, this.state.values, (c[a] = b, c))});
  this.c.l && this.c.l(this.state.values);
};
V.prototype.h = function(a) {
  var b = Object.assign({}, a), c = a.children, e = a.Pa;
  a = a.W;
  b = (delete b.children, delete b.Pa, delete b.W, b);
  return K("form", Object.assign({}, b, {ref:e, onSubmit:a}), c);
};
function W() {
  O.call(this);
  this.id = "i" + Math.floor(100000 * Math.random());
  this.J = "h" + this.id;
  this.c = this.c;
}
t(W, O);
W.prototype.ka = function() {
  return {id:this.id, J:this.J};
};
W.prototype.h = function() {
  var a = this.c, b = a.children, c = a.label;
  a = a.i;
  return K("div", {className:"form-group"}, c && K("label", {htmlFor:this.id}, c), b, a && K("small", {id:this.J, dangerouslySetInnerHTML:{ia:a}, className:"form-text text-muted"}));
};
var X = {get Ia() {
  return Kb;
}, get X() {
  return Lb;
}, get I() {
  return Mb;
}};
function Nb(a) {
  var b = a.article, c = a.ma;
  a = a.name;
  return K("div", {className:"form-group"}, K("label", {}, "Статья"), K("div", {dangerouslySetInnerHTML:{ia:b}, style:"background: #edeee8;", className:"mb-3"}), K("a", {onClick:function(a) {
    a.preventDefault();
    window.editorCallback = function(a) {
      e.close();
      c(a);
    };
    window.editorGetData = function() {
      return b;
    };
    var e = Ob();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"), K("input", {name:a, type:"hidden", value:b}));
}
function Ob() {
  var a = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (a.outerHeight / 2 + a.screenY - 325 - 50) + ",left=" + (a.outerWidth / 2 + a.screenX - 450));
}
;function Pb() {
  O.call(this);
  this.state = {g:!1, data:{}, hint:"москва-новостройки", article:""};
}
t(Pb, O);
Pb.prototype.m = function() {
  var a = this, b, c, e, f, g, k, h, p;
  return H(function(n) {
    switch(n.a) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return n.return();
        }
        a.b({D:1, g:!0});
        x(n, 2, 3);
        return v(n, U("/admin-data?categories&id=" + a.c.id), 5);
      case 5:
        return c = n.f, v(n, c.json(), 6);
      case 6:
        e = n.f, f = e.error, g = e.data, f ? a.b({error:f}) : (k = r(g), h = k.next().value, a.b({data:h, hint:h.seo, article:h.article}));
      case 3:
        z(n);
        a.b({g:!1});
        D(n, 0);
        break;
      case 2:
        p = y(n), a.b({error:p}), n.u(3);
    }
  });
};
Pb.prototype.a = function(a) {
  var b = this, c, e, f, g, k;
  return H(function(h) {
    switch(h.a) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(a.currentTarget.data), b.b({H:!0}), x(h, 2, 3), v(h, U("/admin-data?categories", {method:"POST", body:c}), 5);
      case 5:
        return e = h.f, v(h, e.json(), 6);
      case 6:
        f = h.f, (g = f.error) ? b.b({error:g}) : b.b({B:1});
      case 3:
        z(h);
        b.b({H:!1});
        D(h, 4);
        break;
      case 2:
        k = y(h);
        b.b({error:k});
        h.u(3);
        break;
      case 4:
        return h.return(!1);
    }
  });
};
Pb.prototype.h = function() {
  var a = this, b = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.", c = this.state, e = c.D;
  c = c.ga;
  return K(S, {}, K("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Категорию"), e && this.state.g && K("span", {className:"echo-loader"}, "Loading…"), !(e && this.state.g) && K(V, {l:function(a) {
    console.log(a);
    console.log(a.seo);
  }, W:this.a.bind(this)}, K(W, {label:"Название", i:"Название для меню слева."}, K(X.I, {value:this.state.data.title, name:"title", placeholder:"Москва Новостройки", required:!0})), K(W, {i:b, label:"СЕО Название"}, K(X.I, {required:!0, value:this.state.data.seo, name:"seo", placeholder:"москва-новостройки"})), K(W, {label:"Описание", i:"Краткое описание для главной страницы."}, K(X.X, {required:!0, rows:"3", name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  this.state.data.description)), e && !c && K(W, {label:"Изображение"}, K("br"), K("img", {src:this.state.data.cdnImage, className:"img-fluid"}), K("a", {onClick:function(b) {
    b.preventDefault();
    a.b({ga:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!e || c) && K(W, {label:"Изображение", i:"Картинка, отображаемая на главной странице."}, K(X.I, {required:!0, name:"image", type:"file", file:"1"})), K(Nb, {article:this.state.article, ma:function(b) {
    a.b({article:b});
  }}), e && K("input", {value:this.c.id, type:"hidden", name:"id"}), K("button", {disabled:this.state.H, type:"submit", className:"btn btn-primary"}, this.state.H ? "Загрузка..." : e ? "Сохранить" : "Добавить"), this.state.error && K("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.B && K("div", {className:"alert alert-success mt-3", role:"alert"}, "Категория успешно ", e ? "сохранена" : "создана", "!")));
};
function Qb() {
  O.call(this);
  this.state = {ga:!1};
}
t(Qb, O);
Qb.prototype.h = function(a) {
  var b = this, c = a.D, e = a.required, f = a.image;
  a = a.i;
  var g = this.state.ga;
  if (c && !g) {
    return K(W, {i:a, label:"Изображение"}, K("br"), K("img", {src:f, className:"img-fluid"}), K("a", {onClick:function(a) {
      a.preventDefault();
      b.b({ga:!0});
      return !1;
    }, href:"#", className:"btn btn-outline-warning"}, "Изменить"));
  }
  if (!c || g) {
    return K(W, {i:a, label:"Изображение"}, K(X.I, {required:void 0 !== e, name:"image", type:"file", file:"1"}));
  }
};
function Y(a) {
  O.apply(this, arguments);
}
t(Y, O);
Y.prototype.a = function(a) {
  var b = this, c, e, f, g, k;
  return H(function(h) {
    switch(h.a) {
      case 1:
        a.preventDefault();
        if (!b.c.path) {
          return b.b({error:"Form Path is not included"}), h.return(!1);
        }
        b.b({error:null, B:null});
        c = new FormData(a.target);
        b.b({H:!0});
        x(h, 2, 3);
        return v(h, fetch(b.c.path, {method:"POST", body:c}), 5);
      case 5:
        return e = h.f, v(h, e.json(), 6);
      case 6:
        f = h.f, (g = f.error) ? b.b({error:g}) : b.b({B:1});
      case 3:
        z(h);
        b.b({H:!1});
        D(h, 4);
        break;
      case 2:
        k = y(h);
        b.b({error:k});
        h.u(3);
        break;
      case 4:
        if (!b.c.T) {
          h.u(7);
          break;
        }
        return v(h, b.c.T(), 7);
      case 7:
        return h.return(!1);
    }
  });
};
function Rb() {
  Y.call(this);
  this.state = {g:!1, data:{}, za:[], hint:"1-комнатные-апартаменты-воскресенское", ya:"апартаменты", article:""};
}
t(Rb, Y);
Rb.prototype.m = function() {
  var a = this, b, c, e, f, g, k, h, p, n, q;
  return H(function(l) {
    switch(l.a) {
      case 1:
        return v(l, Sb(a), 2);
      case 2:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({D:1, g:!0});
        x(l, 3, 4);
        return v(l, U("/admin-data?objects&id=" + a.c.id), 6);
      case 6:
        return c = l.f, v(l, c.json(), 7);
      case 7:
        e = l.f, f = e.error, g = e.data, f ? a.b({error:f}) : (k = r(g), h = k.next().value, a.b({data:h, hint:h.seo, ya:h.categorySeo, article:h.article}));
      case 4:
        z(l);
        a.b({g:!1});
        D(l, 0);
        break;
      case 3:
        n = p = y(l), q = n.message, a.b({error:q}), l.u(4);
    }
  });
};
function Sb(a) {
  var b, c, e, f, g, k;
  return H(function(h) {
    switch(h.a) {
      case 1:
        return a.b({g:!0}), x(h, 2, 3), v(h, U("/admin-data?categories"), 5);
      case 5:
        return b = h.f, v(h, b.json(), 6);
      case 6:
        c = h.f, e = c.error, f = c.data, e ? a.b({error:e}) : (g = f.map(function(a) {
          return {value:a._id, title:a.title};
        }), a.b({za:g}));
      case 3:
        z(h);
        a.b({g:!1});
        D(h, 0);
        break;
      case 2:
        k = y(h), a.b({error:k}), h.u(3);
    }
  });
}
Rb.prototype.h = function(a) {
  var b = this, c = a.F, e = void 0 === a.L ? "Отмена" : a.L, f = a.P, g = void 0 === a.s ? "Добавить" : a.s;
  a = a.title;
  var k = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.ya + "/<strong>" + this.state.hint + "</strong>.", h = this.state, p = h.za, n = h.H, q = h.data, l = h.g, u = h.error;
  h = h.B;
  c = K(V, {W:this.a.bind(this)}, K(W, {i:"Название для каталога недвижимости.", label:"Название"}, K(X.I, {required:!0, name:"title", value:q.title, placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское"})), K(W, {i:"Цена объекта", label:"Цена"}, K(X.I, {required:!0, name:"price", value:q.price, placeholder:"3 000 000 руб."})), K(W, {i:k, label:"СЕО Название"}, K(X.I, {required:!0, name:"seo", value:q.seo, placeholder:"1-комнатные-апартаменты-воскресенское"})), K(W, {i:"Описание объекта.", label:"Описание"}, 
  K(X.X, {rows:10, required:!0, name:"description", placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично)."}, 
  q.description)), K(Qb, {D:this.D, i:"Картинка, отображаемая на главной странице.", required:1, image:q.cdnImage}), K(Nb, {article:this.state.article, name:"article", ma:function(a) {
    b.b({article:a});
  }}), this.D && K("input", {value:this.c.id, type:"hidden", name:"id"}), K(W, {label:"Раздел", i:"Категория в каталоге"}, K(X.Ia, {options:p, name:"category", required:!0, value:q.category})), K(Cb, {error:u}), K(Db, {B:h, message:f}), K("button", {disabled:n, type:"submit", className:"btn btn-primary"}, n ? "Загрузка..." : g), c && K("button", {onClick:c, type:"button", className:"FormCancelBtn btn btn-secondary"}, e));
  return K(S, {}, a && K("h1", {}, a), l && K("span", {className:"echo-loader"}, "Loading…"), !l && c);
};
m.Object.defineProperties(Rb.prototype, {D:{configurable:!0, enumerable:!0, get:function() {
  return !!this.c.id;
}}});
function Tb(a) {
  var b = this, c, e, f, g, k;
  return H(function(h) {
    switch(h.a) {
      case 1:
        return b.b({g:!0}), x(h, 2, 3), v(h, U("/admin-data?" + a), 5);
      case 5:
        return c = h.f, v(h, c.json(), 6);
      case 6:
        return e = h.f, f = e.error, g = e.data, f ? (b.b({error:f}), h.return()) : h.return(g);
      case 3:
        z(h);
        b.b({g:!1});
        D(h, 0);
        break;
      case 2:
        k = y(h), b.b({error:k}), h.u(3);
    }
  });
}
;function Ub() {
  O.call(this);
  this.state = {g:!1, data:[], o:null, R:null};
}
t(Ub, O);
d = Ub.prototype;
d.m = function() {
  var a = this;
  return H(function(b) {
    return v(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return H(function(c) {
    if (1 == c.a) {
      return v(c, Tb.bind(a)("objects"), 2);
    }
    (b = c.f) && a.b({data:b});
    c.a = 0;
  });
};
d.G = function(a) {
  this.b({o:a});
};
d.v = function(a) {
  this.b({R:a});
};
d.h = function() {
  return K(S, {}, K("h1", {}, "Объекты Недвижимости"), K("p", {}, "На сайт добалены следующие объекты:"), K(Vb, {data:this.state.data, g:this.state.g, G:this.G.bind(this), v:this.v.bind(this)}), this.state.o && K(Fb, Object.assign({}, this.state.o, {F:this.G.bind(this, null), U:"danger", da:this.load.bind(this)})), this.state.R && K(Hb, {F:this.v.bind(this, null), title:"Редактирование Объекта"}, K(Rb, {id:this.state.R._id, T:this.load.bind(this), F:this.v.bind(this, null), path:"/admin-data?objects", 
  L:"Отмена", P:"Объект успешно отредактирован!", s:"Сохранить"})));
};
function Vb(a) {
  var b = a.data, c = a.G, e = a.v;
  a = a.g;
  return K("div", {}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет объектов недвижимости.", b.map(function(a) {
    return K(Wb, {item:a, key:a._id, G:c, v:e});
  }));
}
function Wb(a) {
  O.apply(this, arguments);
}
t(Wb, O);
Wb.prototype.h = function(a) {
  var b = a.item, c = a.G, e = a.v, f = b.title;
  a = b.description;
  var g = b._id, k = b.price, h = "/каталог/" + b.categorySeo + "/" + b.seo, p = "knedv.ru" + h;
  return K(xb, {className:"CategoryRow"}, K(S, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"}), k && "Цена: " + k), K(S, {}, K("h2", {}, f), K("em", {}, K("a", {href:h}, p)), K("p", {}, a)), K(S, {className:"col-1 CategoryMeta"}, K("br"), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить объект ", K("strong", {}, f), "?"), s:"Удалить", title:"Удаление Объекта", path:"objects&id=" + g + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(T, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    e(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(T, {icon:"fas fa-pen"}))));
};
function Xb(a) {
  return K(Rb, {T:a.fb, title:"Добавить Объект", path:"/admin-data?objects", P:"Объект успешно добавлен!", s:"Добавить"});
}
;function Yb() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
t(Yb, O);
Yb.prototype.m = function() {
  var a = this;
  return H(function(b) {
    return v(b, a.load(), 0);
  });
};
Yb.prototype.load = function() {
  var a = this, b, c, e, f, g;
  return H(function(k) {
    switch(k.a) {
      case 1:
        return a.b({g:!0}), x(k, 2, 3), v(k, U("/admin-data?pages"), 5);
      case 5:
        return b = k.f, v(k, b.json(), 6);
      case 6:
        c = k.f, e = c.error, f = c.data, e ? a.b({error:e}) : a.b({data:f});
      case 3:
        z(k);
        a.b({g:!1});
        D(k, 0);
        break;
      case 2:
        g = y(k), a.b({error:g}), k.u(3);
    }
  });
};
Yb.prototype.h = function() {
  var a = this;
  return K(S, {}, K("h1", {}, "Материалы Сайта"), K("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.g && K("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return K(Zb, Object.assign({}, c, {key:b, id:b, la:function() {
      return a.load();
    }}));
  }));
};
function Zb() {
  O.call(this);
  this.state = {o:null};
}
t(Zb, O);
Zb.prototype.h = function() {
  var a = this, b = this.c, c = b.seo, e = b.id, f = b.description, g = b.la, k = b.title;
  return K(xb, {className:"CategoryRow"}, K(S, {}, K("h2", {}, k), K("em", {}, "knedv.ru/", c), K("p", {}, f)), K(S, {className:"col-1 CategoryMeta"}, K("a", {href:"/admin/add-page/" + e, style:"color:brown;"}, K(T, {icon:"fas fa-pen"})), K("br"), K("a", {onClick:function(b) {
    b.preventDefault();
    a.b({o:{text:K("span", {}, "Вы действительно хотите удалить страницу ", K("strong", {}, k), "?"), s:"Удалить", title:"Удаление Страницы", path:"pages&id=" + e + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, K(T, {icon:"far fa-trash-alt"}))), this.state.o && K(Fb, Object.assign({}, this.state.o, {F:function() {
    a.b({o:null});
  }, U:"danger", da:g})));
};
function $b() {
  O.call(this);
  this.state = {g:!1, data:{}, article:""};
}
t($b, O);
$b.prototype.m = function() {
  var a = this, b, c, e, f, g, k, h, p, n, q;
  return H(function(l) {
    switch(l.a) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return l.return();
        }
        a.b({D:1, g:!0});
        x(l, 2, 3);
        return v(l, U("/admin-data?pages&id=" + a.c.id), 5);
      case 5:
        return c = l.f, v(l, c.json(), 6);
      case 6:
        e = l.f, f = e.error, g = e.data, f ? a.b({error:f}) : (k = r(g), h = k.next().value, a.b({data:h, article:h.article}));
      case 3:
        z(l);
        a.b({g:!1});
        D(l, 0);
        break;
      case 2:
        n = p = y(l), q = n.message, a.b({error:q}), l.u(3);
    }
  });
};
$b.prototype.a = function(a) {
  var b = this, c, e, f, g, k;
  return H(function(h) {
    switch(h.a) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({H:!0}), x(h, 2, 3), v(h, U("/admin-data?pages", {method:"POST", body:c}), 5);
      case 5:
        return e = h.f, v(h, e.json(), 6);
      case 6:
        f = h.f, (g = f.error) ? b.b({error:g}) : b.b({B:1});
      case 3:
        z(h);
        b.b({H:!1});
        D(h, 4);
        break;
      case 2:
        k = y(h);
        b.b({error:k});
        h.u(3);
        break;
      case 4:
        return h.return(!1);
    }
  });
};
$b.prototype.h = function() {
  var a = this, b = this.state.D;
  return K(S, {}, K("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Страницу"), b && this.state.g && K("span", {className:"echo-loader"}, "Loading…"), !(b && this.state.g) && K("form", {ref:function(b) {
    return a.form = b;
  }, onSubmit:this.a.bind(this)}, K(zb, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", i:"Название для администратора.", required:"1"}), K(zb, {i:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), K(zb, {ra:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", i:"Описание страницы.", value:this.state.data.description, required:"1"}), 
  K(Nb, {article:this.state.article, ma:function(b) {
    a.b({article:b});
  }}), b && K("input", {value:this.c.id, type:"hidden", name:"id"}), K("button", {disabled:this.state.H, type:"submit", className:"btn btn-primary"}, this.state.H ? "Загрузка..." : b ? "Сохранить" : "Добавить"), this.state.error && K("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.B && K("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", b ? "сохранена" : "создана", "!")));
};
function ac(a) {
  Y.apply(this, arguments);
}
t(ac, Y);
ac.prototype.h = function(a) {
  var b = this, c = a.item, e = a.F, f = void 0 === a.L ? "Отмена" : a.L, g = a.P;
  a = void 0 === a.s ? "Добавить" : a.s;
  var k = c || {}, h = this.state.H;
  return K(V, {W:this.a.bind(this), l:function() {
    b.b({error:null, B:null});
  }}, K(W, {label:"Название", i:"Заголовок для главной страницы, напр., Ленинский проспект, дом 114"}, K(X.I, {value:k.title, placeholder:"Название акции", name:"title", required:1})), K(W, {label:"Описание", i:"Введите описание акции..."}, K(X.X, {required:!0, name:"description", placeholder:"Описание акции"}, k.description)), K(Qb, {D:c, i:"Картинка, отображаемая на главной странице.", required:1, image:k.cdnImage}), K(W, {label:"Цена", i:"Задайте цену..."}, K(X.I, {value:k.price, name:"price", 
  placeholder:"55 000 000 руб."})), K(W, {label:"Переход", i:"Ссылка на страницу каталога, или сайта."}, K(X.I, {value:k.href, name:"href", placeholder:"/каталог/москва-элитная/лениниский-проспект-дом-114"})), K(W, {i:"Добавить в специальные предложения на главной."}, K(Bb, {value:k.show_on_main, label:"Отображать на главной", name:"show_on_main"})), c && K("input", {value:k._id, type:"hidden", name:"id"}), K(Cb, {error:this.state.error}), K(Db, {B:this.state.B, message:g}), K("button", {disabled:h, 
  type:"submit", className:"btn btn-primary"}, h ? "Загрузка..." : a), e && K("button", {onClick:e, type:"button", className:"FormCancelBtn btn btn-secondary"}, f));
};
function bc() {
  O.call(this);
  this.state = {g:!1, data:[]};
}
t(bc, O);
d = bc.prototype;
d.m = function() {
  var a = this;
  return H(function(b) {
    return v(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return H(function(c) {
    if (1 == c.a) {
      return v(c, Tb.bind(a)("specials"), 2);
    }
    (b = c.f) && a.b({data:b});
    c.a = 0;
  });
};
d.G = function(a) {
  this.b({o:a});
};
d.v = function(a) {
  this.b({R:a});
};
d.h = function() {
  var a = this, b = K("details", {}, K("summary", {}, K("h3", {style:"display: inline-block;vertical-align: middle;"}, "Создать Новое Предложение")), K(ac, {T:function() {
    a.load();
  }, path:"/admin-data?specials", P:"Предложение успешно создано!", s:"Добавить"}));
  return K(S, {}, K("h1", {}, "Специальные Предложения"), K(cc, {data:this.state.data, g:this.state.g, G:this.G.bind(this), v:this.v.bind(this)}), K("hr"), b, this.state.o && K(Fb, Object.assign({}, this.state.o, {F:this.G.bind(this, null), U:"danger", da:this.load.bind(this)})), this.state.R && K(Hb, {F:this.v.bind(this, null), title:"Редактирование"}, K(ac, {item:this.state.R, T:this.load.bind(this), F:this.v.bind(this, null), path:"/admin-data?specials", L:"Отмена", P:"Предложение успешно отредактировано!", 
  s:"Сохранить"})));
};
function cc(a) {
  var b = a.data, c = a.G, e = a.v;
  a = a.g;
  return K("div", {style:"height:25rem;overflow:scroll;background:wheat; padding:0.5rem;"}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет специальных предложений.", b.map(function(a) {
    return K(dc, {item:a, key:a._id, G:c, v:e});
  }));
}
function dc(a) {
  var b = a.item, c = a.G, e = a.v, f = b._id, g = b.title;
  a = b.cdnImage;
  var k = b.description, h = b.price, p = "on" == b.show_on_main;
  return K("div", {className:p ? "IsShownOnMain" : "", style:"border-bottom:1px solid brown;border-top:1px solid lightcoral;"}, K("h4", {}, g, " ", p && K("span", {className:"badge badge-danger"}, "На главной")), K("p", {}, K("img", {src:a, style:"display:block;"}), k, K("span", {style:"font-weight: bold;"}, " ", h)), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить предложение ", K("strong", {}, g), "?"), s:"Удалить", title:"Удаление Предложения", path:"specials&id=" + f + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(T, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    e(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(T, {icon:"fas fa-pen"})));
}
;function ec() {
  return K("span", {className:"echo-loader"}, "Loading…");
}
;function fc(a) {
  Y.apply(this, arguments);
}
t(fc, Y);
fc.prototype.h = function(a) {
  var b = this, c = a.item, e = a.F, f = void 0 === a.L ? "Отмена" : a.L, g = a.P;
  a = void 0 === a.s ? "Добавить" : a.s;
  var k = c || {}, h = this.state.H;
  return K(V, {W:this.a.bind(this), l:function() {
    b.b({error:null, B:null});
  }}, K(W, {label:"Название", i:"Заголовок альбома для выбора на странице объекта."}, K(X.I, {value:k.title, placeholder:"Мосфильмовская, дом 70к6", name:"title", required:1})), K(W, {label:"Описание", i:"Введите описание акции..."}, K(X.X, {required:!0, name:"description", placeholder:"Описание Альбома"}, k.description)), K(Qb, {D:c, i:"Картинка для узнаваемости.", required:1, image:k.cdnImage}), c && K("input", {value:k._id, type:"hidden", name:"id"}), K(Cb, {error:this.state.error}), K(Db, {B:this.state.B, 
  message:g}), K("button", {disabled:h, type:"submit", className:"btn btn-primary"}, h && K("span", {className:"spinner-border spinner-border-sm", role:"status", "aria-hidden":"true"}), h ? "Загрузка..." : a), e && K("button", {onClick:e, type:"button", className:"FormCancelBtn btn btn-secondary"}, f));
};
function gc() {
  O.call(this);
  this.state = {data:[], g:!0};
}
t(gc, O);
gc.prototype.m = function() {
  var a = this;
  return H(function(b) {
    return v(b, a.load(), 0);
  });
};
gc.prototype.load = function() {
  var a = this, b;
  return H(function(c) {
    if (1 == c.a) {
      return v(c, Tb.bind(a)("galleries"), 2);
    }
    (b = c.f) && a.b({data:b});
    c.a = 0;
  });
};
gc.prototype.h = function() {
  var a = this;
  return K(S, {}, K("h1", {}, "Галереи"), this.g && K(ec), !this.g && !this.state.data.length && "Не существует галерей.", this.state.data.map(function(a) {
    var b = a._id, e = a.title, f = a.description;
    return K(xb, {key:b}, K(S, {className:"col-sm-3"}, K("img", {src:a.cdnImage, className:"img-fluid"})), K(S, {}, K("h2", {}, e), K("a", {href:b}, "Просмотр"), f));
  }), K("hr"), K(hc, {title:"Создать Новую Галерею"}, K(fc, {T:function() {
    a.load();
  }, path:"/admin-data?galleries", P:"Галерея успешно создана!", s:"Добавить"})));
};
m.Object.defineProperties(gc.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function hc(a) {
  var b = a.children;
  return K("details", {}, K("summary", {}, K("h3", {style:"display: inline-block;vertical-align: middle;"}, a.title)), b);
}
;function ic() {
  O.call(this);
  this.state = {ha:!1, cb:!0, Ha:null};
}
t(ic, O);
function jc(a) {
  var b, c;
  H(function(e) {
    b = new FormData;
    b.append("image", a.c.file);
    c = new XMLHttpRequest;
    c.open("POST", "/upload-asset", !0);
    c.upload.addEventListener("progress", function(b) {
      a.b({Ha:100.0 * b.loaded / b.total || 100});
    });
    c.addEventListener("readystatechange", function() {
      4 == c.readyState && a.b({ha:!0});
      if (4 == c.readyState && 200 == c.status) {
        var b = JSON.parse(c.responseText);
        b.error ? a.b({error:b.error}) : b.file && a.b({result:b.file});
      } else {
        4 == c.readyState && 200 != c.status && a.b({error:"XHR Error"});
      }
    });
    c.send(b);
    e.a = 0;
  });
}
ic.prototype.h = function(a) {
  var b = this, c = a.qa, e = a.name, f = a.Ta;
  a = a.bb;
  var g = this.state.Ha, k = 100 == g && !this.state.ha, h = {background:this.state.ha ? "linear-gradient(lightgreen, #82d285)" : void 0, "border-color":this.state.ha ? "green" : void 0};
  k && (h.background = "linear-gradient(lightblue, blue)", h["border-color"] = "blue");
  return K("div", {style:h, className:"Image"}, K("img", {src:this.state.result ? this.state.result : c, style:"max-height:150px; padding: 0.5rem;", className:"img-fluid"}), K("span", {className:"ImageInfo", style:"top:0;left:0;max-width:100%;overfrlow:scroll;"}, e), K("span", {onClick:f, className:"ImageInfo CloseSpan"}, "x"), null === g && K("a", {onClick:function(a) {
    a.preventDefault();
    jc(b);
    return !1;
  }, href:"#", className:"btn btn-light btn-sm ImageInfo", style:"bottom: 0; left:0;"}, "Загрузить"), K("span", {className:"ImageInfo", style:"bottom:0;left:0;"}, g && 100 != g && K("progress", {max:100, value:g}), k && "Выполняется обработка..."), this.state.error && K("p", {style:"width: 150px;"}, "Error: ", this.state.error), this.state.result && K("p", {className:"ImageInfo GalleryLink"}, K("a", {href:this.state.result}, "Ссылка")), this.state.result && K("input", {name:a, type:"hidden", value:this.state.result}));
};
function kc(a) {
  var b;
  return H(function(c) {
    return 1 == c.a ? (b = new FileReader, b.readAsDataURL(a), v(c, new Promise(function(a) {
      b.onloadend = function() {
        a(b.result);
      };
    }), 2)) : c.return(c.f);
  });
}
function lc() {
  O.call(this);
  this.state = {files:[]};
}
t(lc, O);
function mc(a, b) {
  var c = a.state.files.filter(function(a) {
    return a.file !== b;
  });
  a.b({files:c});
}
function nc(a, b) {
  var c, e, f;
  H(function(g) {
    switch(g.a) {
      case 1:
        return c = r(b), e = ha(c), a.b({xa:!0}), v(g, new Promise(function(a) {
          return setTimeout(a, 5);
        }), 2);
      case 2:
        return ta(g), v(g, Promise.all(e.map(function(a) {
          var b;
          return H(function(c) {
            if (1 == c.a) {
              return v(c, kc(a), 2);
            }
            b = c.f;
            return c.return({file:a, qa:b});
          });
        })), 5);
      case 5:
        f = g.f, a.b({files:[].concat(ia(a.state.files), ia(f))});
      case 3:
        z(g), a.b({xa:!1}), D(g, 0);
    }
  });
}
lc.prototype.h = function() {
  var a = this;
  return K("div", {onDragEnter:function(a) {
    a.preventDefault();
    a.currentTarget.style.background = "#E91E63";
  }, className:"PhotoUploader", onDragLeave:function(a) {
    a.currentTarget.style.background = "";
  }, onDrop:function(b) {
    b.preventDefault();
    b.stopPropagation();
    b.currentTarget.style.background = "";
    nc(a, b.dataTransfer.files);
  }, onDragOver:function(a) {
    a.preventDefault();
    a.stopPropagation();
  }}, K("input", {onChange:function(b) {
    b.preventDefault();
    nc(a, b.currentTarget.files);
    b.currentTarget.value = null;
  }, accept:"image/*", multiple:!0, type:"file"}), this.state.xa ? "Идет опознование файлов..." : "Или переместите файлы сюда...", this.state.files.map(function(b) {
    var c = b.file;
    return K(ic, {name:c.name, key:c.name, file:c, qa:b.qa, Ta:function() {
      mc(a, c);
    }});
  }));
};
function oc() {
  O.call(this);
  this.state = {data:null, g:!0, files:[]};
}
t(oc, O);
oc.prototype.m = function() {
  var a = this;
  return H(function(b) {
    return v(b, a.load(), 0);
  });
};
oc.prototype.ba = function() {
};
oc.prototype.load = function() {
  var a = this, b, c, e;
  return H(function(f) {
    if (1 == f.a) {
      return (b = a.c.id) || a.b({g:!1, error:"No id"}), v(f, Tb.bind(a)("galleries&id=" + b), 2);
    }
    c = f.f;
    (e = c[0]) && a.b({data:e});
    f.a = 0;
  });
};
oc.prototype.h = function() {
  var a = this.data || {}, b = a.title, c = a.cdnImage;
  a = a.description;
  return K(S, {}, K("h1", {}, "Галерея"), this.g && K(ec), this.data && K(xb, {}, K(S, {className:"col-sm-3"}, K("img", {src:c, className:"img-fluid"})), K(S, {}, K("h2", {}, b), a)), K("h3", {}, "Загрузка Изображений"), K(lc));
};
m.Object.defineProperties(oc.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function pc() {
  return K(S, {}, K("h1", {}, "Добро Пожаловать!"));
}
;var qc = K(function() {
  return K(xb, {id:"App"}, K(S, {className:"col-md-4"}, K(Eb)), K(ub, {l:function(a) {
    a.current && a.current.attributes.title && (document.title = a.current.attributes.title);
  }}, K(pc, {path:"/admin", title:"Главная"}), K(Ub, {path:"/admin/objects", title:"Объекты Недвижимости"}), K(Xb, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), K(Ib, {path:"/admin/categories", title:"Категории Каталога"}), K(Pb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), K(Yb, {path:"/admin/pages", title:"Статьи"}), K($b, {path:"/admin/add-page/:id?", title:"Добавить Страницу"}), K(bc, {path:"/admin/special", title:"Специальные Предложения"}), K(gc, {path:"/admin/galleries", 
  title:"Галереи"}), K(oc, {path:"/admin/galleries/:id", title:"Фотографии"})));
});
Wa(document.querySelector("#App"), qc, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map