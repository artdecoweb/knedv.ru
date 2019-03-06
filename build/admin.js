var d;
function aa(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
}, n = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function ca() {
  ca = function() {
  };
  n.Symbol || (n.Symbol = da);
}
var da = function() {
  var a = 0;
  return function(b) {
    return "jscomp_symbol_" + (b || "") + a++;
  };
}();
function ea() {
  ca();
  var a = n.Symbol.iterator;
  a || (a = n.Symbol.iterator = n.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && ba(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return fa(aa(this));
  }});
  ea = function() {
  };
}
function fa(a) {
  ea();
  a = {next:a};
  a[n.Symbol.iterator] = function() {
    return this;
  };
  return a;
}
function t(a) {
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
  return a instanceof Array ? a : ha(t(a));
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
    var ma = {Wa:!0}, na = {};
    try {
      na.__proto__ = ma;
      la = na.Wa;
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
  a.Wb = b.prototype;
}
function pa(a, b) {
  if (b) {
    var c = n;
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
    this.a = [];
    var b = this.o();
    try {
      a(b.resolve, b.reject);
    } catch (l) {
      b.reject(l);
    }
  }
  function c() {
    this.a = null;
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
    if (null == this.a) {
      this.a = [];
      var b = this;
      this.o(function() {
        b.F();
      });
    }
    this.a.push(a);
  };
  var e = n.setTimeout;
  c.prototype.o = function(a) {
    e(a, 0);
  };
  c.prototype.F = function() {
    for (; this.a && this.a.length;) {
      var a = this.a;
      this.a = [];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        a[b] = null;
        try {
          c();
        } catch (m) {
          this.A(m);
        }
      }
    }
    this.a = null;
  };
  c.prototype.A = function(a) {
    this.o(function() {
      throw a;
    });
  };
  b.prototype.o = function() {
    function a(a) {
      return function(e) {
        c || (c = !0, a.call(b, e));
      };
    }
    var b = this, c = !1;
    return {resolve:a(this.ib), reject:a(this.A)};
  };
  b.prototype.ib = function(a) {
    if (a === this) {
      this.A(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (a instanceof b) {
        this.qb(a);
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
        c ? this.fa(a) : this.R(a);
      }
    }
  };
  b.prototype.fa = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (l) {
      this.A(l);
      return;
    }
    "function" == typeof b ? this.sb(b, a) : this.R(a);
  };
  b.prototype.A = function(a) {
    this.S(2, a);
  };
  b.prototype.R = function(a) {
    this.S(1, a);
  };
  b.prototype.S = function(a, b) {
    if (0 != this.g) {
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.g);
    }
    this.g = a;
    this.F = b;
    this.Z();
  };
  b.prototype.Z = function() {
    if (null != this.a) {
      for (var a = 0; a < this.a.length; ++a) {
        g.g(this.a[a]);
      }
      this.a = null;
    }
  };
  var g = new c;
  b.prototype.qb = function(a) {
    var b = this.o();
    a.ea(b.resolve, b.reject);
  };
  b.prototype.sb = function(a, b) {
    var c = this.o();
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
        } catch (C) {
          g(C);
        }
      } : b;
    }
    var f, g, h = new b(function(a, b) {
      f = a;
      g = b;
    });
    this.ea(e(a, f), e(c, g));
    return h;
  };
  b.prototype.catch = function(a) {
    return this.then(void 0, a);
  };
  b.prototype.ea = function(a, b) {
    function c() {
      switch(e.g) {
        case 1:
          a(e.F);
          break;
        case 2:
          b(e.F);
          break;
        default:
          throw Error("Unexpected state: " + e.g);
      }
    }
    var e = this;
    null == this.a ? g.g(c) : this.a.push(c);
  };
  b.resolve = f;
  b.reject = function(a) {
    return new b(function(b, c) {
      c(a);
    });
  };
  b.race = function(a) {
    return new b(function(b, c) {
      for (var e = t(a), g = e.next(); !g.done; g = e.next()) {
        f(g.value).ea(b, c);
      }
    });
  };
  b.all = function(a) {
    var c = t(a), e = c.next();
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
  this.S = !1;
  this.A = null;
  this.g = void 0;
  this.a = 1;
  this.F = this.R = 0;
  this.fa = this.o = null;
}
function ra(a) {
  if (a.S) {
    throw new TypeError("Generator is already running");
  }
  a.S = !0;
}
qa.prototype.Z = function(a) {
  this.g = a;
};
function sa(a, b) {
  a.o = {Ha:b, Ka:!0};
  a.a = a.R || a.F;
}
qa.prototype.return = function(a) {
  this.o = {return:a};
  this.a = this.F;
};
function v(a, b, c) {
  a.a = c;
  return {value:b};
}
qa.prototype.G = function(a) {
  this.a = a;
};
function x(a) {
  a.R = 2;
  a.F = 3;
}
function z(a) {
  a.R = 0;
  var b = a.o.Ha;
  a.o = null;
  return b;
}
function A(a) {
  a.fa = [a.o];
  a.R = 0;
  a.F = 0;
}
function D(a, b) {
  var c = a.fa.splice(0)[0];
  (c = a.o = a.o || c) ? c.Ka ? a.a = a.R || a.F : void 0 != c.G && a.F < c.G ? (a.a = c.G, a.o = null) : a.a = a.F : a.a = b;
}
function ta(a) {
  this.a = new qa;
  this.g = a;
}
function ua(a, b) {
  ra(a.a);
  var c = a.a.A;
  if (c) {
    return va(a, "return" in c ? c["return"] : function(a) {
      return {value:a, done:!0};
    }, b, a.a.return);
  }
  a.a.return(b);
  return wa(a);
}
function va(a, b, c, f) {
  try {
    var e = b.call(a.a.A, c);
    if (!(e instanceof Object)) {
      throw new TypeError("Iterator result " + e + " is not an object");
    }
    if (!e.done) {
      return a.a.S = !1, e;
    }
    var g = e.value;
  } catch (h) {
    return a.a.A = null, sa(a.a, h), wa(a);
  }
  a.a.A = null;
  f.call(a.a, g);
  return wa(a);
}
function wa(a) {
  for (; a.a.a;) {
    try {
      var b = a.g(a.a);
      if (b) {
        return a.a.S = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.a.g = void 0, sa(a.a, c);
    }
  }
  a.a.S = !1;
  if (a.a.o) {
    b = a.a.o;
    a.a.o = null;
    if (b.Ka) {
      throw b.Ha;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function xa(a) {
  this.next = function(b) {
    ra(a.a);
    a.a.A ? b = va(a, a.a.A.next, b, a.a.Z) : (a.a.Z(b), b = wa(a));
    return b;
  };
  this.throw = function(b) {
    ra(a.a);
    a.a.A ? b = va(a, a.a.A["throw"], b, a.a.Z) : (sa(a.a, b), b = wa(a));
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
  void 0 !== J.tb && J.tb(g);
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
  !a.ba && (a.ba = !0) && 1 == Ia.push(a) && (J.Nb || Fa)(Ka);
}
function Ka() {
  for (var a; a = Ia.pop();) {
    a.ba && La(a);
  }
}
function Ma(a) {
  var b = L({}, a.attributes);
  b.children = a.children;
  a = a.nodeName.Ob;
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
              e = b !== (b = b.replace(/Capture$/, "")), b = b.toLowerCase().substring(2), f ? c || a.addEventListener(b, Pa, e) : a.removeEventListener(b, Pa, e), (a.ya || (a.ya = {}))[b] = f;
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
  return this.ya[a.type](J.event && J.event(a) || a);
}
var Qa = [], Ra = 0, M = !1, Sa = !1;
function Ta() {
  for (var a; a = Qa.shift();) {
    J.Xa && J.Xa(a), a.u && a.u();
  }
}
function Ua(a, b, c, f, e, g) {
  Ra++ || (M = null != e && void 0 !== e.Rb, Sa = null != a && !("__preactattr_" in a));
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
    return a && void 0 !== a.splitText && a.parentNode && (!a.C || e) ? a.nodeValue != b && (a.nodeValue = b) : (g = document.createTextNode(b), a && (a.parentNode && a.parentNode.replaceChild(g, a), N(a, !0))), g.__preactattr_ = !0, g;
  }
  e = b.nodeName;
  if ("function" === typeof e) {
    h = a;
    var k = b;
    g = b = h && h.C;
    var l = h, m = b && h.ma === k.nodeName, p = m;
    for (a = Ma(k); b && !p && (b = b.za);) {
      p = b.constructor === k.nodeName;
    }
    b && p && (!f || b.C) ? (Xa(b, a, 3, c, f), h = b.N) : (g && !m && (Ya(g), h = l = null), b = Za(k.nodeName, a, c), h && !b.T && (b.T = h, l = null), Xa(b, a, 1, c, f), h = b.N, l && h !== l && (l.C = null, N(l, !1)));
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
  var q = g.firstChild;
  a = g.__preactattr_;
  e = b.children;
  if (null == a) {
    a = g.__preactattr_ = {};
    for (var r = g.attributes, B = r.length; B--;) {
      a[r[B].name] = r[B].value;
    }
  }
  if (!Sa && e && 1 === e.length && "string" === typeof e[0] && null != q && void 0 !== q.splitText && null == q.nextSibling) {
    q.nodeValue != e[0] && (q.nodeValue = e[0]);
  } else {
    if (e && e.length || null != q) {
      q = g;
      r = Sa || null != a.Mb;
      B = q.childNodes;
      var w = [], C = {}, E = 0, F = 0, y = B.length, X = 0, Va = e ? e.length : 0;
      if (0 !== y) {
        for (p = 0; p < y; p++) {
          var G = B[p], O = G.__preactattr_;
          var H = Va && O ? G.C ? G.C.wa : O.key : null;
          if (null != H) {
            E++, C[H] = G;
          } else {
            if (O || (void 0 !== G.splitText ? r ? G.nodeValue.trim() : 1 : r)) {
              w[X++] = G;
            }
          }
        }
      }
      if (0 !== Va) {
        for (p = 0; p < Va; p++) {
          y = e[p];
          m = null;
          H = y.key;
          if (null != H) {
            E && void 0 !== C[H] && (m = C[H], C[H] = void 0, E--);
          } else {
            if (F < X) {
              for (H = F; H < X; H++) {
                if (G = void 0 !== w[H]) {
                  if (G = l = w[H], "string" === typeof y || "number" === typeof y) {
                    G = void 0 !== G.splitText;
                  } else {
                    if ("string" === typeof y.nodeName) {
                      if (O = !G.ma) {
                        O = y.nodeName, O = G.La === O || G.nodeName.toLowerCase() === O.toLowerCase();
                      }
                      G = O;
                    } else {
                      G = r || G.ma === y.nodeName;
                    }
                  }
                }
                if (G) {
                  m = l;
                  w[H] = void 0;
                  H === X - 1 && X--;
                  H === F && F++;
                  break;
                }
              }
            }
          }
          m = Wa(m, y, c, f);
          y = B[p];
          m && m !== q && m !== y && (null == y ? q.appendChild(m) : m === y.nextSibling ? Na(y) : q.insertBefore(m, y));
        }
      }
      if (E) {
        for (p in C) {
          void 0 !== C[p] && N(C[p], !1);
        }
      }
      for (; F <= X;) {
        void 0 !== (m = w[X--]) && N(m, !1);
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
  var c = a.C;
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
    P.call(e, b, c);
  } else {
    e = new P(b, c), e.constructor = a, e.h = bb;
  }
  for (; f--;) {
    if (ab[f].constructor === a) {
      e.T = ab[f].T;
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
  a.ca || (a.ca = !0, a.xa = b.$, a.wa = b.key, delete b.$, delete b.key, "undefined" === typeof a.constructor.Ja && (!a.N || e ? a.Fa && a.Fa() : a.$a && a.$a(b, f)), f && f !== a.context && (a.qa || (a.qa = a.context), a.context = f), a.ra || (a.ra = a.c), a.c = b, a.ca = !1, 0 !== c && (1 !== c && !1 === J.Xb && a.N ? Ja(a) : La(a, 1, e)), Ea(a.xa, a));
}
function La(a, b, c, f) {
  if (!a.ca) {
    var e = a.c, g = a.state, h = a.context, k = a.ra || e, l = a.sa || g, m = a.qa || h, p = a.N, q = a.T, r = p || q, B = a.C, w = !1, C = m, E;
    a.constructor.Ja && (g = L(L({}, g), a.constructor.Ja(e, g)), a.state = g);
    p && (a.c = k, a.state = l, a.context = m, 2 !== b && a.X && !1 === a.X(e, g, h) ? w = !0 : a.Ga && a.Ga(e, g, h), a.c = e, a.state = g, a.context = h);
    a.ra = a.sa = a.qa = a.T = null;
    a.ba = !1;
    if (!w) {
      e = a.h(e, g, h);
      a.oa && (h = L(L({}, h), a.oa()));
      p && a.fb && (C = a.fb(k, l));
      g = e && e.nodeName;
      if ("function" === typeof g) {
        var F = Ma(e);
        if ((E = B) && E.constructor === g && F.key == E.wa) {
          Xa(E, F, 1, h, !1);
        } else {
          var y = E;
          a.C = E = Za(g, F, h);
          E.T = E.T || q;
          E.za = a;
          Xa(E, F, 0, h, !1);
          La(E, 1, c, !0);
        }
        F = E.N;
      } else {
        q = r;
        if (y = B) {
          q = a.C = null;
        }
        if (r || 1 === b) {
          q && (q.C = null), F = Ua(q, e, h, c || !p, r && r.parentNode, !0);
        }
      }
      r && F !== r && E !== B && (h = r.parentNode) && F !== h && (h.replaceChild(F, r), y || (r.C = null, N(r, !1)));
      y && Ya(y);
      if ((a.N = F) && !f) {
        for (y = r = a; y = y.za;) {
          (r = y).N = F;
        }
        F.C = r;
        F.ma = r.constructor;
      }
    }
    !p || c ? Qa.push(a) : w || (a.Ea && a.Ea(k, l, C), J.Ya && J.Ya(a));
    for (; a.da.length;) {
      a.da.pop().call(a);
    }
    Ra || f || Ta();
  }
}
function Ya(a) {
  J.Za && J.Za(a);
  var b = a.N;
  a.ca = !0;
  a.na && a.na();
  a.N = null;
  var c = a.C;
  c ? Ya(c) : b && (null != b.__preactattr_ && Ea(b.__preactattr_.$, null), a.T = b, Na(b), ab.push(a), $a(b));
  Ea(a.xa, null);
}
function P(a, b) {
  this.ba = !0;
  this.context = b;
  this.c = a;
  this.state = this.state || {};
  this.da = [];
}
L(P.prototype, {b:function(a, b) {
  this.sa || (this.sa = this.state);
  this.state = L(L({}, this.state), "function" === typeof a ? a(this.state, this.c) : a);
  b && this.da.push(b);
  Ja(this);
}, bb:function(a) {
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
;var Q = null, R = [], hb = [];
function ib() {
  var a;
  Q && Q.location ? a = Q.location : Q && Q.eb ? a = Q.eb() : a = "undefined" !== typeof location ? location : {};
  return "" + (a.pathname || "") + (a.search || "");
}
function jb(a) {
  for (var b = !1, c = 0; c < R.length; c++) {
    !0 === kb(R[c], a) && (b = !0);
  }
  for (c = hb.length; c--;) {
    hb[c](a);
  }
  return b;
}
function lb(a) {
  if (a && a.getAttribute) {
    var b = a.getAttribute("href");
    a = a.getAttribute("target");
    if (b && b.match(/^\//g) && (!a || a.match(/^_?self$/i))) {
      var c = void 0 === c ? !1 : c;
      "string" !== typeof b && b.url && (c = b.replace, b = b.url);
      a: {
        a = b;
        for (var f = R.length; f--;) {
          if (0 < mb(R[f].c.children, a, !1).length) {
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
      return jb(b);
    }
  }
}
function nb(a) {
  if (0 == a.button) {
    return lb(a.currentTarget || a.target || this), ob(a);
  }
}
function ob(a) {
  a && (a.stopImmediatePropagation && a.stopImmediatePropagation(), a.stopPropagation && a.stopPropagation(), a.preventDefault());
  return !1;
}
function pb(a) {
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
        if (lb(b)) {
          return ob(a);
        }
      }
    } while (b = b.parentNode);
  }
}
var qb = !1;
function rb() {
  qb || ("function" === typeof addEventListener && (Q || addEventListener("popstate", function() {
    jb(ib());
  }), addEventListener("click", pb)), qb = !0);
}
function sb(a) {
  P.call(this, a);
  a.history && (Q = a.history);
  this.state = {url:a.url || ib()};
  rb();
}
u(sb, P);
d = sb.prototype;
d.X = function(a) {
  return !0 !== a.Vb ? !0 : a.url !== this.c.url || a.l !== this.c.l;
};
function kb(a, b) {
  a.a = !1;
  a.b({url:b});
  if (a.updating) {
    return 0 < mb(a.c.children, b, !1).length;
  }
  a.bb();
  return a.a;
}
d.Fa = function() {
  R.push(this);
  this.updating = !0;
};
d.u = function() {
  var a = this;
  Q && (this.g = Q.Qb(function(b) {
    kb(a, "" + (b.pathname || "") + (b.search || ""));
  }));
  this.updating = !1;
};
d.na = function() {
  "function" === typeof this.g && this.g();
  R.splice(R.indexOf(this), 1);
};
d.Ga = function() {
  this.updating = !0;
};
d.Ea = function() {
  this.updating = !1;
};
function mb(a, b, c) {
  return a.filter(eb).sort(db).map(function(a) {
    var e = b;
    var f = a.attributes.path, h = a.attributes, k = /(?:\?([^#]*))?(#.*)?$/, l = e.match(k), m = {};
    if (l && l[1]) {
      l = l[1].split("&");
      for (var p = 0; p < l.length; p++) {
        var q = l[p].split("=");
        m[decodeURIComponent(q[0])] = decodeURIComponent(q.slice(1).join("="));
      }
    }
    e = fb(e.replace(k, ""));
    f = fb(f || "");
    k = Math.max(e.length, f.length);
    for (l = 0; l < k; l++) {
      if (f[l] && ":" === f[l].charAt(0)) {
        p = f[l].replace(/(^:|[+*?]+$)/g, "");
        q = (f[l].match(/[+*?]+$/) || cb)[0] || "";
        var r = ~q.indexOf("+"), B = ~q.indexOf("*"), w = e[l] || "";
        if (!w && !B && (0 > q.indexOf("?") || r)) {
          var C = !1;
          break;
        }
        m[p] = decodeURIComponent(w);
        if (r || B) {
          m[p] = e.slice(l).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (f[l] !== e[l]) {
          C = !1;
          break;
        }
      }
    }
    if (e = !0 !== h.default && !1 === C ? !1 : m) {
      return !1 !== c ? (e = Object.assign({}, {url:b, matches:e}, e), delete e.$, delete e.key, Ga(a, e)) : a;
    }
  }).filter(Boolean);
}
d.h = function(a, b) {
  var c = a.l;
  b = b.url;
  a = mb(a.children, b, !0);
  var f = a[0] || null;
  this.a = !!f;
  var e = this.o;
  b !== e && (this.o = b, "function" === typeof c && c({Ub:this, url:b, Tb:e, active:a, current:f}));
  return f;
};
function tb(a) {
  return K("a", Object.assign({}, a, {onClick:nb}));
}
function ub() {
  P.call(this);
  this.a = this.a.bind(this);
}
u(ub, P);
ub.prototype.a = function(a) {
  this.g = a;
  this.b({});
};
ub.prototype.u = function() {
  hb.push(this.a);
};
ub.prototype.na = function() {
  hb.splice(hb.indexOf(this.a) >>> 0, 1);
};
ub.prototype.h = function(a) {
  var b = this.g || ib(), c = b.replace(/\?.+$/, "");
  this.g = null;
  var f = a.children.filter(function(a) {
    return "function" == typeof a;
  });
  return f[0] && f[0]({url:b, path:c, matches:c === a.path});
};
function S(a) {
  var b = Object.assign({}, a), c = void 0 === a.Aa ? "active" : a.Aa;
  a = a.path;
  var f = (delete b.Aa, delete b.path, b);
  return K(ub, {path:a || f.href}, function(a) {
    return K(tb, Object.assign({}, f, {className:[f.Lb || f.className, a.matches && c].filter(Boolean).join(" ")}));
  });
}
;function T(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return K("div", Object.assign({}, b, {className:"row" + (a ? " " + a : "")}), c);
}
function vb(a) {
  return K("div", {className:"spinner-grow text-" + (void 0 === a.color ? "danger" : a.color), role:"status"}, K("span", {className:"sr-only"}, "Loading..."));
}
function U(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return K("div", Object.assign({}, b, {className:"col" + (a ? " " + a : "")}), c);
}
function wb(a) {
  var b = Object.assign({}, a), c = a.ga, f = a.className;
  a = a.children;
  b = (delete b.ga, delete b.className, delete b.children, b);
  return K("a", Object.assign({}, b, {className:f, href:"#", onClick:function(a) {
    a.preventDefault();
    c(a);
    return !1;
  }}), a);
}
function xb(a) {
  var b = a.ua, c = a.type, f = a.value;
  a = {required:a.required, name:a.name, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), id:a.id, "aria-describedby":a.J};
  return b ? K("textarea", Object.assign({}, a, {rows:"number" == typeof b ? b : 3}), f) : K("input", Object.assign({}, a, f ? {value:f} : {}, {type:c}));
}
function yb(a) {
  var b = a.label, c = void 0 === a.type ? "text" : a.type, f = a.placeholder, e = a.j, g = a.ua, h = a.file, k = a.options, l = a.rb, m = "i" + 100000 * Math.random(), p = "h" + m;
  a = {J:p, id:m, value:a.value, name:a.name, required:a.required};
  c = k ? K(zb, Object.assign({}, a, {options:k, rb:l})) : K(xb, Object.assign({}, a, {ua:g, placeholder:f, type:c, file:h}));
  return K("div", {className:"form-group"}, K("label", {htmlFor:m}, b), c, e && K("small", {id:p, dangerouslySetInnerHTML:{la:e}, className:"form-text text-muted"}));
}
function zb(a) {
  var b = a.options, c = a.value;
  return K("select", {name:a.name, value:c, required:a.required, className:"custom-select", id:a.id, "aria-describedby":a.J}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == c}, a.title);
  }));
}
function V(a) {
  return K("span", {}, K("i", {className:a.icon}), " ");
}
function Ab(a) {
  P.apply(this, arguments);
}
u(Ab, P);
Ab.prototype.X = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Ab.prototype.u = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  void 0 !== b && c(a, b);
};
Ab.prototype.h = function(a) {
  var b = a.name, c = a.label, f = a.value, e = this.context, g = e.id, h = e.l, k = void 0 === e.values ? {} : e.values;
  return K("div", {className:"custom-control custom-switch"}, K("input", {required:void 0 !== a.required, name:b, checked:b in k ? k[b] : f, id:g, type:"checkbox", className:"custom-control-input", "aria-described-by":e.J, onChange:function(a) {
    h(b, a.currentTarget.checked);
  }}), K("label", {htmlFor:g, className:"custom-control-label"}, c));
};
function Bb(a) {
  a = a.error;
  if (!a) {
    return null;
  }
  "string" != typeof a && (a = "Ошибка");
  return K("div", {className:"alert alert-danger mt-3", role:"alert"}, a);
}
function Cb(a) {
  var b = a.w;
  return b ? K("div", {className:"alert alert-success mt-3", role:"alert"}, a.message || b) : null;
}
;function Db() {
  return K("nav", {className:"nav flex-column"}, K(S, {className:"nav-link", href:"/admin"}, K("i", {className:"fab fa-kickstarter-k"}), " Главная"), K(S, {className:"nav-link", href:"/admin/objects"}, K("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), K(S, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, K("i", {className:"fas fa-home"}), " Новая Недвижимость"), K(S, {className:"nav-link", href:"/admin/categories"}, K("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), K(S, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, K("i", {className:"fas fa-folder-plus"}), " Добавить"), K(S, {className:"nav-link", href:"/admin/pages"}, K("i", {className:"fas fa-font"}), " Статьи"), K(S, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, K("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), K(S, {className:"nav-link", href:"/admin/special"}, K("i", {className:"fas fa-bolt"}), " Спец. Предложения"), 
  K(S, {className:"nav-link", href:"/admin/offers"}, K("i", {className:"fas fa-grip-lines"}), " Акции"), K(S, {className:"nav-link", href:"/admin/galleries/"}, K("i", {className:"fas fa-camera-retro"}), " Галереи"));
}
;function Eb() {
  P.call(this);
  this.state = {f:!1};
}
u(Eb, P);
function Fb(a) {
  var b, c, f, e;
  return I(function(g) {
    switch(g.a) {
      case 1:
        return a.b({f:!0}), x(g), v(g, fetch("/admin-data?" + a.c.path, {method:"POST"}), 5);
      case 5:
        return b = g.g, v(g, b.json(), 6);
      case 6:
        c = g.g, (f = c.error) ? a.b({error:f}) : (a.c.v(), a.c.ha());
      case 3:
        A(g);
        a.b({f:!1});
        D(g, 0);
        break;
      case 2:
        e = z(g), a.b({error:e}), g.G(3);
    }
  });
}
Eb.prototype.h = function(a) {
  var b = this, c = a.text, f = a.v, e = void 0 === a.Y ? "primary" : a.Y, g = a.i, h = void 0 === a.H ? "Отмена" : a.H;
  return K("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:f, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, K("p", {}, c)), K("div", {className:"modal-footer"}, 
  K("button", {onClick:f, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, h), K("button", {disabled:this.state.f, type:"button", className:"btn btn-" + e, onClick:function() {
    return Fb(b);
  }}, this.state.f ? "Отправка..." : g)))));
};
function Gb(a) {
  P.apply(this, arguments);
}
u(Gb, P);
Gb.prototype.h = function(a) {
  var b = a.children, c = a.v;
  return K("div", {className:"EditModal modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:c, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, b))));
};
function Hb(a, b) {
  return b = b || {}, new Promise(function(c, f) {
    function e() {
      return {ok:2 == (g.status / 100 | 0), statusText:g.statusText, status:g.status, url:g.responseURL, text:function() {
        return Promise.resolve(g.responseText);
      }, json:function() {
        return Promise.resolve(JSON.parse(g.responseText));
      }, blob:function() {
        return Promise.resolve(new Blob([g.response]));
      }, clone:e, headers:{keys:function() {
        return h;
      }, entries:function() {
        return k;
      }, get:function(a) {
        return l[a.toLowerCase()];
      }, has:function(a) {
        return a.toLowerCase() in l;
      }}};
    }
    var g = new XMLHttpRequest, h = [], k = [], l = {}, m;
    for (m in g.open(b.method || "get", a, !0), g.onload = function() {
      g.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(a, b, c) {
        h.push(b = b.toLowerCase());
        k.push([b, c]);
        l[b] = l[b] ? l[b] + "," + c : c;
      });
      c(e());
    }, g.onerror = f, g.withCredentials = "include" == b.credentials, b.headers) {
      g.setRequestHeader(m, b.headers[m]);
    }
    g.send(b.body || null);
  });
}
;function Ib(a) {
  var b = this, c, f, e, g, h;
  return I(function(k) {
    switch(k.a) {
      case 1:
        return b.b({f:!0}), x(k), v(k, Hb("/admin-data?" + a), 5);
      case 5:
        return c = k.g, v(k, c.json(), 6);
      case 6:
        return f = k.g, e = f.error, g = f.data, e ? (b.b({error:e}), k.return()) : k.return(g);
      case 3:
        A(k);
        b.b({f:!1});
        D(k, 0);
        break;
      case 2:
        h = z(k), b.b({error:h}), k.G(3);
    }
  });
}
;function Jb(a, b) {
  var c = this.c, f = c.name, e = a.value;
  if (this.context.values[f] != b.values[f]) {
    return !0;
  }
  if (c.value != e) {
    return b.l && b.l(a.name, e), !1;
  }
}
;function Kb() {
  P.call(this);
  this.c = this.c;
}
u(Kb, P);
Kb.prototype.X = function(a, b, c) {
  return Jb.call(this, a, c);
};
Kb.prototype.u = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  c && void 0 !== b && c(a, b);
};
Kb.prototype.h = function(a) {
  var b = a.options, c = a.name, f = a.value, e = this.context, g = e.l, h = void 0 === e.values ? {} : e.values;
  return K("select", {name:c, value:c in h ? h[c] : f, required:a.required, className:"custom-select", id:e.id, "aria-describedby":e.J, onChange:function(a) {
    g(c, a.currentTarget.value);
  }}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == f}, a.title);
  }));
};
function Lb() {
  P.call(this);
  this.c = this.c;
}
u(Lb, P);
Lb.prototype.X = function(a, b, c) {
  return Jb.call(this, a, c);
};
Lb.prototype.u = function() {
  var a = this.c, b = t(a.children).next().value;
  a = a.name;
  var c = this.context.l;
  b && c(a, b.trim());
};
Lb.prototype.h = function(a) {
  var b = a.name, c = a.children, f = this.context, e = f.l, g = void 0 === f.values ? {} : f.values;
  return K("textarea", {required:a.required, name:b, placeholder:a.placeholder, "aria-describedby":f.J, className:"form-control", id:f.id, onChange:function(a) {
    e(b, a.currentTarget.value);
  }, rows:void 0 === a.rows ? 3 : a.rows}, b in g ? g[b] : c);
};
function Mb() {
  P.call(this);
  this.c = this.c;
}
u(Mb, P);
Mb.prototype.X = function(a, b, c) {
  return Jb.call(this, a, c);
};
Mb.prototype.u = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.l;
  void 0 !== b && c && c(a, b);
};
Mb.prototype.h = function(a) {
  var b = Object.assign({}, a), c = a.required, f = a.name, e = a.placeholder, g = void 0 === a.type ? "text" : a.type, h = a.file;
  a = a.value;
  b = (delete b.required, delete b.name, delete b.placeholder, delete b.type, delete b.file, delete b.value, b);
  var k = this.context, l = k.l, m = void 0 === k.values ? {} : k.values;
  return K("input", Object.assign({}, b, {required:c, name:f, placeholder:e, className:"form-control" + (h ? "-file" : ""), value:f in m ? m[f] : a, type:g, "aria-describedby":k.J, id:k.id, onChange:function(a) {
    l(f, a.currentTarget.value);
  }}));
};
function Nb() {
  P.call(this);
  this.c = this.c;
  this.state = {I:!1, error:null, w:null};
}
u(Nb, P);
Nb.prototype.submit = function(a) {
  var b = this, c, f, e, g, h;
  return I(function(k) {
    switch(k.a) {
      case 1:
        a.preventDefault();
        if (!b.c.path) {
          return b.b({error:"Path is not set in the properties of the form."}), k.return(!1);
        }
        b.b({error:null, w:null});
        c = new FormData(a.target);
        b.b({I:!0});
        x(k);
        return v(k, Hb(b.c.path, {method:"POST", body:c}), 5);
      case 5:
        return f = k.g, v(k, f.json(), 6);
      case 6:
        e = k.g, (g = e.error) ? b.b({error:g}) : b.b({w:1});
      case 3:
        A(k);
        b.b({I:!1});
        D(k, 4);
        break;
      case 2:
        h = z(k);
        b.b({error:h});
        k.G(3);
        break;
      case 4:
        if (!b.c.O) {
          k.G(7);
          break;
        }
        return v(k, b.c.O(f), 7);
      case 7:
        return k.return(!1);
    }
  });
};
Nb.prototype.reset = function() {
  this.b({error:null, w:null});
};
function W() {
  P.call(this);
  this.state = {values:{}};
  this.c = this.c;
}
u(W, P);
W.prototype.oa = function() {
  return {values:this.state.values, l:this.l.bind(this)};
};
W.prototype.l = function(a, b) {
  var c = {};
  this.b({values:Object.assign({}, this.state.values, (c[a] = b, c))});
  this.c.l && this.c.l(this.state.values);
};
W.prototype.h = function(a) {
  var b = Object.assign({}, a), c = a.children, f = a.cb;
  a = a.W;
  b = (delete b.children, delete b.cb, delete b.W, delete b.l, b);
  return K("form", Object.assign({}, b, {ref:f, onSubmit:a}), c);
};
function Y() {
  P.call(this);
  this.id = "i" + Math.floor(100000 * Math.random());
  this.J = "h" + this.id;
  this.c = this.c;
}
u(Y, P);
Y.prototype.oa = function() {
  return {id:this.id, J:this.J};
};
Y.prototype.h = function() {
  var a = this.c, b = a.children, c = a.label;
  a = a.j;
  return K("div", {className:"form-group"}, c && K("label", {htmlFor:this.id}, c), b, a && K("small", {id:this.J, dangerouslySetInnerHTML:{la:a}, className:"form-text text-muted"}));
};
function Ob(a) {
  var b = a.f, c = a.i, f = void 0 === a.V ? c : a.V;
  a = ["btn", "btn-" + ((void 0 === a.outline ? 0 : a.outline) ? "outline-" : "") + (void 0 === a.type ? "primary" : a.type), a.className].filter(Boolean);
  return K("button", {className:a.join(" "), type:"submit", disabled:b}, b && K("span", {className:"spinner-border spinner-border-sm" + (f ? " mr-2" : ""), role:"status", "aria-hidden":"true"}), b ? f : c);
}
var Z = {get Va() {
  return Kb;
}, get aa() {
  return Lb;
}, get L() {
  return Mb;
}, get M() {
  return Nb;
}};
function Pb() {
  P.call(this);
  this.state = {Pa:!1};
  this.c = this.c;
}
u(Pb, P);
Pb.prototype.h = function(a) {
  var b = this, c = a.D, f = a.required, e = a.image;
  a = a.j;
  var g = this.state.Pa;
  if (c && !g) {
    return K(Y, {j:a, label:"Изображение"}, K("br"), K("img", {src:e, className:"img-fluid"}), K("a", {onClick:function(a) {
      a.preventDefault();
      b.b({Pa:!0});
      return !1;
    }, href:"#", className:"btn btn-outline-warning"}, "Изменить"));
  }
  if (!c || g) {
    return K(Y, {j:a, label:"Изображение"}, K(Z.L, {required:f, name:"image", type:"file", file:"1"}));
  }
};
function Qb() {
  return K("span", {className:"echo-loader"}, "Loading…");
}
function Rb() {
  var a = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (a.outerHeight / 2 + a.screenY - 325 - 50) + ",left=" + (a.outerWidth / 2 + a.screenX - 450));
}
;function Sb(a) {
  var b = a.article, c = a.pa;
  a = a.name;
  return K("div", {className:"form-group"}, K("label", {}, "Статья"), K("div", {dangerouslySetInnerHTML:{la:b}, className:"mb-3 ArticleHolder"}), K("a", {onClick:function(a) {
    a.preventDefault();
    window.editorCallback = function(a) {
      e.close();
      c(a);
    };
    window.editorGetData = function() {
      return b;
    };
    var e = Rb();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"), K("input", {name:a, type:"hidden", value:b}));
}
;function Tb() {
  var a = Z.M.call(this) || this;
  Object.assign(a.state, {f:!1, data:{}, hint:"москва-новостройки", article:""});
  return a;
}
u(Tb, Z.M);
Tb.prototype.u = function() {
  var a = this, b, c, f, e;
  return I(function(g) {
    if (1 == g.a) {
      b = !!a.c.id;
      if (!b) {
        return g.return();
      }
      a.b({D:!0});
      return v(g, Ib.bind(a)("categories&id=" + a.c.id), 2);
    }
    if (c = g.g) {
      f = t(c), (e = f.next().value) && a.b({data:e, hint:e.seo, article:e.article});
    }
    g.a = 0;
  });
};
Tb.prototype.h = function(a) {
  var b = this, c = a.i, f = a.K, e = a.title, g = a.id, h = a.v, k = void 0 === a.H ? "Отмена" : a.H, l = this.state, m = l.I, p = l.error, q = l.w;
  a = l.f;
  var r = l.D, B = l.article;
  l = l.data;
  c = K(W, {W:this.submit.bind(this), l:function() {
    b.reset();
  }}, K(Y, {label:"Название", j:"Название для меню слева."}, K(Z.L, {value:l.title, name:"title", placeholder:"Москва Новостройки", required:!0})), K(Y, {j:this.hint, label:"СЕО Название"}, K(Z.L, {value:l.seo, required:!0, name:"seo", placeholder:"москва-новостройки"})), K(Y, {label:"Описание", j:"Краткое описание для главной страницы."}, K(Z.aa, {rows:"3", required:!0, name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  l.description)), K(Pb, {D:r, j:"Картинка, отображаемая на главной странице.", required:!0, image:l.cdnImage}), K(Sb, {article:B, name:"article", pa:function(a) {
    b.b({article:a});
    b.reset();
  }}), r && K("input", {value:g, type:"hidden", name:"id"}), K(Bb, {error:p}), K(Cb, {w:q, message:f}), K(Ob, {i:c, f:m, V:"Загрузка..."}), h && K("button", {onClick:h, type:"button", className:"FormCancelBtn btn btn-secondary"}, k));
  return K(U, {}, e && K("h1", {}, e), a && K(Qb), !a && c);
};
n.Object.defineProperties(Tb.prototype, {hint:{configurable:!0, enumerable:!0, get:function() {
  return "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.";
}}});
function Ub() {
  P.call(this);
  this.state = {f:!0, data:[]};
}
u(Ub, P);
d = Ub.prototype;
d.u = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return I(function(c) {
    if (1 == c.a) {
      return v(c, Ib.bind(a)("categories"), 2);
    }
    (b = c.g) && a.b({data:b});
    c.a = 0;
  });
};
d.s = function(a) {
  this.b({B:a});
};
d.m = function(a) {
  this.b({U:a});
};
d.h = function() {
  var a = this.state, b = a.f, c = a.data, f = a.B;
  a = a.U;
  return K(U, {}, K("h1", {}, "Категории Каталога"), K("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), K(Vb, {data:c, f:b, s:this.s.bind(this), m:this.m.bind(this)}), f && K(Eb, Object.assign({}, f, {v:this.s.bind(this, null), Y:"danger", ha:this.load.bind(this)})), a && K(Gb, {v:this.m.bind(this, null), title:"Редактирование Категории"}, K(Tb, {id:a._id, O:this.load.bind(this), v:this.m.bind(this, null), path:"/admin-data?categories", K:"Категория успешно отредактирована!", i:"Сохранить"})));
};
function Vb(a) {
  var b = a.data, c = a.s, f = a.m;
  a = a.f;
  return K("div", {}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет объектов недвижимости.", b.map(function(a, b) {
    return K(Wb, {item:a, key:a._id, s:c, m:f, style:"background:" + (0 != b % 2 ? "#edeee8" : "white") + ";"});
  }));
}
function Wb(a) {
  P.apply(this, arguments);
}
u(Wb, P);
Wb.prototype.h = function(a) {
  var b = a.item, c = a.s, f = a.m, e = b.title;
  a = b.description;
  var g = b._id, h = "/каталог/" + b.seo + "/", k = "knedv.ru" + h;
  return K(T, {className:"CategoryRow"}, K(U, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"})), K(U, {}, K("h2", {}, e), K("em", {}, K("a", {href:h}, k)), K("p", {}, a)), K(U, {className:"col-1 CategoryMeta"}, K(wb, {ga:function() {
    f(b);
  }, style:"color:brown;"}, " ", K(V, {icon:"fas fa-pen"})), K("br"), K(wb, {ga:function() {
    c({B:{text:K("span", {}, "Вы действительно хотите удалить категорию ", K("strong", {}, e), "?"), i:"Удалить", title:"Удаление Категории", path:"categories&id=" + g + "&delete"}});
  }, style:"color:brown;"}, K(V, {icon:"far fa-trash-alt"}))));
};
function Xb() {
  P.call(this);
  this.state = {f:!1, data:{}, hint:"москва-новостройки", article:""};
}
u(Xb, P);
Xb.prototype.h = function(a) {
  var b = this, c = a.kb;
  return K(Tb, {O:function(a) {
    var e, f, h;
    return I(function(g) {
      if (1 == g.a) {
        return c && c(a), v(g, a.json(), 2);
      }
      f = e = g.g;
      h = f.data;
      b.b({id:h});
      g.a = 0;
    });
  }, title:"Добавить Категорию", Ba:this.state.id, path:"/admin-data?categories", K:"Категория успешно добавлена!", i:"Добавить"});
};
function Yb() {
  var a = Z.M.call(this) || this;
  Object.assign(a.state, {f:!1, data:{}, Da:[], hint:"1-комнатные-апартаменты-воскресенское", Ca:"апартаменты", article:""});
  return a;
}
u(Yb, Z.M);
Yb.prototype.u = function() {
  var a = this, b, c, f, e;
  return I(function(g) {
    if (1 == g.a) {
      return v(g, Zb(a), 2);
    }
    if (3 != g.a) {
      b = !!a.c.id;
      if (!b) {
        return g.return();
      }
      a.b({D:1});
      return v(g, Ib.bind(a)("objects&id=" + a.c.id), 3);
    }
    if (c = g.g) {
      f = t(c), (e = f.next().value) && a.b({data:e, hint:e.seo, Ca:e.categorySeo, article:e.article});
    }
    g.a = 0;
  });
};
function Zb(a) {
  var b, c, f, e, g, h;
  return I(function(k) {
    switch(k.a) {
      case 1:
        return a.b({f:!0}), x(k), v(k, Hb("/admin-data?categories"), 5);
      case 5:
        return b = k.g, v(k, b.json(), 6);
      case 6:
        c = k.g, f = c.error, e = c.data, f ? a.b({error:f}) : (g = e.map(function(a) {
          return {value:a._id, title:a.title};
        }), a.b({Da:g}));
      case 3:
        A(k);
        a.b({f:!1});
        D(k, 0);
        break;
      case 2:
        h = z(k), a.b({error:h}), k.G(3);
    }
  });
}
Yb.prototype.h = function(a) {
  var b = this, c = a.v, f = void 0 === a.H ? "Отмена" : a.H, e = a.K, g = void 0 === a.i ? "Добавить" : a.i, h = a.title, k = a.Ba, l = this.state, m = l.Da, p = l.I, q = l.data;
  a = l.f;
  var r = l.error;
  l = l.w;
  c = K(W, {W:this.submit.bind(this), l:function() {
    b.reset();
  }}, K(Y, {j:"Название для каталога недвижимости.", label:"Название"}, K(Z.L, {value:q.title, name:"title", required:!0, placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское"})), K(Y, {j:"Цена объекта", label:"Цена"}, K(Z.L, {value:q.price, name:"price", required:!0, placeholder:"3 000 000 руб."})), K(Y, {j:this.hint, label:"СЕО Название"}, K(Z.L, {value:q.seo, name:"seo", required:!0, placeholder:"1-комнатные-апартаменты-воскресенское"})), K(Y, {j:"Описание объекта.", label:"Описание"}, K(Z.aa, 
  {rows:10, name:"description", required:!0, placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично)."}, 
  q.description)), K(Pb, {D:this.D, j:"Картинка, отображаемая на главной странице.", required:!0, image:q.cdnImage}), K(Sb, {article:this.state.article, name:"article", pa:function(a) {
    b.b({article:a});
    b.reset();
  }}), this.D && K("input", {value:this.c.id, type:"hidden", name:"id"}), K(Y, {label:"Раздел", j:"Категория в каталоге"}, K(Z.Va, {options:m, name:"category", value:q.category, required:!0})), K(Bb, {error:r}), K(Cb, {w:l, message:e}), K(Ob, {i:g, f:p, V:"Загрузка..."}), k && K("a", {href:"/admin/albums/" + k, className:"ml-2 btn btn-warning"}, "Загрузить Фотографии"), c && K("button", {onClick:c, type:"button", className:"FormCancelBtn btn btn-secondary"}, f));
  return K(U, {}, h && K("h1", {}, h), a && K(Qb), !a && c);
};
n.Object.defineProperties(Yb.prototype, {hint:{configurable:!0, enumerable:!0, get:function() {
  return "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.Ca + "/<strong>" + this.state.hint + "</strong>.";
}}, D:{configurable:!0, enumerable:!0, get:function() {
  return !!this.c.id;
}}});
function $b() {
  P.call(this);
  this.state = {f:!1, data:[], B:null, U:null};
}
u($b, P);
d = $b.prototype;
d.u = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return I(function(c) {
    if (1 == c.a) {
      return v(c, Ib.bind(a)("objects"), 2);
    }
    (b = c.g) && a.b({data:b});
    c.a = 0;
  });
};
d.s = function(a) {
  this.b({B:a});
};
d.m = function(a) {
  this.b({U:a});
};
d.h = function() {
  var a = this.state.U;
  return K(U, {}, K("h1", {}, "Объекты Недвижимости"), K("p", {}, "На сайт добалены следующие объекты:"), K(ac, {data:this.state.data, f:this.state.f, s:this.s.bind(this), m:this.m.bind(this)}), this.state.B && K(Eb, Object.assign({}, this.state.B, {v:this.s.bind(this, null), Y:"danger", ha:this.load.bind(this)})), a && K(Gb, {v:this.m.bind(this, null), title:"Редактирование Объекта"}, K(Yb, {id:a._id, O:this.load.bind(this), v:this.m.bind(this, null), path:"/admin-data?objects", H:"Отмена", K:"Объект успешно отредактирован!", 
  i:"Сохранить"})));
};
function ac(a) {
  var b = a.data, c = a.s, f = a.m;
  a = a.f;
  return K("div", {}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет объектов недвижимости.", b.map(function(a, b) {
    return K(bc, {item:a, key:a._id, s:c, m:f, style:"background:" + (0 != b % 2 ? "#edeee8" : "white") + ";"});
  }));
}
function bc(a) {
  P.apply(this, arguments);
}
u(bc, P);
bc.prototype.h = function(a) {
  var b = a.item, c = a.s, f = a.m, e = b.title, g = b.description, h = b._id, k = b.price, l = b.numberOfPhotos, m = "/каталог/" + b.categorySeo + "/" + b.seo, p = "knedv.ru" + m;
  return K(T, {style:a.style, className:"CategoryRow"}, K(U, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"}), k && "Цена: " + k), K(U, {}, K("h2", {}, e), K("em", {}, K("a", {href:m}, p)), K("p", {}, g)), K(U, {className:"col-1 CategoryMeta"}, K("br"), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить объект ", K("strong", {}, e), "?"), i:"Удалить", title:"Удаление Объекта", path:"objects&id=" + h + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(V, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    f(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(V, {icon:"fas fa-pen"})), K("a", {href:"/admin/albums/" + h, style:"color:brown;", onClick:function(a) {
    a.preventDefault();
    f(b);
    return a;
  }}, K(V, {icon:"fas fa-images"}), l ? "(" + l + ")" : "")));
};
function cc(a) {
  P.apply(this, arguments);
}
u(cc, P);
cc.prototype.h = function(a) {
  var b = this, c = a.kb;
  return (a = a.id) ? K(Yb, {id:a, title:"Редактировать Объект", path:"/admin-data?objects", K:"Объект успешно отредактирован!", i:"Сохранить"}) : K(Yb, {O:function(a) {
    var e, f, h;
    return I(function(g) {
      if (1 == g.a) {
        return c && c(a), v(g, a.json(), 2);
      }
      f = e = g.g;
      h = f.data;
      b.b({id:h});
      g.a = 0;
    });
  }, title:"Добавить Объект", Ba:this.state.id, path:"/admin-data?objects", K:"Объект успешно добавлен!", i:"Добавить"});
};
function dc() {
  P.call(this);
  this.state = {f:!1, data:[]};
}
u(dc, P);
dc.prototype.u = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
dc.prototype.load = function() {
  var a = this, b, c, f, e, g;
  return I(function(h) {
    switch(h.a) {
      case 1:
        return a.b({f:!0}), x(h), v(h, Hb("/admin-data?pages"), 5);
      case 5:
        return b = h.g, v(h, b.json(), 6);
      case 6:
        c = h.g, f = c.error, e = c.data, f ? a.b({error:f}) : a.b({data:e});
      case 3:
        A(h);
        a.b({f:!1});
        D(h, 0);
        break;
      case 2:
        g = z(h), a.b({error:g}), h.G(3);
    }
  });
};
dc.prototype.h = function() {
  var a = this;
  return K(U, {}, K("h1", {}, "Материалы Сайта"), K("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.f && K("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return K(ec, Object.assign({}, c, {key:b, id:b, jb:function() {
      return a.load();
    }}));
  }));
};
function ec() {
  P.call(this);
  this.state = {B:null};
}
u(ec, P);
ec.prototype.h = function() {
  var a = this, b = this.c, c = b.seo, f = b.id, e = b.description, g = b.jb, h = b.title;
  return K(T, {className:"CategoryRow"}, K(U, {}, K("h2", {}, h), K("em", {}, "knedv.ru/", c), K("p", {}, e)), K(U, {className:"col-1 CategoryMeta"}, K("a", {href:"/admin/add-page/" + f, style:"color:brown;"}, K(V, {icon:"fas fa-pen"})), K("br"), K("a", {onClick:function(b) {
    b.preventDefault();
    a.b({B:{text:K("span", {}, "Вы действительно хотите удалить страницу ", K("strong", {}, h), "?"), i:"Удалить", title:"Удаление Страницы", path:"pages&id=" + f + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, K(V, {icon:"far fa-trash-alt"}))), this.state.B && K(Eb, Object.assign({}, this.state.B, {v:function() {
    a.b({B:null});
  }, Y:"danger", ha:g})));
};
function fc() {
  P.call(this);
  this.state = {f:!1, data:{}, article:""};
}
u(fc, P);
fc.prototype.u = function() {
  var a = this, b, c, f, e, g, h, k, l, m, p;
  return I(function(q) {
    switch(q.a) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return q.return();
        }
        a.b({D:1, f:!0});
        x(q);
        return v(q, Hb("/admin-data?pages&id=" + a.c.id), 5);
      case 5:
        return c = q.g, v(q, c.json(), 6);
      case 6:
        f = q.g, e = f.error, g = f.data, e ? a.b({error:e}) : (h = t(g), k = h.next().value, a.b({data:k, article:k.article}));
      case 3:
        A(q);
        a.b({f:!1});
        D(q, 0);
        break;
      case 2:
        m = l = z(q), p = m.message, a.b({error:p}), q.G(3);
    }
  });
};
fc.prototype.submit = function(a) {
  var b = this, c, f, e, g, h;
  return I(function(k) {
    switch(k.a) {
      case 1:
        return b.b({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.b({I:!0}), x(k), v(k, Hb("/admin-data?pages", {method:"POST", body:c}), 5);
      case 5:
        return f = k.g, v(k, f.json(), 6);
      case 6:
        e = k.g, (g = e.error) ? b.b({error:g}) : b.b({w:1});
      case 3:
        A(k);
        b.b({I:!1});
        D(k, 4);
        break;
      case 2:
        h = z(k);
        b.b({error:h});
        k.G(3);
        break;
      case 4:
        return k.return(!1);
    }
  });
};
fc.prototype.h = function() {
  var a = this, b = this.state.D;
  return K(U, {}, K("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Страницу"), b && this.state.f && K("span", {className:"echo-loader"}, "Loading…"), !(b && this.state.f) && K("form", {ref:function(b) {
    return a.form = b;
  }, onSubmit:this.submit.bind(this)}, K(yb, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", j:"Название для администратора.", required:"1"}), K(yb, {j:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), K(yb, {ua:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", j:"Описание страницы.", value:this.state.data.description, required:"1"}), 
  K(Sb, {article:this.state.article, pa:function(b) {
    a.b({article:b});
  }}), b && K("input", {value:this.c.id, type:"hidden", name:"id"}), K("button", {disabled:this.state.I, type:"submit", className:"btn btn-primary"}, this.state.I ? "Загрузка..." : b ? "Сохранить" : "Добавить"), this.state.error && K("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.w && K("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", b ? "сохранена" : "создана", "!")));
};
function gc(a) {
  return Z.M.apply(this, arguments) || this;
}
u(gc, Z.M);
gc.prototype.h = function(a) {
  var b = this, c = a.item, f = a.v, e = void 0 === a.H ? "Отмена" : a.H, g = a.K;
  a = void 0 === a.i ? "Добавить" : a.i;
  var h = c || {}, k = this.state, l = k.I, m = k.error;
  k = k.w;
  return K(W, {W:this.submit.bind(this), l:function() {
    b.reset();
  }}, K(Y, {label:"Название", j:"Заголовок для главной страницы, напр., Ленинский проспект, дом 114"}, K(Z.L, {value:h.title, placeholder:"Название акции", name:"title", required:!0})), K(Y, {label:"Описание", j:"Введите описание акции..."}, K(Z.aa, {name:"description", required:!0, placeholder:"Описание акции"}, h.description)), K(Pb, {D:c, j:"Картинка, отображаемая на главной странице.", required:!0, image:h.cdnImage}), K(Y, {label:"Цена", j:"Задайте цену..."}, K(Z.L, {value:h.price, name:"price", 
  placeholder:"55 000 000 руб."})), K(Y, {label:"Переход", j:"Ссылка на страницу каталога, или сайта."}, K(Z.L, {value:h.href, name:"href", placeholder:"/каталог/москва-элитная/лениниский-проспект-дом-114"})), K(Y, {j:"Добавить в специальные предложения на главной."}, K(Ab, {value:h.show_on_main, label:"Отображать на главной", name:"show_on_main"})), c && K("input", {value:h._id, type:"hidden", name:"id"}), K(Bb, {error:m}), K(Cb, {w:k, message:g}), K(Ob, {i:a, f:l, V:"Загрузка..."}), f && K("button", 
  {onClick:f, type:"button", className:"FormCancelBtn btn btn-secondary"}, e));
};
function hc() {
  P.call(this);
  this.state = {f:!1, data:[]};
}
u(hc, P);
d = hc.prototype;
d.u = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return I(function(c) {
    if (1 == c.a) {
      return v(c, Ib.bind(a)("specials"), 2);
    }
    (b = c.g) && a.b({data:b});
    c.a = 0;
  });
};
d.s = function(a) {
  this.b({B:a});
};
d.m = function(a) {
  this.b({U:a});
};
d.h = function() {
  var a = this, b = K("details", {}, K("summary", {}, K("h3", {style:"display: inline-block;vertical-align: middle;"}, "Создать Новое Предложение")), K(gc, {O:function() {
    a.load();
  }, path:"/admin-data?specials", K:"Предложение успешно создано!", i:"Добавить"}));
  return K(U, {}, K("h1", {}, "Специальные Предложения"), K(ic, {data:this.state.data, f:this.state.f, s:this.s.bind(this), m:this.m.bind(this)}), K("hr"), b, this.state.B && K(Eb, Object.assign({}, this.state.B, {v:this.s.bind(this, null), Y:"danger", ha:this.load.bind(this)})), this.state.U && K(Gb, {v:this.m.bind(this, null), title:"Редактирование"}, K(gc, {item:this.state.U, O:this.load.bind(this), v:this.m.bind(this, null), path:"/admin-data?specials", H:"Отмена", K:"Предложение успешно отредактировано!", 
  i:"Сохранить"})));
};
function ic(a) {
  var b = a.data, c = a.s, f = a.m;
  a = a.f;
  return K("div", {style:"height:25rem;overflow:scroll;background:wheat; padding:0.5rem;"}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет специальных предложе��ий.", b.map(function(a) {
    return K(jc, {item:a, key:a._id, s:c, m:f});
  }));
}
function jc(a) {
  var b = a.item, c = a.s, f = a.m, e = b._id, g = b.title;
  a = b.cdnImage;
  var h = b.description, k = b.price, l = "on" == b.show_on_main;
  return K("div", {className:l ? "IsShownOnMain" : "", style:"border-bottom:1px solid brown;border-top:1px solid lightcoral;"}, K("h4", {}, g, " ", l && K("span", {className:"badge badge-danger"}, "На главной")), K("p", {}, K("img", {src:a, style:"display:block;"}), h, K("span", {style:"font-weight: bold;"}, " ", k)), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить предложение ", K("strong", {}, g), "?"), i:"Удалить", title:"Удаление Предложения", path:"specials&id=" + e + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(V, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    f(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(V, {icon:"fas fa-pen"})));
}
;function kc(a) {
  return Z.M.apply(this, arguments) || this;
}
u(kc, Z.M);
kc.prototype.h = function(a) {
  var b = this, c = a.item, f = a.v, e = void 0 === a.H ? "Отмена" : a.H, g = a.K;
  a = void 0 === a.i ? "Добавить" : a.i;
  var h = c || {}, k = this.state, l = k.I, m = k.error;
  k = k.w;
  return K(W, {W:this.submit.bind(this), l:function() {
    b.reset();
  }}, K(Y, {label:"Название", j:"Заголовок альбома для выбора на странице объекта."}, K(Z.L, {value:h.title, placeholder:"Мосфильмовская, дом 70к6", name:"title", required:!0})), K(Y, {label:"Описание", j:"Введите описание акции..."}, K(Z.aa, {name:"description", required:!0, placeholder:"Описание Альбома"}, h.description)), K(Pb, {D:c, j:"Картинка для узнаваемости.", required:!0, image:h.cdnImage}), c && K("input", {value:h._id, type:"hidden", name:"id"}), K(Bb, {error:m}), K(Cb, {w:k, message:g}), 
  K(Ob, {i:a, f:l, V:"Загрузка..."}), f && K("button", {onClick:f, type:"button", className:"FormCancelBtn btn btn-secondary"}, e));
};
function lc() {
  P.call(this);
  this.state = {data:[], f:!0};
}
u(lc, P);
lc.prototype.u = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
lc.prototype.load = function() {
  var a = this, b;
  return I(function(c) {
    if (1 == c.a) {
      return v(c, Ib.bind(a)("galleries"), 2);
    }
    (b = c.g) && a.b({data:b});
    c.a = 0;
  });
};
lc.prototype.h = function() {
  var a = this, b = this.state.f;
  return K(U, {}, K("h1", {}, "Галереи"), b && K(Qb), !b && !this.state.data.length && "Не существует галерей.", this.state.data.map(function(a) {
    var b = a._id, c = a.title, g = a.description;
    return K(T, {key:b}, K(U, {className:"col-sm-3"}, K("img", {src:a.cdnImage, className:"img-fluid"})), K(U, {}, K("h2", {}, c), K("a", {href:"/admin/galleries/" + b}, "Просмотр"), g));
  }), K("hr"), K(mc, {title:"Создать Новую Галерею"}, K(kc, {O:function() {
    a.load();
  }, path:"/admin-data?galleries", K:"Галерея успешно создана!", i:"Добавить"})));
};
n.Object.defineProperties(lc.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function mc(a) {
  var b = a.children;
  return K("details", {}, K("summary", {}, K("h3", {style:"display: inline-block;vertical-align: middle;"}, a.title)), b);
}
;var nc = {36864:"ExifVersion", 40960:"FlashpixVersion", 40961:"ColorSpace", 40962:"PixelXDimension", 40963:"PixelYDimension", 37121:"ComponentsConfiguration", 37122:"CompressedBitsPerPixel", 37500:"MakerNote", 37510:"UserComment", 40964:"RelatedSoundFile", 36867:"DateTimeOriginal", 36868:"DateTimeDigitized", 37520:"SubsecTime", 37521:"SubsecTimeOriginal", 37522:"SubsecTimeDigitized", 33434:"ExposureTime", 33437:"FNumber", 34850:"ExposureProgram", 34852:"SpectralSensitivity", 34855:"ISOSpeedRatings", 
34856:"OECF", 37377:"ShutterSpeedValue", 37378:"ApertureValue", 37379:"BrightnessValue", 37380:"ExposureBias", 37381:"MaxApertureValue", 37382:"SubjectDistance", 37383:"MeteringMode", 37384:"LightSource", 37385:"Flash", 37396:"SubjectArea", 37386:"FocalLength", 41483:"FlashEnergy", 41484:"SpatialFrequencyResponse", 41486:"FocalPlaneXResolution", 41487:"FocalPlaneYResolution", 41488:"FocalPlaneResolutionUnit", 41492:"SubjectLocation", 41493:"ExposureIndex", 41495:"SensingMethod", 41728:"FileSource", 
41729:"SceneType", 41730:"CFAPattern", 41985:"CustomRendered", 41986:"ExposureMode", 41987:"WhiteBalance", 41988:"DigitalZoomRation", 41989:"FocalLengthIn35mmFilm", 41990:"SceneCaptureType", 41991:"GainControl", 41992:"Contrast", 41993:"Saturation", 41994:"Sharpness", 41995:"DeviceSettingDescription", 41996:"SubjectDistanceRange", 40965:"InteroperabilityIFDPointer", 42016:"ImageUniqueID"}, oc = {256:"ImageWidth", 257:"ImageHeight", 34665:"ExifIFDPointer", 34853:"GPSInfoIFDPointer", 40965:"InteroperabilityIFDPointer", 
258:"BitsPerSample", 259:"Compression", 262:"PhotometricInterpretation", 274:"Orientation", 277:"SamplesPerPixel", 284:"PlanarConfiguration", 530:"YCbCrSubSampling", 531:"YCbCrPositioning", 282:"XResolution", 283:"YResolution", 296:"ResolutionUnit", 273:"StripOffsets", 278:"RowsPerStrip", 279:"StripByteCounts", 513:"JPEGInterchangeFormat", 514:"JPEGInterchangeFormatLength", 301:"TransferFunction", 318:"WhitePoint", 319:"PrimaryChromaticities", 529:"YCbCrCoefficients", 532:"ReferenceBlackWhite", 306:"DateTime", 
270:"ImageDescription", 271:"Make", 272:"Model", 305:"Software", 315:"Artist", 33432:"Copyright"}, pc = {0:"GPSVersionID", 1:"GPSLatitudeRef", 2:"GPSLatitude", 3:"GPSLongitudeRef", 4:"GPSLongitude", 5:"GPSAltitudeRef", 6:"GPSAltitude", 7:"GPSTimeStamp", 8:"GPSSatellites", 9:"GPSStatus", 10:"GPSMeasureMode", 11:"GPSDOP", 12:"GPSSpeedRef", 13:"GPSSpeed", 14:"GPSTrackRef", 15:"GPSTrack", 16:"GPSImgDirectionRef", 17:"GPSImgDirection", 18:"GPSMapDatum", 19:"GPSDestLatitudeRef", 20:"GPSDestLatitude", 21:"GPSDestLongitudeRef", 
22:"GPSDestLongitude", 23:"GPSDestBearingRef", 24:"GPSDestBearing", 25:"GPSDestDistanceRef", 26:"GPSDestDistance", 27:"GPSProcessingMethod", 28:"GPSAreaInformation", 29:"GPSDateStamp", 30:"GPSDifferential"}, qc = {256:"ImageWidth", 257:"ImageHeight", 258:"BitsPerSample", 259:"Compression", 262:"PhotometricInterpretation", 273:"StripOffsets", 274:"Orientation", 277:"SamplesPerPixel", 278:"RowsPerStrip", 279:"StripByteCounts", 282:"XResolution", 283:"YResolution", 284:"PlanarConfiguration", 296:"ResolutionUnit", 
513:"JpegIFOffset", 514:"JpegIFByteCount", 529:"YCbCrCoefficients", 530:"YCbCrSubSampling", 531:"YCbCrPositioning", 532:"ReferenceBlackWhite"}, rc = {xb:{0:"Not defined", 1:"Manual", 2:"Normal program", 3:"Aperture priority", 4:"Shutter priority", 5:"Creative program", 6:"Action program", 7:"Portrait mode", 8:"Landscape mode"}, Cb:{0:"Unknown", 1:"Average", 2:"CenterWeightedAverage", 3:"Spot", 4:"MultiSpot", 5:"Pattern", 6:"Partial", 255:"Other"}, Bb:{0:"Unknown", 1:"Daylight", 2:"Fluorescent", 3:"Tungsten (incandescent light)", 
4:"Flash", 9:"Fine weather", 10:"Cloudy weather", 11:"Shade", 12:"Daylight fluorescent (D 5700 - 7100K)", 13:"Day white fluorescent (N 4600 - 5400K)", 14:"Cool white fluorescent (W 3900 - 4500K)", 15:"White fluorescent (WW 3200 - 3700K)", 17:"Standard light A", 18:"Standard light B", 19:"Standard light C", 20:"D55", 21:"D65", 22:"D75", 23:"D50", 24:"ISO studio tungsten", 255:"Other"}, zb:{0:"Flash did not fire", 1:"Flash fired", 5:"Strobe return light not detected", 7:"Strobe return light detected", 
9:"Flash fired, compulsory flash mode", 13:"Flash fired, compulsory flash mode, return light not detected", 15:"Flash fired, compulsory flash mode, return light detected", 16:"Flash did not fire, compulsory flash mode", 24:"Flash did not fire, auto mode", 25:"Flash fired, auto mode", 29:"Flash fired, auto mode, return light not detected", 31:"Flash fired, auto mode, return light detected", 32:"No flash function", 65:"Flash fired, red-eye reduction mode", 69:"Flash fired, red-eye reduction mode, return light not detected", 
71:"Flash fired, red-eye reduction mode, return light detected", 73:"Flash fired, compulsory flash mode, red-eye reduction mode", 77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", 89:"Flash fired, auto mode, red-eye reduction mode", 93:"Flash fired, auto mode, return light not detected, red-eye reduction mode", 95:"Flash fired, auto mode, return light detected, red-eye reduction mode"}, 
Gb:{1:"Not defined", 2:"One-chip color area sensor", 3:"Two-chip color area sensor", 4:"Three-chip color area sensor", 5:"Color sequential area sensor", 7:"Trilinear sensor", 8:"Color sequential linear sensor"}, Eb:{0:"Standard", 1:"Landscape", 2:"Portrait", 3:"Night scene"}, Fb:{1:"Directly photographed"}, vb:{0:"Normal process", 1:"Custom process"}, Jb:{0:"Auto white balance", 1:"Manual white balance"}, Ab:{0:"None", 1:"Low gain up", 2:"High gain up", 3:"Low gain down", 4:"High gain down"}, ub:{0:"Normal", 
1:"Soft", 2:"Hard"}, Db:{0:"Normal", 1:"Low saturation", 2:"High saturation"}, Hb:{0:"Normal", 1:"Soft", 2:"Hard"}, Ib:{0:"Unknown", 1:"Macro", 2:"Close view", 3:"Distant view"}, yb:{3:"DSC"}, Components:{0:"", 1:"Y", 2:"Cb", 3:"Cr", 4:"R", 5:"G", 6:"B"}}, sc = {120:"caption", 110:"credit", 25:"keywords", 55:"dateCreated", 80:"byline", 85:"bylineTitle", 122:"captionWriter", 105:"headline", 116:"copyright", 15:"category"};
function tc(a, b, c, f, e) {
  var g = a.getUint16(c, !e), h = {}, k;
  for (k = 0; k < g; k++) {
    var l = c + 12 * k + 2;
    var m = f[a.getUint16(l, !e)];
    h[m] = uc(a, l, b, e);
  }
  return h;
}
function uc(a, b, c, f) {
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
      return vc(a, 4 < g ? c : b + 8, g - 1);
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
        a.hb = h;
        a.ab = k;
        return a;
      }
      b = [];
      for (e = 0; e < g; e++) {
        h = a.getUint32(c + 8 * e, !f), k = a.getUint32(c + 4 + 8 * e, !f), b[e] = new Number(h / k), b[e].hb = h, b[e].ab = k;
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
function vc(a, b, c) {
  for (var f = "", e = b; e < b + c; e++) {
    f += String.fromCharCode(a.getUint8(e));
  }
  return f;
}
function wc(a, b) {
  if ("Exif" != vc(a, b, 4)) {
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
  b = tc(a, c, c + e, oc, f);
  if (b.Ra) {
    var g = tc(a, c, c + b.Ra, nc, f);
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
          g[h] = rc[h][g[h]];
          break;
        case "ExifVersion":
        case "FlashpixVersion":
          g[h] = String.fromCharCode(g[h][0], g[h][1], g[h][2], g[h][3]);
          break;
        case "ComponentsConfiguration":
          g[h] = rc.Components[g[h][0]] + rc.Components[g[h][1]] + rc.Components[g[h][2]] + rc.Components[g[h][3]];
      }
      b[h] = g[h];
    }
  }
  if (b.Sa) {
    for (h in g = tc(a, c, c + b.Sa, pc, f), g) {
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
      h = tc(a, c, c + e, qc, h);
      if (h.Compression) {
        switch(h.Compression) {
          case 6:
            h.Ua && h.Ta && (h.blob = new Blob([new Uint8Array(a.buffer, c + h.Ua, h.Ta)], {type:"image/jpeg"}));
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
;function xc() {
  P.call(this);
  this.state = {va:!1, ja:null, error:null, ta:null, result:null};
}
u(xc, P);
xc.prototype.u = function() {
  yc(this, this.c.file);
  zc(this, this.c.file);
};
function zc(a, b) {
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
            e = wc(e, g + 4, e.getUint16(g + 2) - 2);
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
                var p = b.getUint8(l + 2);
                p in sc && (m = b.getInt16(l + 3), p = sc[p], m = vc(b, l + 5, m), k.hasOwnProperty(p) ? k[p] instanceof Array ? k[p].push(m) : k[p] = [k[p], m] : k[p] = m);
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
    a.b({gb:{data:e, Pb:b}});
  };
}
function yc(a, b) {
  var c = new FileReader;
  c.readAsDataURL(b);
  c.onload = function() {
    Ac(a, c.result);
  };
}
function Ac(a, b) {
  var c = new Image;
  c.src = b;
  c.onload = function() {
    var b = c.width / c.height, e = document.createElement("canvas");
    e.width = c.width > c.height ? 250 * b : 250 / b;
    e.height = 250;
    e.getContext("2d").drawImage(c, 0, 0, e.width, e.height);
    b = e.toDataURL();
    a.b({ta:b});
  };
}
function Bc(a) {
  var b, c;
  I(function(f) {
    a.b({error:null, ja:0, va:!1});
    b = new FormData;
    b.append("image", a.c.file);
    b.append("name", a.c.file.name);
    c = new XMLHttpRequest;
    c.open("POST", "/upload-asset", !0);
    c.a = 0;
    c.upload.addEventListener("progress", function(b) {
      a.b({ja:100.0 * b.loaded / b.total || 100});
    });
    c.addEventListener("readystatechange", function() {
      4 == c.readyState && a.b({va:!0, ja:null});
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
        h ? a.b({error:h}) : k && (a.b({result:k, ta:null, mb:l}), a.c.Na && a.c.Na(k));
      } else {
        4 == c.readyState && 200 != c.status && a.b({error:"XHR Error"});
      }
    });
    c.send(b);
    f.a = 0;
  });
}
xc.prototype.h = function(a) {
  var b = this, c = a.name, f = a.ia, e = a.P;
  a = void 0 === a.nb ? "photos[]" : a.nb;
  var g = this.state, h = g.ja, k = g.error, l = g.ta, m = g.va, p = g.result, q = g.gb, r = g.mb;
  g = 100 == h && !m;
  e = r && e.some(function(a) {
    return a == r;
  });
  e = p && !e;
  var B = "Added", w = {background:"linear-gradient(lightgrey, grey)", "border-color":"#838383", "box-shadow":"rgb(98, 98, 98) 1px -5px 15px inset"};
  g ? (w.background = "linear-gradient(lightblue, blue)", w["border-color"] = "blue", w["box-shadow"] = "inset 1px -5px 15px #2a33a0", B = "Uploading") : k ? (w.background = "linear-gradient(coral, brown)", w["border-color"] = "red", w["box-shadow"] = "rgb(162, 31, 31) 1px -5px 15px inset", B = "Error") : e ? (w.background = "linear-gradient(yellow, rgb(207, 198, 92))", w["border-color"] = "rgb(156, 158, 9)", w["box-shadow"] = "inset 1px -5px 15px #9e7414", B = "HasInput") : m && (w.background = 
  "linear-gradient(lightgreen, #82d285)", w["border-color"] = "green", w["box-shadow"] = "inset 1px -5px 15px #6f9e14", B = "Uploaded");
  l = p || l;
  var C;
  try {
    (C = q.data.wb) && (C = Cc(C).toLocaleDateString());
  } catch (E) {
  }
  q = ["Image", l ? void 0 : "PreviewLoading", "PhotoUploader" + B].filter(Boolean).join(" ");
  return K("div", {style:w, className:q}, !l && K("span", {className:"ImageInfo", style:"top:50%;left:50%;transform:translate(-50%, -50%);"}, "Загрузка превью..."), K("img", {src:l}), K("span", {className:"ImageInfo", style:"top:.5rem;left:.5rem;"}, c, C && K("br"), C), K("span", {onClick:f, className:"ImageInfo CloseSpan"}, "✕"), !p && !k && null === h && K(Dc, {className:"Absolute"}, K(wb, {ga:function() {
    Bc(b);
  }, className:"btn btn-light btn-sm"}, "Загрузить")), null !== h && 100 != h && K(Dc, {}, K("progress", {max:100, value:h})), g && K(Dc, {}, "Выполняется обработка...", K("div", {className:"spinner-border text-primary", role:"status"}, K("span", {className:"sr-only"}, "Loading..."))), k && K("p", {className:"ImageInfo PhotoError"}, "Ошибка: ", k), k && K("a", {onClick:function(a) {
    a.preventDefault();
    Bc(b);
    return !1;
  }, href:"#", className:"btn btn-danger btn-sm", style:"position:absolute;right:.5rem;bottom:.5rem;"}, "Загрузить снова"), p && K("p", {className:"ImageInfo GalleryLink"}, K("a", {href:p, rel:"noopener noreferrer", target:"_blank"}, "Ссылка")), e && r && K("input", {name:a, type:"hidden", value:r}));
};
function Dc(a) {
  return K("span", {className:void 0 === a.className ? "ImageInfo" : a.className, style:"bottom:.5rem;left:.5rem;"}, a.children);
}
function Cc(a) {
  var b = t(a.split(/\D/));
  a = b.next().value;
  var c = b.next().value, f = b.next().value, e = b.next().value, g = b.next().value;
  b = b.next().value;
  return new Date(a, c - 1, f, e, g, b);
}
;function Ec() {
  P.call(this);
  this.state = {files:[]};
}
u(Ec, P);
function Fc(a, b) {
  var c = a.state.files.filter(function(a) {
    return a.file !== b;
  });
  a.b({files:c});
  a.c.ia && a.c.ia(b);
}
function Gc(a, b) {
  var c, f, e;
  I(function(g) {
    c = t(b);
    f = ha(c);
    e = f.map(function(a) {
      return {file:a, ob:Math.floor(10000 * Math.random())};
    });
    a.b({files:[].concat(ia(a.state.files), ia(e))});
    a.c.Ma && a.c.Ma();
    g.a = 0;
  });
}
Ec.prototype.h = function(a) {
  var b = this, c = void 0 === a.Ia ? "files[]" : a.Ia, f = a.lb, e = a.P;
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
    Gc(b, a.dataTransfer.files);
  }, onDragOver:function(a) {
    a.preventDefault();
    a.stopPropagation();
  }}, K("input", {id:a.id, "aria-described-by":a.J, onChange:function(a) {
    a.preventDefault();
    Gc(b, a.currentTarget.files);
    a.currentTarget.value = null;
  }, accept:"image/*", type:"file", multiple:!0}), this.state.Kb ? "Идет опознование файлов..." : "Или переместите файлы сюда...", this.state.files.map(function(a) {
    var g = a.file;
    return K(xc, {key:a.ob, name:g.name, file:g, ia:function() {
      Fc(b, g);
    }, Ia:c, Na:f, P:e});
  }));
};
function Hc() {
  P.call(this);
  this.state = {data:null, f:!0, files:[], P:[]};
}
u(Hc, P);
Hc.prototype.u = function() {
  var a = this;
  return I(function(b) {
    if (1 == b.a) {
      return v(b, a.load(), 2);
    }
    a.b({pb:!0});
    b.a = 0;
  });
};
Hc.prototype.load = function() {
  var a = this, b, c, f, e;
  return I(function(g) {
    if (1 == g.a) {
      return b = a.c, c = b.id, f = void 0 === b.Qa ? "galleries" : b.Qa, c || a.b({f:!1, error:"No id"}), v(g, Ib.bind(a)(f + "&id=" + c), 2);
    }
    (e = g.g) && a.b({data:e});
    g.a = 0;
  });
};
Hc.prototype.h = function() {
  var a = this, b = this.c, c = this.data || {}, f = c.title, e = c.cdnImage, g = c.description, h = c._id;
  c = c.photos;
  var k = this.state, l = k.P, m = k.f;
  k = k.pb;
  return K(U, {}, K("h1", {}, void 0 === b.Oa ? "Галерея" : b.Oa), !k && m && K(Qb), this.data && K(T, {className:"mb-3"}, K(U, {className:"col-sm-3"}, K("img", {src:e, className:"img-fluid"})), K(U, {}, K("h2", {}, f), g)), this.data && K(Ic, {photos:c, f:m}), K("hr"), h && K(Jc, {P:l, O:function(b) {
    var c, e;
    return I(function(f) {
      if (1 == f.a) {
        return v(f, b.json(), 2);
      }
      c = f.g;
      e = c.data;
      if (!e) {
        return f.G(0);
      }
      a.b({P:[].concat(ia(a.state.P), ia(e))});
      return v(f, a.load(), 0);
    });
  }, galleryId:h, path:"/admin-data?photos", i:"Сохранить Галерею"}));
};
n.Object.defineProperties(Hc.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function Ic(a) {
  P.apply(this, arguments);
}
u(Ic, P);
Ic.prototype.h = function(a) {
  var b = a.f;
  return K(T, {}, a.photos.map(function(a) {
    return K(U, {key:a._id, className:"col-sm-4", style:"padding:.25rem;"}, K("img", {src:a.file, className:"img-fluid", style:"max-height: 200px;"}));
  }), b && K(U, {className:"col-sm-4"}, K("div", {className:"h-100 w-100 d-flex align-items-center rounded PhotoLoadingPlaceholder"}, K("span", {className:"align-middle", style:"padding:.5rem;"}, "Запрос изображений... ", K("br"), K(vb)))));
};
function Jc(a) {
  return Z.M.apply(this, arguments) || this;
}
u(Jc, Z.M);
Jc.prototype.h = function(a) {
  var b = this, c = a.i, f = a.P, e = this.state, g = e.I, h = e.error;
  e = e.w;
  return K(W, {W:this.submit.bind(this)}, K("input", {value:a.galleryId, name:"galleryId", type:"hidden"}), K(Y, {label:"Загрузка Изображений", j:"Выберите несколько изображений и загрузите их."}, K(Ec, {$:function(a) {
    b.Sb = a;
  }, lb:function() {
    return I(function(a) {
      b.reset();
      a.a = 0;
    });
  }, Ma:function() {
    return b.reset();
  }, ia:function() {
    return b.reset();
  }, P:f})), K(Ob, {f:g, i:c, V:"Загрузка..."}), K(Bb, {error:h}), K(Cb, {w:e, message:"Галерея сохранена!"}));
};
function Kc() {
  return K(U, {}, K("h1", {}, "Добро Пожаловать!"));
}
;var Lc = K(function() {
  return K(T, {id:"App"}, K(U, {className:"col-md-4"}, K(Db)), K(sb, {l:function(a) {
    a.current && a.current.attributes.title && (document.title = a.current.attributes.title);
  }}, K(Kc, {path:"/admin", title:"Главная"}), K($b, {path:"/admin/objects", title:"Объекты Недвижимости"}), K(cc, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), K(Ub, {path:"/admin/categories", title:"Категории Каталога"}), K(Xb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), K(dc, {path:"/admin/pages", title:"Статьи"}), K(fc, {path:"/admin/add-page/:id?", title:"Добавить Страницу"}), K(hc, {path:"/admin/special", title:"Специальные Предложения"}), K(lc, {path:"/admin/galleries/", 
  title:"Галереи"}), K(Hc, {path:"/admin/galleries/:id", title:"Фотографии"}), K(Hc, {path:"/admin/albums/:id", title:"Фото Объекта", Qa:"galleries&album", Oa:"Изображения Объекта"})));
});
Ua(document.querySelector("#App"), Lc, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map