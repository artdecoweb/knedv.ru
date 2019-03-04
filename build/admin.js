var d;
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
          var e = Object.getOwnPropertyDescriptor(b, c);
          e && Object.defineProperty(a, c, e);
        } else {
          a[c] = b[c];
        }
      }
    }
  }
  a.Ub = b.prototype;
}
function pa(a, b) {
  if (b) {
    var c = q;
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
  function e(a) {
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
  var f = q.setTimeout;
  c.prototype.l = function(a) {
    f(a, 0);
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
      return function(e) {
        c || (c = !0, a.call(b, e));
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
        this.mb(a);
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
        c ? this.ga(a) : this.O(a);
      }
    }
  };
  b.prototype.ga = function(a) {
    var b = void 0;
    try {
      b = a.then;
    } catch (l) {
      this.C(l);
      return;
    }
    "function" == typeof b ? this.ob(b, a) : this.O(a);
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
  b.prototype.mb = function(a) {
    var b = this.l();
    a.ea(b.resolve, b.reject);
  };
  b.prototype.ob = function(a, b) {
    var c = this.l();
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
        } catch (F) {
          g(F);
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
    null == this.b ? g.g(c) : this.b.push(c);
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
        e(g.value).ea(b, c);
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
        h.push(void 0), k++, e(f.value).ea(g(h.length - 1), b), f = c.next();
      } while (!f.done);
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
  this.ga = this.l = null;
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
  a.l = {Ja:b, La:!0};
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
  var b = a.l.Ja;
  a.l = null;
  return b;
}
function z(a) {
  a.ga = [a.l];
  a.O = 0;
  a.F = 0;
}
function A(a, b) {
  var c = a.ga.splice(0)[0];
  (c = a.l = a.l || c) ? c.La ? a.b = a.O || a.F : void 0 != c.v && a.F < c.v ? (a.b = c.v, a.l = null) : a.b = a.F : a.b = b;
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
function va(a, b, c, e) {
  try {
    var f = b.call(a.b.C, c);
    if (!(f instanceof Object)) {
      throw new TypeError("Iterator result " + f + " is not an object");
    }
    if (!f.done) {
      return a.b.P = !1, f;
    }
    var g = f.value;
  } catch (h) {
    return a.b.C = null, sa(a.b, h), wa(a);
  }
  a.b.C = null;
  e.call(a.b, g);
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
    if (b.La) {
      throw b.Ja;
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
  return new Promise(function(e, f) {
    function g(a) {
      a.done ? e(a.value) : Promise.resolve(a.value).then(b, c).then(g, f);
    }
    g(a.next());
  });
}
function I(a) {
  return ya(new xa(new ta(a)));
}
var za = "function" == typeof Object.assign ? Object.assign : function(a, b) {
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
  return a || za;
});
function Aa(a, b) {
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
    return Aa(this, function(a, c) {
      return c;
    });
  };
});
function Ba() {
}
var J = {}, Ca = [], Da = [];
function K(a, b) {
  var c = Da, e, f;
  for (f = arguments.length; 2 < f--;) {
    Ca.push(arguments[f]);
  }
  b && null != b.children && (Ca.length || Ca.push(b.children), delete b.children);
  for (; Ca.length;) {
    if ((e = Ca.pop()) && void 0 !== e.pop) {
      for (f = e.length; f--;) {
        Ca.push(e[f]);
      }
    } else {
      "boolean" === typeof e && (e = null);
      if (f = "function" !== typeof a) {
        null == e ? e = "" : "number" === typeof e ? e = String(e) : "string" !== typeof e && (f = !1);
      }
      f && g ? c[c.length - 1] += e : c === Da ? c = [e] : c.push(e);
      var g = f;
    }
  }
  g = new Ba;
  g.nodeName = a;
  g.children = c;
  g.attributes = null == b ? void 0 : b;
  g.key = null == b ? void 0 : b.key;
  void 0 !== J.pb && J.pb(g);
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
  !a.ba && (a.ba = !0) && 1 == Ia.push(a) && (J.Jb || Fa)(Ka);
}
function Ka() {
  for (var a; a = Ia.pop();) {
    a.ba && La(a);
  }
}
function Ma(a) {
  var b = L({}, a.attributes);
  b.children = a.children;
  a = a.nodeName.Kb;
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
function Oa(a, b, c, e) {
  var f = M;
  "className" === b && (b = "class");
  if ("key" !== b) {
    if ("ref" === b) {
      Ea(c, null), Ea(e, a);
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
              a.style[g] = "number" === typeof e[g] && !1 === Ha.test(g) ? e[g] + "px" : e[g];
            }
          }
        } else {
          if ("dangerouslySetInnerHTML" === b) {
            e && (a.innerHTML = e.ka || "");
          } else {
            if ("o" == b[0] && "n" == b[1]) {
              f = b !== (b = b.replace(/Capture$/, "")), b = b.toLowerCase().substring(2), e ? c || a.addEventListener(b, Pa, f) : a.removeEventListener(b, Pa, f), (a.Ba || (a.Ba = {}))[b] = e;
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
function Pa(a) {
  return this.Ba[a.type](J.event && J.event(a) || a);
}
var Qa = [], Ra = 0, M = !1, Sa = !1;
function Ta() {
  for (var a; a = Qa.shift();) {
    J.Ya && J.Ya(a), a.o && a.o();
  }
}
function Ua(a, b, c, e, f, g) {
  Ra++ || (M = null != f && void 0 !== f.Pb, Sa = null != a && !("__preactattr_" in a));
  a = Wa(a, b, c, e, g);
  f && a.parentNode !== f && f.appendChild(a);
  --Ra || (Sa = !1, g || Ta());
  return a;
}
function Wa(a, b, c, e, f) {
  var g = a, h = M;
  if (null == b || "boolean" === typeof b) {
    b = "";
  }
  if ("string" === typeof b || "number" === typeof b) {
    return a && void 0 !== a.splitText && a.parentNode && (!a.D || f) ? a.nodeValue != b && (a.nodeValue = b) : (g = document.createTextNode(b), a && (a.parentNode && a.parentNode.replaceChild(g, a), N(a, !0))), g.__preactattr_ = !0, g;
  }
  f = b.nodeName;
  if ("function" === typeof f) {
    h = a;
    var k = b;
    g = b = h && h.D;
    var l = h, m = b && h.la === k.nodeName, n = m;
    for (a = Ma(k); b && !n && (b = b.Ca);) {
      n = b.constructor === k.nodeName;
    }
    b && n && (!e || b.D) ? (Xa(b, a, 3, c, e), h = b.K) : (g && !m && (Ya(g), h = l = null), b = Za(k.nodeName, a, c), h && !b.R && (b.R = h, l = null), Xa(b, a, 1, c, e), h = b.K, l && h !== l && (l.D = null, N(l, !1)));
    return h;
  }
  M = "svg" === f ? !0 : "foreignObject" === f ? !1 : M;
  f = String(f);
  if (!a || a.Ma !== f && a.nodeName.toLowerCase() !== f.toLowerCase()) {
    if (g = f, f = M ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g), f.Ma = g, g = f, a) {
      for (; a.firstChild;) {
        g.appendChild(a.firstChild);
      }
      a.parentNode && a.parentNode.replaceChild(g, a);
      N(a, !0);
    }
  }
  var p = g.firstChild;
  a = g.__preactattr_;
  f = b.children;
  if (null == a) {
    a = g.__preactattr_ = {};
    for (var t = g.attributes, B = t.length; B--;) {
      a[t[B].name] = t[B].value;
    }
  }
  if (!Sa && f && 1 === f.length && "string" === typeof f[0] && null != p && void 0 !== p.splitText && null == p.nextSibling) {
    p.nodeValue != f[0] && (p.nodeValue = f[0]);
  } else {
    if (f && f.length || null != p) {
      p = g;
      t = Sa || null != a.Ib;
      B = p.childNodes;
      var H = [], F = {}, D = 0, C = 0, w = B.length, Y = 0, Va = f ? f.length : 0;
      if (0 !== w) {
        for (n = 0; n < w; n++) {
          var E = B[n], T = E.__preactattr_;
          var G = Va && T ? E.D ? E.D.za : T.key : null;
          if (null != G) {
            D++, F[G] = E;
          } else {
            if (T || (void 0 !== E.splitText ? t ? E.nodeValue.trim() : 1 : t)) {
              H[Y++] = E;
            }
          }
        }
      }
      if (0 !== Va) {
        for (n = 0; n < Va; n++) {
          w = f[n];
          m = null;
          G = w.key;
          if (null != G) {
            D && void 0 !== F[G] && (m = F[G], F[G] = void 0, D--);
          } else {
            if (C < Y) {
              for (G = C; G < Y; G++) {
                if (E = void 0 !== H[G]) {
                  if (E = l = H[G], "string" === typeof w || "number" === typeof w) {
                    E = void 0 !== E.splitText;
                  } else {
                    if ("string" === typeof w.nodeName) {
                      if (T = !E.la) {
                        T = w.nodeName, T = E.Ma === T || E.nodeName.toLowerCase() === T.toLowerCase();
                      }
                      E = T;
                    } else {
                      E = t || E.la === w.nodeName;
                    }
                  }
                }
                if (E) {
                  m = l;
                  H[G] = void 0;
                  G === Y - 1 && Y--;
                  G === C && C++;
                  break;
                }
              }
            }
          }
          m = Wa(m, w, c, e);
          w = B[n];
          m && m !== p && m !== w && (null == w ? p.appendChild(m) : m === w.nextSibling ? Na(w) : p.insertBefore(m, w));
        }
      }
      if (D) {
        for (n in F) {
          void 0 !== F[n] && N(F[n], !1);
        }
      }
      for (; C <= Y;) {
        void 0 !== (m = H[Y--]) && N(m, !1);
      }
    }
  }
  c = g;
  e = b.attributes;
  b = a;
  for (k in b) {
    e && null != e[k] || null == b[k] || Oa(c, k, b[k], b[k] = void 0);
  }
  for (k in e) {
    "children" === k || "innerHTML" === k || k in b && e[k] === ("value" === k || "checked" === k ? c[k] : b[k]) || Oa(c, k, b[k], b[k] = e[k]);
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
  var e = ab.length;
  if (a.prototype && a.prototype.h) {
    var f = new a(b, c);
    O.call(f, b, c);
  } else {
    f = new O(b, c), f.constructor = a, f.h = bb;
  }
  for (; e--;) {
    if (ab[e].constructor === a) {
      f.R = ab[e].R;
      ab.splice(e, 1);
      break;
    }
  }
  return f;
}
function bb(a, b, c) {
  return this.constructor(a, c);
}
function Xa(a, b, c, e, f) {
  a.ca || (a.ca = !0, a.Aa = b.$, a.za = b.key, delete b.$, delete b.key, "undefined" === typeof a.constructor.Ka && (!a.K || f ? a.Ha && a.Ha() : a.ab && a.ab(b, e)), e && e !== a.context && (a.sa || (a.sa = a.context), a.context = e), a.ta || (a.ta = a.c), a.c = b, a.ca = !1, 0 !== c && (1 !== c && !1 === J.Vb && a.K ? Ja(a) : La(a, 1, f)), Ea(a.Aa, a));
}
function La(a, b, c, e) {
  if (!a.ca) {
    var f = a.c, g = a.state, h = a.context, k = a.ta || f, l = a.ua || g, m = a.sa || h, n = a.K, p = a.R, t = n || p, B = a.D, H = !1, F = m, D;
    a.constructor.Ka && (g = L(L({}, g), a.constructor.Ka(f, g)), a.state = g);
    n && (a.c = k, a.state = l, a.context = m, 2 !== b && a.W && !1 === a.W(f, g, h) ? H = !0 : a.Ia && a.Ia(f, g, h), a.c = f, a.state = g, a.context = h);
    a.ta = a.ua = a.sa = a.R = null;
    a.ba = !1;
    if (!H) {
      f = a.h(f, g, h);
      a.na && (h = L(L({}, h), a.na()));
      n && a.hb && (F = a.hb(k, l));
      g = f && f.nodeName;
      if ("function" === typeof g) {
        var C = Ma(f);
        if ((D = B) && D.constructor === g && C.key == D.za) {
          Xa(D, C, 1, h, !1);
        } else {
          var w = D;
          a.D = D = Za(g, C, h);
          D.R = D.R || p;
          D.Ca = a;
          Xa(D, C, 0, h, !1);
          La(D, 1, c, !0);
        }
        C = D.K;
      } else {
        p = t;
        if (w = B) {
          p = a.D = null;
        }
        if (t || 1 === b) {
          p && (p.D = null), C = Ua(p, f, h, c || !n, t && t.parentNode, !0);
        }
      }
      t && C !== t && D !== B && (h = t.parentNode) && C !== h && (h.replaceChild(C, t), w || (t.D = null, N(t, !1)));
      w && Ya(w);
      if ((a.K = C) && !e) {
        for (w = t = a; w = w.Ca;) {
          (t = w).K = C;
        }
        C.D = t;
        C.la = t.constructor;
      }
    }
    !n || c ? Qa.push(a) : H || (a.Ga && a.Ga(k, l, F), J.Za && J.Za(a));
    for (; a.da.length;) {
      a.da.pop().call(a);
    }
    Ra || e || Ta();
  }
}
function Ya(a) {
  J.$a && J.$a(a);
  var b = a.K;
  a.ca = !0;
  a.fa && a.fa();
  a.K = null;
  var c = a.D;
  c ? Ya(c) : b && (null != b.__preactattr_ && Ea(b.__preactattr_.$, null), a.R = b, Na(b), ab.push(a), $a(b));
  Ea(a.Aa, null);
}
function O(a, b) {
  this.ba = !0;
  this.context = b;
  this.c = a;
  this.state = this.state || {};
  this.da = [];
}
L(O.prototype, {a:function(a, b) {
  this.ua || (this.ua = this.state);
  this.state = L(L({}, this.state), "function" === typeof a ? a(this.state, this.c) : a);
  b && this.da.push(b);
  Ja(this);
}, cb:function(a) {
  a && this.da.push(a);
  La(this, 2);
}, h:function() {
}});
var cb = {};
function db(a, b) {
  return a.ja < b.ja ? 1 : a.ja > b.ja ? -1 : a.index - b.index;
}
function eb(a, b) {
  try {
    return a.index = b, a.ja = a.attributes.default ? 0 : fb(a.attributes.path).map(gb).join(""), a.attributes;
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
;var P = null, Q = [], hb = [];
function ib() {
  var a;
  P && P.location ? a = P.location : P && P.gb ? a = P.gb() : a = "undefined" !== typeof location ? location : {};
  return "" + (a.pathname || "") + (a.search || "");
}
function jb(a) {
  for (var b = !1, c = 0; c < Q.length; c++) {
    !0 === kb(Q[c], a) && (b = !0);
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
        for (var e = Q.length; e--;) {
          if (0 < mb(Q[e].c.children, a, !1).length) {
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
  qb || ("function" === typeof addEventListener && (P || addEventListener("popstate", function() {
    jb(ib());
  }), addEventListener("click", pb)), qb = !0);
}
function sb(a) {
  O.call(this, a);
  a.history && (P = a.history);
  this.state = {url:a.url || ib()};
  rb();
}
u(sb, O);
d = sb.prototype;
d.W = function(a) {
  return !0 !== a.Tb ? !0 : a.url !== this.c.url || a.m !== this.c.m;
};
function kb(a, b) {
  a.b = !1;
  a.a({url:b});
  if (a.updating) {
    return 0 < mb(a.c.children, b, !1).length;
  }
  a.cb();
  return a.b;
}
d.Ha = function() {
  Q.push(this);
  this.updating = !0;
};
d.o = function() {
  var a = this;
  P && (this.g = P.Nb(function(b) {
    kb(a, "" + (b.pathname || "") + (b.search || ""));
  }));
  this.updating = !1;
};
d.fa = function() {
  "function" === typeof this.g && this.g();
  Q.splice(Q.indexOf(this), 1);
};
d.Ia = function() {
  this.updating = !0;
};
d.Ga = function() {
  this.updating = !1;
};
function mb(a, b, c) {
  return a.filter(eb).sort(db).map(function(a) {
    var e = b;
    var g = a.attributes.path, h = a.attributes, k = /(?:\?([^#]*))?(#.*)?$/, l = e.match(k), m = {};
    if (l && l[1]) {
      l = l[1].split("&");
      for (var n = 0; n < l.length; n++) {
        var p = l[n].split("=");
        m[decodeURIComponent(p[0])] = decodeURIComponent(p.slice(1).join("="));
      }
    }
    e = fb(e.replace(k, ""));
    g = fb(g || "");
    k = Math.max(e.length, g.length);
    for (l = 0; l < k; l++) {
      if (g[l] && ":" === g[l].charAt(0)) {
        n = g[l].replace(/(^:|[+*?]+$)/g, "");
        p = (g[l].match(/[+*?]+$/) || cb)[0] || "";
        var t = ~p.indexOf("+"), B = ~p.indexOf("*"), H = e[l] || "";
        if (!H && !B && (0 > p.indexOf("?") || t)) {
          var F = !1;
          break;
        }
        m[n] = decodeURIComponent(H);
        if (t || B) {
          m[n] = e.slice(l).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (g[l] !== e[l]) {
          F = !1;
          break;
        }
      }
    }
    if (e = !0 !== h.default && !1 === F ? !1 : m) {
      return !1 !== c ? (e = Object.assign({}, {url:b, matches:e}, e), delete e.$, delete e.key, Ga(a, e)) : a;
    }
  }).filter(Boolean);
}
d.h = function(a, b) {
  var c = a.m;
  b = b.url;
  a = mb(a.children, b, !0);
  var e = a[0] || null;
  this.b = !!e;
  var f = this.l;
  b !== f && (this.l = b, "function" === typeof c && c({Sb:this, url:b, Rb:f, active:a, current:e}));
  return e;
};
function tb(a) {
  return K("a", Object.assign({}, a, {onClick:nb}));
}
function ub() {
  O.call(this);
  this.b = this.b.bind(this);
}
u(ub, O);
ub.prototype.b = function(a) {
  this.g = a;
  this.a({});
};
ub.prototype.o = function() {
  hb.push(this.b);
};
ub.prototype.fa = function() {
  hb.splice(hb.indexOf(this.b) >>> 0, 1);
};
ub.prototype.h = function(a) {
  var b = this.g || ib(), c = b.replace(/\?.+$/, "");
  this.g = null;
  var e = a.children.filter(function(a) {
    return "function" == typeof a;
  });
  return e[0] && e[0]({url:b, path:c, matches:c === a.path});
};
function R(a) {
  var b = Object.assign({}, a), c = void 0 === a.Da ? "active" : a.Da;
  a = a.path;
  var e = (delete b.Da, delete b.path, b);
  return K(ub, {path:a || e.href}, function(a) {
    return K(tb, Object.assign({}, e, {className:[e.Hb || e.className, a.matches && c].filter(Boolean).join(" ")}));
  });
}
;function vb(a) {
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
function wb(a) {
  var b = Object.assign({}, a), c = a.Oa;
  a = a.className;
  b = (delete b.Oa, delete b.className, b);
  return K("a", Object.assign({}, b, {className:a, href:"#", onClick:function(a) {
    a.preventDefault();
    c(a);
    return !1;
  }}));
}
function xb(a) {
  var b = a.xa, c = a.type, e = a.value;
  a = {required:a.required, name:a.name, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), id:a.id, "aria-describedby":a.I};
  return b ? K("textarea", Object.assign({}, a, {rows:"number" == typeof b ? b : 3}), e) : K("input", Object.assign({}, a, e ? {value:e} : {}, {type:c}));
}
function yb(a) {
  var b = a.label, c = void 0 === a.type ? "text" : a.type, e = a.placeholder, f = a.i, g = a.xa, h = a.file, k = a.options, l = a.nb, m = "i" + 100000 * Math.random(), n = "h" + m;
  a = {I:n, id:m, value:a.value, name:a.name, required:a.required};
  c = k ? K(zb, Object.assign({}, a, {options:k, nb:l})) : K(xb, Object.assign({}, a, {xa:g, placeholder:e, type:c, file:h}));
  return K("div", {className:"form-group"}, K("label", {htmlFor:m}, b), c, f && K("small", {id:n, dangerouslySetInnerHTML:{ka:f}, className:"form-text text-muted"}));
}
function zb(a) {
  var b = a.options, c = a.value;
  return K("select", {name:a.name, value:c, required:a.required, className:"custom-select", id:a.id, "aria-describedby":a.I}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == c}, a.title);
  }));
}
function U(a) {
  return K("span", {}, K("i", {className:a.icon}), " ");
}
function Ab(a) {
  O.apply(this, arguments);
}
u(Ab, O);
Ab.prototype.W = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Ab.prototype.o = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.m;
  void 0 !== b && c(a, b);
};
Ab.prototype.h = function(a) {
  var b = a.name, c = a.label, e = a.value, f = this.context, g = f.id, h = f.m, k = void 0 === f.values ? {} : f.values;
  return K("div", {className:"custom-control custom-switch"}, K("input", {required:void 0 !== a.required, name:b, checked:b in k ? k[b] : e, id:g, type:"checkbox", className:"custom-control-input", "aria-described-by":f.I, onChange:function(a) {
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
  var b = a.s;
  return b ? K("div", {className:"alert alert-success mt-3", role:"alert"}, a.message || b) : null;
}
;function Db() {
  return K("nav", {className:"nav flex-column"}, K(R, {className:"nav-link", href:"/admin"}, K("i", {className:"fab fa-kickstarter-k"}), " Главная"), K(R, {className:"nav-link", href:"/admin/objects"}, K("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), K(R, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, K("i", {className:"fas fa-home"}), " Новая Недвижимость"), K(R, {className:"nav-link", href:"/admin/categories"}, K("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), K(R, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, K("i", {className:"fas fa-folder-plus"}), " Добавить"), K(R, {className:"nav-link", href:"/admin/pages"}, K("i", {className:"fas fa-font"}), " Статьи"), K(R, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, K("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), K(R, {className:"nav-link", href:"/admin/special"}, K("i", {className:"fas fa-bolt"}), " Спец. Предложения"), 
  K(R, {className:"nav-link", href:"/admin/offers"}, K("i", {className:"fas fa-grip-lines"}), " Акции"), K(R, {className:"nav-link", href:"/admin/galleries/"}, K("i", {className:"fas fa-camera-retro"}), " Галереи"));
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
;function Eb() {
  O.call(this);
  this.state = {f:!1};
}
u(Eb, O);
function Fb(a) {
  var b, c, e, f;
  return I(function(g) {
    switch(g.b) {
      case 1:
        return a.a({f:!0}), x(g, 2, 3), v(g, fetch("/admin-data?" + a.c.path, {method:"POST"}), 5);
      case 5:
        return b = g.g, v(g, b.json(), 6);
      case 6:
        c = g.g, (e = c.error) ? a.a({error:e}) : (a.c.G(), a.c.ha());
      case 3:
        z(g);
        a.a({f:!1});
        A(g, 0);
        break;
      case 2:
        f = y(g), a.a({error:f}), g.v(3);
    }
  });
}
Eb.prototype.h = function(a) {
  var b = this, c = a.text, e = a.G, f = void 0 === a.X ? "primary" : a.X, g = a.j, h = void 0 === a.L ? "Отмена" : a.L;
  return K("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:e, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, K("p", {}, c)), K("div", {className:"modal-footer"}, 
  K("button", {onClick:e, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, h), K("button", {disabled:this.state.f, type:"button", className:"btn btn-" + f, onClick:function() {
    return Fb(b);
  }}, this.state.f ? "Отправка..." : g)))));
};
function Gb(a) {
  O.apply(this, arguments);
}
u(Gb, O);
Gb.prototype.h = function(a) {
  var b = a.children, c = a.G;
  return K("div", {className:"EditModal modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, K("div", {className:"modal-dialog", role:"document"}, K("div", {className:"modal-content"}, K("div", {className:"modal-header"}, K("h5", {className:"modal-title"}, a.title), K("button", {onClick:c, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, K("span", {"aria-hidden":"true"}, "×"))), K("div", {className:"modal-body"}, b))));
};
function Hb() {
  O.call(this);
  this.state = {f:!1, data:[]};
}
u(Hb, O);
Hb.prototype.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
Hb.prototype.load = function() {
  var a = this, b, c, e, f, g;
  return I(function(h) {
    switch(h.b) {
      case 1:
        return a.a({f:!0}), x(h, 2, 3), v(h, V("/admin-data?categories"), 5);
      case 5:
        return b = h.g, v(h, b.json(), 6);
      case 6:
        c = h.g, e = c.error, f = c.data, e ? a.a({error:e}) : a.a({data:f});
      case 3:
        z(h);
        a.a({f:!1});
        A(h, 0);
        break;
      case 2:
        g = y(h), a.a({error:g}), h.v(3);
    }
  });
};
Hb.prototype.h = function() {
  var a = this;
  return K(S, {}, K("h1", {}, "Категории Каталога"), K("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), this.state.f && K("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return K(Ib, Object.assign({}, c, {key:b, id:b, pa:function() {
      return a.load();
    }}));
  }));
};
function Ib() {
  O.call(this);
  this.state = {u:null};
}
u(Ib, O);
Ib.prototype.h = function() {
  var a = this, b = this.c, c = b.title, e = b.description, f = b.seo, g = b.id, h = b.pa;
  return K(vb, {className:"CategoryRow"}, K(S, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"})), K(S, {}, K("h2", {}, c), K("em", {}, "knedv.ru/", f), K("p", {}, e)), K(S, {className:"col-1 CategoryMeta"}, K("a", {href:"/admin/add-category/" + g, style:"color:brown;"}, K(U, {icon:"fas fa-pen"})), K("br"), K("a", {onClick:function(b) {
    b.preventDefault();
    a.a({u:{text:K("span", {}, "Вы действительно хотите удалить категорию ", K("strong", {}, c), "?"), j:"Удалить", title:"Удаление Категории", path:"categories&id=" + g + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"far fa-trash-alt"}))), this.state.u && K(Eb, Object.assign({}, this.state.u, {G:function() {
    a.a({u:null});
  }, X:"danger", ha:h})));
};
function Jb() {
  O.call(this);
  this.c = this.c;
}
u(Jb, O);
Jb.prototype.W = function(a, b, c) {
  a = this.c.name;
  return this.context.values[a] != c.values[a];
};
Jb.prototype.o = function() {
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.m;
  c && void 0 !== b && c(a, b);
};
Jb.prototype.h = function(a) {
  var b = a.options, c = a.name, e = a.value, f = this.context, g = f.m, h = void 0 === f.values ? {} : f.values;
  return K("select", {name:c, value:c in h ? h[c] : e, required:a.required, className:"custom-select", id:f.id, "aria-describedby":f.I, onChange:function(a) {
    g(c, a.currentTarget.value);
  }}, K("option"), b.map(function(a) {
    var b = a.value;
    return K("option", {key:b, value:b, selected:b == e}, a.title);
  }));
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
  var a = this.c, b = r(a.children).next().value;
  a = a.name;
  var c = this.context.m;
  b && c(a, b.trim());
};
Kb.prototype.h = function(a) {
  var b = a.name, c = a.children, e = this.context, f = e.m, g = void 0 === e.values ? {} : e.values;
  return K("textarea", {required:a.required, name:b, placeholder:a.placeholder, "aria-describedby":e.I, className:"form-control", id:e.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }, rows:void 0 === a.rows ? 3 : a.rows}, b in g ? g[b] : c);
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
  var a = this.c, b = a.value;
  a = a.name;
  var c = this.context.m;
  void 0 !== b && c(a, b);
};
Lb.prototype.h = function(a) {
  var b = a.name, c = a.value, e = this.context, f = e.m, g = void 0 === e.values ? {} : e.values;
  return K("input", {required:a.required, name:b, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), value:b in g ? g[b] : c, type:void 0 === a.type ? "text" : a.type, "aria-describedby":e.I, id:e.id, onChange:function(a) {
    f(b, a.currentTarget.value);
  }});
};
function Mb() {
  O.call(this);
  this.c = this.c;
  this.state = {B:!1, error:null, s:null};
}
u(Mb, O);
Mb.prototype.submit = function(a) {
  var b = this, c, e, f, g, h;
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
        return v(k, V(b.c.path, {method:"POST", body:c}), 5);
      case 5:
        return e = k.g, v(k, e.json(), 6);
      case 6:
        f = k.g, (g = f.error) ? b.a({error:g}) : b.a({s:1});
      case 3:
        z(k);
        b.a({B:!1});
        A(k, 4);
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
        return v(k, b.c.S(e), 7);
      case 7:
        return k.return(!1);
    }
  });
};
Mb.prototype.reset = function() {
  this.a({error:null, s:null});
};
function W() {
  O.call(this);
  this.state = {values:{}};
  this.c = this.c;
}
u(W, O);
W.prototype.na = function() {
  return {values:this.state.values, m:this.m.bind(this)};
};
W.prototype.m = function(a, b) {
  var c = {};
  this.a({values:Object.assign({}, this.state.values, (c[a] = b, c))});
  this.c.m && this.c.m(this.state.values);
};
W.prototype.h = function(a) {
  var b = Object.assign({}, a), c = a.children, e = a.eb;
  a = a.V;
  b = (delete b.children, delete b.eb, delete b.V, delete b.m, b);
  return K("form", Object.assign({}, b, {ref:e, onSubmit:a}), c);
};
function X() {
  O.call(this);
  this.id = "i" + Math.floor(100000 * Math.random());
  this.I = "h" + this.id;
  this.c = this.c;
}
u(X, O);
X.prototype.na = function() {
  return {id:this.id, I:this.I};
};
X.prototype.h = function() {
  var a = this.c, b = a.children, c = a.label;
  a = a.i;
  return K("div", {className:"form-group"}, c && K("label", {htmlFor:this.id}, c), b, a && K("small", {id:this.I, dangerouslySetInnerHTML:{ka:a}, className:"form-text text-muted"}));
};
function Nb(a) {
  var b = a.f, c = a.j, e = void 0 === a.Z ? c : a.Z;
  a = ["btn", "btn-" + ((void 0 === a.outline ? 0 : a.outline) ? "outline-" : "") + (void 0 === a.type ? "primary" : a.type), a.className].filter(Boolean);
  return K("button", {className:a.join(" "), type:"submit", disabled:b}, b && K("span", {className:"spinner-border spinner-border-sm" + (e ? " mr-2" : ""), role:"status", "aria-hidden":"true"}), b ? e : c);
}
var Z = {get Wa() {
  return Jb;
}, get aa() {
  return Kb;
}, get J() {
  return Lb;
}, get N() {
  return Mb;
}};
function Ob() {
  return K("span", {className:"echo-loader"}, "Loading…");
}
function Pb() {
  var a = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (a.outerHeight / 2 + a.screenY - 325 - 50) + ",left=" + (a.outerWidth / 2 + a.screenX - 450));
}
;function Qb(a) {
  var b = a.article, c = a.ra;
  a = a.name;
  return K("div", {className:"form-group"}, K("label", {}, "Статья"), K("div", {dangerouslySetInnerHTML:{ka:b}, className:"mb-3 ArticleHolder"}), K("a", {onClick:function(a) {
    a.preventDefault();
    window.editorCallback = function(a) {
      e.close();
      c(a);
    };
    window.editorGetData = function() {
      return b;
    };
    var e = Pb();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"), K("input", {name:a, type:"hidden", value:b}));
}
;function Rb() {
  O.call(this);
  this.state = {Ra:!1};
  this.c = this.c;
}
u(Rb, O);
Rb.prototype.h = function(a) {
  var b = this, c = a.A, e = a.required, f = a.image;
  a = a.i;
  var g = this.state.Ra;
  if (c && !g) {
    return K(X, {i:a, label:"Изображение"}, K("br"), K("img", {src:f, className:"img-fluid"}), K("a", {onClick:function(a) {
      a.preventDefault();
      b.a({Ra:!0});
      return !1;
    }, href:"#", className:"btn btn-outline-warning"}, "Изменить"));
  }
  if (!c || g) {
    return K(X, {i:a, label:"Изображение"}, K(Z.J, {required:e, name:"image", type:"file", file:"1"}));
  }
};
function Sb() {
  O.call(this);
  this.state = {f:!1, data:{}, hint:"москва-новостройки", article:""};
}
u(Sb, O);
Sb.prototype.o = function() {
  var a = this, b, c, e, f, g, h, k, l;
  return I(function(m) {
    switch(m.b) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return m.return();
        }
        a.a({A:1, f:!0});
        x(m, 2, 3);
        return v(m, V("/admin-data?categories&id=" + a.c.id), 5);
      case 5:
        return c = m.g, v(m, c.json(), 6);
      case 6:
        e = m.g, f = e.error, g = e.data, f ? a.a({error:f}) : (h = r(g), k = h.next().value, a.a({data:k, hint:k.seo, article:k.article}));
      case 3:
        z(m);
        a.a({f:!1});
        A(m, 0);
        break;
      case 2:
        l = y(m), a.a({error:l}), m.v(3);
    }
  });
};
Sb.prototype.submit = function(a) {
  var b = this, c, e, f, g, h;
  return I(function(k) {
    switch(k.b) {
      case 1:
        return b.a({error:null}), a.preventDefault(), c = new FormData(a.currentTarget.data), b.a({B:!0}), x(k, 2, 3), v(k, V("/admin-data?categories", {method:"POST", body:c}), 5);
      case 5:
        return e = k.g, v(k, e.json(), 6);
      case 6:
        f = k.g, (g = f.error) ? b.a({error:g}) : b.a({s:1});
      case 3:
        z(k);
        b.a({B:!1});
        A(k, 4);
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
Sb.prototype.oa = function() {
  return "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.";
};
Sb.prototype.h = function() {
  var a = this, b = this.oa(), c = this.state.A;
  return K(S, {}, K("h1", {}, this.state.A ? "Редактировать" : "Добавить", " Категорию"), c && this.state.f && K("span", {className:"echo-loader"}, "Loading…"), !(c && this.state.f) && K(W, {m:function(a) {
    console.log(a);
    console.log(a.seo);
  }, V:this.submit.bind(this)}, K(X, {label:"Название", i:"Название для меню слева."}, K(Z.J, {value:this.state.data.title, name:"title", placeholder:"Москва Новостройки", required:!0})), K(X, {i:b, label:"СЕО Название"}, K(Z.J, {value:this.state.data.seo, required:!0, name:"seo", placeholder:"москва-новостройки"})), K(X, {label:"Описание", i:"Краткое описание для главной страницы."}, K(Z.aa, {rows:"3", required:!0, name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  this.state.data.description)), K(Rb, {A:c, i:"Картинка, отображаемая на главной странице.", required:!0}), K(Qb, {article:this.state.article, ra:function(b) {
    a.a({article:b});
  }}), c && K("input", {value:this.c.id, type:"hidden", name:"id"}), K("button", {disabled:this.state.B, type:"submit", className:"btn btn-primary"}, this.state.B ? "Загрузка..." : c ? "Сохранить" : "Добавить"), K(Bb, {error:this.state.error}), K(Cb, {s:this.state.error, message:"Категория успешно " + (c ? "сохранена" : "создана") + "!"})));
};
function Tb() {
  var a = Z.N.call(this) || this;
  Object.assign(a.state, {f:!1, data:{}, Fa:[], hint:"1-комнатные-апартаменты-воскресенское", Ea:"апартаменты", article:""});
  return a;
}
u(Tb, Z.N);
Tb.prototype.o = function() {
  var a = this, b, c, e, f, g, h, k, l, m, n;
  return I(function(p) {
    switch(p.b) {
      case 1:
        return v(p, Ub(a), 2);
      case 2:
        b = !!a.c.id;
        if (!b) {
          return p.return();
        }
        a.a({A:1, f:!0});
        x(p, 3, 4);
        return v(p, V("/admin-data?objects&id=" + a.c.id), 6);
      case 6:
        return c = p.g, v(p, c.json(), 7);
      case 7:
        e = p.g, f = e.error, g = e.data, f ? a.a({error:f}) : (h = r(g), k = h.next().value, a.a({data:k, hint:k.seo, Ea:k.categorySeo, article:k.article}));
      case 4:
        z(p);
        a.a({f:!1});
        A(p, 0);
        break;
      case 3:
        m = l = y(p), n = m.message, a.a({error:n}), p.v(4);
    }
  });
};
function Ub(a) {
  var b, c, e, f, g, h;
  return I(function(k) {
    switch(k.b) {
      case 1:
        return a.a({f:!0}), x(k, 2, 3), v(k, V("/admin-data?categories"), 5);
      case 5:
        return b = k.g, v(k, b.json(), 6);
      case 6:
        c = k.g, e = c.error, f = c.data, e ? a.a({error:e}) : (g = f.map(function(a) {
          return {value:a._id, title:a.title};
        }), a.a({Fa:g}));
      case 3:
        z(k);
        a.a({f:!1});
        A(k, 0);
        break;
      case 2:
        h = y(k), a.a({error:h}), k.v(3);
    }
  });
}
Tb.prototype.oa = function() {
  return "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.Ea + "/<strong>" + this.state.hint + "</strong>.";
};
Tb.prototype.h = function(a) {
  var b = this, c = a.G, e = void 0 === a.L ? "Отмена" : a.L, f = a.T, g = void 0 === a.j ? "Добавить" : a.j;
  a = a.title;
  var h = this.oa(), k = this.state, l = k.Fa, m = k.B, n = k.data, p = k.f, t = k.error;
  k = k.s;
  c = K(W, {V:this.submit.bind(this)}, K(X, {i:"Название для каталога недвижимости.", label:"Название"}, K(Z.J, {value:n.title, name:"title", required:!0, placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское"})), K(X, {i:"Цена объекта", label:"Цена"}, K(Z.J, {value:n.price, name:"price", required:!0, placeholder:"3 000 000 руб."})), K(X, {i:h, label:"СЕО Название"}, K(Z.J, {value:n.seo, name:"seo", required:!0, placeholder:"1-комнатные-апартаменты-воскресенское"})), K(X, {i:"Описание объекта.", 
  label:"Описание"}, K(Z.aa, {rows:10, name:"description", required:!0, placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично)."}, 
  n.description)), K(Rb, {A:this.A, i:"Картинка, отображаемая на главной странице.", required:!0, image:n.cdnImage}), K(Qb, {article:this.state.article, name:"article", ra:function(a) {
    b.a({article:a});
  }}), this.A && K("input", {value:this.c.id, type:"hidden", name:"id"}), K(X, {label:"Раздел", i:"Категория в каталоге"}, K(Z.Wa, {options:l, name:"category", value:n.category, required:!0})), K(Bb, {error:t}), K(Cb, {s:k, message:f}), K(Nb, {j:g, f:m, Z:"Загрузка..."}), c && K("button", {onClick:c, type:"button", className:"FormCancelBtn btn btn-secondary"}, e));
  return K(S, {}, a && K("h1", {}, a), p && K(Ob), !p && c);
};
q.Object.defineProperties(Tb.prototype, {A:{configurable:!0, enumerable:!0, get:function() {
  return !!this.c.id;
}}});
function Vb(a) {
  var b = this, c, e, f, g, h;
  return I(function(k) {
    switch(k.b) {
      case 1:
        return b.a({f:!0}), x(k, 2, 3), v(k, V("/admin-data?" + a), 5);
      case 5:
        return c = k.g, v(k, c.json(), 6);
      case 6:
        return e = k.g, f = e.error, g = e.data, f ? (b.a({error:f}), k.return()) : k.return(g);
      case 3:
        z(k);
        b.a({f:!1});
        A(k, 0);
        break;
      case 2:
        h = y(k), b.a({error:h}), k.v(3);
    }
  });
}
;function Wb() {
  O.call(this);
  this.state = {f:!1, data:[], u:null, U:null};
}
u(Wb, O);
d = Wb.prototype;
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
      return v(c, Vb.bind(a)("objects"), 2);
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
  return K(S, {}, K("h1", {}, "Объекты Недвижимости"), K("p", {}, "На сайт добалены следующие объекты:"), K(Xb, {data:this.state.data, f:this.state.f, H:this.H.bind(this), w:this.w.bind(this)}), this.state.u && K(Eb, Object.assign({}, this.state.u, {G:this.H.bind(this, null), X:"danger", ha:this.load.bind(this)})), this.state.U && K(Gb, {G:this.w.bind(this, null), title:"Редактирование Объекта"}, K(Tb, {id:this.state.U._id, S:this.load.bind(this), G:this.w.bind(this, null), path:"/admin-data?objects", 
  L:"Отмена", T:"Объект успешно отредактирован!", j:"Сохранить"})));
};
function Xb(a) {
  var b = a.data, c = a.H, e = a.w;
  a = a.f;
  return K("div", {}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет объектов недвижимости.", b.map(function(a) {
    return K(Yb, {item:a, key:a._id, H:c, w:e});
  }));
}
function Yb(a) {
  O.apply(this, arguments);
}
u(Yb, O);
Yb.prototype.h = function(a) {
  var b = a.item, c = a.H, e = a.w, f = b.title;
  a = b.description;
  var g = b._id, h = b.price, k = "/каталог/" + b.categorySeo + "/" + b.seo, l = "knedv.ru" + k;
  return K(vb, {className:"CategoryRow"}, K(S, {className:"col-3 col-sm-4 "}, K("img", {src:b.image, className:"img-fluid p-1"}), h && "Цена: " + h), K(S, {}, K("h2", {}, f), K("em", {}, K("a", {href:k}, l)), K("p", {}, a)), K(S, {className:"col-1 CategoryMeta"}, K("br"), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить объект ", K("strong", {}, f), "?"), j:"Удалить", title:"Удаление Объекта", path:"objects&id=" + g + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    e(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"fas fa-pen"}))));
};
function Zb(a) {
  return K(Tb, {S:a.Ob, title:"Добавить Объект", path:"/admin-data?objects", T:"Объект успешно добавлен!", j:"Добавить"});
}
;function $b() {
  O.call(this);
  this.state = {f:!1, data:[]};
}
u($b, O);
$b.prototype.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
$b.prototype.load = function() {
  var a = this, b, c, e, f, g;
  return I(function(h) {
    switch(h.b) {
      case 1:
        return a.a({f:!0}), x(h, 2, 3), v(h, V("/admin-data?pages"), 5);
      case 5:
        return b = h.g, v(h, b.json(), 6);
      case 6:
        c = h.g, e = c.error, f = c.data, e ? a.a({error:e}) : a.a({data:f});
      case 3:
        z(h);
        a.a({f:!1});
        A(h, 0);
        break;
      case 2:
        g = y(h), a.a({error:g}), h.v(3);
    }
  });
};
$b.prototype.h = function() {
  var a = this;
  return K(S, {}, K("h1", {}, "Материалы Сайта"), K("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.f && K("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return K(ac, Object.assign({}, c, {key:b, id:b, pa:function() {
      return a.load();
    }}));
  }));
};
function ac() {
  O.call(this);
  this.state = {u:null};
}
u(ac, O);
ac.prototype.h = function() {
  var a = this, b = this.c, c = b.seo, e = b.id, f = b.description, g = b.pa, h = b.title;
  return K(vb, {className:"CategoryRow"}, K(S, {}, K("h2", {}, h), K("em", {}, "knedv.ru/", c), K("p", {}, f)), K(S, {className:"col-1 CategoryMeta"}, K("a", {href:"/admin/add-page/" + e, style:"color:brown;"}, K(U, {icon:"fas fa-pen"})), K("br"), K("a", {onClick:function(b) {
    b.preventDefault();
    a.a({u:{text:K("span", {}, "Вы действительно хотите удалить страницу ", K("strong", {}, h), "?"), j:"Удалить", title:"Удаление Страницы", path:"pages&id=" + e + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"far fa-trash-alt"}))), this.state.u && K(Eb, Object.assign({}, this.state.u, {G:function() {
    a.a({u:null});
  }, X:"danger", ha:g})));
};
function bc() {
  O.call(this);
  this.state = {f:!1, data:{}, article:""};
}
u(bc, O);
bc.prototype.o = function() {
  var a = this, b, c, e, f, g, h, k, l, m, n;
  return I(function(p) {
    switch(p.b) {
      case 1:
        b = !!a.c.id;
        if (!b) {
          return p.return();
        }
        a.a({A:1, f:!0});
        x(p, 2, 3);
        return v(p, V("/admin-data?pages&id=" + a.c.id), 5);
      case 5:
        return c = p.g, v(p, c.json(), 6);
      case 6:
        e = p.g, f = e.error, g = e.data, f ? a.a({error:f}) : (h = r(g), k = h.next().value, a.a({data:k, article:k.article}));
      case 3:
        z(p);
        a.a({f:!1});
        A(p, 0);
        break;
      case 2:
        m = l = y(p), n = m.message, a.a({error:n}), p.v(3);
    }
  });
};
bc.prototype.submit = function(a) {
  var b = this, c, e, f, g, h;
  return I(function(k) {
    switch(k.b) {
      case 1:
        return b.a({error:null}), a.preventDefault(), c = new FormData(b.form), c.append("article", b.state.article), b.a({B:!0}), x(k, 2, 3), v(k, V("/admin-data?pages", {method:"POST", body:c}), 5);
      case 5:
        return e = k.g, v(k, e.json(), 6);
      case 6:
        f = k.g, (g = f.error) ? b.a({error:g}) : b.a({s:1});
      case 3:
        z(k);
        b.a({B:!1});
        A(k, 4);
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
bc.prototype.h = function() {
  var a = this, b = this.state.A;
  return K(S, {}, K("h1", {}, this.state.A ? "Редактировать" : "Добавить", " Страницу"), b && this.state.f && K("span", {className:"echo-loader"}, "Loading…"), !(b && this.state.f) && K("form", {ref:function(b) {
    return a.form = b;
  }, onSubmit:this.submit.bind(this)}, K(yb, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", i:"Название для администратора.", required:"1"}), K(yb, {i:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), K(yb, {xa:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", i:"Описание страницы.", value:this.state.data.description, required:"1"}), 
  K(Qb, {article:this.state.article, ra:function(b) {
    a.a({article:b});
  }}), b && K("input", {value:this.c.id, type:"hidden", name:"id"}), K("button", {disabled:this.state.B, type:"submit", className:"btn btn-primary"}, this.state.B ? "Загрузка..." : b ? "Сохранить" : "Добавить"), this.state.error && K("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.s && K("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", b ? "сохранена" : "создана", "!")));
};
function cc(a) {
  return Z.N.apply(this, arguments) || this;
}
u(cc, Z.N);
cc.prototype.h = function(a) {
  var b = this, c = a.item, e = a.G, f = void 0 === a.L ? "Отмена" : a.L, g = a.T;
  a = void 0 === a.j ? "Добавить" : a.j;
  var h = c || {}, k = this.state, l = k.B, m = k.error;
  k = k.s;
  return K(W, {V:this.submit.bind(this), m:function() {
    b.a({error:null, s:null});
  }}, K(X, {label:"Название", i:"Заголовок для главной страницы, напр., Ленинский проспект, дом 114"}, K(Z.J, {value:h.title, placeholder:"Название акции", name:"title", required:!0})), K(X, {label:"Описание", i:"Введите описание акции..."}, K(Z.aa, {name:"description", required:!0, placeholder:"Описание акции"}, h.description)), K(Rb, {A:c, i:"Картинка, отображаемая на главной странице.", required:!0, image:h.cdnImage}), K(X, {label:"Цена", i:"Задайте цену..."}, K(Z.J, {value:h.price, name:"price", 
  placeholder:"55 000 000 руб."})), K(X, {label:"Переход", i:"Ссылка на страницу каталога, или сайта."}, K(Z.J, {value:h.href, name:"href", placeholder:"/каталог/москва-элитная/лениниский-проспект-дом-114"})), K(X, {i:"Добавить в специальные предложения на главной."}, K(Ab, {value:h.show_on_main, label:"Отображать на главной", name:"show_on_main"})), c && K("input", {value:h._id, type:"hidden", name:"id"}), K(Bb, {error:m}), K(Cb, {s:k, message:g}), K(Nb, {j:a, f:l, Z:"Загрузка..."}), e && K("button", 
  {onClick:e, type:"button", className:"FormCancelBtn btn btn-secondary"}, f));
};
function dc() {
  O.call(this);
  this.state = {f:!1, data:[]};
}
u(dc, O);
d = dc.prototype;
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
      return v(c, Vb.bind(a)("specials"), 2);
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
  var a = this, b = K("details", {}, K("summary", {}, K("h3", {style:"display: inline-block;vertical-align: middle;"}, "Создать Новое Предложение")), K(cc, {S:function() {
    a.load();
  }, path:"/admin-data?specials", T:"Предложение успешно создано!", j:"Добавить"}));
  return K(S, {}, K("h1", {}, "Специальные Предложения"), K(ec, {data:this.state.data, f:this.state.f, H:this.H.bind(this), w:this.w.bind(this)}), K("hr"), b, this.state.u && K(Eb, Object.assign({}, this.state.u, {G:this.H.bind(this, null), X:"danger", ha:this.load.bind(this)})), this.state.U && K(Gb, {G:this.w.bind(this, null), title:"Редактирование"}, K(cc, {item:this.state.U, S:this.load.bind(this), G:this.w.bind(this, null), path:"/admin-data?specials", L:"Отмена", T:"Предложение успешно отредактировано!", 
  j:"Сохранить"})));
};
function ec(a) {
  var b = a.data, c = a.H, e = a.w;
  a = a.f;
  return K("div", {style:"height:25rem;overflow:scroll;background:wheat; padding:0.5rem;"}, a && K("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет специальных предложений.", b.map(function(a) {
    return K(fc, {item:a, key:a._id, H:c, w:e});
  }));
}
function fc(a) {
  var b = a.item, c = a.H, e = a.w, f = b._id, g = b.title;
  a = b.cdnImage;
  var h = b.description, k = b.price, l = "on" == b.show_on_main;
  return K("div", {className:l ? "IsShownOnMain" : "", style:"border-bottom:1px solid brown;border-top:1px solid lightcoral;"}, K("h4", {}, g, " ", l && K("span", {className:"badge badge-danger"}, "На главной")), K("p", {}, K("img", {src:a, style:"display:block;"}), h, K("span", {style:"font-weight: bold;"}, " ", k)), K("a", {onClick:function(a) {
    a.preventDefault();
    c({text:K("span", {}, "Вы действительно хотите удалить предложение ", K("strong", {}, g), "?"), j:"Удалить", title:"Удаление Предложения", path:"specials&id=" + f + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"far fa-trash-alt"})), K("a", {onClick:function(a) {
    a.preventDefault();
    e(b);
    return a;
  }, style:"color:brown;", href:"#"}, K(U, {icon:"fas fa-pen"})));
}
;function gc(a) {
  return Z.N.apply(this, arguments) || this;
}
u(gc, Z.N);
gc.prototype.h = function(a) {
  var b = this, c = a.item, e = a.G, f = void 0 === a.L ? "Отмена" : a.L, g = a.T;
  a = void 0 === a.j ? "Добавить" : a.j;
  var h = c || {}, k = this.state, l = k.B, m = k.error;
  k = k.s;
  return K(W, {V:this.submit.bind(this), m:function() {
    b.reset();
  }}, K(X, {label:"Название", i:"Заголовок альбома для выбора на странице объекта."}, K(Z.J, {value:h.title, placeholder:"Мосфильмовская, дом 70к6", name:"title", required:!0})), K(X, {label:"Описание", i:"Введите описание акции..."}, K(Z.aa, {name:"description", required:!0, placeholder:"Описание Альбома"}, h.description)), K(Rb, {A:c, i:"Картинка для узнаваемости.", required:!0, image:h.cdnImage}), c && K("input", {value:h._id, type:"hidden", name:"id"}), K(Bb, {error:m}), K(Cb, {s:k, message:g}), 
  K(Nb, {j:a, f:l, Z:"Загрузка..."}), e && K("button", {onClick:e, type:"button", className:"FormCancelBtn btn btn-secondary"}, f));
};
function hc() {
  O.call(this);
  this.state = {data:[], f:!0};
}
u(hc, O);
hc.prototype.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
hc.prototype.load = function() {
  var a = this, b;
  return I(function(c) {
    if (1 == c.b) {
      return v(c, Vb.bind(a)("galleries"), 2);
    }
    (b = c.g) && a.a({data:b});
    c.b = 0;
  });
};
hc.prototype.h = function() {
  var a = this;
  return K(S, {}, K("h1", {}, "Галереи"), this.f && K(Ob), !this.f && !this.state.data.length && "Не существует галерей.", this.state.data.map(function(a) {
    var b = a._id, e = a.title, f = a.description;
    return K(vb, {key:b}, K(S, {className:"col-sm-3"}, K("img", {src:a.cdnImage, className:"img-fluid"})), K(S, {}, K("h2", {}, e), K("a", {href:"/admin/galleries/" + b}, "Просмотр"), f));
  }), K("hr"), K(ic, {title:"Создать Новую Галерею"}, K(gc, {S:function() {
    a.load();
  }, path:"/admin-data?galleries", T:"Галерея успешно создана!", j:"Добавить"})));
};
q.Object.defineProperties(hc.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function ic(a) {
  var b = a.children;
  return K("details", {}, K("summary", {}, K("h3", {style:"display: inline-block;vertical-align: middle;"}, a.title)), b);
}
;var jc = {36864:"ExifVersion", 40960:"FlashpixVersion", 40961:"ColorSpace", 40962:"PixelXDimension", 40963:"PixelYDimension", 37121:"ComponentsConfiguration", 37122:"CompressedBitsPerPixel", 37500:"MakerNote", 37510:"UserComment", 40964:"RelatedSoundFile", 36867:"DateTimeOriginal", 36868:"DateTimeDigitized", 37520:"SubsecTime", 37521:"SubsecTimeOriginal", 37522:"SubsecTimeDigitized", 33434:"ExposureTime", 33437:"FNumber", 34850:"ExposureProgram", 34852:"SpectralSensitivity", 34855:"ISOSpeedRatings", 
34856:"OECF", 37377:"ShutterSpeedValue", 37378:"ApertureValue", 37379:"BrightnessValue", 37380:"ExposureBias", 37381:"MaxApertureValue", 37382:"SubjectDistance", 37383:"MeteringMode", 37384:"LightSource", 37385:"Flash", 37396:"SubjectArea", 37386:"FocalLength", 41483:"FlashEnergy", 41484:"SpatialFrequencyResponse", 41486:"FocalPlaneXResolution", 41487:"FocalPlaneYResolution", 41488:"FocalPlaneResolutionUnit", 41492:"SubjectLocation", 41493:"ExposureIndex", 41495:"SensingMethod", 41728:"FileSource", 
41729:"SceneType", 41730:"CFAPattern", 41985:"CustomRendered", 41986:"ExposureMode", 41987:"WhiteBalance", 41988:"DigitalZoomRation", 41989:"FocalLengthIn35mmFilm", 41990:"SceneCaptureType", 41991:"GainControl", 41992:"Contrast", 41993:"Saturation", 41994:"Sharpness", 41995:"DeviceSettingDescription", 41996:"SubjectDistanceRange", 40965:"InteroperabilityIFDPointer", 42016:"ImageUniqueID"}, kc = {256:"ImageWidth", 257:"ImageHeight", 34665:"ExifIFDPointer", 34853:"GPSInfoIFDPointer", 40965:"InteroperabilityIFDPointer", 
258:"BitsPerSample", 259:"Compression", 262:"PhotometricInterpretation", 274:"Orientation", 277:"SamplesPerPixel", 284:"PlanarConfiguration", 530:"YCbCrSubSampling", 531:"YCbCrPositioning", 282:"XResolution", 283:"YResolution", 296:"ResolutionUnit", 273:"StripOffsets", 278:"RowsPerStrip", 279:"StripByteCounts", 513:"JPEGInterchangeFormat", 514:"JPEGInterchangeFormatLength", 301:"TransferFunction", 318:"WhitePoint", 319:"PrimaryChromaticities", 529:"YCbCrCoefficients", 532:"ReferenceBlackWhite", 306:"DateTime", 
270:"ImageDescription", 271:"Make", 272:"Model", 305:"Software", 315:"Artist", 33432:"Copyright"}, lc = {0:"GPSVersionID", 1:"GPSLatitudeRef", 2:"GPSLatitude", 3:"GPSLongitudeRef", 4:"GPSLongitude", 5:"GPSAltitudeRef", 6:"GPSAltitude", 7:"GPSTimeStamp", 8:"GPSSatellites", 9:"GPSStatus", 10:"GPSMeasureMode", 11:"GPSDOP", 12:"GPSSpeedRef", 13:"GPSSpeed", 14:"GPSTrackRef", 15:"GPSTrack", 16:"GPSImgDirectionRef", 17:"GPSImgDirection", 18:"GPSMapDatum", 19:"GPSDestLatitudeRef", 20:"GPSDestLatitude", 21:"GPSDestLongitudeRef", 
22:"GPSDestLongitude", 23:"GPSDestBearingRef", 24:"GPSDestBearing", 25:"GPSDestDistanceRef", 26:"GPSDestDistance", 27:"GPSProcessingMethod", 28:"GPSAreaInformation", 29:"GPSDateStamp", 30:"GPSDifferential"}, mc = {256:"ImageWidth", 257:"ImageHeight", 258:"BitsPerSample", 259:"Compression", 262:"PhotometricInterpretation", 273:"StripOffsets", 274:"Orientation", 277:"SamplesPerPixel", 278:"RowsPerStrip", 279:"StripByteCounts", 282:"XResolution", 283:"YResolution", 284:"PlanarConfiguration", 296:"ResolutionUnit", 
513:"JpegIFOffset", 514:"JpegIFByteCount", 529:"YCbCrCoefficients", 530:"YCbCrSubSampling", 531:"YCbCrPositioning", 532:"ReferenceBlackWhite"}, nc = {tb:{0:"Not defined", 1:"Manual", 2:"Normal program", 3:"Aperture priority", 4:"Shutter priority", 5:"Creative program", 6:"Action program", 7:"Portrait mode", 8:"Landscape mode"}, yb:{0:"Unknown", 1:"Average", 2:"CenterWeightedAverage", 3:"Spot", 4:"MultiSpot", 5:"Pattern", 6:"Partial", 255:"Other"}, xb:{0:"Unknown", 1:"Daylight", 2:"Fluorescent", 3:"Tungsten (incandescent light)", 
4:"Flash", 9:"Fine weather", 10:"Cloudy weather", 11:"Shade", 12:"Daylight fluorescent (D 5700 - 7100K)", 13:"Day white fluorescent (N 4600 - 5400K)", 14:"Cool white fluorescent (W 3900 - 4500K)", 15:"White fluorescent (WW 3200 - 3700K)", 17:"Standard light A", 18:"Standard light B", 19:"Standard light C", 20:"D55", 21:"D65", 22:"D75", 23:"D50", 24:"ISO studio tungsten", 255:"Other"}, vb:{0:"Flash did not fire", 1:"Flash fired", 5:"Strobe return light not detected", 7:"Strobe return light detected", 
9:"Flash fired, compulsory flash mode", 13:"Flash fired, compulsory flash mode, return light not detected", 15:"Flash fired, compulsory flash mode, return light detected", 16:"Flash did not fire, compulsory flash mode", 24:"Flash did not fire, auto mode", 25:"Flash fired, auto mode", 29:"Flash fired, auto mode, return light not detected", 31:"Flash fired, auto mode, return light detected", 32:"No flash function", 65:"Flash fired, red-eye reduction mode", 69:"Flash fired, red-eye reduction mode, return light not detected", 
71:"Flash fired, red-eye reduction mode, return light detected", 73:"Flash fired, compulsory flash mode, red-eye reduction mode", 77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", 89:"Flash fired, auto mode, red-eye reduction mode", 93:"Flash fired, auto mode, return light not detected, red-eye reduction mode", 95:"Flash fired, auto mode, return light detected, red-eye reduction mode"}, 
Cb:{1:"Not defined", 2:"One-chip color area sensor", 3:"Two-chip color area sensor", 4:"Three-chip color area sensor", 5:"Color sequential area sensor", 7:"Trilinear sensor", 8:"Color sequential linear sensor"}, Ab:{0:"Standard", 1:"Landscape", 2:"Portrait", 3:"Night scene"}, Bb:{1:"Directly photographed"}, rb:{0:"Normal process", 1:"Custom process"}, Fb:{0:"Auto white balance", 1:"Manual white balance"}, wb:{0:"None", 1:"Low gain up", 2:"High gain up", 3:"Low gain down", 4:"High gain down"}, qb:{0:"Normal", 
1:"Soft", 2:"Hard"}, zb:{0:"Normal", 1:"Low saturation", 2:"High saturation"}, Db:{0:"Normal", 1:"Soft", 2:"Hard"}, Eb:{0:"Unknown", 1:"Macro", 2:"Close view", 3:"Distant view"}, ub:{3:"DSC"}, Components:{0:"", 1:"Y", 2:"Cb", 3:"Cr", 4:"R", 5:"G", 6:"B"}}, oc = {120:"caption", 110:"credit", 25:"keywords", 55:"dateCreated", 80:"byline", 85:"bylineTitle", 122:"captionWriter", 105:"headline", 116:"copyright", 15:"category"};
function pc(a, b, c, e, f) {
  var g = a.getUint16(c, !f), h = {}, k;
  for (k = 0; k < g; k++) {
    var l = c + 12 * k + 2;
    var m = e[a.getUint16(l, !f)];
    h[m] = qc(a, l, b, f);
  }
  return h;
}
function qc(a, b, c, e) {
  var f = a.getUint16(b + 2, !e), g = a.getUint32(b + 4, !e);
  c = a.getUint32(b + 8, !e) + c;
  switch(f) {
    case 1:
    case 7:
      if (1 == g) {
        return a.getUint8(b + 8, !e);
      }
      c = 4 < g ? c : b + 8;
      b = [];
      for (f = 0; f < g; f++) {
        b[f] = a.getUint8(c + f);
      }
      return b;
    case 2:
      return rc(a, 4 < g ? c : b + 8, g - 1);
    case 3:
      if (1 == g) {
        return a.getUint16(b + 8, !e);
      }
      c = 2 < g ? c : b + 8;
      b = [];
      for (f = 0; f < g; f++) {
        b[f] = a.getUint16(c + 2 * f, !e);
      }
      return b;
    case 4:
      if (1 == g) {
        return a.getUint32(b + 8, !e);
      }
      b = [];
      for (f = 0; f < g; f++) {
        b[f] = a.getUint32(c + 4 * f, !e);
      }
      return b;
    case 5:
      if (1 == g) {
        var h = a.getUint32(c, !e);
        var k = a.getUint32(c + 4, !e);
        a = new Number(h / k);
        a.jb = h;
        a.bb = k;
        return a;
      }
      b = [];
      for (f = 0; f < g; f++) {
        h = a.getUint32(c + 8 * f, !e), k = a.getUint32(c + 4 + 8 * f, !e), b[f] = new Number(h / k), b[f].jb = h, b[f].bb = k;
      }
      return b;
    case 9:
      if (1 == g) {
        return a.getInt32(b + 8, !e);
      }
      b = [];
      for (f = 0; f < g; f++) {
        b[f] = a.getInt32(c + 4 * f, !e);
      }
      return b;
    case 10:
      if (1 == g) {
        return a.getInt32(c, !e) / a.getInt32(c + 4, !e);
      }
      b = [];
      for (f = 0; f < g; f++) {
        b[f] = a.getInt32(c + 8 * f, !e) / a.getInt32(c + 4 + 8 * f, !e);
      }
      return b;
  }
}
function rc(a, b, c) {
  for (var e = "", f = b; f < b + c; f++) {
    e += String.fromCharCode(a.getUint8(f));
  }
  return e;
}
function sc(a, b) {
  if ("Exif" != rc(a, b, 4)) {
    return !1;
  }
  var c = b + 6;
  if (18761 == a.getUint16(c)) {
    var e = !1;
  } else {
    if (19789 == a.getUint16(c)) {
      e = !0;
    } else {
      return !1;
    }
  }
  if (42 != a.getUint16(c + 2, !e)) {
    return !1;
  }
  var f = a.getUint32(c + 4, !e);
  if (8 > f) {
    return !1;
  }
  b = pc(a, c, c + f, kc, e);
  if (b.Sa) {
    var g = pc(a, c, c + b.Sa, jc, e);
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
          g[h] = nc[h][g[h]];
          break;
        case "ExifVersion":
        case "FlashpixVersion":
          g[h] = String.fromCharCode(g[h][0], g[h][1], g[h][2], g[h][3]);
          break;
        case "ComponentsConfiguration":
          g[h] = nc.Components[g[h][0]] + nc.Components[g[h][1]] + nc.Components[g[h][2]] + nc.Components[g[h][3]];
      }
      b[h] = g[h];
    }
  }
  if (b.Ta) {
    for (h in g = pc(a, c, c + b.Ta, lc, e), g) {
      switch(h) {
        case "GPSVersionID":
          g[h] = g[h][0] + "." + g[h][1] + "." + g[h][2] + "." + g[h][3];
      }
      b[h] = g[h];
    }
  }
  var h = e;
  f = c + f;
  e = a.getUint16(f, !h);
  if (f = a.getUint32(f + 2 + 12 * e, !h)) {
    if (f > a.byteLength) {
      a = {};
    } else {
      h = pc(a, c, c + f, mc, h);
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
;function tc() {
  O.call(this);
  this.state = {ya:!1, wa:null, error:null, va:null, result:null};
}
u(tc, O);
tc.prototype.o = function() {
  uc(this, this.c.file);
  vc(this, this.c.file);
};
function vc(a, b) {
  var c = new FileReader;
  c.readAsArrayBuffer(b);
  c.onload = function() {
    var b = c.result;
    a: {
      var f = new DataView(b);
      if (255 != f.getUint8(0) || 216 != f.getUint8(1)) {
        f = !1;
      } else {
        for (var g = 2, h = b.byteLength, k; g < h;) {
          if (255 != f.getUint8(g)) {
            f = !1;
            break a;
          }
          k = f.getUint8(g + 1);
          if (225 == k) {
            f = sc(f, g + 4, f.getUint16(g + 2) - 2);
            break a;
          }
          g += 2 + f.getUint16(g + 2);
        }
        f = void 0;
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
                var n = b.getUint8(l + 2);
                n in oc && (m = b.getInt16(l + 3), n = oc[n], m = rc(b, l + 5, m), k.hasOwnProperty(n) ? k[n] instanceof Array ? k[n].push(m) : k[n] = [k[n], m] : k[n] = m);
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
    a.a({ib:{data:f, Mb:b}});
  };
}
function uc(a, b) {
  var c = new FileReader;
  c.readAsDataURL(b);
  c.onload = function() {
    wc(a, c.result);
  };
}
function wc(a, b) {
  var c = new Image;
  c.src = b;
  c.onload = function() {
    var b = c.width / c.height, f = document.createElement("canvas");
    f.width = c.width > c.height ? 250 * b : 250 / b;
    f.height = 250;
    f.getContext("2d").drawImage(c, 0, 0, f.width, f.height);
    b = f.toDataURL();
    a.a({va:b});
  };
}
function xc(a) {
  var b, c;
  I(function(e) {
    a.a({error:null, wa:0, ya:!1});
    b = new FormData;
    b.append("image", a.c.file);
    b.append("name", a.c.file.name);
    c = new XMLHttpRequest;
    c.open("POST", "/upload-asset", !0);
    c.b = 0;
    c.upload.addEventListener("progress", function(b) {
      a.a({wa:100.0 * b.loaded / b.total || 100});
    });
    c.addEventListener("readystatechange", function() {
      4 == c.readyState && a.a({ya:!0});
      if (4 == c.readyState && 200 == c.status) {
        var b = c.responseText;
        try {
          var e = JSON.parse(b);
          var h = e.error;
          var k = e.result;
        } catch (l) {
          h = "Could not parse JSON: " + l.message;
        }
        h ? a.a({error:h}) : k && (a.a({result:k, va:null}), a.c.Pa && a.c.Pa(k));
      } else {
        4 == c.readyState && 200 != c.status && a.a({error:"XHR Error"});
      }
    });
    c.send(b);
    e.b = 0;
  });
}
tc.prototype.h = function(a) {
  var b = this, c = a.name, e = a.ia, f = a.ma, g = a.Lb, h = a.M, k = this.state;
  a = k.wa;
  var l = k.error, m = k.va, n = k.ya, p = k.result, t = k.ib;
  k = 100 == a && !n;
  h = p && h.some(function(a) {
    return a == p;
  });
  n = {background:n ? "linear-gradient(lightgreen, #82d285)" : null, "border-color":n ? "green" : null, "box-shadow":n ? "inset 1px -5px 15px #6f9e14" : null};
  k ? (n.background = "linear-gradient(lightblue, blue)", n["border-color"] = "blue") : l && (n.background = "linear-gradient(coral, brown)", n["border-color"] = "red");
  m = (l = g || p) ? l : m;
  var B;
  try {
    (B = t.data.sb) && (B = yc(B).toLocaleDateString());
  } catch (H) {
  }
  if (t = l && !h) {
    n.background = "linear-gradient(yellow, rgb(207, 198, 92))", n["border-color"] = "rgb(156, 158, 9)", n["box-shadow"] = "inset 1px -5px 15px #9e7414";
  }
  return K("div", {style:n, className:"Image" + (m ? "" : " PreviewLoading")}, !m && K("span", {className:"ImageInfo", style:"top:50%;left:50%;transform:translate(-50%, -50%);"}, "Загрузка превью..."), K("img", {src:m, style:"padding:.5rem;"}), K("span", {className:"ImageInfo", style:"top:.5rem;left:.5rem;"}, c, B && K("br"), B), K("span", {onClick:e, className:"ImageInfo CloseSpan"}, "✕"), !g && null === a && K(zc, {className:"Absolute"}, K(wb, {Oa:function() {
    xc(b);
  }, className:"btn btn-light btn-sm"}, "Загрузить")), !!a && 100 != a && K(zc, {}, K("progress", {max:100, value:a})), k && K(zc, {}, "Выполняется обработка...", K("div", {className:"spinner-border text-primary", role:"status"}, K("span", {className:"sr-only"}, "Loading..."))), this.state.error && K("p", {className:"ImageInfo PhotoError"}, "Error: ", this.state.error), this.state.error && K("a", {onClick:function(a) {
    a.preventDefault();
    xc(b);
    return !1;
  }, href:"#", className:"btn btn-danger btn-sm", style:"position:absolute;right:.5rem;bottom:.5rem;"}, "Загрузить снова"), l && K("p", {className:"ImageInfo GalleryLink"}, K("a", {href:l}, "Ссылка")), t && K("input", {name:f, type:"hidden", value:l}));
};
function zc(a) {
  return K("span", {className:void 0 === a.className ? "ImageInfo" : a.className, style:"bottom:.5rem;left:.5rem;"}, a.children);
}
function yc(a) {
  var b = r(a.split(/\D/));
  a = b.next().value;
  var c = b.next().value, e = b.next().value, f = b.next().value, g = b.next().value;
  b = b.next().value;
  return new Date(a, c - 1, e, f, g, b);
}
;function Ac() {
  O.call(this);
  this.state = {files:[]};
}
u(Ac, O);
function Bc(a, b) {
  var c = a.state.files.filter(function(a) {
    return a.file !== b;
  });
  a.a({files:c});
  a.c.ia && a.c.ia(b);
}
function Cc(a, b) {
  var c, e, f;
  I(function(g) {
    c = r(b);
    e = ha(c);
    f = e.map(function(a) {
      return {file:a, lb:Math.floor(10000 * Math.random())};
    });
    a.a({files:[].concat(ia(a.state.files), ia(f))});
    a.c.Na && a.c.Na();
    g.b = 0;
  });
}
Ac.prototype.h = function(a) {
  var b = this, c = void 0 === a.ma ? "files[]" : a.ma, e = a.qa, f = a.M;
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
    Cc(b, a.dataTransfer.files);
  }, onDragOver:function(a) {
    a.preventDefault();
    a.stopPropagation();
  }}, K("input", {id:a.id, "aria-described-by":a.I, onChange:function(a) {
    a.preventDefault();
    Cc(b, a.currentTarget.files);
    a.currentTarget.value = null;
  }, accept:"image/*", type:"file", multiple:!0}), this.state.Gb ? "Идет опознование файлов..." : "Или переместите файлы сюда...", this.state.files.map(function(a) {
    var g = a.file;
    return K(tc, {key:a.lb, name:g.name, file:g, ia:function() {
      Bc(b, g);
    }, ma:c, Pa:e, M:f});
  }));
};
function Dc() {
  O.call(this);
  this.state = {data:null, f:!0, files:[], M:[]};
}
u(Dc, O);
Dc.prototype.o = function() {
  var a = this;
  return I(function(b) {
    return v(b, a.load(), 0);
  });
};
Dc.prototype.fa = function() {
};
Dc.prototype.load = function() {
  var a = this, b, c;
  return I(function(e) {
    if (1 == e.b) {
      return (b = a.c.id) || a.a({f:!1, error:"No id"}), v(e, Vb.bind(a)("galleries&id=" + b), 2);
    }
    (c = e.g) && a.a({data:c});
    e.b = 0;
  });
};
Dc.prototype.h = function() {
  var a = this, b = this.data || {}, c = b.title, e = b.cdnImage, f = b.description, g = b._id;
  b = b.Qa;
  var h = this.state.M;
  return K(S, {}, K("h1", {}, "Галерея"), this.f && K(Ob), this.data && K(vb, {className:"mb-3"}, K(S, {className:"col-sm-3"}, K("img", {src:e, className:"img-fluid"})), K(S, {}, K("h2", {}, c), f)), this.data && K(Ec, {Qa:b}), K("hr"), g && K(Fc, {M:h, S:function(b) {
    var c, e;
    return I(function(f) {
      if (1 == f.b) {
        return v(f, b.json(), 2);
      }
      c = f.g;
      (e = c.data) && a.a({M:[].concat(ia(a.state.M), ia(e))});
      return v(f, a.load(), 0);
    });
  }, fb:g, path:"/admin-data?photos", qa:function() {
    return I(function(a) {
      a.b = 0;
    });
  }, j:"Сохранить Галерею"}));
};
q.Object.defineProperties(Dc.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function Ec(a) {
  O.apply(this, arguments);
}
u(Ec, O);
Ec.prototype.h = function(a) {
  return K(vb, {}, a.Qa.map(function(a) {
    return K(S, {key:a._id, className:"col-sm-4"}, K("img", {src:a.file, className:"img-fluid", style:"padding: 0.25rem; max-height: 200px;"}));
  }));
};
function Fc(a) {
  return Z.N.apply(this, arguments) || this;
}
u(Fc, Z.N);
Fc.prototype.h = function(a) {
  var b = this, c = a.j, e = a.qa, f = a.M, g = this.state, h = g.B, k = g.error;
  g = g.s;
  return K(W, {V:this.submit.bind(this)}, K("input", {value:a.fb, name:"galleryId", type:"hidden"}), K(X, {label:"Загрузка Изображений", i:"Выберите несколько изображений и загрузите их."}, K(Ac, {$:function(a) {
    b.Qb = a;
  }, qa:function(a) {
    b.reset();
    e && e(a);
  }, Na:function() {
    return b.reset();
  }, ia:function() {
    return b.reset();
  }, M:f})), K(Nb, {f:h, j:c, Z:"Загрузка..."}), K(Bb, {error:k}), K(Cb, {s:g, message:"Галерея сохранена!"}));
};
function Gc() {
  return K(S, {}, K("h1", {}, "Добро Пожаловать!"));
}
;var Hc = K(function() {
  return K(vb, {id:"App"}, K(S, {className:"col-md-4"}, K(Db)), K(sb, {m:function(a) {
    a.current && a.current.attributes.title && (document.title = a.current.attributes.title);
  }}, K(Gc, {path:"/admin", title:"Главная"}), K(Wb, {path:"/admin/objects", title:"Объекты Недвижимости"}), K(Zb, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), K(Hb, {path:"/admin/categories", title:"Категории Каталога"}), K(Sb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), K($b, {path:"/admin/pages", title:"Статьи"}), K(bc, {path:"/admin/add-page/:id?", title:"Добавить Страницу"}), K(dc, {path:"/admin/special", title:"Специальные Предложения"}), K(hc, {path:"/admin/galleries/", 
  title:"Галереи"}), K(Dc, {path:"/admin/galleries/:id", title:"Фотографии"})));
});
Ua(document.querySelector("#App"), Hc, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map