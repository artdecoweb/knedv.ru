var g;
function aa(b) {
  var d = 0;
  return function() {
    return d < b.length ? {done:!1, value:b[d++]} : {done:!0};
  };
}
var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, d, e) {
  b != Array.prototype && b != Object.prototype && (b[d] = e.value);
}, t = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function ca() {
  ca = function() {
  };
  t.Symbol || (t.Symbol = da);
}
var da = function() {
  var b = 0;
  return function(d) {
    return "jscomp_symbol_" + (d || "") + b++;
  };
}();
function ea() {
  ca();
  var b = t.Symbol.iterator;
  b || (b = t.Symbol.iterator = t.Symbol("iterator"));
  "function" != typeof Array.prototype[b] && ba(Array.prototype, b, {configurable:!0, writable:!0, value:function() {
    return fa(aa(this));
  }});
  ea = function() {
  };
}
function fa(b) {
  ea();
  b = {next:b};
  b[t.Symbol.iterator] = function() {
    return this;
  };
  return b;
}
function ha(b) {
  var d = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return d ? d.call(b) : {next:aa(b)};
}
var ia = "function" == typeof Object.create ? Object.create : function(b) {
  function d() {
  }
  d.prototype = b;
  return new d;
}, ja;
if ("function" == typeof Object.setPrototypeOf) {
  ja = Object.setPrototypeOf;
} else {
  var ka;
  a: {
    var la = {ua:!0}, ma = {};
    try {
      ma.__proto__ = la;
      ka = ma.ua;
      break a;
    } catch (b) {
    }
    ka = !1;
  }
  ja = ka ? function(b, d) {
    b.__proto__ = d;
    if (b.__proto__ !== d) {
      throw new TypeError(b + " is not extensible");
    }
    return b;
  } : null;
}
var na = ja;
function u(b, d) {
  b.prototype = ia(d.prototype);
  b.prototype.constructor = b;
  if (na) {
    na(b, d);
  } else {
    for (var e in d) {
      if ("prototype" != e) {
        if (Object.defineProperties) {
          var f = Object.getOwnPropertyDescriptor(d, e);
          f && Object.defineProperty(b, e, f);
        } else {
          b[e] = d[e];
        }
      }
    }
  }
  b.Sa = d.prototype;
}
function oa(b, d) {
  if (d) {
    var e = t;
    b = b.split(".");
    for (var f = 0; f < b.length - 1; f++) {
      var k = b[f];
      k in e || (e[k] = {});
      e = e[k];
    }
    b = b[b.length - 1];
    f = e[b];
    d = d(f);
    d != f && null != d && ba(e, b, {configurable:!0, writable:!0, value:d});
  }
}
oa("Promise", function(b) {
  function d(b) {
    this.c = 0;
    this.s = void 0;
    this.a = [];
    var d = this.h();
    try {
      b(d.resolve, d.reject);
    } catch (q) {
      d.reject(q);
    }
  }
  function e() {
    this.a = null;
  }
  function f(b) {
    return b instanceof d ? b : new d(function(d) {
      d(b);
    });
  }
  if (b) {
    return b;
  }
  e.prototype.c = function(b) {
    if (null == this.a) {
      this.a = [];
      var d = this;
      this.h(function() {
        d.s();
      });
    }
    this.a.push(b);
  };
  var k = t.setTimeout;
  e.prototype.h = function(b) {
    k(b, 0);
  };
  e.prototype.s = function() {
    for (; this.a && this.a.length;) {
      var b = this.a;
      this.a = [];
      for (var d = 0; d < b.length; ++d) {
        var e = b[d];
        b[d] = null;
        try {
          e();
        } catch (p) {
          this.j(p);
        }
      }
    }
    this.a = null;
  };
  e.prototype.j = function(b) {
    this.h(function() {
      throw b;
    });
  };
  d.prototype.h = function() {
    function b(b) {
      return function(f) {
        e || (e = !0, b.call(d, f));
      };
    }
    var d = this, e = !1;
    return {resolve:b(this.Ea), reject:b(this.j)};
  };
  d.prototype.Ea = function(b) {
    if (b === this) {
      this.j(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (b instanceof d) {
        this.Fa(b);
      } else {
        a: {
          switch(typeof b) {
            case "object":
              var e = null != b;
              break a;
            case "function":
              e = !0;
              break a;
            default:
              e = !1;
          }
        }
        e ? this.O(b) : this.C(b);
      }
    }
  };
  d.prototype.O = function(b) {
    var d = void 0;
    try {
      d = b.then;
    } catch (q) {
      this.j(q);
      return;
    }
    "function" == typeof d ? this.Ha(d, b) : this.C(b);
  };
  d.prototype.j = function(b) {
    this.D(2, b);
  };
  d.prototype.C = function(b) {
    this.D(1, b);
  };
  d.prototype.D = function(b, d) {
    if (0 != this.c) {
      throw Error("Cannot settle(" + b + ", " + d + "): Promise already settled in state" + this.c);
    }
    this.c = b;
    this.s = d;
    this.G();
  };
  d.prototype.G = function() {
    if (null != this.a) {
      for (var b = 0; b < this.a.length; ++b) {
        h.c(this.a[b]);
      }
      this.a = null;
    }
  };
  var h = new e;
  d.prototype.Fa = function(b) {
    var d = this.h();
    b.N(d.resolve, d.reject);
  };
  d.prototype.Ha = function(b, d) {
    var e = this.h();
    try {
      b.call(d, e.resolve, e.reject);
    } catch (p) {
      e.reject(p);
    }
  };
  d.prototype.then = function(b, e) {
    function f(b, d) {
      return "function" == typeof b ? function(d) {
        try {
          k(b(d));
        } catch (B) {
          h(B);
        }
      } : d;
    }
    var k, h, l = new d(function(b, d) {
      k = b;
      h = d;
    });
    this.N(f(b, k), f(e, h));
    return l;
  };
  d.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  d.prototype.N = function(b, d) {
    function e() {
      switch(f.c) {
        case 1:
          b(f.s);
          break;
        case 2:
          d(f.s);
          break;
        default:
          throw Error("Unexpected state: " + f.c);
      }
    }
    var f = this;
    null == this.a ? h.c(e) : this.a.push(e);
  };
  d.resolve = f;
  d.reject = function(b) {
    return new d(function(d, e) {
      e(b);
    });
  };
  d.race = function(b) {
    return new d(function(d, e) {
      for (var k = ha(b), h = k.next(); !h.done; h = k.next()) {
        f(h.value).N(d, e);
      }
    });
  };
  d.all = function(b) {
    var e = ha(b), k = e.next();
    return k.done ? f([]) : new d(function(b, d) {
      function h(d) {
        return function(e) {
          l[d] = e;
          m--;
          0 == m && b(l);
        };
      }
      var l = [], m = 0;
      do {
        l.push(void 0), m++, f(k.value).N(h(l.length - 1), d), k = e.next();
      } while (!k.done);
    });
  };
  return d;
});
function pa() {
  this.D = !1;
  this.j = null;
  this.a = void 0;
  this.c = 1;
  this.s = this.C = 0;
  this.O = this.h = null;
}
function qa(b) {
  if (b.D) {
    throw new TypeError("Generator is already running");
  }
  b.D = !0;
}
pa.prototype.G = function(b) {
  this.a = b;
};
function ra(b, d) {
  b.h = {na:d, qa:!0};
  b.c = b.C || b.s;
}
pa.prototype.return = function(b) {
  this.h = {return:b};
  this.c = this.s;
};
function A(b, d, e) {
  b.c = e;
  return {value:d};
}
pa.prototype.l = function(b) {
  this.c = b;
};
function E(b, d, e) {
  b.C = d;
  void 0 != e && (b.s = e);
}
function F(b) {
  b.C = 0;
  var d = b.h.na;
  b.h = null;
  return d;
}
function G(b) {
  b.O = [b.h];
  b.C = 0;
  b.s = 0;
}
function I(b, d) {
  var e = b.O.splice(0)[0];
  (e = b.h = b.h || e) ? e.qa ? b.c = b.C || b.s : void 0 != e.l && b.s < e.l ? (b.c = e.l, b.h = null) : b.c = b.s : b.c = d;
}
function sa(b) {
  this.a = new pa;
  this.c = b;
}
function ta(b, d) {
  qa(b.a);
  var e = b.a.j;
  if (e) {
    return ua(b, "return" in e ? e["return"] : function(b) {
      return {value:b, done:!0};
    }, d, b.a.return);
  }
  b.a.return(d);
  return va(b);
}
function ua(b, d, e, f) {
  try {
    var k = d.call(b.a.j, e);
    if (!(k instanceof Object)) {
      throw new TypeError("Iterator result " + k + " is not an object");
    }
    if (!k.done) {
      return b.a.D = !1, k;
    }
    var h = k.value;
  } catch (l) {
    return b.a.j = null, ra(b.a, l), va(b);
  }
  b.a.j = null;
  f.call(b.a, h);
  return va(b);
}
function va(b) {
  for (; b.a.c;) {
    try {
      var d = b.c(b.a);
      if (d) {
        return b.a.D = !1, {value:d.value, done:!1};
      }
    } catch (e) {
      b.a.a = void 0, ra(b.a, e);
    }
  }
  b.a.D = !1;
  if (b.a.h) {
    d = b.a.h;
    b.a.h = null;
    if (d.qa) {
      throw d.na;
    }
    return {value:d.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function wa(b) {
  this.next = function(d) {
    qa(b.a);
    b.a.j ? d = ua(b, b.a.j.next, d, b.a.G) : (b.a.G(d), d = va(b));
    return d;
  };
  this.throw = function(d) {
    qa(b.a);
    b.a.j ? d = ua(b, b.a.j["throw"], d, b.a.G) : (ra(b.a, d), d = va(b));
    return d;
  };
  this.return = function(d) {
    return ta(b, d);
  };
  ea();
  this[Symbol.iterator] = function() {
    return this;
  };
}
function xa(b) {
  function d(d) {
    return b.next(d);
  }
  function e(d) {
    return b.throw(d);
  }
  return new Promise(function(f, k) {
    function h(b) {
      b.done ? f(b.value) : Promise.resolve(b.value).then(d, e).then(h, k);
    }
    h(b.next());
  });
}
function J(b) {
  return xa(new wa(new sa(b)));
}
var ya = "function" == typeof Object.assign ? Object.assign : function(b, d) {
  for (var e = 1; e < arguments.length; e++) {
    var f = arguments[e];
    if (f) {
      for (var k in f) {
        Object.prototype.hasOwnProperty.call(f, k) && (b[k] = f[k]);
      }
    }
  }
  return b;
};
oa("Object.assign", function(b) {
  return b || ya;
});
function za() {
}
var K = {}, L = [], Aa = [];
function M(b, d) {
  var e = Aa, f, k;
  for (k = arguments.length; 2 < k--;) {
    L.push(arguments[k]);
  }
  d && null != d.children && (L.length || L.push(d.children), delete d.children);
  for (; L.length;) {
    if ((f = L.pop()) && void 0 !== f.pop) {
      for (k = f.length; k--;) {
        L.push(f[k]);
      }
    } else {
      "boolean" === typeof f && (f = null);
      if (k = "function" !== typeof b) {
        null == f ? f = "" : "number" === typeof f ? f = String(f) : "string" !== typeof f && (k = !1);
      }
      k && h ? e[e.length - 1] += f : e === Aa ? e = [f] : e.push(f);
      var h = k;
    }
  }
  h = new za;
  h.nodeName = b;
  h.children = e;
  h.attributes = null == d ? void 0 : d;
  h.key = null == d ? void 0 : d.key;
  void 0 !== K.Ia && K.Ia(h);
  return h;
}
function N(b, d) {
  for (var e in d) {
    b[e] = d[e];
  }
  return b;
}
function O(b, d) {
  null != b && ("function" == typeof b ? b(d) : b.current = d);
}
var Ba = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
function Ca(b, d) {
  return M(b.nodeName, N(N({}, b.attributes), d), 2 < arguments.length ? [].slice.call(arguments, 2) : b.children);
}
var Ea = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, Fa = [];
function Ga(b) {
  !b.K && (b.K = !0) && 1 == Fa.push(b) && (K.La || Ba)(Ha);
}
function Ha() {
  for (var b; b = Fa.pop();) {
    b.K && Ia(b);
  }
}
function Ja(b) {
  var d = N({}, b.attributes);
  d.children = b.children;
  b = b.nodeName.Ma;
  if (void 0 !== b) {
    for (var e in b) {
      void 0 === d[e] && (d[e] = b[e]);
    }
  }
  return d;
}
function Ka(b) {
  var d = b.parentNode;
  d && d.removeChild(b);
}
function La(b, d, e, f) {
  var k = P;
  "className" === d && (d = "class");
  if ("key" !== d) {
    if ("ref" === d) {
      O(e, null), O(f, b);
    } else {
      if ("class" !== d || k) {
        if ("style" === d) {
          if (f && "string" !== typeof f && "string" !== typeof e || (b.style.cssText = f || ""), f && "object" === typeof f) {
            if ("string" !== typeof e) {
              for (var h in e) {
                h in f || (b.style[h] = "");
              }
            }
            for (h in f) {
              b.style[h] = "number" === typeof f[h] && !1 === Ea.test(h) ? f[h] + "px" : f[h];
            }
          }
        } else {
          if ("dangerouslySetInnerHTML" === d) {
            f && (b.innerHTML = f.ca || "");
          } else {
            if ("o" == d[0] && "n" == d[1]) {
              k = d !== (d = d.replace(/Capture$/, "")), d = d.toLowerCase().substring(2), f ? e || b.addEventListener(d, Ma, k) : b.removeEventListener(d, Ma, k), (b.fa || (b.fa = {}))[d] = f;
            } else {
              if ("list" !== d && "type" !== d && !k && d in b) {
                try {
                  b[d] = null == f ? "" : f;
                } catch (l) {
                }
                null != f && !1 !== f || "spellcheck" == d || b.removeAttribute(d);
              } else {
                e = k && d !== (d = d.replace(/^xlink:?/, "")), null == f || !1 === f ? e ? b.removeAttributeNS("http://www.w3.org/1999/xlink", d.toLowerCase()) : b.removeAttribute(d) : "function" !== typeof f && (e ? b.setAttributeNS("http://www.w3.org/1999/xlink", d.toLowerCase(), f) : b.setAttribute(d, f));
              }
            }
          }
        }
      } else {
        b.className = f || "";
      }
    }
  }
}
function Ma(b) {
  return this.fa[b.type](K.event && K.event(b) || b);
}
var Na = [], Oa = 0, P = !1, Pa = !1;
function Qa() {
  for (var b; b = Na.shift();) {
    K.va && K.va(b), b.A && b.A();
  }
}
function Ra(b, d, e, f, k, h) {
  Oa++ || (P = null != k && void 0 !== k.Oa, Pa = null != b && !("__preactattr_" in b));
  b = Sa(b, d, e, f, h);
  k && b.parentNode !== k && k.appendChild(b);
  --Oa || (Pa = !1, h || Qa());
  return b;
}
function Sa(b, d, e, f, k) {
  var h = b, l = P;
  if (null == d || "boolean" === typeof d) {
    d = "";
  }
  if ("string" === typeof d || "number" === typeof d) {
    return b && void 0 !== b.splitText && b.parentNode && (!b.o || k) ? b.nodeValue != d && (b.nodeValue = d) : (h = document.createTextNode(d), b && (b.parentNode && b.parentNode.replaceChild(h, b), R(b, !0))), h.__preactattr_ = !0, h;
  }
  k = d.nodeName;
  if ("function" === typeof k) {
    l = b;
    var m = d;
    h = d = l && l.o;
    var q = l, p = d && l.S === m.nodeName, r = p;
    for (b = Ja(m); d && !r && (d = d.ga);) {
      r = d.constructor === m.nodeName;
    }
    d && r && (!f || d.o) ? (Ta(d, b, 3, e, f), l = d.w) : (h && !p && (Ua(h), l = q = null), d = Va(m.nodeName, b, e), l && !d.F && (d.F = l, q = null), Ta(d, b, 1, e, f), l = d.w, q && l !== q && (q.o = null, R(q, !1)));
    return l;
  }
  P = "svg" === k ? !0 : "foreignObject" === k ? !1 : P;
  k = String(k);
  if (!b || b.ra !== k && b.nodeName.toLowerCase() !== k.toLowerCase()) {
    if (h = k, k = P ? document.createElementNS("http://www.w3.org/2000/svg", h) : document.createElement(h), k.ra = h, h = k, b) {
      for (; b.firstChild;) {
        h.appendChild(b.firstChild);
      }
      b.parentNode && b.parentNode.replaceChild(h, b);
      R(b, !0);
    }
  }
  var n = h.firstChild;
  b = h.__preactattr_;
  k = d.children;
  if (null == b) {
    b = h.__preactattr_ = {};
    for (var v = h.attributes, D = v.length; D--;) {
      b[v[D].name] = v[D].value;
    }
  }
  if (!Pa && k && 1 === k.length && "string" === typeof k[0] && null != n && void 0 !== n.splitText && null == n.nextSibling) {
    n.nodeValue != k[0] && (n.nodeValue = k[0]);
  } else {
    if (k && k.length || null != n) {
      n = h;
      v = Pa || null != b.Ka;
      D = n.childNodes;
      var H = [], B = {}, x = 0, y = 0, w = D.length, W = 0, Da = k ? k.length : 0;
      if (0 !== w) {
        for (r = 0; r < w; r++) {
          var z = D[r], Q = z.__preactattr_;
          var C = Da && Q ? z.o ? z.o.da : Q.key : null;
          if (null != C) {
            x++, B[C] = z;
          } else {
            if (Q || (void 0 !== z.splitText ? v ? z.nodeValue.trim() : 1 : v)) {
              H[W++] = z;
            }
          }
        }
      }
      if (0 !== Da) {
        for (r = 0; r < Da; r++) {
          w = k[r];
          p = null;
          C = w.key;
          if (null != C) {
            x && void 0 !== B[C] && (p = B[C], B[C] = void 0, x--);
          } else {
            if (y < W) {
              for (C = y; C < W; C++) {
                if (z = void 0 !== H[C]) {
                  if (z = q = H[C], "string" === typeof w || "number" === typeof w) {
                    z = void 0 !== z.splitText;
                  } else {
                    if ("string" === typeof w.nodeName) {
                      if (Q = !z.S) {
                        Q = w.nodeName, Q = z.ra === Q || z.nodeName.toLowerCase() === Q.toLowerCase();
                      }
                      z = Q;
                    } else {
                      z = v || z.S === w.nodeName;
                    }
                  }
                }
                if (z) {
                  p = q;
                  H[C] = void 0;
                  C === W - 1 && W--;
                  C === y && y++;
                  break;
                }
              }
            }
          }
          p = Sa(p, w, e, f);
          w = D[r];
          p && p !== n && p !== w && (null == w ? n.appendChild(p) : p === w.nextSibling ? Ka(w) : n.insertBefore(p, w));
        }
      }
      if (x) {
        for (r in B) {
          void 0 !== B[r] && R(B[r], !1);
        }
      }
      for (; y <= W;) {
        void 0 !== (p = H[W--]) && R(p, !1);
      }
    }
  }
  e = h;
  f = d.attributes;
  d = b;
  for (m in d) {
    f && null != f[m] || null == d[m] || La(e, m, d[m], d[m] = void 0);
  }
  for (m in f) {
    "children" === m || "innerHTML" === m || m in d && f[m] === ("value" === m || "checked" === m ? e[m] : d[m]) || La(e, m, d[m], d[m] = f[m]);
  }
  P = l;
  return h;
}
function R(b, d) {
  var e = b.o;
  e ? Ua(e) : (null != b.__preactattr_ && O(b.__preactattr_.R, null), !1 !== d && null != b.__preactattr_ || Ka(b), Wa(b));
}
function Wa(b) {
  for (b = b.lastChild; b;) {
    var d = b.previousSibling;
    R(b, !0);
    b = d;
  }
}
var Xa = [];
function Va(b, d, e) {
  var f = Xa.length;
  if (b.prototype && b.prototype.i) {
    var k = new b(d, e);
    S.call(k, d, e);
  } else {
    k = new S(d, e), k.constructor = b, k.i = Ya;
  }
  for (; f--;) {
    if (Xa[f].constructor === b) {
      k.F = Xa[f].F;
      Xa.splice(f, 1);
      break;
    }
  }
  return k;
}
function Ya(b, d, e) {
  return this.constructor(b, e);
}
function Ta(b, d, e, f, k) {
  b.L || (b.L = !0, b.ea = d.R, b.da = d.key, delete d.R, delete d.key, "undefined" === typeof b.constructor.oa && (!b.w || k ? b.la && b.la() : b.za && b.za(d, f)), f && f !== b.context && (b.Z || (b.Z = b.context), b.context = f), b.$ || (b.$ = b.g), b.g = d, b.L = !1, 0 !== e && (1 !== e && !1 === K.Ta && b.w ? Ga(b) : Ia(b, 1, k)), O(b.ea, b));
}
function Ia(b, d, e, f) {
  if (!b.L) {
    var k = b.g, h = b.state, l = b.context, m = b.$ || k, q = b.aa || h, p = b.Z || l, r = b.w, n = b.F, v = r || n, D = b.o, H = !1, B = p, x;
    b.constructor.oa && (h = N(N({}, h), b.constructor.oa(k, h)), b.state = h);
    r && (b.g = m, b.state = q, b.context = p, 2 !== d && b.ta && !1 === b.ta(k, h, l) ? H = !0 : b.ma && b.ma(k, h, l), b.g = k, b.state = h, b.context = l);
    b.$ = b.aa = b.Z = b.F = null;
    b.K = !1;
    if (!H) {
      k = b.i(k, h, l);
      b.Ba && (l = N(N({}, l), b.Ba()));
      r && b.Da && (B = b.Da(m, q));
      h = k && k.nodeName;
      if ("function" === typeof h) {
        var y = Ja(k);
        if ((x = D) && x.constructor === h && y.key == x.da) {
          Ta(x, y, 1, l, !1);
        } else {
          var w = x;
          b.o = x = Va(h, y, l);
          x.F = x.F || n;
          x.ga = b;
          Ta(x, y, 0, l, !1);
          Ia(x, 1, e, !0);
        }
        y = x.w;
      } else {
        n = v;
        if (w = D) {
          n = b.o = null;
        }
        if (v || 1 === d) {
          n && (n.o = null), y = Ra(n, k, l, e || !r, v && v.parentNode, !0);
        }
      }
      v && y !== v && x !== D && (l = v.parentNode) && y !== l && (l.replaceChild(y, v), w || (v.o = null, R(v, !1)));
      w && Ua(w);
      if ((b.w = y) && !f) {
        for (w = v = b; w = w.ga;) {
          (v = w).w = y;
        }
        y.o = v;
        y.S = v.constructor;
      }
    }
    !r || e ? Na.push(b) : H || (b.ka && b.ka(m, q, B), K.wa && K.wa(b));
    for (; b.M.length;) {
      b.M.pop().call(b);
    }
    Oa || f || Qa();
  }
}
function Ua(b) {
  K.xa && K.xa(b);
  var d = b.w;
  b.L = !0;
  b.U && b.U();
  b.w = null;
  var e = b.o;
  e ? Ua(e) : d && (null != d.__preactattr_ && O(d.__preactattr_.R, null), b.F = d, Ka(d), Xa.push(b), Wa(d));
  O(b.ea, null);
}
function S(b, d) {
  this.K = !0;
  this.context = d;
  this.g = b;
  this.state = this.state || {};
  this.M = [];
}
N(S.prototype, {b:function(b, d) {
  this.aa || (this.aa = this.state);
  this.state = N(N({}, this.state), "function" === typeof b ? b(this.state, this.g) : b);
  d && this.M.push(d);
  Ga(this);
}, Aa:function(b) {
  b && this.M.push(b);
  Ia(this, 2);
}, i:function() {
}});
var Za = {};
function $a(b, d) {
  return b.P < d.P ? 1 : b.P > d.P ? -1 : b.index - d.index;
}
function ab(b, d) {
  try {
    return b.index = d, b.P = b.attributes.default ? 0 : bb(b.attributes.path).map(cb).join(""), b.attributes;
  } catch (e) {
    return !1;
  }
}
function bb(b) {
  return b.replace(/(^\/+|\/+$)/g, "").split("/");
}
function cb(b) {
  return ":" == b.charAt(0) ? 1 + "*+?".indexOf(b.charAt(b.length - 1)) || 4 : 5;
}
;var T = null, U = [], db = [], eb = {};
function fb() {
  var b;
  T && T.location ? b = T.location : T && T.Ca ? b = T.Ca() : b = "undefined" !== typeof location ? location : eb;
  return "" + (b.pathname || "") + (b.search || "");
}
function gb(b) {
  for (var d = !1, e = 0; e < U.length; e++) {
    !0 === hb(U[e], b) && (d = !0);
  }
  for (e = db.length; e--;) {
    db[e](b);
  }
  return d;
}
function ib(b) {
  if (b && b.getAttribute) {
    var d = b.getAttribute("href");
    b = b.getAttribute("target");
    if (d && d.match(/^\//g) && (!b || b.match(/^_?self$/i))) {
      var e = void 0 === e ? !1 : e;
      "string" !== typeof d && d.url && (e = d.replace, d = d.url);
      a: {
        b = d;
        for (var f = U.length; f--;) {
          if (0 < jb(U[f].g.children, b, !1).length) {
            b = !0;
            break a;
          }
        }
        b = !1;
      }
      if (b) {
        if (b = d, e = e ? "replace" : "push", e = void 0 === e ? "push" : e, T && T[e]) {
          T[e](b);
        } else {
          if ("undefined" !== typeof history && history[e + "State"]) {
            history[e + "State"](null, null, b);
          }
        }
      }
      return gb(d);
    }
  }
}
function kb(b) {
  if (0 == b.button) {
    return ib(b.currentTarget || b.target || this), lb(b);
  }
}
function lb(b) {
  b && (b.stopImmediatePropagation && b.stopImmediatePropagation(), b.stopPropagation && b.stopPropagation(), b.preventDefault());
  return !1;
}
function mb(b) {
  if (!(b.ctrlKey || b.metaKey || b.altKey || b.shiftKey || 0 !== b.button)) {
    var d = b.target;
    do {
      var e;
      if (e = "A" === String(d.nodeName).toUpperCase() && d.getAttribute("href")) {
        e = d, ca(), ca(), e = null != e.__preactattr_ || "undefined" !== typeof Symbol && null != e[Symbol.for("preactattr")];
      }
      if (e) {
        if (d.hasAttribute("native")) {
          break;
        }
        if (ib(d)) {
          return lb(b);
        }
      }
    } while (d = d.parentNode);
  }
}
var nb = !1;
function ob() {
  nb || ("function" === typeof addEventListener && (T || addEventListener("popstate", function() {
    gb(fb());
  }), addEventListener("click", mb)), nb = !0);
}
function pb(b) {
  S.call(this, b);
  b.history && (T = b.history);
  this.state = {url:b.url || fb()};
  ob();
}
u(pb, S);
g = pb.prototype;
g.ta = function(b) {
  return !0 !== b.Ra ? !0 : b.url !== this.g.url || b.W !== this.g.W;
};
function hb(b, d) {
  b.a = !1;
  b.b({url:d});
  if (b.updating) {
    return 0 < jb(b.g.children, d, !1).length;
  }
  b.Aa();
  return b.a;
}
g.la = function() {
  U.push(this);
  this.updating = !0;
};
g.A = function() {
  var b = this;
  T && (this.c = T.Na(function(d) {
    hb(b, "" + (d.pathname || "") + (d.search || ""));
  }));
  this.updating = !1;
};
g.U = function() {
  "function" === typeof this.c && this.c();
  U.splice(U.indexOf(this), 1);
};
g.ma = function() {
  this.updating = !0;
};
g.ka = function() {
  this.updating = !1;
};
function jb(b, d, e) {
  return b.filter(ab).sort($a).map(function(b) {
    var f = d;
    var h = b.attributes.path, l = b.attributes, m = /(?:\?([^#]*))?(#.*)?$/, q = f.match(m), p = {};
    if (q && q[1]) {
      q = q[1].split("&");
      for (var r = 0; r < q.length; r++) {
        var n = q[r].split("=");
        p[decodeURIComponent(n[0])] = decodeURIComponent(n.slice(1).join("="));
      }
    }
    f = bb(f.replace(m, ""));
    h = bb(h || "");
    m = Math.max(f.length, h.length);
    for (q = 0; q < m; q++) {
      if (h[q] && ":" === h[q].charAt(0)) {
        r = h[q].replace(/(^:|[+*?]+$)/g, "");
        n = (h[q].match(/[+*?]+$/) || Za)[0] || "";
        var v = ~n.indexOf("+"), D = ~n.indexOf("*"), H = f[q] || "";
        if (!H && !D && (0 > n.indexOf("?") || v)) {
          var B = !1;
          break;
        }
        p[r] = decodeURIComponent(H);
        if (v || D) {
          p[r] = f.slice(q).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (h[q] !== f[q]) {
          B = !1;
          break;
        }
      }
    }
    if (f = !0 !== l.default && !1 === B ? !1 : p) {
      if (!1 !== e) {
        h = {url:d, matches:f};
        for (var x in f) {
          h[x] = f[x];
        }
        delete h.R;
        delete h.key;
        return Ca(b, h);
      }
      return b;
    }
  }).filter(Boolean);
}
g.i = function(b, d) {
  var e = b.W;
  d = d.url;
  b = jb(b.children, d, !0);
  var f = b[0] || null;
  this.a = !!f;
  var k = this.h;
  d !== k && (this.h = d, "function" === typeof e && e({Qa:this, url:d, Pa:k, active:b, current:f}));
  return f;
};
function qb(b) {
  return M("a", Object.assign({}, b, {onClick:kb}));
}
;function rb(b) {
  var d = Object.assign({}, b), e = b.children;
  b = b.className;
  d = (delete d.children, delete d.className, d);
  return M("div", Object.assign({}, d, {className:"row" + (b ? " " + b : "")}), e);
}
function V(b) {
  var d = Object.assign({}, b), e = b.children;
  b = b.className;
  d = (delete d.children, delete d.className, d);
  return M("div", Object.assign({}, d, {className:"col" + (b ? " " + b : "")}), e);
}
function sb(b) {
  var d = b.J, e = b.type, f = b.value;
  b = {required:b.required, name:b.name, placeholder:b.placeholder, className:"form-control" + (b.file ? "-file" : ""), id:b.id, "aria-describedby":b.pa};
  return d ? M("textarea", Object.assign({}, b, {rows:"number" == typeof d ? d : 3}), f) : M("input", Object.assign({}, b, f ? {value:f} : {}, {type:e}));
}
function X(b) {
  var d = b.label, e = void 0 === b.type ? "text" : b.type, f = b.placeholder, k = b.u, h = b.J, l = b.file, m = b.options, q = b.Ga, p = "i" + 100000 * Math.random(), r = "h" + p;
  b = {pa:r, id:p, value:b.value, name:b.name, required:b.required};
  e = m ? M(tb, Object.assign({}, b, {options:m, Ga:q})) : M(sb, Object.assign({}, b, {J:h, placeholder:f, type:e, file:l}));
  return M("div", {className:"form-group"}, "\n    ", M("label", {htmlFor:p}, d), "\n    ", e, "\n    ", k && M("small", {id:r, dangerouslySetInnerHTML:{ca:k}, className:"form-text text-muted"}), "\n  ");
}
function tb(b) {
  var d = b.options, e = b.value;
  return M("select", {name:b.name, value:e, required:b.required, className:"custom-select", id:b.id, "aria-describedby":b.pa}, "\n    ", M("option"), "\n    ", d.map(function(b) {
    var d = b.value;
    return M("option", {key:d, value:d, selected:d == e}, "\n        ", b.title, "\n      ");
  }), "\n  ");
}
function ub(b) {
  return M("span", {}, M("i", {className:b.icon}), " ");
}
;function vb() {
  S.call(this);
  this.a = this.a.bind(this);
}
u(vb, S);
vb.prototype.a = function(b) {
  this.c = b;
  this.b({});
};
vb.prototype.A = function() {
  db.push(this.a);
};
vb.prototype.U = function() {
  db.splice(db.indexOf(this.a) >>> 0, 1);
};
vb.prototype.i = function(b) {
  var d = this.c || fb(), e = d.replace(/\?.+$/, "");
  this.c = null;
  var f = b.children.filter(function(b) {
    return "function" == typeof b;
  });
  return f[0] && f[0]({url:d, path:e, matches:e === b.path});
};
function Y(b) {
  var d = Object.assign({}, b), e = void 0 === b.ha ? "active" : b.ha;
  b = b.path;
  var f = (delete d.ha, delete d.path, d);
  return M(vb, {path:b || f.href}, "\n    ", function(b) {
    return M(qb, Object.assign({}, f, {className:[f.Ja || f.className, b.matches && e].filter(Boolean).join(" ")}));
  }, "\n  ");
}
;function wb() {
  return M("nav", {className:"nav flex-column"}, "\n    ", M(Y, {className:"nav-link", href:"/admin"}, "\n      ", M("i", {className:"fab fa-kickstarter-k"}), " Главная\n    "), "\n    ", M(Y, {className:"nav-link", href:"/admin/objects"}, "\n      ", M("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами\n    "), "\n    ", M(Y, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, "\n      ", M("i", {className:"fas fa-home"}), " Новая Недвижимость\n    "), "\n    ", 
  M(Y, {className:"nav-link", href:"/admin/categories"}, "\n      ", M("i", {className:"far fa-list-alt"}), " Категории Каталога\n    "), "\n    ", M(Y, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, "\n      ", M("i", {className:"fas fa-folder-plus"}), " Добавить\n    "), "\n    ", M(Y, {className:"nav-link", href:"/admin/pages"}, "\n      ", M("i", {className:"fas fa-font"}), " Статьи\n    "), "\n    ", M(Y, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, 
  "\n      ", M("i", {className:"fas fa-pen-nib"}), " Добавить Страницу\n    "), "\n    ", M(Y, {className:"nav-link", href:"/admin/special"}, "\n      ", M("i", {className:"fas fa-bolt"}), " Специальные Предложения\n    "), "\n    ", M(Y, {className:"nav-link", href:"/admin/offers"}, "\n      ", M("i", {className:"fas fa-grip-lines"}), " Акции\n    "), "\n  ");
}
;function Z(b, d) {
  return d = d || {}, new Promise(function(e, f) {
    function k() {
      var b, d = [], e = [], f = {};
      return h.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(k, h, l) {
        d.push(h = h.toLowerCase());
        e.push([h, l]);
        f[h] = (b = f[h]) ? b + "," + l : l;
      }), {ok:2 == (h.status / 100 | 0), status:h.status, statusText:h.statusText, url:h.responseURL, clone:k, text:function() {
        return Promise.resolve(h.responseText);
      }, json:function() {
        return Promise.resolve(h.responseText).then(JSON.parse);
      }, blob:function() {
        return Promise.resolve(new Blob([h.response]));
      }, headers:{keys:function() {
        return d;
      }, entries:function() {
        return e;
      }, get:function(b) {
        return f[b.toLowerCase()];
      }, has:function(b) {
        return b.toLowerCase() in f;
      }}};
    }
    var h = new XMLHttpRequest, l;
    for (l in h.open(d.method || "get", b, !0), d.headers) {
      h.setRequestHeader(l, d.headers[l]);
    }
    h.withCredentials = "include" == d.credentials;
    h.onload = function() {
      e(k());
    };
    h.onerror = f;
    h.send(d.body || null);
  });
}
;function xb() {
  S.call(this);
  this.state = {f:!1};
}
u(xb, S);
function yb(b) {
  var d, e, f, k;
  return J(function(h) {
    switch(h.c) {
      case 1:
        return b.b({f:!0}), E(h, 2, 3), A(h, fetch("/admin-data?" + b.g.path, {method:"POST"}), 5);
      case 5:
        return d = h.a, A(h, d.json(), 6);
      case 6:
        e = h.a, (f = e.error) ? b.b({error:f}) : (b.g.onClose(), b.g.onComplete());
      case 3:
        G(h);
        b.b({f:!1});
        I(h, 0);
        break;
      case 2:
        k = F(h), b.b({error:k}), h.l(3);
    }
  });
}
xb.prototype.i = function() {
  var b = this, d = this.g, e = d.text, f = d.X, k = d.T, h = d.V, l = void 0 === d.ya ? "Отмена" : d.ya;
  return M("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, "\n      ", M("div", {className:"modal-dialog", role:"document"}, "\n        ", M("div", {className:"modal-content"}, "\n          ", M("div", {className:"modal-header"}, "\n            ", M("h5", {className:"modal-title"}, d.title), "\n            ", M("button", {onClick:f, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, "\n              ", M("span", {"aria-hidden":"true"}, 
  "×"), "\n            "), "\n          "), "\n          ", M("div", {className:"modal-body"}, "\n            ", M("p", {}, e), "\n          "), "\n          ", M("div", {className:"modal-footer"}, "\n            ", M("button", {onClick:f, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, l), "\n            ", M("button", {disabled:this.state.f, type:"button", className:"btn btn-" + k, onClick:function() {
    return yb(b);
  }}, this.state.f ? "Отправка..." : h), "\n          "), "\n        "), "\n      "), "\n    ");
};
function zb() {
  S.call(this);
  this.state = {f:!1, data:[]};
}
u(zb, S);
zb.prototype.A = function() {
  var b = this;
  return J(function(d) {
    return A(d, b.load(), 0);
  });
};
zb.prototype.load = function() {
  var b = this, d, e, f, k, h;
  return J(function(l) {
    switch(l.c) {
      case 1:
        return b.b({f:!0}), E(l, 2, 3), A(l, Z("/admin-data?categories"), 5);
      case 5:
        return d = l.a, A(l, d.json(), 6);
      case 6:
        e = l.a, f = e.error, k = e.data, f ? b.b({error:f}) : b.b({data:k});
      case 3:
        G(l);
        b.b({f:!1});
        I(l, 0);
        break;
      case 2:
        h = F(l), b.b({error:h}), l.l(3);
    }
  });
};
zb.prototype.i = function() {
  var b = this;
  return M(V, {}, "\n      ", M("h1", {}, "Категории Каталога"), "\n      ", M("p", {}, "\n        В каталоге невдижимости содержатся следующие разделы:\n      "), "\n      ", this.state.f && M("span", {className:"echo-loader"}, "Loading…"), "\n      ", this.state.data.map(function(d) {
    var e = Object.assign({}, d);
    d = d._id;
    e = (delete e._id, e);
    return M(Ab, Object.assign({}, e, {key:d, id:d, H:function() {
      return b.load();
    }}));
  }), "\n    ");
};
function Ab() {
  S.call(this);
  this.state = {m:null};
}
u(Ab, S);
Ab.prototype.i = function() {
  var b = this, d = this.g, e = d.title, f = d.description, k = d.seo, h = d.id, l = d.H;
  return M(rb, {className:"CategoryRow"}, "\n      ", M(V, {className:"col-3 col-sm-4 "}, M("img", {src:d.image, className:"img-fluid p-1"})), "\n      ", M(V, {}, "\n        ", M("h2", {}, e), "\n        ", M("em", {}, "knedv.ru/", k), "\n        ", M("p", {}, f), "\n      "), "\n      ", M(V, {className:"col-1 CategoryMeta"}, "\n        ", M("a", {href:"/admin/add-category/" + h, style:"color:brown;"}, M(ub, {icon:"fas fa-pen"})), "\n        ", M("br"), "\n        ", M("a", {onClick:function(d) {
    d.preventDefault();
    b.b({m:{text:M("span", {}, "Вы действительно хотите удалить категорию ", M("strong", {}, e), "?"), V:"Удалить", title:"Удаление Категории", path:"categories&id=" + h + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, M(ub, {icon:"far fa-trash-alt"})), "\n      "), "\n      ", this.state.m && M(xb, Object.assign({}, this.state.m, {X:function() {
    b.b({m:null});
  }, T:"danger", sa:l})), "\n    ");
};
function Bb(b) {
  var d = b.article, e = b.Y;
  return M("div", {className:"form-group"}, "\n    ", M("label", {}, "Статья"), "\n    ", M("div", {dangerouslySetInnerHTML:{ca:d}, style:"background: #edeee8;", className:"mb-3"}), "\n    ", M("a", {onClick:function(b) {
    b.preventDefault();
    window.a = function(b) {
      f.close();
      e(b);
    };
    window.c = function() {
      return d;
    };
    var f = Cb();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"), "\n  ");
}
function Cb() {
  var b = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (b.outerHeight / 2 + b.screenY - 325 - 50) + ",left=" + (b.outerWidth / 2 + b.screenX - 450));
}
;function Db() {
  S.call(this);
  this.state = {f:!1, data:{}, hint:"москва-новостройки", article:""};
}
u(Db, S);
Db.prototype.A = function() {
  var b = this, d, e, f, k, h, l, m, q;
  return J(function(p) {
    switch(p.c) {
      case 1:
        d = !!b.g.id;
        if (!d) {
          return p.return();
        }
        b.b({B:1, f:!0});
        E(p, 2, 3);
        return A(p, Z("/admin-data?categories&id=" + b.g.id), 5);
      case 5:
        return e = p.a, A(p, e.json(), 6);
      case 6:
        f = p.a, k = f.error, h = f.data, k ? b.b({error:k}) : (l = ha(h), m = l.next().value, b.b({data:m, hint:m.seo, article:m.article}));
      case 3:
        G(p);
        b.b({f:!1});
        I(p, 0);
        break;
      case 2:
        q = F(p), b.b({error:q}), p.l(3);
    }
  });
};
Db.prototype.a = function(b) {
  var d = this, e, f, k, h, l;
  return J(function(m) {
    switch(m.c) {
      case 1:
        return d.b({error:null}), b.preventDefault(), e = new FormData(d.form), e.append("article", d.state.article), d.b({v:!0}), E(m, 2, 3), A(m, Z("/admin-data?categories", {method:"POST", body:e}), 5);
      case 5:
        return f = m.a, A(m, f.json(), 6);
      case 6:
        k = m.a, (h = k.error) ? d.b({error:h}) : d.b({I:1});
      case 3:
        G(m);
        d.b({v:!1});
        I(m, 4);
        break;
      case 2:
        l = F(m);
        d.b({error:l});
        m.l(3);
        break;
      case 4:
        return m.return(!1);
    }
  });
};
Db.prototype.i = function() {
  var b = this, d = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.", e = this.state, f = e.B;
  e = e.ba;
  return M(V, {}, "\n      ", M("h1", {}, this.state.B ? "Редактировать" : "Добавить", " Категорию"), "\n      ", f && this.state.f && M("span", {className:"echo-loader"}, "Loading…"), "\n      ", !(f && this.state.f) && M("form", {ref:function(d) {
    return b.form = d;
  }, onSubmit:this.a.bind(this)}, "\n        ", M(X, {value:this.state.data.title, name:"title", placeholder:"Москва Новостройки", label:"Название", u:"Название для меню слева.", required:"1"}), "\n        ", M(X, {u:d, name:"seo", placeholder:"москва-новостройки", label:"СЕО Название", value:this.state.data.seo, required:"1"}), "\n        ", M(X, {J:3, name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий.", 
  label:"Описание", u:"Краткое описание для главной страницы.", value:this.state.data.description, required:"1"}), "\n        ", f && !e && M("div", {className:"form-group"}, "\n          ", M("label", {}, "Изображение"), M("br"), "\n          ", M("img", {src:this.state.data.cdnImage, className:"img-fluid"}), "\n          ", M("a", {onClick:function(d) {
    d.preventDefault();
    b.b({ba:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить"), "\n        "), "\n        ", (!f || e) && M(X, {name:"image", label:"Изображение", u:"Картинка, отображаемая на главной странице.", file:"1", type:"file", required:"1"}), "\n        ", M(Bb, {article:this.state.article, Y:function(d) {
    b.b({article:d});
  }}), "\n        ", f && M("input", {value:this.g.id, type:"hidden", name:"id"}), "\n        ", M("button", {disabled:this.state.v, type:"submit", className:"btn btn-primary"}, this.state.v ? "Загрузка..." : f ? "Сохранить" : "Добавить"), "\n        ", this.state.error && M("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), "\n        ", this.state.I && M("div", {className:"alert alert-success mt-3", role:"alert"}, "Категория успешно ", f ? "сохранена" : "создана", "!"), 
  "\n      "), "\n    ");
};
function Eb() {
  S.call(this);
  this.state = {f:!1, data:[]};
}
u(Eb, S);
Eb.prototype.A = function() {
  var b = this;
  return J(function(d) {
    return A(d, b.load(), 0);
  });
};
Eb.prototype.load = function() {
  var b = this, d, e, f, k, h;
  return J(function(l) {
    switch(l.c) {
      case 1:
        return b.b({f:!0}), E(l, 2, 3), A(l, Z("/admin-data?objects"), 5);
      case 5:
        return d = l.a, A(l, d.json(), 6);
      case 6:
        e = l.a, f = e.error, k = e.data, f ? b.b({error:f}) : b.b({data:k});
      case 3:
        G(l);
        b.b({f:!1});
        I(l, 0);
        break;
      case 2:
        h = F(l), b.b({error:h}), l.l(3);
    }
  });
};
Eb.prototype.i = function() {
  var b = this;
  return M(V, {}, "\n      ", M("h1", {}, "Объекты Недвижимости"), "\n      ", M("p", {}, "\n        На сайт добалены следующие объекты:\n      "), "\n      ", this.state.f && M("span", {className:"echo-loader"}, "Loading…"), "\n      ", this.state.data.map(function(d) {
    var e = Object.assign({}, d);
    d = d._id;
    e = (delete e._id, e);
    return M(Fb, Object.assign({}, e, {key:d, id:d, H:function() {
      return b.load();
    }}));
  }), "\n    ");
};
function Fb() {
  S.call(this);
  this.state = {m:null};
}
u(Fb, S);
Fb.prototype.i = function() {
  var b = this, d = this.g, e = d.title, f = d.description, k = d.seo, h = d.id, l = d.H, m = d.categorySeo;
  return M(rb, {className:"CategoryRow"}, "\n      ", M(V, {className:"col-3 col-sm-4 "}, M("img", {src:d.image, className:"img-fluid p-1"})), "\n      ", M(V, {}, "\n        ", M("h2", {}, e), "\n        ", M("em", {}, "knedv.ru/", m, "/", k), "\n        ", M("p", {}, f), "\n      "), "\n      ", M(V, {className:"col-1 CategoryMeta"}, "\n        ", M("a", {href:"/admin/add-object/" + h, style:"color:brown;"}, M(ub, {icon:"fas fa-pen"})), "\n        ", M("br"), "\n        ", M("a", {onClick:function(d) {
    d.preventDefault();
    b.b({m:{text:M("span", {}, "Вы действительно хотите удалить объект ", M("strong", {}, e), "?"), V:"Удалить", title:"Удаление Объекта", path:"objects&id=" + h + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, M(ub, {icon:"far fa-trash-alt"})), "\n      "), "\n      ", this.state.m && M(xb, Object.assign({}, this.state.m, {X:function() {
    b.b({m:null});
  }, T:"danger", sa:l})), "\n    ");
};
function Gb() {
  S.call(this);
  this.state = {f:!1, data:{}, ja:[], hint:"1-комнатные-апартаменты-воскресенское", ia:"апартаменты", article:""};
}
u(Gb, S);
function Hb(b) {
  var d, e, f, k, h, l;
  return J(function(m) {
    switch(m.c) {
      case 1:
        return b.b({f:!0}), E(m, 2, 3), A(m, Z("/admin-data?categories"), 5);
      case 5:
        return d = m.a, A(m, d.json(), 6);
      case 6:
        e = m.a, f = e.error, k = e.data, f ? b.b({error:f}) : (h = k.map(function(b) {
          return {value:b._id, title:b.title};
        }), b.b({ja:h}));
      case 3:
        G(m);
        b.b({f:!1});
        I(m, 0);
        break;
      case 2:
        l = F(m), b.b({error:l}), m.l(3);
    }
  });
}
Gb.prototype.A = function() {
  var b = this, d, e, f, k, h, l, m, q, p, r;
  return J(function(n) {
    switch(n.c) {
      case 1:
        return A(n, Hb(b), 2);
      case 2:
        d = !!b.g.id;
        if (!d) {
          return n.return();
        }
        b.b({B:1, f:!0});
        E(n, 3, 4);
        return A(n, Z("/admin-data?objects&id=" + b.g.id), 6);
      case 6:
        return e = n.a, A(n, e.json(), 7);
      case 7:
        f = n.a, k = f.error, h = f.data, k ? b.b({error:k}) : (l = ha(h), m = l.next().value, b.b({data:m, hint:m.seo, ia:m.categorySeo, article:m.article}));
      case 4:
        G(n);
        b.b({f:!1});
        I(n, 0);
        break;
      case 3:
        p = q = F(n), r = p.message, b.b({error:r}), n.l(4);
    }
  });
};
Gb.prototype.a = function(b) {
  var d = this, e, f, k, h, l;
  return J(function(m) {
    switch(m.c) {
      case 1:
        return d.b({error:null}), b.preventDefault(), e = new FormData(d.form), e.append("article", d.state.article), d.b({v:!0}), E(m, 2, 3), A(m, Z("/admin-data?objects", {method:"POST", body:e}), 5);
      case 5:
        return f = m.a, A(m, f.json(), 6);
      case 6:
        k = m.a, (h = k.error) ? d.b({error:h}) : d.b({I:1});
      case 3:
        G(m);
        d.b({v:!1});
        I(m, 4);
        break;
      case 2:
        l = F(m);
        d.b({error:l});
        m.l(3);
        break;
      case 4:
        return m.return(!1);
    }
  });
};
Gb.prototype.i = function() {
  var b = this, d = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.ia + "/<strong>" + this.state.hint + "</strong>.", e = this.state, f = e.B;
  e = e.ba;
  return M(V, {}, "\n      ", M("h1", {}, this.state.B ? "Редактировать" : "Добавить", " Объект"), "\n      ", f && this.state.f && M("span", {className:"echo-loader"}, "Loading…"), "\n      ", !(f && this.state.f) && M("form", {ref:function(d) {
    return b.form = d;
  }, onSubmit:this.a.bind(this)}, "\n        ", M(X, Object.assign({}, f ? {value:this.state.data.title} : {}, {name:"title", placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское", label:"Название", u:"Название для каталога недвижимости.", required:"1"})), "\n        ", M(X, Object.assign({}, f ? {value:this.state.data.seo} : {}, {u:d, name:"seo", placeholder:"1-комнатные-апартаменты-воскресенское", label:"СЕО Название", required:"1"})), "\n        ", M(X, {J:10, name:"description", placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично).", 
  label:"Описание", u:"Описание объекта.", value:this.state.data.description, required:"1"}), "\n\n        ", f && !e && M("div", {className:"form-group"}, "\n          ", M("label", {}, "Изображение"), M("br"), "\n          ", M("img", {src:this.state.data.cdnImage, className:"img-fluid"}), "\n          ", M("a", {onClick:function(d) {
    d.preventDefault();
    b.b({ba:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить"), "\n        "), "\n        ", (!f || e) && M(X, {name:"image", label:"Изображение", u:"Картинка, отображаемая на главной странице.", file:"1", type:"file", required:"1"}), "\n        ", M(Bb, {article:this.state.article, Y:function(d) {
    b.b({article:d});
  }}), "\n        ", f && M("input", {value:this.g.id, type:"hidden", name:"id"}), "\n        ", M(X, {options:this.state.ja, name:"category", label:"Раздел", u:"Категория в каталоге", value:this.state.data.category, required:"1"}), "\n        ", M("button", {disabled:this.state.v, type:"submit", className:"btn btn-primary"}, this.state.v ? "Загрузка..." : f ? "Сохранить" : "Добавить"), "\n        ", this.state.error && M("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), 
  "\n        ", this.state.I && M("div", {className:"alert alert-success mt-3", role:"alert"}, "Объект успешно ", f ? "сохранен" : "создан", "!"), "\n      "), "\n    ");
};
function Ib() {
  S.call(this);
  this.state = {f:!1, data:[]};
}
u(Ib, S);
Ib.prototype.A = function() {
  var b = this;
  return J(function(d) {
    return A(d, b.load(), 0);
  });
};
Ib.prototype.load = function() {
  var b = this, d, e, f, k, h;
  return J(function(l) {
    switch(l.c) {
      case 1:
        return b.b({f:!0}), E(l, 2, 3), A(l, Z("/admin-data?pages"), 5);
      case 5:
        return d = l.a, A(l, d.json(), 6);
      case 6:
        e = l.a, f = e.error, k = e.data, f ? b.b({error:f}) : b.b({data:k});
      case 3:
        G(l);
        b.b({f:!1});
        I(l, 0);
        break;
      case 2:
        h = F(l), b.b({error:h}), l.l(3);
    }
  });
};
Ib.prototype.i = function() {
  var b = this;
  return M(V, {}, "\n      ", M("h1", {}, "Материалы Сайта"), "\n      ", M("p", {}, "\n        Контент веб-портала состоит из следующих страниц:\n      "), "\n      ", this.state.f && M("span", {className:"echo-loader"}, "Loading…"), "\n      ", this.state.data.map(function(d) {
    var e = Object.assign({}, d);
    d = d._id;
    e = (delete e._id, e);
    return M(Jb, Object.assign({}, e, {key:d, id:d, H:function() {
      return b.load();
    }}));
  }), "\n    ");
};
function Jb() {
  S.call(this);
  this.state = {m:null};
}
u(Jb, S);
Jb.prototype.i = function() {
  var b = this, d = this.g, e = d.seo, f = d.id, k = d.description, h = d.H, l = d.title;
  return M(rb, {className:"CategoryRow"}, "\n      ", M(V, {}, "\n        ", M("h2", {}, l), "\n        ", M("em", {}, "knedv.ru/", e), "\n        ", M("p", {}, k), "\n      "), "\n      ", M(V, {className:"col-1 CategoryMeta"}, "\n        ", M("a", {href:"/admin/add-page/" + f, style:"color:brown;"}, M(ub, {icon:"fas fa-pen"})), "\n        ", M("br"), "\n        ", M("a", {onClick:function(d) {
    d.preventDefault();
    b.b({m:{text:M("span", {}, "Вы действительно хотите удалить страницу ", M("strong", {}, l), "?"), V:"Удалить", title:"Удаление Страницы", path:"pages&id=" + f + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, M(ub, {icon:"far fa-trash-alt"})), "\n      "), "\n      ", this.state.m && M(xb, Object.assign({}, this.state.m, {X:function() {
    b.b({m:null});
  }, T:"danger", sa:h})), "\n    ");
};
function Kb() {
  S.call(this);
  this.state = {f:!1, data:{}, article:""};
}
u(Kb, S);
Kb.prototype.A = function() {
  var b = this, d, e, f, k, h, l, m, q, p, r;
  return J(function(n) {
    switch(n.c) {
      case 1:
        d = !!b.g.id;
        if (!d) {
          return n.return();
        }
        b.b({B:1, f:!0});
        E(n, 2, 3);
        return A(n, Z("/admin-data?pages&id=" + b.g.id), 5);
      case 5:
        return e = n.a, A(n, e.json(), 6);
      case 6:
        f = n.a, k = f.error, h = f.data, k ? b.b({error:k}) : (l = ha(h), m = l.next().value, b.b({data:m, article:m.article}));
      case 3:
        G(n);
        b.b({f:!1});
        I(n, 0);
        break;
      case 2:
        p = q = F(n), r = p.message, b.b({error:r}), n.l(3);
    }
  });
};
Kb.prototype.a = function(b) {
  var d = this, e, f, k, h, l;
  return J(function(m) {
    switch(m.c) {
      case 1:
        return d.b({error:null}), b.preventDefault(), e = new FormData(d.form), e.append("article", d.state.article), d.b({v:!0}), E(m, 2, 3), A(m, Z("/admin-data?pages", {method:"POST", body:e}), 5);
      case 5:
        return f = m.a, A(m, f.json(), 6);
      case 6:
        k = m.a, (h = k.error) ? d.b({error:h}) : d.b({I:1});
      case 3:
        G(m);
        d.b({v:!1});
        I(m, 4);
        break;
      case 2:
        l = F(m);
        d.b({error:l});
        m.l(3);
        break;
      case 4:
        return m.return(!1);
    }
  });
};
Kb.prototype.i = function() {
  var b = this, d = this.state.B;
  return M(V, {}, "\n      ", M("h1", {}, this.state.B ? "Редактировать" : "Добавить", " Страницу"), "\n      ", d && this.state.f && M("span", {className:"echo-loader"}, "Loading…"), "\n      ", !(d && this.state.f) && M("form", {ref:function(d) {
    return b.form = d;
  }, onSubmit:this.a.bind(this)}, "\n\n        ", M(X, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", u:"Название для администратора.", required:"1"}), "\n\n        ", M(X, {u:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), "\n\n        ", M(X, {J:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", u:"Описание страницы.", value:this.state.data.description, 
  required:"1"}), "\n\n        ", M(Bb, {article:this.state.article, Y:function(d) {
    b.b({article:d});
  }}), "\n        ", d && M("input", {value:this.g.id, type:"hidden", name:"id"}), "\n        ", M("button", {disabled:this.state.v, type:"submit", className:"btn btn-primary"}, this.state.v ? "Загрузка..." : d ? "Сохранить" : "Добавить"), "\n        ", this.state.error && M("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), "\n        ", this.state.I && M("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", d ? "сохранена" : "создана", "!"), 
  "\n      "), "\n    ");
};
function Lb() {
  return M(V, {}, "\n    ", M("h1", {}, "Добро Пожаловать!"), "\n  ");
}
;var Mb = M(function() {
  return M(rb, {id:"App"}, "\n    ", M(V, {className:"col-md-4"}, "\n      ", M(wb), "\n    "), "\n    ", M(pb, {W:function(b) {
    b.current && b.current.attributes.title && (document.title = b.current.attributes.title);
  }}, "\n      ", M(Lb, {path:"/admin", title:"Главная"}), "\n      ", M(Eb, {path:"/admin/objects", title:"Объекты Недвижимости"}), "\n      ", M(Gb, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), "\n      ", M(zb, {path:"/admin/categories", title:"Категории Каталога"}), "\n      ", M(Db, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), "\n      ", M(Ib, {path:"/admin/pages", title:"Статьи"}), "\n      ", M(Kb, {path:"/admin/add-page/:id?", title:"Добавить Страницу"}), 
  "\n    "), "\n  ");
});
Ra(document.querySelector("#App"), Mb, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map