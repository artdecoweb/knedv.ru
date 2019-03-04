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
    var ma = {Xa:!0}, na = {};
    try {
      na.__proto__ = ma;
      la = na.Xa;
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
function u(a, b) {
  a.prototype = ja(b.prototype);
  a.prototype.constructor = a;
  if (oa) {
    oa(a, b);
  } else {
    for (var c in b) {
      if ("prototype" != c) {
        if (Object.defineProperties) {
          var f = Object.getOwnPropertyDescriptor(b, c);
          f && Object.defineProperty(a, c, f);
        } else {
          a[c] = b[c];
        }
      }
    }
  }
  a.Xb = b.prototype;
}
function pa(a, b) {
  if (b) {
    var c = p;
    a = a.split(".");
    for (var f = 0; f < a.length - 1; f++) {
      var e = a[f];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    f = c[a];
    b = b(f);
    b != f && null != b && ba(c, a, {configurable:!0, writable:!0, value:b});
  }
}
pa("Promise", function(a) {
  function b(a) {
    this.g = 0;
    this.F = void 0;
    this.b = [];
    var b = this.l();
    try {
      a(b.resolve, b.reject);
    } catch (l) {
      b.reject(l);
    }
  }
  function c() {
    this.b = null;
  }
  function f(a) {
    return a instanceof b ? a : new b(function(b) {
      b(a);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.g = function(a) {
    if (null == this.b) {
      this.b = [];
      var b = this;
      this.l(function() {
        b.F();
      });
    }
    this.b.push(a);
  };
  var e = p.setTimeout;
  c.prototype.l = function(a) {
    e(a, 0);
  };
  c.prototype.F = function() {
    for (; this.b && this.b.length;) {
      var a = this.b;
      this.b = [];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        a[b] = null;
        try {
          c();
        } catch (m) {
          this.C(m);
        }
      }
    }
    this.b = null;
  };
  c.prototype.C = function(a) {
    this.l(function() {
      throw a;
    });
  };
  b.prototype.l = function() {
    function a(a) {
      return function(f) {
        c || (c = !0, a.call(b, f));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.kb), reject:a(this.C)};
  };
  b.prototype.kb = function(a) {
    if (a === this) {
      this.C(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof b) {
        this.pb(a);
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
        c ? this.ha(a) : this.O(a);
      }
    }
  };
  b.prototype.ha = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (l) {
      this.C(l);
      return;
    }
    "function" == typeof b ? this.rb(b, a) : this.O(a);
  };
  b.prototype.C = function(a) {
    this.P(2, a);
  };
  b.prototype.O = function(a) {
    this.P(1, a);
  };
  b.prototype.P = function(a, b) {
    if (0 != this.g) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.g);
    }
    this.g = a;
    this.F = b;
    this.Y();
  };
  b.prototype.Y = function() {
    if (null != this.b) {
      for (var a = 0; a < this.b.length; ++a) {
        g.g(this.b[a]);
      }
      this.b = null;
    }
  };
  var g = new c;
  b.prototype.pb = function(a) {
    var b = this.l();
    a.ea(b.resolve, b.reject);
  };
  b.prototype.rb = function(a, b) {
    var c = this.l();
    try {
      a.call(b, c.resolve, c.reject);
    } catch (m) {
      c.reject(m);
    }
  };
  b.prototype.then = function(a, c) {
    function f(a, b) {
      return "function" == typeof a ? function(b) {
        try {
          e(a(b));
        } catch (A) {
          g(A);
        }
      } : b;
    }
    var e, g, h = new b(function(a, b) {
      e = a;
      g = b;
    });
    this.ea(f(a, e), f(c, g));
    return h;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.ea = function(a, b) {
    function c() {
      switch(f.g) {
        case 1:
          a(f.F);
          break;
        case 2:
          b(f.F);
          break;
        default:
          throw Error("Unexpected state: " + f.g);
      }
    }
    var f = this;
    null == this.b ? g.g(c) : this.b.push(c);
  };
  b.resolve = f;
  b.reject = function(a) {
    return new b(function(b, c) {
      c(a);
    });
  };
  b.race = function(a) {
    return new b(function(b, c) {
      for (var e = r(a), g = e.next(); !g.done; g = e.next()) {
        f(g.value).ea(b, c);
      }
    });
  };
  b.all = function(a) {
    var c = r(a), e = c.next();
    return e.done ? f([]) : new b(function(a, b) {
      function g(b) {
        return function(c) {
          h[b] = c;
          k--;
          0 == k && a(h);
        };
      }
      var h = [], k = 0;
      do {
        h.push(void 0), k++, f(e.value).ea(g(h.length - 1), b), e = c.next();
      } while (!e.done);
    });
  };
  return b;
});
function qa() {
  this.P = !1;
  this.C = null;
  this.g = void 0;
  this.b = 1;
  this.F = this.O = 0;
  this.ha = this.l = null;
}
function ra(a) {
  if (a.P) {
    throw new TypeError("Generator is already running");
  }
  a.P = !0;
}
qa.prototype.Y = function(a) {
  this.g = a;
};
function sa(a, b) {
  a.l = {Ia:b, Ka:!0};
  a.b = a.O || a.F;
}
qa.prototype.return = function(a) {
  this.l = {return:a};
  this.b = this.F;
};
function v(a, b, c) {
  a.b = c;
  return {value:b};
}
qa.prototype.v = function(a) {
  this.b = a;
};
function x(a, b, c) {
  a.O = b;
  void 0 != c && (a.F = c);
}
function y(a) {
  a.O = 0;
  var b = a.l.Ia;
  a.l = null;
  return b;
}
function B(a) {
  a.ha = [a.l];
  a.O = 0;
  a.F = 0;
}
function C(a, b) {
  var c = a.ha.splice(0)[0];
  (c = a.l = a.l || c) ? c.Ka ? a.b = a.O || a.F : void 0 != c.v && a.F < c.v ? (a.b = c.v, a.l = null) : a.b = a.F : a.b = b;
}
function ta(a) {
  this.b = new qa;
  this.g = a;
}
function ua(a, b) {
  ra(a.b);
  var c = a.b.C;
  if (c) {
    return va(a, "return" in c ? c["return"] : function(a) {
      return {value:a, done:!0};
    }, b, a.b.return);
  }
  a.b.return(b);
  return wa(a);
}
function va(a, b, c, f) {
  try {
    var e = b.call(a.b.C, c);
    if (!(e instanceof Object)) {
      throw new TypeError("Iterator result " + e + " is not an object");
    }
    if (!e.done) {
      return a.b.P = !1, e;
    }
    var g = e.value;
  } catch (h) {
    return a.b.C = null, sa(a.b, h), wa(a);
  }
  a.b.C = null;
  f.call(a.b, g);
  return wa(a);
}
function wa(a) {
  for (; a.b.b;) {
    try {
      var b = a.g(a.b);
      if (b) {
        return a.b.P = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.b.g = void 0, sa(a.b, c);
    }
  }
  a.b.P = !1;
  if (a.b.l) {
    b = a.b.l;
    a.b.l = null;
    if (b.Ka) {
      throw b.Ia;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function xa(a) {
  this.next = function(b) {
    ra(a.b);
    a.b.C ? b = va(a, a.b.C.next, b, a.b.Y) : (a.b.Y(b), b = wa(a));
    return b;
  };
  this.throw = function(b) {
    ra(a.b);
    a.b.C ? b = va(a, a.b.C["throw"], b, a.b.Y) : (sa(a.b, b), b = wa(a));
    return b;
  };
  this.return = function(b) {
    return ua(a, b);
  };
  ea();
  this[Symbol.iterator] = function() {
    return this;
  };
}
function ya(a) {
  function b(b) {
    return a.next(b);
  }
  function c(b) {
    return a.throw(b);
  }
  return new Promise(function(f, e) {
    function g(a) {
      a.done ? f(a.value) : Promise.resolve(a.value).then(b, c).then(g, e);
    }
    g(a.next());
  });
}
function I(a) {
  return ya(new xa(new ta(a)));
}
var za = "function" == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var f = arguments[c];
    if (f) {
      for (var e in f) {
        Object.prototype.hasOwnProperty.call(f, e) && (a[e] = f[e]);
      }
    }
  }
  return a;
};
pa("Object.assign", function(a) {
  return a || za;
});
function Aa(a, b) {
  ea();
  a instanceof String && (a += "");
  var c = 0, f = {next:function() {
    if (c < a.length) {
      var e = c++;
      return {value:b(e, a[e]), done:!1};
    }
    f.next = function() {
      return {done:!0, value:void 0};
    };
    return f.next();
  }};
  f[Symbol.iterator] = function() {
    return f;
  };
  return f;
}
pa("Array.prototype.values", function(a) {
  return a ? a : function() {
    return Aa(this, function(a, c) {
      return c;
    });
  };
});
function Ba() {
}
var J = {}, Ca = [], Da = [];
function K(a, b) {
  var c = Da, f, e;
  for (e = arguments.length; 2 < e--;) {
    Ca.push(arguments[e]);
  }
  b && null != b.children && (Ca.length || Ca.push(b.children), delete b.children);
  for (; Ca.length;) {
    if ((f = Ca.pop()) && void 0 !== f.pop) {
      for (e = f.length; e--;) {
        Ca.push(f[e]);
      }
    } else {
      "boolean" === typeof f && (f = null);
      if (e = "function" !== typeof a) {
        null == f ? f = "" : "number" === typeof f ? f = String(f) : "string" !== typeof f && (e = !1);
      }
      e && g ? c[c.length - 1] += f : c === Da ? c = [f] : c.push(f);
      var g = e;
    }
  }
  g = new Ba;
  g.nodeName = a;
  g.children = c;
  g.attributes = null == b ? void 0 : b;
  g.key = null == b ? void 0 : b.key;
  void 0 !== J.sb && J.sb(g);
  return g;
}
function L(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
  return a;
}
function Ea(a, b) {
  null != a && ("function" == typeof a ? a(b) : a.current = b);
}
var Fa = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
function Ga(a, b) {
  return K(a.nodeName, L(L({}, a.attributes), b), 2 < arguments.length ? [].slice.call(arguments, 2) : a.children);
}
var Ha = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, Ia = [];
function Ja(a) {
  !a.ba && (a.ba = !0) && 1 == Ia.push(a) && (J.Mb || Fa)(Ka);
}
function Ka() {
  for (var a; a = Ia.pop();) {
    a.ba && La(a);
  }
}
function Ma(a) {
  var b = L({}, a.attributes);
  b.children = a.children;
  a = a.nodeName.Nb;
  if (void 0 !== a) {
    for (var c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
function Na(a) {
  var b = a.parentNode;
  b && b.removeChild(a);
}
function Oa(a, b, c, f) {
  var e = M;
  "className" === b && (b = "class");
  if ("key" !== b) {
    if ("ref" === b) {
      Ea(c, null), Ea(f, a);
    } else {
      if ("class" !== b || e) {
        if ("style" === b) {
          if (f && "string" !== typeof f && "string" !== typeof c || (a.style.cssText = f || ""), f && "object" === typeof f) {
            if ("string" !== typeof c) {
              for (var g in c) {
                g in f || (a.style[g] = "");
              }
            }
            for (g in f) {
              a.style[g] = "number" === typeof f[g] && !1 === Ha.test(g) ? f[g] + "px" : f[g];
            }
          }
        } else {
          if ("dangerouslySetInnerHTML" === b) {
            f && (a.innerHTML = f.la || "");
          } else {
            if ("o" == b[0] && "n" == b[1]) {
              e = b !== (b = b.replace(/Capture$/, "")), b = b.toLowerCase().substring(2), f ? c || a.addEventListener(b, Pa, e) : a.removeEventListener(b, Pa, e), (a.Aa || (a.Aa = {}))[b] = f;
            } else {
              if ("list" !== b && "type" !== b && !e && b in a) {
                try {
                  a[b] = null == f ? "" : f;
                } catch (h) {
                }
                null != f && !1 !== f || "spellcheck" == b || a.removeAttribute(b);
              } else {
                c = e && b !== (b = b.replace(/^xlink:?/, "")), null == f || !1 === f ? c ? a.removeAttributeNS("http://www.w3.org/1999/xlink", b.toLowerCase()) : a.removeAttribute(b) : "function" !== typeof f && (c ? a.setAttributeNS("http://www.w3.org/1999/xlink", b.toLowerCase(), f) : a.setAttribute(b, f));
              }
            }
          }
        }
      } else {
        a.className = f || "";
      }
    }
  }
}
function Pa(a) {
  return this.Aa[a.type](J.event && J.event(a) || a);
}
var Qa = [], Ra = 0, M = !1, Sa = !1;
function Ta() {
  for (var a; a = Qa.shift();) {
    J.Za && J.Za(a), a.o && a.o();
  }
}
function Ua(a, b, c, f, e, g) {
  Ra++ || (M = null != e && void 0 !== e.Sb, Sa = null != a && !("__preactattr_" in a));
  a = Wa(a, b, c, f, g);
  e && a.parentNode !== e && e.appendChild(a);
  --Ra || (Sa = !1, g || Ta());
  return a;
}
function Wa(a, b, c, f, e) {
  var g = a, h = M;
  if (null == b || "boolean" === typeof b) {
    b = "";
  }
  if ("string" === typeof b || "number" === typeof b) {
    return a && void 0 !== a.splitText && a.parentNode && (!a.D || e) ? a.nodeValue != b && (a.nodeValue = b) : (g = document.createTextNode(b), a && (a.parentNode && a.parentNode.replaceChild(g, a), N(a, !0))), g.__preactattr_ = !0, g;
  }
  e = b.nodeName;
  if ("function" === typeof e) {
    h = a;
    var k = b;
    g = b = h && h.D;
    var l = h, m = b && h.ma === k.nodeName, q = m;
    for (a = Ma(k); b && !q && (b = b.Ba);) {
      q = b.constructor === k.nodeName;
    }
    b && q && (!f || b.D) ? (Xa(b, a, 3, c, f), h = b.K) : (g && !m && (Ya(g), h = l = null), b = Za(k.nodeName, a, c), h && !b.R && (b.R = h, l = null), Xa(b, a, 1, c, f), h = b.K, l && h !== l && (l.D = null, N(l, !1)));
    return h;
  }
  M = "svg" === e ? !0 : "foreignObject" === e ? !1 : M;
  e = String(e);
  if (!a || a.La !== e && a.nodeName.toLowerCase() !== e.toLowerCase()) {
    if (g = e, e = M ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g), e.La = g, g = e, a) {
      for (; a.firstChild;) {
        g.appendChild(a.firstChild);
      }
      a.parentNode && a.parentNode.replaceChild(g, a);
      N(a, !0);
    }
  }
  var n = g.firstChild;
  a = g.__preactattr_;
  e = b.children;
  if (null == a) {
    a = g.__preactattr_ = {};
    for (var t = g.attributes, z = t.length; z--;) {
      a[t[z].name] = t[z].value;
    }
  }
  if (!Sa && e && 1 === e.length && "string" === typeof e[0] && null != n && void 0 !== n.splitText && null == n.nextSibling) {
    n.nodeValue != e[0] && (n.nodeValue = e[0]);
  } else {
    if (e && e.length || null != n) {
      n = g;
      t = Sa || null != a.Lb;
      z = n.childNodes;
      var G = [], A = {}, D = 0, E = 0, w = z.length, Z = 0, Va = e ? e.length : 0;
      if (0 !== w) {
        for (q = 0; q < w; q++) {
          var F = z[q], T = F.__preactattr_;
          var H = Va && T ? F.D ? F.D.ya : T.key : null;
          if (null != H) {
            D++, A[H] = F;
          } else {
            if (T || (void 0 !== F.splitText ? t ? F.nodeValue.trim() : 1 : t)) {
              G[Z++] = F;
            }
          }
        }
      }
      if (0 !== Va) {
        for (q = 0; q < Va; q++) {
          w = e[q];
          m = null;
          H = w.key;
          if (null != H) {
            D && void 0 !== A[H] && (m = A[H], A[H] = void 0, D--);
          } else {
            if (E < Z) {
              for (H = E; H < Z; H++) {
                if (F = void 0 !== G[H]) {
                  if (F = l = G[H], "string" === typeof w || "number" === typeof w) {
                    F = void 0 !== F.splitText;
                  } else {
                    if ("string" === typeof w.nodeName) {
                      if (T = !F.ma) {
                        T = w.nodeName, T = F.La === T || F.nodeName.toLowerCase() === T.toLowerCase();
                      }
                      F = T;
                    } else {
                      F = t || F.ma === w.nodeName;
                    }
                  }
                }
                if (F) {
                  m = l;
                  G[H] = void 0;
                  H === Z - 1 && Z--;
                  H === E && E++;
                  break;
                }
              }
            }
          }
          m = Wa(m, w, c, f);
          w = z[q];
          m && m !== n && m !== w && (null == w ? n.appendChild(m) : m === w.nextSibling ? Na(w) : n.insertBefore(m, w));
        }
      }
      if (D) {
        for (q in A) {
          void 0 !== A[q] && N(A[q], !1);
        }
      }
      for (; E <= Z;) {
        void 0 !== (m = G[Z--]) && N(m, !1);
      }
    }
  }
  c = g;
  f = b.attributes;
  b = a;
  for (k in b) {
    f && null != f[k] || null == b[k] || Oa(c, k, b[k], b[k] = void 0);
  }
  for (k in f) {
    "children" === k || "innerHTML" === k || k in b && f[k] === ("value" === k || "checked" === k ? c[k] : b[k]) || Oa(c, k, b[k], b[k] = f[k]);
  }
  M = h;
  return g;
}
function N(a, b) {
  var c = a.D;
  c ? Ya(c) : (null != a.__preactattr_ && Ea(a.__preactattr_.$, null), !1 !== b && null != a.__preactattr_ || Na(a), $a(a));
}
function $a(a) {
  for (a = a.lastChild; a;) {
    var b = a.previousSibling;
    N(a, !0);
    a = b;
  }
}
var ab = [];
function Za(a, b, c) {
  var f = ab.length;
  if (a.prototype && a.prototype.h) {
    var e = new a(b, c);
    O.call(e, b, c);
  } else {
    e = new O(b, c), e.constructor = a, e.h = bb;
  }
  for (; f--;) {
    if (ab[f].constructor === a) {
      e.R = ab[f].R;
      ab.splice(f, 1);
      break;
    }
  }
  return e;
}
function bb(a, b, c) {
  return this.constructor(a, c);
}
function Xa(a, b, c, f, e) {
  a.ca || (a.ca = !0, a.za = b.$, a.ya = b.key, delete b.$, delete b.key, "undefined" === typeof a.constructor.Ja && (!a.K || e ? a.Ga && a.Ga() : a.bb && a.bb(b, f)), f && f !== a.context && (a.ra || (a.ra = a.context), a.context = f), a.sa || (a.sa = a.c), a.c = b, a.ca = !1, 0 !== c && (1 !== c && !1 === J.Yb && a.K ? Ja(a) : La(a, 1, e)), Ea(a.za, a));
}
function La(a, b, c, f) {
  if (!a.ca) {
    var e = a.c, g = a.state, h = a.context, k = a.sa || e, l = a.ta || g, m = a.ra || h, q = a.K, n = a.R, t = q || n, z = a.D, G = !1, A = m, D;
    a.constructor.Ja && (g = L(L({}, g), a.constructor.Ja(e, g)), a.state = g);
    q && (a.c = k, a.state = l, a.context = m, 2 !== b && a.W && !1 === a.W(e, g, h) ? G = !0 : a.Ha && a.Ha(e, g, h), a.c = e, a.state = g, a.context = h);
    a.sa = a.ta = a.ra = a.R = null;
    a.ba = !1;
    if (!G) {
      e = a.h(e, g, h);
      a.na && (h = L(L({}, h), a.na()));
      q && a.hb && (A = a.hb(k, l));
      g = e && e.nodeName;
      if ("function" === typeof g) {
        var E = Ma(e);
        if ((D = z) && D.constructor === g && E.key == D.ya) {
          Xa(D, E, 1, h, !1);
        } else {
          var w = D;
          a.D = D = Za(g, E, h);
          D.R = D.R || n;
          D.Ba = a;
          Xa(D, E, 0, h, !1);
          La(D, 1, c, !0);
        }
        E = D.K;
      } else {
        n = t;
        if (w = z) {
          n = a.D = null;
        }
        if (t || 1 === b) {
          n && (n.D = null), E = Ua(n, e, h, c || !q, t && t.parentNode, !0);
        }
      }
      t && E !== t && D !== z && (h = t.parentNode) && E !== h && (h.replaceChild(E, t), w || (t.D = null, N(t, !1)));
      w && Ya(w);
      if ((a.K = E) && !f) {
        for (w = t = a; w = w.Ba;) {
          (t = w).K = E;
        }
        E.D = t;
        E.ma = t.constructor;
      }
    }
    !q || c ? Qa.push(a) : G || (a.Fa && a.Fa(k, l, A), J.$a && J.$a(a));
    for (; a.da.length;) {
      a.da.pop().call(a);
    }
    Ra || f || Ta();
  }
}
function Ya(a) {
  J.ab && J.ab(a);
  var b = a.K;
  a.ca = !0;
  a.fa && a.fa();
  a.K = null;
  var c = a.D;
  c ? Ya(c) : b && (null != b.__preactattr_ && Ea(b.__preactattr_.$, null), a.R = b, Na(b), ab.push(a), $a(b));
  Ea(a.za, null);
}
function O(a, b) {
  this.ba = !0;
  this.context = b;
  this.c = a;
  this.state = this.state || {};
  this.da = [];
}
L(O.prototype, {a:function(a, b) {
  this.ta || (this.ta = this.state);
  this.state = L(L({}, this.state), "function" === typeof a ? a(this.state, this.c) : a);
  b && this.da.push(b);
  Ja(this);
}, eb:function(a) {
  a && this.da.push(a);
  La(this, 2);
}, h:function() {
}});
var cb = {};
function db(a, b) {
  return a.ka < b.ka ? 1 : a.ka > b.ka ? -1 : a.index - b.index;
}
function eb(a, b) {
  try {
    return a.index = b, a.ka = a.attributes.default ? 0 : fb(a.attributes.path).map(gb).join(""), a.attributes;
  } catch (c) {
    return !1;
  }
}
function fb(a) {
  return a.replace(/(^\/+|\/+$)/g, "").split("/");
}
function gb(a) {
  return ":" == a.charAt(0) ? 1 + "*+?".indexOf(a.charAt(a.length - 1)) || 4 : 5;
}
;var P = null, hb = [], ib = [];
function jb() {
  var a;
  P && P.location ? a = P.location : P && P.gb ? a = P.gb() : a = "undefined" !== typeof location ? location : {};
  return "" + (a.pathname || "") + (a.search || "");
}
function kb(a) {
  for (var b = !1, c = 0; c < hb.length; c++) {
    !0 === lb(hb[c], a) && (b = !0);
  }
  for (c = ib.length; c--;) {
    ib[c](a);
  }
  return b;
}
function mb(a) {
  if (a && a.getAttribute) {
    var b = a.getAttribute("href");
    a = a.getAttribute("target");
    if (b && b.match(/^\//g) && (!a || a.match(/^_?self$/i))) {
      var c = void 0 === c ? !1 : c;
      "string" !== typeof b && b.url && (c = b.replace, b = b.url);
      a: {
        a = b;
        for (var f = hb.length; f--;) {
          if (0 < nb(hb[f].c.children, a, !1).length) {
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
      return kb(b);
    }
  }
}
function ob(a) {
  if (0 == a.button) {
    return mb(a.currentTarget || a.target || this), pb(a);
  }
}
function pb(a) {
  a && (a.stopImmediatePropagation && a.stopImmediatePropagation(), a.stopPropagation && a.stopPropagation(), a.preventDefault());
  return !1;
}
function qb(a) {
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
        if (mb(b)) {
          return pb(a);
        }
      }
    } while (b = b.parentNode);
  }
}
var rb = !1;
function sb() {
  rb || ("function" === typeof addEventListener && (P || addEventListener("popstate", function() {
    kb(jb());
  }), addEventListener("click", qb)), rb = !0);
}
function tb(a) {
  O.call(this, a);
  a.history && (P = a.history);
  this.state = {url:a.url || jb()};
  sb();
}
u(tb, O);
d = tb.prototype;
d.W = function(a) {
  return !0 !== a.Wb ? !0 : a.url !== this.c.url || a.m !== this.c.m;
};
function lb(a, b) {
  a.b = !1;
  a.a({url:b});
  if (a.updating) {
    return 0 < nb(a.c.children, b, !1).length;
  }
  a.eb();
  return a.b;
}
d.Ga = function() {
  hb.push(this);
  this.updating = !0;
};
d.o = function() {
  var a = this;
  P && (this.g = P.Qb(function(b) {
    lb(a, "" + (b.pathname || "") + (b.search || ""));
  }));
  this.updating = !1;
};
d.fa = function() {
  "function" === typeof this.g && this.g();
  hb.splice(hb.indexOf(this), 1);
};
d.Ha = function() {
  this.updating = !0;
};
d.Fa = function() {
  this.updating = !1;
};
function nb(a, b, c) {
  return a.filter(eb).sort(db).map(function(a) {
    var e = b;
    var f = a.attributes.path, h = a.attributes, k = /(?:\?([^#]*))?(#.*)?$/, l = e.match(k), m = {};
    if (l && l[1]) {
      l = l[1].split("&");
      for (var q = 0; q < l.length; q++) {
        var n = l[q].split("=");
        m[decodeURIComponent(n[0])] = decodeURIComponent(n.slice(1).join("="));
      }
    }
    e = fb(e.replace(k, ""));
    f = fb(f || "");
    k = Math.max(e.length, f.length);
    for (l = 0; l < k; l++) {
      if (f[l] && ":" === f[l].charAt(0)) {
        q = f[l].replace(/(^:|[+*?]+$)/g, "");
        n = (f[l].match(/[+*?]+$/) || cb)[0] || "";
        var t = ~n.indexOf("+"), z = ~n.indexOf("*"), G = e[l] || "";
        if (!G && !z && (0 > n.indexOf("?") || t)) {
          var A = !1;
          break;
        }
        m[q] = decodeURIComponent(G);
        if (t || z) {
          m[q] = e.slice(l).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (f[l] !== e[l]) {
          A = !1;
          break;
        }
      }
    }
    if (e = !0 !== h.default && !1 === A ? !1 : m) {
      return !1 !== c ? (e = Object.assign({}, {url:b, matches:e}, e), delete e.$, delete e.key, Ga(a, e)) : a;
    }
  }).filter(Boolean);
}
d.h = function(a, b) {
  var c = a.m;
  b = b.url;
  a = nb(a.children, b, !0);
  var f = a[0] || null;
  this.b = !!f;
  var e = this.l;
  b !== e && (this.l = b, "function" === typeof c && c({Vb:this, url:b, Ub:e, active:a, current:f}));
  return f;
};
function ub(a) {
  return K("a", Object.assign({}, a, {onClick:ob}));
}
function vb() {
  O.call(this);
  this.b = this.b.bind(this);
}
u(vb, O);
vb.prototype.b = function(a) {
  this.g = a;
  this.a({});
};
vb.prototype.o = function() {
  ib.push(this.b);
};
vb.prototype.fa = function() {
  ib.splice(ib.indexOf(this.b) >>> 0, 1);
};
vb.prototype.h = function(a) {
  var b = this.g || jb(), c = b.replace(/\?.+$/, "");
  this.g = null;
  var f = a.children.filter(function(a) {
    return "function" == typeof a;
  });
  return f[0] && f[0]({url:b, path:c, matches:c === a.path});
};
function Q(a) {
  var b = Object.assign({}, a), c = void 0 === a.Ca ? "active" : a.Ca;
  a = a.path;
  var f = (delete b.Ca, delete b.path, b);
  return K(vb, {path:a || f.href}, function(a) {
    return K(ub, Object.assign({}, f, {className:[f.Kb || f.className, a.matches && c].filter(Boolean).join(" ")}));
  });
}
;function wb(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return K("div", Object.assign({}, b, {className:"row" + (a ? " " + a : "")}), c);
}
function R(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return K("div", Object.assign({}, b, {className:"col" + (a ? " " + a : "")}), c);
}
function xb(a) {
  var b = Object.assign({}, a), c = a.Na;
  a = a.className;
  b = (delete b.Na, delete b.className, b);
  return K("a", Object.assign({}, b, {className:a, href:"#", onClick:function(a) {
    a.preventDefault();
    c(a);
    return !1;
  }}));
}
function yb(a) {
  var b = a.wa, c = a.type, f = a.value;
  a = {required:a.required, name:a.name, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), id:a.id, "aria-describedby":a.I};
  return b ? K("textarea", Object.assign({}, a, {rows:"number" == typeof b ? b : 3}), f) : K("input", Object.assign({}, a, f ? {value:f} : {}, {type:c}));
}
function zb(a) {
  var b = a.label, c = void 0 === a.type ? "text" : a.type, f = a.placeholder, e = a.i, g = a.wa, h = a.file, k = a.options, l = a.qb, m = "i" + 100000 * Math.random(), q = "h" + m;
  a = {I:q, id:m, value:a.value, name:a.name, required:a.required};
  c = k ? K(Ab, Object.assign({}, a, {options:k, qb:l})) : K(yb, Object.assign({}, a, {wa:g, placeholder:f, type:c, file:h}));
  return K("div", {className:"form-group"}, K("label", {htmlFor:m}, b), c, e && K("small", {id:q, dangerouslySetInnerHTML:{la:e}, className:"form-text text-muted"}));
}
function Ab(a) {
  var b = a.options, c = a.value;
  return K("select", {name:a.name, value:c, required:a.required, className:"custom-select", id:a.id, "aria-describedby":a.I}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == c}, a.title);
  }));
}
function S(a) {
  return K("span", {}, K("i", {className:a.icon}), " ");
}
function Bb(a) {
  O.apply(this, arguments);
}
u(Bb, O);
Bb.prototype.W = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Bb.prototype.o = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.m;
  void 0 !== b && c(a, b);
};
Bb.prototype.h = function(a) {
  var b = a.name, c = a.label, f = a.value, e = this.context, g = e.id, h = e.m, k = void 0 === e.values ? {} : e.values;
  return K("div", {className:"custom-control custom-switch"}, K("input", {required:void 0 !== a.required, name:b, checked:b in k ? k[b] : f, id:g, type:"checkbox", className:"custom-control-input", "aria-described-by":e.I, onChange:function(a) {
    h(b, a.currentTarget.checked);
  }}), K("label", {htmlFor:g, className:"custom-control-label"}, c));
};
function Cb(a) {
  a = a.error;
  if (!a) {
    return null;
  }
  "string" != typeof a && (a = "Ошибка");
  return K("div", {className:"alert alert-danger mt-3", role:"alert"}, a);
}
function Db(a) {
  var b = a.s;
  return b ? K("div", {className:"alert alert-success mt-3", role:"alert"}, a.message || b) : null;
}
;function Eb() {
  return K("nav", {className:"nav flex-column"}, K(Q, {className:"nav-link", href:"/admin"}, K("i", {className:"fab fa-kickstarter-k"}), " Главная"), K(Q, {className:"nav-link", href:"/admin/objects"}, K("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), K(Q, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, K("i", {className:"fas fa-home"}), " Новая Недвижимость"), K(Q, {className:"nav-link", href:"/admin/categories"}, K("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), K(Q, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, K("i", {className:"fas fa-folder-plus"}), " Добавить"), K(Q, {className:"nav-link", href:"/admin/pages"}, K("i", {className:"fas fa-font"}), " Статьи"), K(Q, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, K("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), K(Q, {className:"nav-link", href:"/admin/special"}, K("i", {className:"fas fa-bolt"}), " Спец. Предложения"), 
  K(Q, {className:"nav-link", href:"/admin/offers"}, K("i", {className:"fas fa-grip-lines"}), " Акции"), K(Q, {className:"nav-link", href:"/admin/galleries/"}, K("i", {className:"fas fa-camera-retro"}), " Галереи"));
}
;function U(a, b) {
  return b = b || {}, new Promise(function(c, f) {
    function e() {
      var a, b = [], c = [], f = {};
      return g.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e, g, h) {
        b.push(g = g.toLowerCase());
        c.push([g, h]);
        f[g] = (a = f[g]) ? a + "," + h : h;
      }), {ok:2 == (g.status / 100 | 0), status:g.status, statusText:g.statusText, url:g.responseURL, clone:e, text:function() {
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
        return f[a.toLowerCase()];
      }, has:function(a) {
        return a.toLowerCase() in f;
      }}};
    }
    var g = new XMLHttpRequest, h;
    for (h in g.open(b.method || "get", a, !0), b.headers) {
      g.setRequestHeader(h, b.headers[h]);
    }
    g.withCredentials = "include" == b.credentials;
    g.onload = function() {
      c(e());
    };
    g.onerror = f;
    g.send(b.body || null);
  });
}
;function Fb() {
  O.call(this);
  this.state = {f:!1};
}
u(Fb, O);
function Gb(a) {
  var b, c, f, e;
  return I(function(g) {
    switch(g.b) {
      case 1:
        return a.a({f:!0}), x(g, 2, 3), v(g, fetch("/admin-data?" + a.c.path, {method:"POST"}), 5);
      case 5:
        return b = g.g, v(g, b.json(), 6);
      case 6:
        c = g.g, (f = c.error) ? a.a({error:f}) : (a.c.G(), a.c.ia());
      case 3:
        B(g);
        a.a({f:!1});
        C(g, 0);
        break;
      case 2:
        e = y(g), a.a({error:e}), g.v(3);
    }
  });
}
Fb.prototype.h = function(a) {
  var b = this, c = a.text, f = a.G, e = void 0 === a.X ? "primary" : a.X, g = a.j, h = void 0 === a.L ? "Отмена" : a.L;
  return K("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:f, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, K("p", {}, c)), K("div", {className:"modal-footer"}, 
  K("button", {onClick:f, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, h), K("button", {disabled:this.state.f, type:"button", className:"btn btn-" + e, onClick:function() {
    return Gb(b);
  }}, this.state.f ? "Отправка..." : g)))));
};
function Hb(a) {
  O.apply(this, arguments);
}
u(Hb, O);
Hb.prototype.h = function(a) {
  var b = a.children, c = a.G;
  return K("div", {className:"EditModal modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:c, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, b))));
};
function Ib() {
  O.call(this);
  this.state = {f:!1, data:[]};
}
u(Ib, O);
Ib.prototype.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
Ib.prototype.load = function() {
  var a = this, b, c, f, e, g;
  return I(function(h) {
    switch(h.b) {
      case 1:
        return a.a({f:!0}), x(h, 2, 3), v(h, U("/admin-data?categories"), 5);
      case 5:
        return b = h.g, v(h, b.json(), 6);
      case 6:
        c = h.g, f = c.error, e = c.data, f ? a.a({error:f}) : a.a({data:e});
      case 3:
        B(h);
        a.a({f:!1});
        C(h, 0);
        break;
      case 2:
        g = y(h), a.a({error:g}), h.v(3);
    }
  });
};
Ib.prototype.h = function() {
  var a = this;
  return K(R, {}, K("h1", {}, "Категории Каталога"), K("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), this.state.f && K("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return K(Jb, Object.assign({}, c, {key:b, id:b, pa:function() {
      return a.load();
    }}));
  }));
};
function Jb() {
  O.call(this);
  this.state = {u:null};
}
u(Jb, O);
Jb.prototype.h = function() {
  var a = this, b = this.c, c = b.title, f = b.description, e = b.seo, g = b.id, h = b.pa;
  return K(wb, {className:"CategoryRow"}, K(R, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"})), K(R, {}, K("h2", {}, c), K("em", {}, "knedv.ru/", e), K("p", {}, f)), K(R, {className:"col-1 CategoryMeta"}, K("a", {href:"/admin/add-category/" + g, style:"color:brown;"}, K(S, {icon:"fas fa-pen"})), K("br"), K("a", {onClick:function(b) {
    b.preventDefault();
    a.a({u:{text:K("span", {}, "Вы действительно хотите удалить категорию ", K("strong", {}, c), "?"), j:"Удалить", title:"Удаление Категории", path:"categories&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, K(S, {icon:"far fa-trash-alt"}))), this.state.u && K(Fb, Object.assign({}, this.state.u, {G:function() {
    a.a({u:null});
  }, X:"danger", ia:h})));
};
function Kb() {
  O.call(this);
  this.c = this.c;
}
u(Kb, O);
Kb.prototype.W = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Kb.prototype.o = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.m;
  c && void 0 !== b && c(a, b);
};
Kb.prototype.h = function(a) {
  var b = a.options, c = a.name, f = a.value, e = this.context, g = e.m, h = void 0 === e.values ? {} : e.values;
  return K("select", {name:c, value:c in h ? h[c] : f, required:a.required, className:"custom-select", id:e.id, "aria-describedby":e.I, onChange:function(a) {
    g(c, a.currentTarget.value);
  }}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == f}, a.title);
  }));
};
function Lb() {
  O.call(this);
  this.c = this.c;
}
u(Lb, O);
Lb.prototype.W = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Lb.prototype.o = function() {
  var a = this.c, b = r(a.children).next().value;
  a = a.name;
  var c = this.context.m;
  b && c(a, b.trim());
};
Lb.prototype.h = function(a) {
  var b = a.name, c = a.children, f = this.context, e = f.m, g = void 0 === f.values ? {} : f.values;
  return K("textarea", {required:a.required, name:b, placeholder:a.placeholder, "aria-describedby":f.I, className:"form-control", id:f.id, onChange:function(a) {
    e(b, a.currentTarget.value);
  }, rows:void 0 === a.rows ? 3 : a.rows}, b in g ? g[b] : c);
};
function Mb() {
  O.call(this);
  this.c = this.c;
}
u(Mb, O);
Mb.prototype.W = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Mb.prototype.o = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.m;
  void 0 !== b && c(a, b);
};
Mb.prototype.h = function(a) {
  var b = a.name, c = a.value, f = this.context, e = f.m, g = void 0 === f.values ? {} : f.values;
  return K("input", {required:a.required, name:b, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), value:b in g ? g[b] : c, type:void 0 === a.type ? "text" : a.type, "aria-describedby":f.I, id:f.id, onChange:function(a) {
    e(b, a.currentTarget.value);
  }});
};
function Nb() {
  O.call(this);
  this.c = this.c;
  this.state = {B:!1, error:null, s:null};
}
u(Nb, O);
Nb.prototype.submit = function(a) {
  var b = this, c, f, e, g, h;
  return I(function(k) {
    switch(k.b) {
      case 1:
        a.preventDefault();
        if (!b.c.path) {
          return b.a({error:"Path is not set in the properties of the form."}), k.return(!1);
        }
        b.a({error:null, s:null});
        c = new FormData(a.target);
        b.a({B:!0});
        x(k, 2, 3);
        return v(k, U(b.c.path, {method:"POST", body:c}), 5);
      case 5:
        return f = k.g, v(k, f.json(), 6);
      case 6:
        e = k.g, (g = e.error) ? b.a({error:g}) : b.a({s:1});
      case 3:
        B(k);
        b.a({B:!1});
        C(k, 4);
        break;
      case 2:
        h = y(k);
        b.a({error:h});
        k.v(3);
        break;
      case 4:
        if (!b.c.S) {
          k.v(7);
          break;
        }
        return v(k, b.c.S(f), 7);
      case 7:
        return k.return(!1);
    }
  });
};
Nb.prototype.reset = function() {
  this.a({error:null, s:null});
};
function V() {
  O.call(this);
  this.state = {values:{}};
  this.c = this.c;
}
u(V, O);
V.prototype.na = function() {
  return {values:this.state.values, m:this.m.bind(this)};
};
V.prototype.m = function(a, b) {
  var c = {};
  this.a({values:Object.assign({}, this.state.values, (c[a] = b, c))});
  this.c.m && this.c.m(this.state.values);
};
V.prototype.h = function(a) {
  var b = Object.assign({}, a), c = a.children, f = a.fb;
  a = a.V;
  b = (delete b.children, delete b.fb, delete b.V, delete b.m, b);
  return K("form", Object.assign({}, b, {ref:f, onSubmit:a}), c);
};
function W() {
  O.call(this);
  this.id = "i" + Math.floor(100000 * Math.random());
  this.I = "h" + this.id;
  this.c = this.c;
}
u(W, O);
W.prototype.na = function() {
  return {id:this.id, I:this.I};
};
W.prototype.h = function() {
  var a = this.c, b = a.children, c = a.label;
  a = a.i;
  return K("div", {className:"form-group"}, c && K("label", {htmlFor:this.id}, c), b, a && K("small", {id:this.I, dangerouslySetInnerHTML:{la:a}, className:"form-text text-muted"}));
};
function Ob(a) {
  var b = a.f, c = a.j, f = void 0 === a.Z ? c : a.Z;
  a = ["btn", "btn-" + ((void 0 === a.outline ? 0 : a.outline) ? "outline-" : "") + (void 0 === a.type ? "primary" : a.type), a.className].filter(Boolean);
  return K("button", {className:a.join(" "), type:"submit", disabled:b}, b && K("span", {className:"spinner-border spinner-border-sm" + (f ? " mr-2" : ""), role:"status", "aria-hidden":"true"}), b ? f : c);
}
var X = {get Wa() {
  return Kb;
}, get aa() {
  return Lb;
}, get J() {
  return Mb;
}, get N() {
  return Nb;
}};
function Pb() {
  return K("span", {className:"echo-loader"}, "Loading…");
}
function Qb() {
  var a = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (a.outerHeight / 2 + a.screenY - 325 - 50) + ",left=" + (a.outerWidth / 2 + a.screenX - 450));
}
;function Rb(a) {
  var b = a.article, c = a.qa;
  a = a.name;
  return K("div", {className:"form-group"}, K("label", {}, "Статья"), K("div", {dangerouslySetInnerHTML:{la:b}, className:"mb-3 ArticleHolder"}), K("a", {onClick:function(a) {
    a.preventDefault();
    window.editorCallback = function(a) {
      f.close();
      c(a);
    };
    window.editorGetData = function() {
      return b;
    };
    var f = Qb();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"), K("input", {name:a, type:"hidden", value:b}));
}
;function Sb() {
  O.call(this);
  this.state = {Qa:!1};
  this.c = this.c;
}
u(Sb, O);
Sb.prototype.h = function(a) {
  var b = this, c = a.A, f = a.required, e = a.image;
  a = a.i;
  var g = this.state.Qa;
  if (c && !g) {
    return K(W, {i:a, label:"Изображение"}, K("br"), K("img", {src:e, className:"img-fluid"}), K("a", {onClick:function(a) {
      a.preventDefault();
      b.a({Qa:!0});
      return !1;
    }, href:"#", className:"btn btn-outline-warning"}, "Изменить"));
  }
  if (!c || g) {
    return K(W, {i:a, label:"Изображение"}, K(X.J, {required:f, name:"image", type:"file", file:"1"}));
  }
};
function Tb() {
  O.call(this);
  this.state = {f:!1, data:{}, hint:"москва-новостройки", article:""};
}
u(Tb, O);
Tb.prototype.o = function() {
  var a = this, b, c, f, e, g, h, k, l;
  return I(function(m) {
    switch(m.b) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return m.return();
        }
        a.a({A:1, f:!0});
        x(m, 2, 3);
        return v(m, U("/admin-data?categories&id=" + a.c.id), 5);
      case 5:
        return c = m.g, v(m, c.json(), 6);
      case 6:
        f = m.g, e = f.error, g = f.data, e ? a.a({error:e}) : (h = r(g), k = h.next().value, a.a({data:k, hint:k.seo, article:k.article}));
      case 3:
        B(m);
        a.a({f:!1});
        C(m, 0);
        break;
      case 2:
        l = y(m), a.a({error:l}), m.v(3);
    }
  });
};
Tb.prototype.submit = function(a) {
  var b = this, c, f, e, g, h;
  return I(function(k) {
    switch(k.b) {
      case 1:
        return b.a({error:null}), a.preventDefault(), c = new FormData(a.currentTarget.data), b.a({B:!0}), x(k, 2, 3), v(k, U("/admin-data?categories", {method:"POST", body:c}), 5);
      case 5:
        return f = k.g, v(k, f.json(), 6);
      case 6:
        e = k.g, (g = e.error) ? b.a({error:g}) : b.a({s:1});
      case 3:
        B(k);
        b.a({B:!1});
        C(k, 4);
        break;
      case 2:
        h = y(k);
        b.a({error:h});
        k.v(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
Tb.prototype.oa = function() {
  return "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.";
};
Tb.prototype.h = function() {
  var a = this, b = this.oa(), c = this.state.A;
  return K(R, {}, K("h1", {}, this.state.A ? "Редактировать" : "Добавить", " Категорию"), c && this.state.f && K("span", {className:"echo-loader"}, "Loading…"), !(c && this.state.f) && K(V, {m:function(a) {
    console.log(a);
    console.log(a.seo);
  }, V:this.submit.bind(this)}, K(W, {label:"Название", i:"Название для меню слева."}, K(X.J, {value:this.state.data.title, name:"title", placeholder:"Москва Новостройки", required:!0})), K(W, {i:b, label:"СЕО Название"}, K(X.J, {value:this.state.data.seo, required:!0, name:"seo", placeholder:"москва-новостройки"})), K(W, {label:"Описание", i:"Краткое описание для главной страницы."}, K(X.aa, {rows:"3", required:!0, name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  this.state.data.description)), K(Sb, {A:c, i:"Картинка, отображаемая на главной странице.", required:!0}), K(Rb, {article:this.state.article, qa:function(b) {
    a.a({article:b});
  }}), c && K("input", {value:this.c.id, type:"hidden", name:"id"}), K("button", {disabled:this.state.B, type:"submit", className:"btn btn-primary"}, this.state.B ? "Загрузка..." : c ? "Сохранить" : "Добавить"), K(Cb, {error:this.state.error}), K(Db, {s:this.state.error, message:"Категория успешно " + (c ? "сохранена" : "создана") + "!"})));
};
function Ub() {
  var a = X.N.call(this) || this;
  Object.assign(a.state, {f:!1, data:{}, Ea:[], hint:"1-комнатные-апартаменты-воскресенское", Da:"апартаменты", article:""});
  return a;
}
u(Ub, X.N);
Ub.prototype.o = function() {
  var a = this, b, c, f, e, g, h, k, l, m, q;
  return I(function(n) {
    switch(n.b) {
      case 1:
        return v(n, Vb(a), 2);
      case 2:
        b = !!a.c.id;
        if (!b) {
          return n.return();
        }
        a.a({A:1, f:!0});
        x(n, 3, 4);
        return v(n, U("/admin-data?objects&id=" + a.c.id), 6);
      case 6:
        return c = n.g, v(n, c.json(), 7);
      case 7:
        f = n.g, e = f.error, g = f.data, e ? a.a({error:e}) : (h = r(g), k = h.next().value, a.a({data:k, hint:k.seo, Da:k.categorySeo, article:k.article}));
      case 4:
        B(n);
        a.a({f:!1});
        C(n, 0);
        break;
      case 3:
        m = l = y(n), q = m.message, a.a({error:q}), n.v(4);
    }
  });
};
function Vb(a) {
  var b, c, f, e, g, h;
  return I(function(k) {
    switch(k.b) {
      case 1:
        return a.a({f:!0}), x(k, 2, 3), v(k, U("/admin-data?categories"), 5);
      case 5:
        return b = k.g, v(k, b.json(), 6);
      case 6:
        c = k.g, f = c.error, e = c.data, f ? a.a({error:f}) : (g = e.map(function(a) {
          return {value:a._id, title:a.title};
        }), a.a({Ea:g}));
      case 3:
        B(k);
        a.a({f:!1});
        C(k, 0);
        break;
      case 2:
        h = y(k), a.a({error:h}), k.v(3);
    }
  });
}
Ub.prototype.oa = function() {
  return "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.Da + "/<strong>" + this.state.hint + "</strong>.";
};
Ub.prototype.h = function(a) {
  var b = this, c = a.G, f = void 0 === a.L ? "Отмена" : a.L, e = a.T, g = void 0 === a.j ? "Добавить" : a.j, h = a.title, k = a.Ya, l = this.oa(), m = this.state, q = m.Ea, n = m.B, t = m.data;
  a = m.f;
  var z = m.error;
  m = m.s;
  c = K(V, {V:this.submit.bind(this)}, K(W, {i:"Название для каталога недвижимости.", label:"Название"}, K(X.J, {value:t.title, name:"title", required:!0, placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское"})), K(W, {i:"Цена объекта", label:"Цена"}, K(X.J, {value:t.price, name:"price", required:!0, placeholder:"3 000 000 руб."})), K(W, {i:l, label:"СЕО Название"}, K(X.J, {value:t.seo, name:"seo", required:!0, placeholder:"1-комнатные-апартаменты-воскресенское"})), K(W, {i:"Описание объекта.", 
  label:"Описание"}, K(X.aa, {rows:10, name:"description", required:!0, placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично)."}, 
  t.description)), K(Sb, {A:this.A, i:"Картинка, отображаемая на главной странице.", required:!0, image:t.cdnImage}), K(Rb, {article:this.state.article, name:"article", qa:function(a) {
    b.a({article:a});
  }}), this.A && K("input", {value:this.c.id, type:"hidden", name:"id"}), K(W, {label:"Раздел", i:"Категория в каталоге"}, K(X.Wa, {options:q, name:"category", value:t.category, required:!0})), K(Cb, {error:z}), K(Db, {s:m, message:e}), K(Ob, {j:g, f:n, Z:"Загрузка..."}), k && K("a", {href:"/admin/albums/" + k, className:"ml-2 btn btn-warning"}, "Загрузить Фотографии"), c && K("button", {onClick:c, type:"button", className:"FormCancelBtn btn btn-secondary"}, f));
  return K(R, {}, h && K("h1", {}, h), a && K(Pb), !a && c);
};
p.Object.defineProperties(Ub.prototype, {A:{configurable:!0, enumerable:!0, get:function() {
  return !!this.c.id;
}}});
function Wb(a) {
  var b = this, c, f, e, g, h;
  return I(function(k) {
    switch(k.b) {
      case 1:
        return b.a({f:!0}), x(k, 2, 3), v(k, U("/admin-data?" + a), 5);
      case 5:
        return c = k.g, v(k, c.json(), 6);
      case 6:
        return f = k.g, e = f.error, g = f.data, e ? (b.a({error:e}), k.return()) : k.return(g);
      case 3:
        B(k);
        b.a({f:!1});
        C(k, 0);
        break;
      case 2:
        h = y(k), b.a({error:h}), k.v(3);
    }
  });
}
;function Xb() {
  O.call(this);
  this.state = {f:!1, data:[], u:null, U:null};
}
u(Xb, O);
d = Xb.prototype;
d.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return I(function(c) {
    if (1 == c.b) {
      return v(c, Wb.bind(a)("objects"), 2);
    }
    (b = c.g) && a.a({data:b});
    c.b = 0;
  });
};
d.H = function(a) {
  this.a({u:a});
};
d.w = function(a) {
  this.a({U:a});
};
d.h = function() {
  return K(R, {}, K("h1", {}, "Объекты Недвижимости"), K("p", {}, "На сайт добалены следующие объекты:"), K(Yb, {data:this.state.data, f:this.state.f, H:this.H.bind(this), w:this.w.bind(this)}), this.state.u && K(Fb, Object.assign({}, this.state.u, {G:this.H.bind(this, null), X:"danger", ia:this.load.bind(this)})), this.state.U && K(Hb, {G:this.w.bind(this, null), title:"Редактирование Объекта"}, K(Ub, {id:this.state.U._id, S:this.load.bind(this), G:this.w.bind(this, null), path:"/admin-data?objects", 
  L:"Отмена", T:"Объект успешно отредактирован!", j:"Сохранить"})));
};
function Yb(a) {
  var b = a.data, c = a.H, f = a.w;
  a = a.f;
  return K("div", {}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет объектов недвижимости.", b.map(function(a) {
    return K(Zb, {item:a, key:a._id, H:c, w:f});
  }));
}
function Zb(a) {
  O.apply(this, arguments);
}
u(Zb, O);
Zb.prototype.h = function(a) {
  var b = a.item, c = a.H, f = a.w, e = b.title;
  a = b.description;
  var g = b._id, h = b.price, k = "/каталог/" + b.categorySeo + "/" + b.seo, l = "knedv.ru" + k;
  return K(wb, {className:"CategoryRow"}, K(R, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"}), h && "Цена: " + h), K(R, {}, K("h2", {}, e), K("em", {}, K("a", {href:k}, l)), K("p", {}, a)), K(R, {className:"col-1 CategoryMeta"}, K("br"), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить объект ", K("strong", {}, e), "?"), j:"Удалить", title:"Удаление Объекта", path:"objects&id=" + g + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(S, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    f(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(S, {icon:"fas fa-pen"})), K("a", {href:"/admin/albums/" + g, style:"color:brown;", onClick:function(a) {
    a.preventDefault();
    f(b);
    return a;
  }}, K(S, {icon:"fas fa-images"}))));
};
function $b(a) {
  O.apply(this, arguments);
}
u($b, O);
$b.prototype.h = function(a) {
  var b = this, c = a.Rb;
  return K(Ub, {S:function(a) {
    var f, g, h;
    return I(function(e) {
      if (1 == e.b) {
        return c && c(a), v(e, a.json(), 2);
      }
      g = f = e.g;
      h = g.data;
      b.a({id:h});
      e.b = 0;
    });
  }, title:"Добавить Объект", Ya:this.state.id, path:"/admin-data?objects", T:"Объект успешно добавлен!", j:"Добавить"});
};
function ac() {
  O.call(this);
  this.state = {f:!1, data:[]};
}
u(ac, O);
ac.prototype.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
ac.prototype.load = function() {
  var a = this, b, c, f, e, g;
  return I(function(h) {
    switch(h.b) {
      case 1:
        return a.a({f:!0}), x(h, 2, 3), v(h, U("/admin-data?pages"), 5);
      case 5:
        return b = h.g, v(h, b.json(), 6);
      case 6:
        c = h.g, f = c.error, e = c.data, f ? a.a({error:f}) : a.a({data:e});
      case 3:
        B(h);
        a.a({f:!1});
        C(h, 0);
        break;
      case 2:
        g = y(h), a.a({error:g}), h.v(3);
    }
  });
};
ac.prototype.h = function() {
  var a = this;
  return K(R, {}, K("h1", {}, "Материалы Сайта"), K("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.f && K("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return K(bc, Object.assign({}, c, {key:b, id:b, pa:function() {
      return a.load();
    }}));
  }));
};
function bc() {
  O.call(this);
  this.state = {u:null};
}
u(bc, O);
bc.prototype.h = function() {
  var a = this, b = this.c, c = b.seo, f = b.id, e = b.description, g = b.pa, h = b.title;
  return K(wb, {className:"CategoryRow"}, K(R, {}, K("h2", {}, h), K("em", {}, "knedv.ru/", c), K("p", {}, e)), K(R, {className:"col-1 CategoryMeta"}, K("a", {href:"/admin/add-page/" + f, style:"color:brown;"}, K(S, {icon:"fas fa-pen"})), K("br"), K("a", {onClick:function(b) {
    b.preventDefault();
    a.a({u:{text:K("span", {}, "Вы действительно хотите удалить страницу ", K("strong", {}, h), "?"), j:"Удалить", title:"Удаление Страницы", path:"pages&id=" + f + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, K(S, {icon:"far fa-trash-alt"}))), this.state.u && K(Fb, Object.assign({}, this.state.u, {G:function() {
    a.a({u:null});
  }, X:"danger", ia:g})));
};
function cc() {
  O.call(this);
  this.state = {f:!1, data:{}, article:""};
}
u(cc, O);
cc.prototype.o = function() {
  var a = this, b, c, f, e, g, h, k, l, m, q;
  return I(function(n) {
    switch(n.b) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return n.return();
        }
        a.a({A:1, f:!0});
        x(n, 2, 3);
        return v(n, U("/admin-data?pages&id=" + a.c.id), 5);
      case 5:
        return c = n.g, v(n, c.json(), 6);
      case 6:
        f = n.g, e = f.error, g = f.data, e ? a.a({error:e}) : (h = r(g), k = h.next().value, a.a({data:k, article:k.article}));
      case 3:
        B(n);
        a.a({f:!1});
        C(n, 0);
        break;
      case 2:
        m = l = y(n), q = m.message, a.a({error:q}), n.v(3);
    }
  });
};
cc.prototype.submit = function(a) {
  var b = this, c, f, e, g, h;
  return I(function(k) {
    switch(k.b) {
      case 1:
        return b.a({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.a({B:!0}), x(k, 2, 3), v(k, U("/admin-data?pages", {method:"POST", body:c}), 5);
      case 5:
        return f = k.g, v(k, f.json(), 6);
      case 6:
        e = k.g, (g = e.error) ? b.a({error:g}) : b.a({s:1});
      case 3:
        B(k);
        b.a({B:!1});
        C(k, 4);
        break;
      case 2:
        h = y(k);
        b.a({error:h});
        k.v(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
cc.prototype.h = function() {
  var a = this, b = this.state.A;
  return K(R, {}, K("h1", {}, this.state.A ? "Редактировать" : "Добавить", " Страницу"), b && this.state.f && K("span", {className:"echo-loader"}, "Loading…"), !(b && this.state.f) && K("form", {ref:function(b) {
    return a.form = b;
  }, onSubmit:this.submit.bind(this)}, K(zb, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", i:"Название для администратора.", required:"1"}), K(zb, {i:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), K(zb, {wa:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", i:"Описание страницы.", value:this.state.data.description, required:"1"}), 
  K(Rb, {article:this.state.article, qa:function(b) {
    a.a({article:b});
  }}), b && K("input", {value:this.c.id, type:"hidden", name:"id"}), K("button", {disabled:this.state.B, type:"submit", className:"btn btn-primary"}, this.state.B ? "Загрузка..." : b ? "Сохранить" : "Добавить"), this.state.error && K("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.s && K("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", b ? "сохранена" : "создана", "!")));
};
function dc(a) {
  return X.N.apply(this, arguments) || this;
}
u(dc, X.N);
dc.prototype.h = function(a) {
  var b = this, c = a.item, f = a.G, e = void 0 === a.L ? "Отмена" : a.L, g = a.T;
  a = void 0 === a.j ? "Добавить" : a.j;
  var h = c || {}, k = this.state, l = k.B, m = k.error;
  k = k.s;
  return K(V, {V:this.submit.bind(this), m:function() {
    b.a({error:null, s:null});
  }}, K(W, {label:"Название", i:"Заголовок для главной страницы, напр., Ленинский проспект, дом 114"}, K(X.J, {value:h.title, placeholder:"Название акции", name:"title", required:!0})), K(W, {label:"Описание", i:"Введите описание акции..."}, K(X.aa, {name:"description", required:!0, placeholder:"Описание акции"}, h.description)), K(Sb, {A:c, i:"Картинка, отображаемая на главной странице.", required:!0, image:h.cdnImage}), K(W, {label:"Цена", i:"Задайте цену..."}, K(X.J, {value:h.price, name:"price", 
  placeholder:"55 000 000 руб."})), K(W, {label:"Переход", i:"Ссылка на страницу каталога, или сайта."}, K(X.J, {value:h.href, name:"href", placeholder:"/каталог/москва-элитная/лениниский-проспект-дом-114"})), K(W, {i:"Добавить в специальные предложения на главной."}, K(Bb, {value:h.show_on_main, label:"Отображать на главной", name:"show_on_main"})), c && K("input", {value:h._id, type:"hidden", name:"id"}), K(Cb, {error:m}), K(Db, {s:k, message:g}), K(Ob, {j:a, f:l, Z:"Загрузка..."}), f && K("button", 
  {onClick:f, type:"button", className:"FormCancelBtn btn btn-secondary"}, e));
};
function ec() {
  O.call(this);
  this.state = {f:!1, data:[]};
}
u(ec, O);
d = ec.prototype;
d.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return I(function(c) {
    if (1 == c.b) {
      return v(c, Wb.bind(a)("specials"), 2);
    }
    (b = c.g) && a.a({data:b});
    c.b = 0;
  });
};
d.H = function(a) {
  this.a({u:a});
};
d.w = function(a) {
  this.a({U:a});
};
d.h = function() {
  var a = this, b = K("details", {}, K("summary", {}, K("h3", {style:"display: inline-block;vertical-align: middle;"}, "Создать Новое Предложение")), K(dc, {S:function() {
    a.load();
  }, path:"/admin-data?specials", T:"Предложение успешно создано!", j:"Добавить"}));
  return K(R, {}, K("h1", {}, "Специальные Предложения"), K(fc, {data:this.state.data, f:this.state.f, H:this.H.bind(this), w:this.w.bind(this)}), K("hr"), b, this.state.u && K(Fb, Object.assign({}, this.state.u, {G:this.H.bind(this, null), X:"danger", ia:this.load.bind(this)})), this.state.U && K(Hb, {G:this.w.bind(this, null), title:"Редактирование"}, K(dc, {item:this.state.U, S:this.load.bind(this), G:this.w.bind(this, null), path:"/admin-data?specials", L:"Отмена", T:"Предложение успешно отредактировано!", 
  j:"Сохранить"})));
};
function fc(a) {
  var b = a.data, c = a.H, f = a.w;
  a = a.f;
  return K("div", {style:"height:25rem;overflow:scroll;background:wheat; padding:0.5rem;"}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет специальных предложений.", b.map(function(a) {
    return K(gc, {item:a, key:a._id, H:c, w:f});
  }));
}
function gc(a) {
  var b = a.item, c = a.H, f = a.w, e = b._id, g = b.title;
  a = b.cdnImage;
  var h = b.description, k = b.price, l = "on" == b.show_on_main;
  return K("div", {className:l ? "IsShownOnMain" : "", style:"border-bottom:1px solid brown;border-top:1px solid lightcoral;"}, K("h4", {}, g, " ", l && K("span", {className:"badge badge-danger"}, "На главной")), K("p", {}, K("img", {src:a, style:"display:block;"}), h, K("span", {style:"font-weight: bold;"}, " ", k)), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить предложение ", K("strong", {}, g), "?"), j:"Удалить", title:"Удаление Предложения", path:"specials&id=" + e + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(S, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    f(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(S, {icon:"fas fa-pen"})));
}
;function hc(a) {
  return X.N.apply(this, arguments) || this;
}
u(hc, X.N);
hc.prototype.h = function(a) {
  var b = this, c = a.item, f = a.G, e = void 0 === a.L ? "Отмена" : a.L, g = a.T;
  a = void 0 === a.j ? "Добавить" : a.j;
  var h = c || {}, k = this.state, l = k.B, m = k.error;
  k = k.s;
  return K(V, {V:this.submit.bind(this), m:function() {
    b.reset();
  }}, K(W, {label:"Название", i:"Заголовок альбома для выбора на странице объекта."}, K(X.J, {value:h.title, placeholder:"Мосфильмовская, дом 70к6", name:"title", required:!0})), K(W, {label:"Описание", i:"Введите описание акции..."}, K(X.aa, {name:"description", required:!0, placeholder:"Описание Альбома"}, h.description)), K(Sb, {A:c, i:"Картинка для узнаваемости.", required:!0, image:h.cdnImage}), c && K("input", {value:h._id, type:"hidden", name:"id"}), K(Cb, {error:m}), K(Db, {s:k, message:g}), 
  K(Ob, {j:a, f:l, Z:"Загрузка..."}), f && K("button", {onClick:f, type:"button", className:"FormCancelBtn btn btn-secondary"}, e));
};
function ic() {
  O.call(this);
  this.state = {data:[], f:!0};
}
u(ic, O);
ic.prototype.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
ic.prototype.load = function() {
  var a = this, b;
  return I(function(c) {
    if (1 == c.b) {
      return v(c, Wb.bind(a)("galleries"), 2);
    }
    (b = c.g) && a.a({data:b});
    c.b = 0;
  });
};
ic.prototype.h = function() {
  var a = this, b = this.state.f;
  return K(R, {}, K("h1", {}, "Галереи"), b && K(Pb), !b && !this.state.data.length && "Не существует галерей.", this.state.data.map(function(a) {
    var b = a._id, c = a.title, g = a.description;
    return K(wb, {key:b}, K(R, {className:"col-sm-3"}, K("img", {src:a.cdnImage, className:"img-fluid"})), K(R, {}, K("h2", {}, c), K("a", {href:"/admin/galleries/" + b}, "Просмотр"), g));
  }), K("hr"), K(jc, {title:"Создать Новую Галерею"}, K(hc, {S:function() {
    a.load();
  }, path:"/admin-data?galleries", T:"Галерея успешно создана!", j:"Добавить"})));
};
p.Object.defineProperties(ic.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function jc(a) {
  var b = a.children;
  return K("details", {}, K("summary", {}, K("h3", {style:"display: inline-block;vertical-align: middle;"}, a.title)), b);
}
;var kc = {36864:"ExifVersion", 40960:"FlashpixVersion", 40961:"ColorSpace", 40962:"PixelXDimension", 40963:"PixelYDimension", 37121:"ComponentsConfiguration", 37122:"CompressedBitsPerPixel", 37500:"MakerNote", 37510:"UserComment", 40964:"RelatedSoundFile", 36867:"DateTimeOriginal", 36868:"DateTimeDigitized", 37520:"SubsecTime", 37521:"SubsecTimeOriginal", 37522:"SubsecTimeDigitized", 33434:"ExposureTime", 33437:"FNumber", 34850:"ExposureProgram", 34852:"SpectralSensitivity", 34855:"ISOSpeedRatings", 
34856:"OECF", 37377:"ShutterSpeedValue", 37378:"ApertureValue", 37379:"BrightnessValue", 37380:"ExposureBias", 37381:"MaxApertureValue", 37382:"SubjectDistance", 37383:"MeteringMode", 37384:"LightSource", 37385:"Flash", 37396:"SubjectArea", 37386:"FocalLength", 41483:"FlashEnergy", 41484:"SpatialFrequencyResponse", 41486:"FocalPlaneXResolution", 41487:"FocalPlaneYResolution", 41488:"FocalPlaneResolutionUnit", 41492:"SubjectLocation", 41493:"ExposureIndex", 41495:"SensingMethod", 41728:"FileSource", 
41729:"SceneType", 41730:"CFAPattern", 41985:"CustomRendered", 41986:"ExposureMode", 41987:"WhiteBalance", 41988:"DigitalZoomRation", 41989:"FocalLengthIn35mmFilm", 41990:"SceneCaptureType", 41991:"GainControl", 41992:"Contrast", 41993:"Saturation", 41994:"Sharpness", 41995:"DeviceSettingDescription", 41996:"SubjectDistanceRange", 40965:"InteroperabilityIFDPointer", 42016:"ImageUniqueID"}, lc = {256:"ImageWidth", 257:"ImageHeight", 34665:"ExifIFDPointer", 34853:"GPSInfoIFDPointer", 40965:"InteroperabilityIFDPointer", 
258:"BitsPerSample", 259:"Compression", 262:"PhotometricInterpretation", 274:"Orientation", 277:"SamplesPerPixel", 284:"PlanarConfiguration", 530:"YCbCrSubSampling", 531:"YCbCrPositioning", 282:"XResolution", 283:"YResolution", 296:"ResolutionUnit", 273:"StripOffsets", 278:"RowsPerStrip", 279:"StripByteCounts", 513:"JPEGInterchangeFormat", 514:"JPEGInterchangeFormatLength", 301:"TransferFunction", 318:"WhitePoint", 319:"PrimaryChromaticities", 529:"YCbCrCoefficients", 532:"ReferenceBlackWhite", 306:"DateTime", 
270:"ImageDescription", 271:"Make", 272:"Model", 305:"Software", 315:"Artist", 33432:"Copyright"}, mc = {0:"GPSVersionID", 1:"GPSLatitudeRef", 2:"GPSLatitude", 3:"GPSLongitudeRef", 4:"GPSLongitude", 5:"GPSAltitudeRef", 6:"GPSAltitude", 7:"GPSTimeStamp", 8:"GPSSatellites", 9:"GPSStatus", 10:"GPSMeasureMode", 11:"GPSDOP", 12:"GPSSpeedRef", 13:"GPSSpeed", 14:"GPSTrackRef", 15:"GPSTrack", 16:"GPSImgDirectionRef", 17:"GPSImgDirection", 18:"GPSMapDatum", 19:"GPSDestLatitudeRef", 20:"GPSDestLatitude", 21:"GPSDestLongitudeRef", 
22:"GPSDestLongitude", 23:"GPSDestBearingRef", 24:"GPSDestBearing", 25:"GPSDestDistanceRef", 26:"GPSDestDistance", 27:"GPSProcessingMethod", 28:"GPSAreaInformation", 29:"GPSDateStamp", 30:"GPSDifferential"}, nc = {256:"ImageWidth", 257:"ImageHeight", 258:"BitsPerSample", 259:"Compression", 262:"PhotometricInterpretation", 273:"StripOffsets", 274:"Orientation", 277:"SamplesPerPixel", 278:"RowsPerStrip", 279:"StripByteCounts", 282:"XResolution", 283:"YResolution", 284:"PlanarConfiguration", 296:"ResolutionUnit", 
513:"JpegIFOffset", 514:"JpegIFByteCount", 529:"YCbCrCoefficients", 530:"YCbCrSubSampling", 531:"YCbCrPositioning", 532:"ReferenceBlackWhite"}, oc = {wb:{0:"Not defined", 1:"Manual", 2:"Normal program", 3:"Aperture priority", 4:"Shutter priority", 5:"Creative program", 6:"Action program", 7:"Portrait mode", 8:"Landscape mode"}, Bb:{0:"Unknown", 1:"Average", 2:"CenterWeightedAverage", 3:"Spot", 4:"MultiSpot", 5:"Pattern", 6:"Partial", 255:"Other"}, Ab:{0:"Unknown", 1:"Daylight", 2:"Fluorescent", 3:"Tungsten (incandescent light)", 
4:"Flash", 9:"Fine weather", 10:"Cloudy weather", 11:"Shade", 12:"Daylight fluorescent (D 5700 - 7100K)", 13:"Day white fluorescent (N 4600 - 5400K)", 14:"Cool white fluorescent (W 3900 - 4500K)", 15:"White fluorescent (WW 3200 - 3700K)", 17:"Standard light A", 18:"Standard light B", 19:"Standard light C", 20:"D55", 21:"D65", 22:"D75", 23:"D50", 24:"ISO studio tungsten", 255:"Other"}, yb:{0:"Flash did not fire", 1:"Flash fired", 5:"Strobe return light not detected", 7:"Strobe return light detected", 
9:"Flash fired, compulsory flash mode", 13:"Flash fired, compulsory flash mode, return light not detected", 15:"Flash fired, compulsory flash mode, return light detected", 16:"Flash did not fire, compulsory flash mode", 24:"Flash did not fire, auto mode", 25:"Flash fired, auto mode", 29:"Flash fired, auto mode, return light not detected", 31:"Flash fired, auto mode, return light detected", 32:"No flash function", 65:"Flash fired, red-eye reduction mode", 69:"Flash fired, red-eye reduction mode, return light not detected", 
71:"Flash fired, red-eye reduction mode, return light detected", 73:"Flash fired, compulsory flash mode, red-eye reduction mode", 77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", 89:"Flash fired, auto mode, red-eye reduction mode", 93:"Flash fired, auto mode, return light not detected, red-eye reduction mode", 95:"Flash fired, auto mode, return light detected, red-eye reduction mode"}, 
Fb:{1:"Not defined", 2:"One-chip color area sensor", 3:"Two-chip color area sensor", 4:"Three-chip color area sensor", 5:"Color sequential area sensor", 7:"Trilinear sensor", 8:"Color sequential linear sensor"}, Db:{0:"Standard", 1:"Landscape", 2:"Portrait", 3:"Night scene"}, Eb:{1:"Directly photographed"}, ub:{0:"Normal process", 1:"Custom process"}, Ib:{0:"Auto white balance", 1:"Manual white balance"}, zb:{0:"None", 1:"Low gain up", 2:"High gain up", 3:"Low gain down", 4:"High gain down"}, tb:{0:"Normal", 
1:"Soft", 2:"Hard"}, Cb:{0:"Normal", 1:"Low saturation", 2:"High saturation"}, Gb:{0:"Normal", 1:"Soft", 2:"Hard"}, Hb:{0:"Unknown", 1:"Macro", 2:"Close view", 3:"Distant view"}, xb:{3:"DSC"}, Components:{0:"", 1:"Y", 2:"Cb", 3:"Cr", 4:"R", 5:"G", 6:"B"}}, pc = {120:"caption", 110:"credit", 25:"keywords", 55:"dateCreated", 80:"byline", 85:"bylineTitle", 122:"captionWriter", 105:"headline", 116:"copyright", 15:"category"};
function qc(a, b, c, f, e) {
  var g = a.getUint16(c, !e), h = {}, k;
  for (k = 0; k < g; k++) {
    var l = c + 12 * k + 2;
    var m = f[a.getUint16(l, !e)];
    h[m] = rc(a, l, b, e);
  }
  return h;
}
function rc(a, b, c, f) {
  var e = a.getUint16(b + 2, !f), g = a.getUint32(b + 4, !f);
  c = a.getUint32(b + 8, !f) + c;
  switch(e) {
    case 1:
    case 7:
      if (1 == g) {
        return a.getUint8(b + 8, !f);
      }
      c = 4 < g ? c : b + 8;
      b = [];
      for (e = 0; e < g; e++) {
        b[e] = a.getUint8(c + e);
      }
      return b;
    case 2:
      return sc(a, 4 < g ? c : b + 8, g - 1);
    case 3:
      if (1 == g) {
        return a.getUint16(b + 8, !f);
      }
      c = 2 < g ? c : b + 8;
      b = [];
      for (e = 0; e < g; e++) {
        b[e] = a.getUint16(c + 2 * e, !f);
      }
      return b;
    case 4:
      if (1 == g) {
        return a.getUint32(b + 8, !f);
      }
      b = [];
      for (e = 0; e < g; e++) {
        b[e] = a.getUint32(c + 4 * e, !f);
      }
      return b;
    case 5:
      if (1 == g) {
        var h = a.getUint32(c, !f);
        var k = a.getUint32(c + 4, !f);
        a = new Number(h / k);
        a.jb = h;
        a.cb = k;
        return a;
      }
      b = [];
      for (e = 0; e < g; e++) {
        h = a.getUint32(c + 8 * e, !f), k = a.getUint32(c + 4 + 8 * e, !f), b[e] = new Number(h / k), b[e].jb = h, b[e].cb = k;
      }
      return b;
    case 9:
      if (1 == g) {
        return a.getInt32(b + 8, !f);
      }
      b = [];
      for (e = 0; e < g; e++) {
        b[e] = a.getInt32(c + 4 * e, !f);
      }
      return b;
    case 10:
      if (1 == g) {
        return a.getInt32(c, !f) / a.getInt32(c + 4, !f);
      }
      b = [];
      for (e = 0; e < g; e++) {
        b[e] = a.getInt32(c + 8 * e, !f) / a.getInt32(c + 4 + 8 * e, !f);
      }
      return b;
  }
}
function sc(a, b, c) {
  for (var f = "", e = b; e < b + c; e++) {
    f += String.fromCharCode(a.getUint8(e));
  }
  return f;
}
function tc(a, b) {
  if ("Exif" != sc(a, b, 4)) {
    return !1;
  }
  var c = b + 6;
  if (18761 == a.getUint16(c)) {
    var f = !1;
  } else {
    if (19789 == a.getUint16(c)) {
      f = !0;
    } else {
      return !1;
    }
  }
  if (42 != a.getUint16(c + 2, !f)) {
    return !1;
  }
  var e = a.getUint32(c + 4, !f);
  if (8 > e) {
    return !1;
  }
  b = qc(a, c, c + e, lc, f);
  if (b.Sa) {
    var g = qc(a, c, c + b.Sa, kc, f);
    for (h in g) {
      switch(h) {
        case "LightSource":
        case "Flash":
        case "MeteringMode":
        case "ExposureProgram":
        case "SensingMethod":
        case "SceneCaptureType":
        case "SceneType":
        case "CustomRendered":
        case "WhiteBalance":
        case "GainControl":
        case "Contrast":
        case "Saturation":
        case "Sharpness":
        case "SubjectDistanceRange":
        case "FileSource":
          g[h] = oc[h][g[h]];
          break;
        case "ExifVersion":
        case "FlashpixVersion":
          g[h] = String.fromCharCode(g[h][0], g[h][1], g[h][2], g[h][3]);
          break;
        case "ComponentsConfiguration":
          g[h] = oc.Components[g[h][0]] + oc.Components[g[h][1]] + oc.Components[g[h][2]] + oc.Components[g[h][3]];
      }
      b[h] = g[h];
    }
  }
  if (b.Ta) {
    for (h in g = qc(a, c, c + b.Ta, mc, f), g) {
      switch(h) {
        case "GPSVersionID":
          g[h] = g[h][0] + "." + g[h][1] + "." + g[h][2] + "." + g[h][3];
      }
      b[h] = g[h];
    }
  }
  var h = f;
  e = c + e;
  f = a.getUint16(e, !h);
  if (e = a.getUint32(e + 2 + 12 * f, !h)) {
    if (e > a.byteLength) {
      a = {};
    } else {
      h = qc(a, c, c + e, nc, h);
      if (h.Compression) {
        switch(h.Compression) {
          case 6:
            h.Va && h.Ua && (h.blob = new Blob([new Uint8Array(a.buffer, c + h.Va, h.Ua)], {type:"image/jpeg"}));
            break;
          case 1:
            console.log("Thumbnail image format is TIFF, which is not implemented.");
            break;
          default:
            console.log("Unknown thumbnail image format '%s'", h.Compression);
        }
      } else {
        2 == h.PhotometricInterpretation && console.log("Thumbnail image format is RGB, which is not implemented.");
      }
      a = h;
    }
  } else {
    a = {};
  }
  b.thumbnail = a;
  return b;
}
;function uc() {
  O.call(this);
  this.state = {xa:!1, va:null, error:null, ua:null, result:null};
}
u(uc, O);
uc.prototype.o = function() {
  vc(this, this.c.file);
  wc(this, this.c.file);
};
function wc(a, b) {
  var c = new FileReader;
  c.readAsArrayBuffer(b);
  c.onload = function() {
    var b = c.result;
    a: {
      var e = new DataView(b);
      if (255 != e.getUint8(0) || 216 != e.getUint8(1)) {
        e = !1;
      } else {
        for (var g = 2, h = b.byteLength, k; g < h;) {
          if (255 != e.getUint8(g)) {
            e = !1;
            break a;
          }
          k = e.getUint8(g + 1);
          if (225 == k) {
            e = tc(e, g + 4, e.getUint16(g + 2) - 2);
            break a;
          }
          g += 2 + e.getUint16(g + 2);
        }
        e = void 0;
      }
    }
    a: {
      if (g = new DataView(b), 255 != g.getUint8(0) || 216 != g.getUint8(1)) {
        b = !1;
      } else {
        h = 2;
        for (k = b.byteLength; h < k;) {
          var l = g, m = h;
          if (56 === l.getUint8(m) && 66 === l.getUint8(m + 1) && 73 === l.getUint8(m + 2) && 77 === l.getUint8(m + 3) && 4 === l.getUint8(m + 4) && 4 === l.getUint8(m + 5)) {
            l = g.getUint8(h + 7);
            0 !== l % 2 && (l += 1);
            0 === l && (l = 4);
            k = h + 8 + l;
            h = g.getUint16(h + 6 + l);
            g = k;
            b = new DataView(b);
            k = {};
            for (l = g; l < g + h;) {
              if (28 === b.getUint8(l) && 2 === b.getUint8(l + 1)) {
                var q = b.getUint8(l + 2);
                q in pc && (m = b.getInt16(l + 3), q = pc[q], m = sc(b, l + 5, m), k.hasOwnProperty(q) ? k[q] instanceof Array ? k[q].push(m) : k[q] = [k[q], m] : k[q] = m);
              }
              l++;
            }
            b = k;
            break a;
          }
          h++;
        }
        b = void 0;
      }
    }
    a.a({ib:{data:e, Pb:b}});
  };
}
function vc(a, b) {
  var c = new FileReader;
  c.readAsDataURL(b);
  c.onload = function() {
    xc(a, c.result);
  };
}
function xc(a, b) {
  var c = new Image;
  c.src = b;
  c.onload = function() {
    var b = c.width / c.height, e = document.createElement("canvas");
    e.width = c.width > c.height ? 250 * b : 250 / b;
    e.height = 250;
    e.getContext("2d").drawImage(c, 0, 0, e.width, e.height);
    b = e.toDataURL();
    a.a({ua:b});
  };
}
function yc(a) {
  var b, c;
  I(function(f) {
    a.a({error:null, va:0, xa:!1});
    b = new FormData;
    b.append("image", a.c.file);
    b.append("name", a.c.file.name);
    c = new XMLHttpRequest;
    c.open("POST", "/upload-asset", !0);
    c.b = 0;
    c.upload.addEventListener("progress", function(b) {
      a.a({va:100.0 * b.loaded / b.total || 100});
    });
    c.addEventListener("readystatechange", function() {
      4 == c.readyState && a.a({xa:!0});
      if (4 == c.readyState && 200 == c.status) {
        var b = c.responseText;
        try {
          var f = JSON.parse(b);
          var h = f.error;
          var k = f.result;
          var l = f.photoId;
        } catch (m) {
          h = "Could not parse JSON: " + m.message;
        }
        h ? a.a({error:h}) : k && (a.a({result:k, ua:null, mb:l}), a.c.Oa && a.c.Oa(k));
      } else {
        4 == c.readyState && 200 != c.status && a.a({error:"XHR Error"});
      }
    });
    c.send(b);
    f.b = 0;
  });
}
uc.prototype.h = function(a) {
  var b = this, c = a.name, f = a.ja, e = void 0 === a.ga ? "files[]" : a.ga, g = a.Ob, h = a.M;
  a = void 0 === a.nb ? "photos[]" : a.nb;
  var k = this.state, l = k.va, m = k.error, q = k.ua, n = k.xa, t = k.result, z = k.ib, G = k.mb;
  k = 100 == l && !n;
  h = G && h.some(function(a) {
    return a == G;
  });
  n = {background:n ? "linear-gradient(lightgreen, #82d285)" : null, "border-color":n ? "green" : null, "box-shadow":n ? "inset 1px -5px 15px #6f9e14" : null};
  k ? (n.background = "linear-gradient(lightblue, blue)", n["border-color"] = "blue", n["box-shadow"] = "inset 1px -5px 15px #2a33a0") : m && (n.background = "linear-gradient(coral, brown)", n["border-color"] = "red", n["box-shadow"] = "rgb(162, 31, 31) 1px -5px 15px inset");
  q = (m = g || t) ? m : q;
  var A;
  try {
    (A = z.data.vb) && (A = zc(A).toLocaleDateString());
  } catch (D) {
  }
  if (z = m && !h) {
    n.background = "linear-gradient(yellow, rgb(207, 198, 92))", n["border-color"] = "rgb(156, 158, 9)", n["box-shadow"] = "inset 1px -5px 15px #9e7414";
  }
  return K("div", {style:n, className:"Image" + (q ? "" : " PreviewLoading")}, !q && K("span", {className:"ImageInfo", style:"top:50%;left:50%;transform:translate(-50%, -50%);"}, "Загрузка превью..."), K("img", {src:q, style:"padding:.5rem;"}), K("span", {className:"ImageInfo", style:"top:.5rem;left:.5rem;"}, c, A && K("br"), A), K("span", {onClick:f, className:"ImageInfo CloseSpan"}, "✕"), !g && null === l && K(Ac, {className:"Absolute"}, K(xb, {Na:function() {
    yc(b);
  }, className:"btn btn-light btn-sm"}, "Загрузить")), !!l && 100 != l && K(Ac, {}, K("progress", {max:100, value:l})), k && K(Ac, {}, "Выполняется обработка...", K("div", {className:"spinner-border text-primary", role:"status"}, K("span", {className:"sr-only"}, "Loading..."))), this.state.error && K("p", {className:"ImageInfo PhotoError"}, "Error: ", this.state.error), this.state.error && K("a", {onClick:function(a) {
    a.preventDefault();
    yc(b);
    return !1;
  }, href:"#", className:"btn btn-danger btn-sm", style:"position:absolute;right:.5rem;bottom:.5rem;"}, "Загрузить снова"), m && K("p", {className:"ImageInfo GalleryLink"}, K("a", {href:m}, "Ссылка")), z && K("input", {name:e, type:"hidden", value:m}), z && G && K("input", {name:a, type:"hidden", value:G}));
};
function Ac(a) {
  return K("span", {className:void 0 === a.className ? "ImageInfo" : a.className, style:"bottom:.5rem;left:.5rem;"}, a.children);
}
function zc(a) {
  var b = r(a.split(/\D/));
  a = b.next().value;
  var c = b.next().value, f = b.next().value, e = b.next().value, g = b.next().value;
  b = b.next().value;
  return new Date(a, c - 1, f, e, g, b);
}
;function Bc() {
  O.call(this);
  this.state = {files:[]};
}
u(Bc, O);
function Cc(a, b) {
  var c = a.state.files.filter(function(a) {
    return a.file !== b;
  });
  a.a({files:c});
  a.c.ja && a.c.ja(b);
}
function Dc(a, b) {
  var c, f, e;
  I(function(g) {
    c = r(b);
    f = ha(c);
    e = f.map(function(a) {
      return {file:a, ob:Math.floor(10000 * Math.random())};
    });
    a.a({files:[].concat(ia(a.state.files), ia(e))});
    a.c.Ma && a.c.Ma();
    g.b = 0;
  });
}
Bc.prototype.h = function(a) {
  var b = this, c = void 0 === a.ga ? "files[]" : a.ga, f = a.lb, e = a.M;
  a = this.context;
  return K("div", {onDragEnter:function(a) {
    a.preventDefault();
    a.currentTarget.style.background = "#E91E63";
  }, className:"PhotoUploader", onDragLeave:function(a) {
    a.currentTarget.style.background = "";
  }, onDrop:function(a) {
    a.preventDefault();
    a.stopPropagation();
    a.currentTarget.style.background = "";
    Dc(b, a.dataTransfer.files);
  }, onDragOver:function(a) {
    a.preventDefault();
    a.stopPropagation();
  }}, K("input", {id:a.id, "aria-described-by":a.I, onChange:function(a) {
    a.preventDefault();
    Dc(b, a.currentTarget.files);
    a.currentTarget.value = null;
  }, accept:"image/*", type:"file", multiple:!0}), this.state.Jb ? "Идет опознование файлов..." : "Или переместите файлы сюда...", this.state.files.map(function(a) {
    var g = a.file;
    return K(uc, {key:a.ob, name:g.name, file:g, ja:function() {
      Cc(b, g);
    }, ga:c, Oa:f, M:e});
  }));
};
function Y() {
  O.call(this);
  this.state = {data:null, f:!0, files:[], M:[]};
}
u(Y, O);
Y.prototype.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
Y.prototype.fa = function() {
};
Y.prototype.load = function() {
  var a = this, b, c, f, e;
  return I(function(g) {
    if (1 == g.b) {
      return b = a.c, c = b.id, f = void 0 === b.Ra ? "galleries" : b.Ra, c || a.a({f:!1, error:"No id"}), v(g, Wb.bind(a)(f + "&id=" + c), 2);
    }
    (e = g.g) && a.a({data:e});
    g.b = 0;
  });
};
Y.prototype.h = function() {
  var a = this, b = this.c, c = this.data || {}, f = c.title, e = c.cdnImage, g = c.description, h = c._id;
  c = c.photos;
  var k = this.state, l = k.M;
  k = k.f;
  return K(R, {}, K("h1", {}, void 0 === b.Pa ? "Галерея" : b.Pa), k && K(Pb), this.data && K(wb, {className:"mb-3"}, K(R, {className:"col-sm-3"}, K("img", {src:e, className:"img-fluid"})), K(R, {}, K("h2", {}, f), g)), this.data && K(Ec, {photos:c}), K("hr"), h && K(Fc, {M:l, S:function(b) {
    var c, e;
    return I(function(f) {
      if (1 == f.b) {
        return v(f, b.json(), 2);
      }
      c = f.g;
      (e = c.data) && a.a({M:[].concat(ia(a.state.M), ia(e))});
      return v(f, a.load(), 0);
    });
  }, galleryId:h, path:"/admin-data?photos", j:"Сохранить Галерею"}));
};
p.Object.defineProperties(Y.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function Ec(a) {
  O.apply(this, arguments);
}
u(Ec, O);
Ec.prototype.h = function(a) {
  return K(wb, {}, a.photos.map(function(a) {
    return K(R, {key:a._id, className:"col-sm-4"}, K("img", {src:a.file, className:"img-fluid", style:"padding: 0.25rem; max-height: 200px;"}));
  }));
};
function Fc(a) {
  return X.N.apply(this, arguments) || this;
}
u(Fc, X.N);
Fc.prototype.h = function(a) {
  var b = this, c = a.j, f = a.M, e = this.state, g = e.B, h = e.error;
  e = e.s;
  return K(V, {V:this.submit.bind(this)}, K("input", {value:a.galleryId, name:"galleryId", type:"hidden"}), K(W, {label:"Загрузка Изображений", i:"Выберите несколько изображений и загрузите их."}, K(Bc, {$:function(a) {
    b.Tb = a;
  }, lb:function() {
    return I(function(a) {
      b.reset();
      a.b = 0;
    });
  }, Ma:function() {
    return b.reset();
  }, ja:function() {
    return b.reset();
  }, M:f})), K(Ob, {f:g, j:c, Z:"Загрузка..."}), K(Cb, {error:h}), K(Db, {s:e, message:"Галерея сохранена!"}));
};
function Gc() {
  return K(R, {}, K("h1", {}, "Добро Пожаловать!"));
}
;var Hc = K(function() {
  return K(wb, {id:"App"}, K(R, {className:"col-md-4"}, K(Eb)), K(tb, {m:function(a) {
    a.current && a.current.attributes.title && (document.title = a.current.attributes.title);
  }}, K(Gc, {path:"/admin", title:"Главная"}), K(Xb, {path:"/admin/objects", title:"Объекты Недвижимости"}), K($b, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), K(Ib, {path:"/admin/categories", title:"Категории Каталога"}), K(Tb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), K(ac, {path:"/admin/pages", title:"Статьи"}), K(cc, {path:"/admin/add-page/:id?", title:"Добавить Страницу"}), K(ec, {path:"/admin/special", title:"Специальные Предложения"}), K(ic, {path:"/admin/galleries/", 
  title:"Галереи"}), K(Y, {path:"/admin/galleries/:id", title:"Фотографии"}), K(Y, {path:"/admin/albums/:id", title:"Фото Объекта", Ra:"galleries&album", Pa:"Изображения Объекта"})));
});
Ua(document.querySelector("#App"), Hc, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map