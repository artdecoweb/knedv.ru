var g;
function aa(b) {
  var c = 0;
  return function() {
    return c < b.length ? {done:!1, value:b[c++]} : {done:!0};
  };
}
var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, d) {
  b != Array.prototype && b != Object.prototype && (b[c] = d.value);
}, t = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function ca() {
  ca = function() {
  };
  t.Symbol || (t.Symbol = da);
}
var da = function() {
  var b = 0;
  return function(c) {
    return "jscomp_symbol_" + (c || "") + b++;
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
function u(b) {
  var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return c ? c.call(b) : {next:aa(b)};
}
var ha = "function" == typeof Object.create ? Object.create : function(b) {
  function c() {
  }
  c.prototype = b;
  return new c;
}, ia;
if ("function" == typeof Object.setPrototypeOf) {
  ia = Object.setPrototypeOf;
} else {
  var ja;
  a: {
    var ka = {xa:!0}, la = {};
    try {
      la.__proto__ = ka;
      ja = la.xa;
      break a;
    } catch (b) {
    }
    ja = !1;
  }
  ia = ja ? function(b, c) {
    b.__proto__ = c;
    if (b.__proto__ !== c) {
      throw new TypeError(b + " is not extensible");
    }
    return b;
  } : null;
}
var ma = ia;
function A(b, c) {
  b.prototype = ha(c.prototype);
  b.prototype.constructor = b;
  if (ma) {
    ma(b, c);
  } else {
    for (var d in c) {
      if ("prototype" != d) {
        if (Object.defineProperties) {
          var e = Object.getOwnPropertyDescriptor(c, d);
          e && Object.defineProperty(b, d, e);
        } else {
          b[d] = c[d];
        }
      }
    }
  }
  b.Wa = c.prototype;
}
function na(b, c) {
  if (c) {
    var d = t;
    b = b.split(".");
    for (var e = 0; e < b.length - 1; e++) {
      var h = b[e];
      h in d || (d[h] = {});
      d = d[h];
    }
    b = b[b.length - 1];
    e = d[b];
    c = c(e);
    c != e && null != c && ba(d, b, {configurable:!0, writable:!0, value:c});
  }
}
na("Promise", function(b) {
  function c(b) {
    this.f = 0;
    this.u = void 0;
    this.a = [];
    var c = this.h();
    try {
      b(c.resolve, c.reject);
    } catch (q) {
      c.reject(q);
    }
  }
  function d() {
    this.a = null;
  }
  function e(b) {
    return b instanceof c ? b : new c(function(c) {
      c(b);
    });
  }
  if (b) {
    return b;
  }
  d.prototype.f = function(b) {
    if (null == this.a) {
      this.a = [];
      var c = this;
      this.h(function() {
        c.u();
      });
    }
    this.a.push(b);
  };
  var h = t.setTimeout;
  d.prototype.h = function(b) {
    h(b, 0);
  };
  d.prototype.u = function() {
    for (; this.a && this.a.length;) {
      var b = this.a;
      this.a = [];
      for (var c = 0; c < b.length; ++c) {
        var d = b[c];
        b[c] = null;
        try {
          d();
        } catch (p) {
          this.l(p);
        }
      }
    }
    this.a = null;
  };
  d.prototype.l = function(b) {
    this.h(function() {
      throw b;
    });
  };
  c.prototype.h = function() {
    function b(b) {
      return function(e) {
        d || (d = !0, b.call(c, e));
      };
    }
    var c = this, d = !1;
    return {resolve:b(this.Ga), reject:b(this.l)};
  };
  c.prototype.Ga = function(b) {
    if (b === this) {
      this.l(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (b instanceof c) {
        this.Ha(b);
      } else {
        a: {
          switch(typeof b) {
            case "object":
              var d = null != b;
              break a;
            case "function":
              d = !0;
              break a;
            default:
              d = !1;
          }
        }
        d ? this.T(b) : this.F(b);
      }
    }
  };
  c.prototype.T = function(b) {
    var c = void 0;
    try {
      c = b.then;
    } catch (q) {
      this.l(q);
      return;
    }
    "function" == typeof c ? this.Ja(c, b) : this.F(b);
  };
  c.prototype.l = function(b) {
    this.G(2, b);
  };
  c.prototype.F = function(b) {
    this.G(1, b);
  };
  c.prototype.G = function(b, c) {
    if (0 != this.f) {
      throw Error("Cannot settle(" + b + ", " + c + "): Promise already settled in state" + this.f);
    }
    this.f = b;
    this.u = c;
    this.I();
  };
  c.prototype.I = function() {
    if (null != this.a) {
      for (var b = 0; b < this.a.length; ++b) {
        k.f(this.a[b]);
      }
      this.a = null;
    }
  };
  var k = new d;
  c.prototype.Ha = function(b) {
    var c = this.h();
    b.S(c.resolve, c.reject);
  };
  c.prototype.Ja = function(b, c) {
    var d = this.h();
    try {
      b.call(c, d.resolve, d.reject);
    } catch (p) {
      d.reject(p);
    }
  };
  c.prototype.then = function(b, d) {
    function e(b, c) {
      return "function" == typeof b ? function(c) {
        try {
          h(b(c));
        } catch (C) {
          k(C);
        }
      } : c;
    }
    var h, k, l = new c(function(b, c) {
      h = b;
      k = c;
    });
    this.S(e(b, h), e(d, k));
    return l;
  };
  c.prototype.catch = function(b) {
    return this.then(void 0, b);
  };
  c.prototype.S = function(b, c) {
    function d() {
      switch(e.f) {
        case 1:
          b(e.u);
          break;
        case 2:
          c(e.u);
          break;
        default:
          throw Error("Unexpected state: " + e.f);
      }
    }
    var e = this;
    null == this.a ? k.f(d) : this.a.push(d);
  };
  c.resolve = e;
  c.reject = function(b) {
    return new c(function(c, d) {
      d(b);
    });
  };
  c.race = function(b) {
    return new c(function(c, d) {
      for (var h = u(b), k = h.next(); !k.done; k = h.next()) {
        e(k.value).S(c, d);
      }
    });
  };
  c.all = function(b) {
    var d = u(b), h = d.next();
    return h.done ? e([]) : new c(function(b, c) {
      function k(c) {
        return function(d) {
          l[c] = d;
          m--;
          0 == m && b(l);
        };
      }
      var l = [], m = 0;
      do {
        l.push(void 0), m++, e(h.value).S(k(l.length - 1), c), h = d.next();
      } while (!h.done);
    });
  };
  return c;
});
function oa() {
  this.G = !1;
  this.l = null;
  this.a = void 0;
  this.f = 1;
  this.u = this.F = 0;
  this.T = this.h = null;
}
function pa(b) {
  if (b.G) {
    throw new TypeError("Generator is already running");
  }
  b.G = !0;
}
oa.prototype.I = function(b) {
  this.a = b;
};
function qa(b, c) {
  b.h = {sa:c, ua:!0};
  b.f = b.F || b.u;
}
oa.prototype.return = function(b) {
  this.h = {return:b};
  this.f = this.u;
};
function B(b, c, d) {
  b.f = d;
  return {value:c};
}
oa.prototype.m = function(b) {
  this.f = b;
};
function F(b, c, d) {
  b.F = c;
  void 0 != d && (b.u = d);
}
function G(b) {
  b.F = 0;
  var c = b.h.sa;
  b.h = null;
  return c;
}
function I(b) {
  b.T = [b.h];
  b.F = 0;
  b.u = 0;
}
function J(b, c) {
  var d = b.T.splice(0)[0];
  (d = b.h = b.h || d) ? d.ua ? b.f = b.F || b.u : void 0 != d.m && b.u < d.m ? (b.f = d.m, b.h = null) : b.f = b.u : b.f = c;
}
function ra(b) {
  this.a = new oa;
  this.f = b;
}
function sa(b, c) {
  pa(b.a);
  var d = b.a.l;
  if (d) {
    return ta(b, "return" in d ? d["return"] : function(b) {
      return {value:b, done:!0};
    }, c, b.a.return);
  }
  b.a.return(c);
  return ua(b);
}
function ta(b, c, d, e) {
  try {
    var h = c.call(b.a.l, d);
    if (!(h instanceof Object)) {
      throw new TypeError("Iterator result " + h + " is not an object");
    }
    if (!h.done) {
      return b.a.G = !1, h;
    }
    var k = h.value;
  } catch (l) {
    return b.a.l = null, qa(b.a, l), ua(b);
  }
  b.a.l = null;
  e.call(b.a, k);
  return ua(b);
}
function ua(b) {
  for (; b.a.f;) {
    try {
      var c = b.f(b.a);
      if (c) {
        return b.a.G = !1, {value:c.value, done:!1};
      }
    } catch (d) {
      b.a.a = void 0, qa(b.a, d);
    }
  }
  b.a.G = !1;
  if (b.a.h) {
    c = b.a.h;
    b.a.h = null;
    if (c.ua) {
      throw c.sa;
    }
    return {value:c.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function va(b) {
  this.next = function(c) {
    pa(b.a);
    b.a.l ? c = ta(b, b.a.l.next, c, b.a.I) : (b.a.I(c), c = ua(b));
    return c;
  };
  this.throw = function(c) {
    pa(b.a);
    b.a.l ? c = ta(b, b.a.l["throw"], c, b.a.I) : (qa(b.a, c), c = ua(b));
    return c;
  };
  this.return = function(c) {
    return sa(b, c);
  };
  ea();
  this[Symbol.iterator] = function() {
    return this;
  };
}
function wa(b) {
  function c(c) {
    return b.next(c);
  }
  function d(c) {
    return b.throw(c);
  }
  return new Promise(function(e, h) {
    function k(b) {
      b.done ? e(b.value) : Promise.resolve(b.value).then(c, d).then(k, h);
    }
    k(b.next());
  });
}
function K(b) {
  return wa(new va(new ra(b)));
}
var xa = "function" == typeof Object.assign ? Object.assign : function(b, c) {
  for (var d = 1; d < arguments.length; d++) {
    var e = arguments[d];
    if (e) {
      for (var h in e) {
        Object.prototype.hasOwnProperty.call(e, h) && (b[h] = e[h]);
      }
    }
  }
  return b;
};
na("Object.assign", function(b) {
  return b || xa;
});
function ya(b, c) {
  ea();
  b instanceof String && (b += "");
  var d = 0, e = {next:function() {
    if (d < b.length) {
      var h = d++;
      return {value:c(h, b[h]), done:!1};
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
na("Array.prototype.values", function(b) {
  return b ? b : function() {
    return ya(this, function(b, d) {
      return d;
    });
  };
});
function za() {
}
var L = {}, Aa = [], Ba = [];
function M(b, c) {
  var d = Ba, e, h;
  for (h = arguments.length; 2 < h--;) {
    Aa.push(arguments[h]);
  }
  c && null != c.children && (Aa.length || Aa.push(c.children), delete c.children);
  for (; Aa.length;) {
    if ((e = Aa.pop()) && void 0 !== e.pop) {
      for (h = e.length; h--;) {
        Aa.push(e[h]);
      }
    } else {
      "boolean" === typeof e && (e = null);
      if (h = "function" !== typeof b) {
        null == e ? e = "" : "number" === typeof e ? e = String(e) : "string" !== typeof e && (h = !1);
      }
      h && k ? d[d.length - 1] += e : d === Ba ? d = [e] : d.push(e);
      var k = h;
    }
  }
  k = new za;
  k.nodeName = b;
  k.children = d;
  k.attributes = null == c ? void 0 : c;
  k.key = null == c ? void 0 : c.key;
  void 0 !== L.Ka && L.Ka(k);
  return k;
}
function N(b, c) {
  for (var d in c) {
    b[d] = c[d];
  }
  return b;
}
function Ca(b, c) {
  null != b && ("function" == typeof b ? b(c) : b.current = c);
}
var Da = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
function Ea(b, c) {
  return M(b.nodeName, N(N({}, b.attributes), c), 2 < arguments.length ? [].slice.call(arguments, 2) : b.children);
}
var Fa = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i, Ga = [];
function Ha(b) {
  !b.N && (b.N = !0) && 1 == Ga.push(b) && (L.Oa || Da)(Ia);
}
function Ia() {
  for (var b; b = Ga.pop();) {
    b.N && Ka(b);
  }
}
function La(b) {
  var c = N({}, b.attributes);
  c.children = b.children;
  b = b.nodeName.Pa;
  if (void 0 !== b) {
    for (var d in b) {
      void 0 === c[d] && (c[d] = b[d]);
    }
  }
  return c;
}
function Ma(b) {
  var c = b.parentNode;
  c && c.removeChild(b);
}
function Na(b, c, d, e) {
  var h = O;
  "className" === c && (c = "class");
  if ("key" !== c) {
    if ("ref" === c) {
      Ca(d, null), Ca(e, b);
    } else {
      if ("class" !== c || h) {
        if ("style" === c) {
          if (e && "string" !== typeof e && "string" !== typeof d || (b.style.cssText = e || ""), e && "object" === typeof e) {
            if ("string" !== typeof d) {
              for (var k in d) {
                k in e || (b.style[k] = "");
              }
            }
            for (k in e) {
              b.style[k] = "number" === typeof e[k] && !1 === Fa.test(k) ? e[k] + "px" : e[k];
            }
          }
        } else {
          if ("dangerouslySetInnerHTML" === c) {
            e && (b.innerHTML = e.X || "");
          } else {
            if ("o" == c[0] && "n" == c[1]) {
              h = c !== (c = c.replace(/Capture$/, "")), c = c.toLowerCase().substring(2), e ? d || b.addEventListener(c, Oa, h) : b.removeEventListener(c, Oa, h), (b.ka || (b.ka = {}))[c] = e;
            } else {
              if ("list" !== c && "type" !== c && !h && c in b) {
                try {
                  b[c] = null == e ? "" : e;
                } catch (l) {
                }
                null != e && !1 !== e || "spellcheck" == c || b.removeAttribute(c);
              } else {
                d = h && c !== (c = c.replace(/^xlink:?/, "")), null == e || !1 === e ? d ? b.removeAttributeNS("http://www.w3.org/1999/xlink", c.toLowerCase()) : b.removeAttribute(c) : "function" !== typeof e && (d ? b.setAttributeNS("http://www.w3.org/1999/xlink", c.toLowerCase(), e) : b.setAttribute(c, e));
              }
            }
          }
        }
      } else {
        b.className = e || "";
      }
    }
  }
}
function Oa(b) {
  return this.ka[b.type](L.event && L.event(b) || b);
}
var Pa = [], Qa = 0, O = !1, Ra = !1;
function Sa() {
  for (var b; b = Pa.shift();) {
    L.ya && L.ya(b), b.w && b.w();
  }
}
function Ta(b, c, d, e, h, k) {
  Qa++ || (O = null != h && void 0 !== h.Sa, Ra = null != b && !("__preactattr_" in b));
  b = Ua(b, c, d, e, k);
  h && b.parentNode !== h && h.appendChild(b);
  --Qa || (Ra = !1, k || Sa());
  return b;
}
function Ua(b, c, d, e, h) {
  var k = b, l = O;
  if (null == c || "boolean" === typeof c) {
    c = "";
  }
  if ("string" === typeof c || "number" === typeof c) {
    return b && void 0 !== b.splitText && b.parentNode && (!b.s || h) ? b.nodeValue != c && (b.nodeValue = c) : (k = document.createTextNode(c), b && (b.parentNode && b.parentNode.replaceChild(k, b), Q(b, !0))), k.__preactattr_ = !0, k;
  }
  h = c.nodeName;
  if ("function" === typeof h) {
    l = b;
    var m = c;
    k = c = l && l.s;
    var q = l, p = c && l.Y === m.nodeName, r = p;
    for (b = La(m); c && !r && (c = c.la);) {
      r = c.constructor === m.nodeName;
    }
    c && r && (!e || c.s) ? (Va(c, b, 3, d, e), l = c.B) : (k && !p && (Wa(k), l = q = null), c = Xa(m.nodeName, b, d), l && !c.H && (c.H = l, q = null), Va(c, b, 1, d, e), l = c.B, q && l !== q && (q.s = null, Q(q, !1)));
    return l;
  }
  O = "svg" === h ? !0 : "foreignObject" === h ? !1 : O;
  h = String(h);
  if (!b || b.va !== h && b.nodeName.toLowerCase() !== h.toLowerCase()) {
    if (k = h, h = O ? document.createElementNS("http://www.w3.org/2000/svg", k) : document.createElement(k), h.va = k, k = h, b) {
      for (; b.firstChild;) {
        k.appendChild(b.firstChild);
      }
      b.parentNode && b.parentNode.replaceChild(k, b);
      Q(b, !0);
    }
  }
  var n = k.firstChild;
  b = k.__preactattr_;
  h = c.children;
  if (null == b) {
    b = k.__preactattr_ = {};
    for (var v = k.attributes, E = v.length; E--;) {
      b[v[E].name] = v[E].value;
    }
  }
  if (!Ra && h && 1 === h.length && "string" === typeof h[0] && null != n && void 0 !== n.splitText && null == n.nextSibling) {
    n.nodeValue != h[0] && (n.nodeValue = h[0]);
  } else {
    if (h && h.length || null != n) {
      n = k;
      v = Ra || null != b.Na;
      E = n.childNodes;
      var H = [], C = {}, y = 0, x = 0, w = E.length, W = 0, Ja = h ? h.length : 0;
      if (0 !== w) {
        for (r = 0; r < w; r++) {
          var z = E[r], P = z.__preactattr_;
          var D = Ja && P ? z.s ? z.s.ia : P.key : null;
          if (null != D) {
            y++, C[D] = z;
          } else {
            if (P || (void 0 !== z.splitText ? v ? z.nodeValue.trim() : 1 : v)) {
              H[W++] = z;
            }
          }
        }
      }
      if (0 !== Ja) {
        for (r = 0; r < Ja; r++) {
          w = h[r];
          p = null;
          D = w.key;
          if (null != D) {
            y && void 0 !== C[D] && (p = C[D], C[D] = void 0, y--);
          } else {
            if (x < W) {
              for (D = x; D < W; D++) {
                if (z = void 0 !== H[D]) {
                  if (z = q = H[D], "string" === typeof w || "number" === typeof w) {
                    z = void 0 !== z.splitText;
                  } else {
                    if ("string" === typeof w.nodeName) {
                      if (P = !z.Y) {
                        P = w.nodeName, P = z.va === P || z.nodeName.toLowerCase() === P.toLowerCase();
                      }
                      z = P;
                    } else {
                      z = v || z.Y === w.nodeName;
                    }
                  }
                }
                if (z) {
                  p = q;
                  H[D] = void 0;
                  D === W - 1 && W--;
                  D === x && x++;
                  break;
                }
              }
            }
          }
          p = Ua(p, w, d, e);
          w = E[r];
          p && p !== n && p !== w && (null == w ? n.appendChild(p) : p === w.nextSibling ? Ma(w) : n.insertBefore(p, w));
        }
      }
      if (y) {
        for (r in C) {
          void 0 !== C[r] && Q(C[r], !1);
        }
      }
      for (; x <= W;) {
        void 0 !== (p = H[W--]) && Q(p, !1);
      }
    }
  }
  d = k;
  e = c.attributes;
  c = b;
  for (m in c) {
    e && null != e[m] || null == c[m] || Na(d, m, c[m], c[m] = void 0);
  }
  for (m in e) {
    "children" === m || "innerHTML" === m || m in c && e[m] === ("value" === m || "checked" === m ? d[m] : c[m]) || Na(d, m, c[m], c[m] = e[m]);
  }
  O = l;
  return k;
}
function Q(b, c) {
  var d = b.s;
  d ? Wa(d) : (null != b.__preactattr_ && Ca(b.__preactattr_.K, null), !1 !== c && null != b.__preactattr_ || Ma(b), Ya(b));
}
function Ya(b) {
  for (b = b.lastChild; b;) {
    var c = b.previousSibling;
    Q(b, !0);
    b = c;
  }
}
var Za = [];
function Xa(b, c, d) {
  var e = Za.length;
  if (b.prototype && b.prototype.i) {
    var h = new b(c, d);
    R.call(h, c, d);
  } else {
    h = new R(c, d), h.constructor = b, h.i = $a;
  }
  for (; e--;) {
    if (Za[e].constructor === b) {
      h.H = Za[e].H;
      Za.splice(e, 1);
      break;
    }
  }
  return h;
}
function $a(b, c, d) {
  return this.constructor(b, d);
}
function Va(b, c, d, e, h) {
  b.O || (b.O = !0, b.ja = c.K, b.ia = c.key, delete c.K, delete c.key, "undefined" === typeof b.constructor.ta && (!b.B || h ? b.qa && b.qa() : b.Ca && b.Ca(c, e)), e && e !== b.context && (b.da || (b.da = b.context), b.context = e), b.ea || (b.ea = b.c), b.c = c, b.O = !1, 0 !== d && (1 !== d && !1 === L.Xa && b.B ? Ha(b) : Ka(b, 1, h)), Ca(b.ja, b));
}
function Ka(b, c, d, e) {
  if (!b.O) {
    var h = b.c, k = b.state, l = b.context, m = b.ea || h, q = b.fa || k, p = b.da || l, r = b.B, n = b.H, v = r || n, E = b.s, H = !1, C = p, y;
    b.constructor.ta && (k = N(N({}, k), b.constructor.ta(h, k)), b.state = k);
    r && (b.c = m, b.state = q, b.context = p, 2 !== c && b.L && !1 === b.L(h, k, l) ? H = !0 : b.ra && b.ra(h, k, l), b.c = h, b.state = k, b.context = l);
    b.ea = b.fa = b.da = b.H = null;
    b.N = !1;
    if (!H) {
      h = b.i(h, k, l);
      b.aa && (l = N(N({}, l), b.aa()));
      r && b.Fa && (C = b.Fa(m, q));
      k = h && h.nodeName;
      if ("function" === typeof k) {
        var x = La(h);
        if ((y = E) && y.constructor === k && x.key == y.ia) {
          Va(y, x, 1, l, !1);
        } else {
          var w = y;
          b.s = y = Xa(k, x, l);
          y.H = y.H || n;
          y.la = b;
          Va(y, x, 0, l, !1);
          Ka(y, 1, d, !0);
        }
        x = y.B;
      } else {
        n = v;
        if (w = E) {
          n = b.s = null;
        }
        if (v || 1 === c) {
          n && (n.s = null), x = Ta(n, h, l, d || !r, v && v.parentNode, !0);
        }
      }
      v && x !== v && y !== E && (l = v.parentNode) && x !== l && (l.replaceChild(x, v), w || (v.s = null, Q(v, !1)));
      w && Wa(w);
      if ((b.B = x) && !e) {
        for (w = v = b; w = w.la;) {
          (v = w).B = x;
        }
        x.s = v;
        x.Y = v.constructor;
      }
    }
    !r || d ? Pa.push(b) : H || (b.pa && b.pa(m, q, C), L.za && L.za(b));
    for (; b.P.length;) {
      b.P.pop().call(b);
    }
    Qa || e || Sa();
  }
}
function Wa(b) {
  L.Aa && L.Aa(b);
  var c = b.B;
  b.O = !0;
  b.Z && b.Z();
  b.B = null;
  var d = b.s;
  d ? Wa(d) : c && (null != c.__preactattr_ && Ca(c.__preactattr_.K, null), b.H = c, Ma(c), Za.push(b), Ya(c));
  Ca(b.ja, null);
}
function R(b, c) {
  this.N = !0;
  this.context = c;
  this.c = b;
  this.state = this.state || {};
  this.P = [];
}
N(R.prototype, {b:function(b, c) {
  this.fa || (this.fa = this.state);
  this.state = N(N({}, this.state), "function" === typeof b ? b(this.state, this.c) : b);
  c && this.P.push(c);
  Ha(this);
}, Da:function(b) {
  b && this.P.push(b);
  Ka(this, 2);
}, i:function() {
}});
var ab = {};
function bb(b, c) {
  return b.V < c.V ? 1 : b.V > c.V ? -1 : b.index - c.index;
}
function cb(b, c) {
  try {
    return b.index = c, b.V = b.attributes.default ? 0 : db(b.attributes.path).map(eb).join(""), b.attributes;
  } catch (d) {
    return !1;
  }
}
function db(b) {
  return b.replace(/(^\/+|\/+$)/g, "").split("/");
}
function eb(b) {
  return ":" == b.charAt(0) ? 1 + "*+?".indexOf(b.charAt(b.length - 1)) || 4 : 5;
}
;var S = null, T = [], fb = [];
function gb() {
  var b;
  S && S.location ? b = S.location : S && S.Ea ? b = S.Ea() : b = "undefined" !== typeof location ? location : {};
  return "" + (b.pathname || "") + (b.search || "");
}
function hb(b) {
  for (var c = !1, d = 0; d < T.length; d++) {
    !0 === ib(T[d], b) && (c = !0);
  }
  for (d = fb.length; d--;) {
    fb[d](b);
  }
  return c;
}
function jb(b) {
  if (b && b.getAttribute) {
    var c = b.getAttribute("href");
    b = b.getAttribute("target");
    if (c && c.match(/^\//g) && (!b || b.match(/^_?self$/i))) {
      var d = void 0 === d ? !1 : d;
      "string" !== typeof c && c.url && (d = c.replace, c = c.url);
      a: {
        b = c;
        for (var e = T.length; e--;) {
          if (0 < kb(T[e].c.children, b, !1).length) {
            b = !0;
            break a;
          }
        }
        b = !1;
      }
      if (b) {
        if (b = c, d = d ? "replace" : "push", d = void 0 === d ? "push" : d, S && S[d]) {
          S[d](b);
        } else {
          if ("undefined" !== typeof history && history[d + "State"]) {
            history[d + "State"](null, null, b);
          }
        }
      }
      return hb(c);
    }
  }
}
function lb(b) {
  if (0 == b.button) {
    return jb(b.currentTarget || b.target || this), mb(b);
  }
}
function mb(b) {
  b && (b.stopImmediatePropagation && b.stopImmediatePropagation(), b.stopPropagation && b.stopPropagation(), b.preventDefault());
  return !1;
}
function nb(b) {
  if (!(b.ctrlKey || b.metaKey || b.altKey || b.shiftKey || 0 !== b.button)) {
    var c = b.target;
    do {
      var d;
      if (d = "A" === String(c.nodeName).toUpperCase() && c.getAttribute("href")) {
        d = c, ca(), ca(), d = null != d.__preactattr_ || "undefined" !== typeof Symbol && null != d[Symbol.for("preactattr")];
      }
      if (d) {
        if (c.hasAttribute("native")) {
          break;
        }
        if (jb(c)) {
          return mb(b);
        }
      }
    } while (c = c.parentNode);
  }
}
var ob = !1;
function pb() {
  ob || ("function" === typeof addEventListener && (S || addEventListener("popstate", function() {
    hb(gb());
  }), addEventListener("click", nb)), ob = !0);
}
function qb(b) {
  R.call(this, b);
  b.history && (S = b.history);
  this.state = {url:b.url || gb()};
  pb();
}
A(qb, R);
g = qb.prototype;
g.L = function(b) {
  return !0 !== b.Va ? !0 : b.url !== this.c.url || b.j !== this.c.j;
};
function ib(b, c) {
  b.a = !1;
  b.b({url:c});
  if (b.updating) {
    return 0 < kb(b.c.children, c, !1).length;
  }
  b.Da();
  return b.a;
}
g.qa = function() {
  T.push(this);
  this.updating = !0;
};
g.w = function() {
  var b = this;
  S && (this.f = S.Qa(function(c) {
    ib(b, "" + (c.pathname || "") + (c.search || ""));
  }));
  this.updating = !1;
};
g.Z = function() {
  "function" === typeof this.f && this.f();
  T.splice(T.indexOf(this), 1);
};
g.ra = function() {
  this.updating = !0;
};
g.pa = function() {
  this.updating = !1;
};
function kb(b, c, d) {
  return b.filter(cb).sort(bb).map(function(b) {
    var e = c;
    var k = b.attributes.path, l = b.attributes, m = /(?:\?([^#]*))?(#.*)?$/, q = e.match(m), p = {};
    if (q && q[1]) {
      q = q[1].split("&");
      for (var r = 0; r < q.length; r++) {
        var n = q[r].split("=");
        p[decodeURIComponent(n[0])] = decodeURIComponent(n.slice(1).join("="));
      }
    }
    e = db(e.replace(m, ""));
    k = db(k || "");
    m = Math.max(e.length, k.length);
    for (q = 0; q < m; q++) {
      if (k[q] && ":" === k[q].charAt(0)) {
        r = k[q].replace(/(^:|[+*?]+$)/g, "");
        n = (k[q].match(/[+*?]+$/) || ab)[0] || "";
        var v = ~n.indexOf("+"), E = ~n.indexOf("*"), H = e[q] || "";
        if (!H && !E && (0 > n.indexOf("?") || v)) {
          var C = !1;
          break;
        }
        p[r] = decodeURIComponent(H);
        if (v || E) {
          p[r] = e.slice(q).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (k[q] !== e[q]) {
          C = !1;
          break;
        }
      }
    }
    if (e = !0 !== l.default && !1 === C ? !1 : p) {
      return !1 !== d ? (e = Object.assign({}, {url:c, matches:e}, e), delete e.K, delete e.key, Ea(b, e)) : b;
    }
  }).filter(Boolean);
}
g.i = function(b, c) {
  var d = b.j;
  c = c.url;
  b = kb(b.children, c, !0);
  var e = b[0] || null;
  this.a = !!e;
  var h = this.h;
  c !== h && (this.h = c, "function" === typeof d && d({Ua:this, url:c, Ta:h, active:b, current:e}));
  return e;
};
function rb(b) {
  return M("a", Object.assign({}, b, {onClick:lb}));
}
function sb() {
  R.call(this);
  this.a = this.a.bind(this);
}
A(sb, R);
sb.prototype.a = function(b) {
  this.f = b;
  this.b({});
};
sb.prototype.w = function() {
  fb.push(this.a);
};
sb.prototype.Z = function() {
  fb.splice(fb.indexOf(this.a) >>> 0, 1);
};
sb.prototype.i = function(b) {
  var c = this.f || gb(), d = c.replace(/\?.+$/, "");
  this.f = null;
  var e = b.children.filter(function(b) {
    return "function" == typeof b;
  });
  return e[0] && e[0]({url:c, path:d, matches:d === b.path});
};
function U(b) {
  var c = Object.assign({}, b), d = void 0 === b.ma ? "active" : b.ma;
  b = b.path;
  var e = (delete c.ma, delete c.path, c);
  return M(sb, {path:b || e.href}, function(b) {
    return M(rb, Object.assign({}, e, {className:[e.Ma || e.className, b.matches && d].filter(Boolean).join(" ")}));
  });
}
;function tb(b) {
  var c = Object.assign({}, b), d = b.children;
  b = b.className;
  c = (delete c.children, delete c.className, c);
  return M("div", Object.assign({}, c, {className:"row" + (b ? " " + b : "")}), d);
}
function V(b) {
  var c = Object.assign({}, b), d = b.children;
  b = b.className;
  c = (delete c.children, delete c.className, c);
  return M("div", Object.assign({}, c, {className:"col" + (b ? " " + b : "")}), d);
}
function ub(b) {
  var c = b.W, d = b.type, e = b.value;
  b = {required:b.required, name:b.name, placeholder:b.placeholder, className:"form-control" + (b.file ? "-file" : ""), id:b.id, "aria-describedby":b.C};
  return c ? M("textarea", Object.assign({}, b, {rows:"number" == typeof c ? c : 3}), e) : M("input", Object.assign({}, b, e ? {value:e} : {}, {type:d}));
}
function X(b) {
  var c = b.label, d = void 0 === b.type ? "text" : b.type, e = b.placeholder, h = b.v, k = b.W, l = b.file, m = b.options, q = b.Ia, p = "i" + 100000 * Math.random(), r = "h" + p;
  b = {C:r, id:p, value:b.value, name:b.name, required:b.required};
  d = m ? M(vb, Object.assign({}, b, {options:m, Ia:q})) : M(ub, Object.assign({}, b, {W:k, placeholder:e, type:d, file:l}));
  return M("div", {className:"form-group"}, M("label", {htmlFor:p}, c), d, h && M("small", {id:r, dangerouslySetInnerHTML:{X:h}, className:"form-text text-muted"}));
}
function vb(b) {
  var c = b.options, d = b.value;
  return M("select", {name:b.name, value:d, required:b.required, className:"custom-select", id:b.id, "aria-describedby":b.C}, M("option"), c.map(function(b) {
    var c = b.value;
    return M("option", {key:c, value:c, selected:c == d}, b.title);
  }));
}
function wb(b) {
  return M("span", {}, M("i", {className:b.icon}), " ");
}
;function xb() {
  return M("nav", {className:"nav flex-column"}, M(U, {className:"nav-link", href:"/admin"}, M("i", {className:"fab fa-kickstarter-k"}), " Главная"), M(U, {className:"nav-link", href:"/admin/objects"}, M("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), M(U, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, M("i", {className:"fas fa-home"}), " Новая Недвижимость"), M(U, {className:"nav-link", href:"/admin/categories"}, M("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), M(U, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, M("i", {className:"fas fa-folder-plus"}), " Добавить"), M(U, {className:"nav-link", href:"/admin/pages"}, M("i", {className:"fas fa-font"}), " Статьи"), M(U, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, M("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), M(U, {className:"nav-link", href:"/admin/special"}, M("i", {className:"fas fa-bolt"}), " Специальные Предложения"), 
  M(U, {className:"nav-link", href:"/admin/offers"}, M("i", {className:"fas fa-grip-lines"}), " Акции"));
}
;function Y(b, c) {
  return c = c || {}, new Promise(function(d, e) {
    function h() {
      var b, c = [], d = [], e = {};
      return k.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(h, k, l) {
        c.push(k = k.toLowerCase());
        d.push([k, l]);
        e[k] = (b = e[k]) ? b + "," + l : l;
      }), {ok:2 == (k.status / 100 | 0), status:k.status, statusText:k.statusText, url:k.responseURL, clone:h, text:function() {
        return Promise.resolve(k.responseText);
      }, json:function() {
        return Promise.resolve(k.responseText).then(JSON.parse);
      }, blob:function() {
        return Promise.resolve(new Blob([k.response]));
      }, headers:{keys:function() {
        return c;
      }, entries:function() {
        return d;
      }, get:function(b) {
        return e[b.toLowerCase()];
      }, has:function(b) {
        return b.toLowerCase() in e;
      }}};
    }
    var k = new XMLHttpRequest, l;
    for (l in k.open(c.method || "get", b, !0), c.headers) {
      k.setRequestHeader(l, c.headers[l]);
    }
    k.withCredentials = "include" == c.credentials;
    k.onload = function() {
      d(h());
    };
    k.onerror = e;
    k.send(c.body || null);
  });
}
;function yb() {
  R.call(this);
  this.state = {g:!1};
}
A(yb, R);
function zb(b) {
  var c, d, e, h;
  return K(function(k) {
    switch(k.f) {
      case 1:
        return b.b({g:!0}), F(k, 2, 3), B(k, fetch("/admin-data?" + b.c.path, {method:"POST"}), 5);
      case 5:
        return c = k.a, B(k, c.json(), 6);
      case 6:
        d = k.a, (e = d.error) ? b.b({error:e}) : (b.c.U(), b.c.ba());
      case 3:
        I(k);
        b.b({g:!1});
        J(k, 0);
        break;
      case 2:
        h = G(k), b.b({error:h}), k.m(3);
    }
  });
}
yb.prototype.i = function() {
  var b = this, c = this.c, d = c.text, e = c.U, h = void 0 === c.R ? "primary" : c.R, k = c.$, l = void 0 === c.Ba ? "Отмена" : c.Ba;
  return M("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, M("div", {className:"modal-dialog", role:"document"}, M("div", {className:"modal-content"}, M("div", {className:"modal-header"}, M("h5", {className:"modal-title"}, c.title), M("button", {onClick:e, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, M("span", {"aria-hidden":"true"}, "×"))), M("div", {className:"modal-body"}, M("p", {}, d)), M("div", {className:"modal-footer"}, 
  M("button", {onClick:e, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, l), M("button", {disabled:this.state.g, type:"button", className:"btn btn-" + h, onClick:function() {
    return zb(b);
  }}, this.state.g ? "Отправка..." : k)))));
};
function Ab() {
  R.call(this);
  this.state = {g:!1, data:[]};
}
A(Ab, R);
Ab.prototype.w = function() {
  var b = this;
  return K(function(c) {
    return B(c, b.load(), 0);
  });
};
Ab.prototype.load = function() {
  var b = this, c, d, e, h, k;
  return K(function(l) {
    switch(l.f) {
      case 1:
        return b.b({g:!0}), F(l, 2, 3), B(l, Y("/admin-data?categories"), 5);
      case 5:
        return c = l.a, B(l, c.json(), 6);
      case 6:
        d = l.a, e = d.error, h = d.data, e ? b.b({error:e}) : b.b({data:h});
      case 3:
        I(l);
        b.b({g:!1});
        J(l, 0);
        break;
      case 2:
        k = G(l), b.b({error:k}), l.m(3);
    }
  });
};
Ab.prototype.i = function() {
  var b = this;
  return M(V, {}, M("h1", {}, "Категории Каталога"), M("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), this.state.g && M("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(c) {
    var d = Object.assign({}, c);
    c = c._id;
    d = (delete d._id, d);
    return M(Bb, Object.assign({}, d, {key:c, id:c, J:function() {
      return b.load();
    }}));
  }));
};
function Bb() {
  R.call(this);
  this.state = {o:null};
}
A(Bb, R);
Bb.prototype.i = function() {
  var b = this, c = this.c, d = c.title, e = c.description, h = c.seo, k = c.id, l = c.J;
  return M(tb, {className:"CategoryRow"}, M(V, {className:"col-3 col-sm-4 "}, M("img", {src:c.image, className:"img-fluid p-1"})), M(V, {}, M("h2", {}, d), M("em", {}, "knedv.ru/", h), M("p", {}, e)), M(V, {className:"col-1 CategoryMeta"}, M("a", {href:"/admin/add-category/" + k, style:"color:brown;"}, M(wb, {icon:"fas fa-pen"})), M("br"), M("a", {onClick:function(c) {
    c.preventDefault();
    b.b({o:{text:M("span", {}, "Вы действительно хотите удалить категорию ", M("strong", {}, d), "?"), $:"Удалить", title:"Удаление Категории", path:"categories&id=" + k + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, M(wb, {icon:"far fa-trash-alt"}))), this.state.o && M(yb, Object.assign({}, this.state.o, {U:function() {
    b.b({o:null});
  }, R:"danger", ba:l})));
};
function Cb() {
  R.call(this);
  this.c = this.c;
}
A(Cb, R);
Cb.prototype.L = function(b, c, d) {
  b = this.c.name;
  return this.context.values[b] != d.values[b];
};
Cb.prototype.w = function() {
  var b = this.c, c = b.value;
  b = b.name;
  var d = this.context.j;
  d && void 0 !== c && d(b, c);
};
Cb.prototype.i = function(b) {
  var c = b.options, d = b.name, e = b.value, h = this.context, k = h.j, l = void 0 === h.values ? {} : h.values;
  return M("select", {name:d, value:d in l ? l[d] : e, required:b.required, className:"custom-select", id:h.id, "aria-describedby":h.C, onChange:function(b) {
    k(d, b.currentTarget.value);
  }}, M("option"), c.map(function(b) {
    var c = b.value;
    return M("option", {key:c, value:c, selected:c == e}, b.title);
  }));
};
function Db() {
  R.call(this);
  this.c = this.c;
}
A(Db, R);
Db.prototype.L = function(b, c, d) {
  b = this.c.name;
  return this.context.values[b] != d.values[b];
};
Db.prototype.w = function() {
  var b = this.c, c = u(b.children).next().value;
  b = b.name;
  var d = this.context.j;
  c && d(b, c.trim());
};
Db.prototype.i = function(b) {
  var c = b.name, d = b.children, e = this.context, h = e.j, k = void 0 === e.values ? {} : e.values;
  return M("textarea", {required:b.required, name:c, placeholder:b.placeholder, "aria-describedby":e.C, className:"form-control", id:e.id, onChange:function(b) {
    h(c, b.currentTarget.value);
  }, rows:void 0 === b.rows ? 3 : b.rows}, c in k ? k[c] : d);
};
function Eb() {
  R.call(this);
  this.c = this.c;
}
A(Eb, R);
Eb.prototype.L = function(b, c, d) {
  b = this.c.name;
  return this.context.values[b] != d.values[b];
};
Eb.prototype.w = function() {
  var b = this.c, c = b.value;
  b = b.name;
  var d = this.context.j;
  void 0 !== c && d(b, c);
};
Eb.prototype.i = function(b) {
  var c = b.name, d = b.value, e = this.context, h = e.j, k = void 0 === e.values ? {} : e.values;
  return M("input", {required:b.required, name:c, placeholder:b.placeholder, className:"form-control" + (b.file ? "-file" : ""), value:c in k ? k[c] : d, type:void 0 === b.type ? "text" : b.type, "aria-describedby":e.C, id:e.id, onChange:function(b) {
    h(c, b.currentTarget.value);
  }});
};
function Fb() {
  R.call(this);
  this.state = {values:{}};
  this.c = this.c;
}
A(Fb, R);
Fb.prototype.aa = function() {
  return {values:this.state.values, j:this.j.bind(this)};
};
Fb.prototype.j = function(b, c) {
  var d = {};
  this.b({values:Object.assign({}, this.state.values, (d[b] = c, d))});
  this.c.j && this.c.j(this.state.values);
};
Fb.prototype.i = function(b) {
  var c = Object.assign({}, b);
  b = b.children;
  c = (delete c.children, c);
  return M("form", Object.assign({}, c), b);
};
function Z() {
  R.call(this);
  this.id = "i" + Math.floor(100000 * Math.random());
  this.C = "h" + this.id;
  this.c = this.c;
}
A(Z, R);
Z.prototype.aa = function() {
  return {id:this.id, C:this.C};
};
Z.prototype.i = function() {
  var b = this.c, c = b.children, d = b.label;
  b = b.v;
  return M("div", {className:"form-group"}, d && M("label", {htmlFor:this.id}, d), c, b && M("small", {id:this.C, dangerouslySetInnerHTML:{X:b}, className:"form-text text-muted"}));
};
var Gb = {get La() {
  return Cb;
}, get wa() {
  return Db;
}, get ha() {
  return Eb;
}};
function Hb(b) {
  var c = b.article, d = b.ca;
  return M("div", {className:"form-group"}, M("label", {}, "Статья"), M("div", {dangerouslySetInnerHTML:{X:c}, style:"background: #edeee8;", className:"mb-3"}), M("a", {onClick:function(b) {
    b.preventDefault();
    window.a = function(b) {
      e.close();
      d(b);
    };
    window.f = function() {
      return c;
    };
    var e = Ib();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"));
}
function Ib() {
  var b = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (b.outerHeight / 2 + b.screenY - 325 - 50) + ",left=" + (b.outerWidth / 2 + b.screenX - 450));
}
;function Jb() {
  R.call(this);
  this.state = {g:!1, data:{}, hint:"москва-новостройки", article:""};
}
A(Jb, R);
Jb.prototype.w = function() {
  var b = this, c, d, e, h, k, l, m, q;
  return K(function(p) {
    switch(p.f) {
      case 1:
        c = !!b.c.id;
        if (!c) {
          return p.return();
        }
        b.b({D:1, g:!0});
        F(p, 2, 3);
        return B(p, Y("/admin-data?categories&id=" + b.c.id), 5);
      case 5:
        return d = p.a, B(p, d.json(), 6);
      case 6:
        e = p.a, h = e.error, k = e.data, h ? b.b({error:h}) : (l = u(k), m = l.next().value, b.b({data:m, hint:m.seo, article:m.article}));
      case 3:
        I(p);
        b.b({g:!1});
        J(p, 0);
        break;
      case 2:
        q = G(p), b.b({error:q}), p.m(3);
    }
  });
};
Jb.prototype.a = function(b) {
  var c = this, d, e, h, k, l;
  return K(function(m) {
    switch(m.f) {
      case 1:
        return c.b({error:null}), b.preventDefault(), d = new FormData(c.form), d.append("article", c.state.article), c.b({A:!0}), F(m, 2, 3), B(m, Y("/admin-data?categories", {method:"POST", body:d}), 5);
      case 5:
        return e = m.a, B(m, e.json(), 6);
      case 6:
        h = m.a, (k = h.error) ? c.b({error:k}) : c.b({M:1});
      case 3:
        I(m);
        c.b({A:!1});
        J(m, 4);
        break;
      case 2:
        l = G(m);
        c.b({error:l});
        m.m(3);
        break;
      case 4:
        return m.return(!1);
    }
  });
};
Jb.prototype.i = function() {
  var b = this, c = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.", d = this.state, e = d.D;
  d = d.ga;
  return M(V, {}, M("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Категорию"), e && this.state.g && M("span", {className:"echo-loader"}, "Loading…"), !(e && this.state.g) && M(Fb, {j:function(b) {
    console.log(b);
    console.log(b.seo);
  }, K:function(c) {
    return b.form = c;
  }, Ra:this.a.bind(this)}, M(Z, {label:"Название", v:"Название для меню слева."}, M(Gb.ha, {value:this.state.data.title, name:"title", placeholder:"Москва Новостройки", required:"1"})), M(Z, {v:c, label:"СЕО Название"}, M(Gb.ha, {value:this.state.data.seo, required:"1", name:"seo", placeholder:"москва-новостройки"})), M(Z, {label:"Описание", v:"Краткое описание для главной страницы."}, M(Gb.wa, {rows:"3", required:1, name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  this.state.data.description)), e && !d && M(Z, {label:"Изображение"}, M("br"), M("img", {src:this.state.data.cdnImage, className:"img-fluid"}), M("a", {onClick:function(c) {
    c.preventDefault();
    b.b({ga:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!e || d) && M(X, {name:"image", label:"Изображение", v:"Картинка, отображаемая на главной странице.", file:"1", type:"file", required:"1"}), M(Hb, {article:this.state.article, ca:function(c) {
    b.b({article:c});
  }}), e && M("input", {value:this.c.id, type:"hidden", name:"id"}), M("button", {disabled:this.state.A, type:"submit", className:"btn btn-primary"}, this.state.A ? "Загрузка..." : e ? "Сохранить" : "Добавить"), this.state.error && M("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.M && M("div", {className:"alert alert-success mt-3", role:"alert"}, "Категория успешно ", e ? "сохранена" : "создана", "!")));
};
function Kb() {
  R.call(this);
  this.state = {g:!1, data:[]};
}
A(Kb, R);
Kb.prototype.w = function() {
  var b = this;
  return K(function(c) {
    return B(c, b.load(), 0);
  });
};
Kb.prototype.load = function() {
  var b = this, c, d, e, h, k;
  return K(function(l) {
    switch(l.f) {
      case 1:
        return b.b({g:!0}), F(l, 2, 3), B(l, Y("/admin-data?objects"), 5);
      case 5:
        return c = l.a, B(l, c.json(), 6);
      case 6:
        d = l.a, e = d.error, h = d.data, e ? b.b({error:e}) : b.b({data:h});
      case 3:
        I(l);
        b.b({g:!1});
        J(l, 0);
        break;
      case 2:
        k = G(l), b.b({error:k}), l.m(3);
    }
  });
};
Kb.prototype.i = function() {
  var b = this;
  return M(V, {}, M("h1", {}, "Объекты Недвижимости"), M("p", {}, "На сайт добалены следующие объекты:"), this.state.g && M("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(c) {
    var d = Object.assign({}, c);
    c = c._id;
    d = (delete d._id, d);
    return M(Lb, Object.assign({}, d, {key:c, id:c, J:function() {
      return b.load();
    }}));
  }));
};
function Lb() {
  R.call(this);
  this.state = {o:null};
}
A(Lb, R);
Lb.prototype.i = function() {
  var b = this, c = this.c, d = c.title, e = c.description, h = c.seo, k = c.id, l = c.J, m = c.categorySeo;
  return M(tb, {className:"CategoryRow"}, M(V, {className:"col-3 col-sm-4 "}, M("img", {src:c.image, className:"img-fluid p-1"})), M(V, {}, M("h2", {}, d), M("em", {}, "knedv.ru/", m, "/", h), M("p", {}, e)), M(V, {className:"col-1 CategoryMeta"}, M("a", {href:"/admin/add-object/" + k, style:"color:brown;"}, M(wb, {icon:"fas fa-pen"})), M("br"), M("a", {onClick:function(c) {
    c.preventDefault();
    b.b({o:{text:M("span", {}, "Вы действительно хотите удалить объект ", M("strong", {}, d), "?"), $:"Удалить", title:"Удаление Объекта", path:"objects&id=" + k + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, M(wb, {icon:"far fa-trash-alt"}))), this.state.o && M(yb, Object.assign({}, this.state.o, {U:function() {
    b.b({o:null});
  }, R:"danger", ba:l})));
};
function Mb() {
  R.call(this);
  this.state = {g:!1, data:{}, oa:[], hint:"1-комнатные-апартаменты-воскресенское", na:"апартаменты", article:""};
}
A(Mb, R);
function Nb(b) {
  var c, d, e, h, k, l;
  return K(function(m) {
    switch(m.f) {
      case 1:
        return b.b({g:!0}), F(m, 2, 3), B(m, Y("/admin-data?categories"), 5);
      case 5:
        return c = m.a, B(m, c.json(), 6);
      case 6:
        d = m.a, e = d.error, h = d.data, e ? b.b({error:e}) : (k = h.map(function(b) {
          return {value:b._id, title:b.title};
        }), b.b({oa:k}));
      case 3:
        I(m);
        b.b({g:!1});
        J(m, 0);
        break;
      case 2:
        l = G(m), b.b({error:l}), m.m(3);
    }
  });
}
Mb.prototype.w = function() {
  var b = this, c, d, e, h, k, l, m, q, p, r;
  return K(function(n) {
    switch(n.f) {
      case 1:
        return B(n, Nb(b), 2);
      case 2:
        c = !!b.c.id;
        if (!c) {
          return n.return();
        }
        b.b({D:1, g:!0});
        F(n, 3, 4);
        return B(n, Y("/admin-data?objects&id=" + b.c.id), 6);
      case 6:
        return d = n.a, B(n, d.json(), 7);
      case 7:
        e = n.a, h = e.error, k = e.data, h ? b.b({error:h}) : (l = u(k), m = l.next().value, b.b({data:m, hint:m.seo, na:m.categorySeo, article:m.article}));
      case 4:
        I(n);
        b.b({g:!1});
        J(n, 0);
        break;
      case 3:
        p = q = G(n), r = p.message, b.b({error:r}), n.m(4);
    }
  });
};
Mb.prototype.a = function(b) {
  var c = this, d, e, h, k, l;
  return K(function(m) {
    switch(m.f) {
      case 1:
        return c.b({error:null}), b.preventDefault(), d = new FormData(c.form), d.append("article", c.state.article), c.b({A:!0}), F(m, 2, 3), B(m, Y("/admin-data?objects", {method:"POST", body:d}), 5);
      case 5:
        return e = m.a, B(m, e.json(), 6);
      case 6:
        h = m.a, (k = h.error) ? c.b({error:k}) : c.b({M:1});
      case 3:
        I(m);
        c.b({A:!1});
        J(m, 4);
        break;
      case 2:
        l = G(m);
        c.b({error:l});
        m.m(3);
        break;
      case 4:
        return m.return(!1);
    }
  });
};
Mb.prototype.i = function() {
  var b = this, c = "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.na + "/<strong>" + this.state.hint + "</strong>.", d = this.state, e = d.D;
  d = d.ga;
  return M(V, {}, M("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Объект"), e && this.state.g && M("span", {className:"echo-loader"}, "Loading…"), !(e && this.state.g) && M("form", {ref:function(c) {
    return b.form = c;
  }, onSubmit:this.a.bind(this)}, M(X, Object.assign({}, e ? {value:this.state.data.title} : {}, {name:"title", placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское", label:"Название", v:"Название для каталога недвижимости.", required:"1"})), M(X, Object.assign({}, e ? {value:this.state.data.seo} : {}, {v:c, name:"seo", placeholder:"1-комнатные-апартаменты-воскресенское", label:"СЕО Название", required:"1"})), M(X, {W:10, name:"description", placeholder:"Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично).", 
  label:"Описание", v:"Описание объекта.", value:this.state.data.description, required:"1"}), e && !d && M("div", {className:"form-group"}, M("label", {}, "Изображение"), M("br"), M("img", {src:this.state.data.cdnImage, className:"img-fluid"}), M("a", {onClick:function(c) {
    c.preventDefault();
    b.b({ga:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")), (!e || d) && M(X, {name:"image", label:"Изображение", v:"Картинка, отображаемая на главной странице.", file:"1", type:"file", required:"1"}), M(Hb, {article:this.state.article, ca:function(c) {
    b.b({article:c});
  }}), e && M("input", {value:this.c.id, type:"hidden", name:"id"}), M(X, {options:this.state.oa, name:"category", label:"Раздел", v:"Категория в каталоге", value:this.state.data.category, required:"1"}), M("button", {disabled:this.state.A, type:"submit", className:"btn btn-primary"}, this.state.A ? "Загрузка..." : e ? "Сохранить" : "Добавить"), this.state.error && M("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.M && M("div", {className:"alert alert-success mt-3", 
  role:"alert"}, "Объект успешно ", e ? "сохранен" : "создан", "!")));
};
function Ob() {
  R.call(this);
  this.state = {g:!1, data:[]};
}
A(Ob, R);
Ob.prototype.w = function() {
  var b = this;
  return K(function(c) {
    return B(c, b.load(), 0);
  });
};
Ob.prototype.load = function() {
  var b = this, c, d, e, h, k;
  return K(function(l) {
    switch(l.f) {
      case 1:
        return b.b({g:!0}), F(l, 2, 3), B(l, Y("/admin-data?pages"), 5);
      case 5:
        return c = l.a, B(l, c.json(), 6);
      case 6:
        d = l.a, e = d.error, h = d.data, e ? b.b({error:e}) : b.b({data:h});
      case 3:
        I(l);
        b.b({g:!1});
        J(l, 0);
        break;
      case 2:
        k = G(l), b.b({error:k}), l.m(3);
    }
  });
};
Ob.prototype.i = function() {
  var b = this;
  return M(V, {}, M("h1", {}, "Материалы Сайта"), M("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.g && M("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(c) {
    var d = Object.assign({}, c);
    c = c._id;
    d = (delete d._id, d);
    return M(Pb, Object.assign({}, d, {key:c, id:c, J:function() {
      return b.load();
    }}));
  }));
};
function Pb() {
  R.call(this);
  this.state = {o:null};
}
A(Pb, R);
Pb.prototype.i = function() {
  var b = this, c = this.c, d = c.seo, e = c.id, h = c.description, k = c.J, l = c.title;
  return M(tb, {className:"CategoryRow"}, M(V, {}, M("h2", {}, l), M("em", {}, "knedv.ru/", d), M("p", {}, h)), M(V, {className:"col-1 CategoryMeta"}, M("a", {href:"/admin/add-page/" + e, style:"color:brown;"}, M(wb, {icon:"fas fa-pen"})), M("br"), M("a", {onClick:function(c) {
    c.preventDefault();
    b.b({o:{text:M("span", {}, "Вы действительно хотите удалить страницу ", M("strong", {}, l), "?"), $:"Удалить", title:"Удаление Страницы", path:"pages&id=" + e + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, M(wb, {icon:"far fa-trash-alt"}))), this.state.o && M(yb, Object.assign({}, this.state.o, {U:function() {
    b.b({o:null});
  }, R:"danger", ba:k})));
};
function Qb() {
  R.call(this);
  this.state = {g:!1, data:{}, article:""};
}
A(Qb, R);
Qb.prototype.w = function() {
  var b = this, c, d, e, h, k, l, m, q, p, r;
  return K(function(n) {
    switch(n.f) {
      case 1:
        c = !!b.c.id;
        if (!c) {
          return n.return();
        }
        b.b({D:1, g:!0});
        F(n, 2, 3);
        return B(n, Y("/admin-data?pages&id=" + b.c.id), 5);
      case 5:
        return d = n.a, B(n, d.json(), 6);
      case 6:
        e = n.a, h = e.error, k = e.data, h ? b.b({error:h}) : (l = u(k), m = l.next().value, b.b({data:m, article:m.article}));
      case 3:
        I(n);
        b.b({g:!1});
        J(n, 0);
        break;
      case 2:
        p = q = G(n), r = p.message, b.b({error:r}), n.m(3);
    }
  });
};
Qb.prototype.a = function(b) {
  var c = this, d, e, h, k, l;
  return K(function(m) {
    switch(m.f) {
      case 1:
        return c.b({error:null}), b.preventDefault(), d = new FormData(c.form), d.append("article", c.state.article), c.b({A:!0}), F(m, 2, 3), B(m, Y("/admin-data?pages", {method:"POST", body:d}), 5);
      case 5:
        return e = m.a, B(m, e.json(), 6);
      case 6:
        h = m.a, (k = h.error) ? c.b({error:k}) : c.b({M:1});
      case 3:
        I(m);
        c.b({A:!1});
        J(m, 4);
        break;
      case 2:
        l = G(m);
        c.b({error:l});
        m.m(3);
        break;
      case 4:
        return m.return(!1);
    }
  });
};
Qb.prototype.i = function() {
  var b = this, c = this.state.D;
  return M(V, {}, M("h1", {}, this.state.D ? "Редактировать" : "Добавить", " Страницу"), c && this.state.g && M("span", {className:"echo-loader"}, "Loading…"), !(c && this.state.g) && M("form", {ref:function(c) {
    return b.form = c;
  }, onSubmit:this.a.bind(this)}, M(X, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", v:"Название для администратора.", required:"1"}), M(X, {v:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), M(X, {W:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", v:"Описание страницы.", value:this.state.data.description, required:"1"}), M(Hb, 
  {article:this.state.article, ca:function(c) {
    b.b({article:c});
  }}), c && M("input", {value:this.c.id, type:"hidden", name:"id"}), M("button", {disabled:this.state.A, type:"submit", className:"btn btn-primary"}, this.state.A ? "Загрузка..." : c ? "Сохранить" : "Добавить"), this.state.error && M("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.M && M("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", c ? "сохранена" : "создана", "!")));
};
function Rb() {
  return M(V, {}, M("h1", {}, "Добро Пожаловать!"));
}
;var Sb = M(function() {
  return M(tb, {id:"App"}, M(V, {className:"col-md-4"}, M(xb)), M(qb, {j:function(b) {
    b.current && b.current.attributes.title && (document.title = b.current.attributes.title);
  }}, M(Rb, {path:"/admin", title:"Главная"}), M(Kb, {path:"/admin/objects", title:"Объекты Недвижимости"}), M(Mb, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), M(Ab, {path:"/admin/categories", title:"Категории Каталога"}), M(Jb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), M(Ob, {path:"/admin/pages", title:"Статьи"}), M(Qb, {path:"/admin/add-page/:id?", title:"Добавить Страницу"})));
});
Ta(document.querySelector("#App"), Sb, {}, !1, document.querySelector("#AppContainer"), !1);


//# sourceMappingURL=admin.js.map