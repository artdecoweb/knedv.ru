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
function fa(a, b) {
  this.a = a;
  ba(this, "description", {configurable:!0, writable:!0, value:b});
}
fa.prototype.toString = function() {
  return this.a;
};
var da = function() {
  function a(c) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new fa("jscomp_symbol_" + (c || "") + "_" + b++, c);
  }
  var b = 0;
  return a;
}();
function ha() {
  ca();
  var a = q.Symbol.iterator;
  a || (a = q.Symbol.iterator = q.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] && ba(Array.prototype, a, {configurable:!0, writable:!0, value:function() {
    return ia(aa(this));
  }});
  ha = function() {
  };
}
function ia(a) {
  ha();
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
function ja(a) {
  for (var b, c = []; !(b = a.next()).done;) {
    c.push(b.value);
  }
  return c;
}
function ka(a) {
  return a instanceof Array ? a : ja(r(a));
}
var la = "function" == typeof Object.create ? Object.create : function(a) {
  function b() {
  }
  b.prototype = a;
  return new b;
}, ma;
if ("function" == typeof Object.setPrototypeOf) {
  ma = Object.setPrototypeOf;
} else {
  var na;
  a: {
    var oa = {ja:!0}, pa = {};
    try {
      pa.__proto__ = oa;
      na = pa.ja;
      break a;
    } catch (a) {
    }
    na = !1;
  }
  ma = na ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) {
      throw new TypeError(a + " is not extensible");
    }
    return a;
  } : null;
}
var qa = ma;
function t(a, b) {
  a.prototype = la(b.prototype);
  a.prototype.constructor = a;
  if (qa) {
    qa(a, b);
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
  a.Ia = b.prototype;
}
function ra(a, b) {
  if (b) {
    var c = q;
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
ra("Promise", function(a) {
  function b(k) {
    this.b = 0;
    this.o = void 0;
    this.a = [];
    var g = this.f();
    try {
      k(g.resolve, g.reject);
    } catch (l) {
      g.reject(l);
    }
  }
  function c() {
    this.a = null;
  }
  function f(k) {
    return k instanceof b ? k : new b(function(g) {
      g(k);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.b = function(k) {
    if (null == this.a) {
      this.a = [];
      var g = this;
      this.f(function() {
        g.o();
      });
    }
    this.a.push(k);
  };
  var e = q.setTimeout;
  c.prototype.f = function(k) {
    e(k, 0);
  };
  c.prototype.o = function() {
    for (; this.a && this.a.length;) {
      var k = this.a;
      this.a = [];
      for (var g = 0; g < k.length; ++g) {
        var l = k[g];
        k[g] = null;
        try {
          l();
        } catch (m) {
          this.i(m);
        }
      }
    }
    this.a = null;
  };
  c.prototype.i = function(k) {
    this.f(function() {
      throw k;
    });
  };
  b.prototype.f = function() {
    function k(m) {
      return function(p) {
        l || (l = !0, m.call(g, p));
      };
    }
    var g = this, l = !1;
    return {resolve:k(this.xa), reject:k(this.i)};
  };
  b.prototype.xa = function(k) {
    if (k === this) {
      this.i(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (k instanceof b) {
        this.za(k);
      } else {
        a: {
          switch(typeof k) {
            case "object":
              var g = null != k;
              break a;
            case "function":
              g = !0;
              break a;
            default:
              g = !1;
          }
        }
        g ? this.J(k) : this.B(k);
      }
    }
  };
  b.prototype.J = function(k) {
    var g = void 0;
    try {
      g = k.then;
    } catch (l) {
      this.i(l);
      return;
    }
    "function" == typeof g ? this.Aa(g, k) : this.B(k);
  };
  b.prototype.i = function(k) {
    this.C(2, k);
  };
  b.prototype.B = function(k) {
    this.C(1, k);
  };
  b.prototype.C = function(k, g) {
    if (0 != this.b) {
      throw Error("Cannot settle(" + k + ", " + g + "): Promise already settled in state" + this.b);
    }
    this.b = k;
    this.o = g;
    this.G();
  };
  b.prototype.G = function() {
    if (null != this.a) {
      for (var k = 0; k < this.a.length; ++k) {
        h.b(this.a[k]);
      }
      this.a = null;
    }
  };
  var h = new c;
  b.prototype.za = function(k) {
    var g = this.f();
    k.I(g.resolve, g.reject);
  };
  b.prototype.Aa = function(k, g) {
    var l = this.f();
    try {
      k.call(g, l.resolve, l.reject);
    } catch (m) {
      l.reject(m);
    }
  };
  b.prototype.then = function(k, g) {
    function l(w, B) {
      return "function" == typeof w ? function(R) {
        try {
          m(w(R));
        } catch (ea) {
          p(ea);
        }
      } : B;
    }
    var m, p, n = new b(function(w, B) {
      m = w;
      p = B;
    });
    this.I(l(k, m), l(g, p));
    return n;
  };
  b.prototype.catch = function(k) {
    return this.then(void 0, k);
  };
  b.prototype.I = function(k, g) {
    function l() {
      switch(m.b) {
        case 1:
          k(m.o);
          break;
        case 2:
          g(m.o);
          break;
        default:
          throw Error("Unexpected state: " + m.b);
      }
    }
    var m = this;
    null == this.a ? h.b(l) : this.a.push(l);
  };
  b.resolve = f;
  b.reject = function(k) {
    return new b(function(g, l) {
      l(k);
    });
  };
  b.race = function(k) {
    return new b(function(g, l) {
      for (var m = r(k), p = m.next(); !p.done; p = m.next()) {
        f(p.value).I(g, l);
      }
    });
  };
  b.all = function(k) {
    var g = r(k), l = g.next();
    return l.done ? f([]) : new b(function(m, p) {
      function n(R) {
        return function(ea) {
          w[R] = ea;
          B--;
          0 == B && m(w);
        };
      }
      var w = [], B = 0;
      do {
        w.push(void 0), B++, f(l.value).I(n(w.length - 1), p), l = g.next();
      } while (!l.done);
    });
  };
  return b;
});
function sa() {
  this.C = !1;
  this.i = null;
  this.b = void 0;
  this.a = 1;
  this.o = this.B = 0;
  this.J = this.f = null;
}
function ta(a) {
  if (a.C) {
    throw new TypeError("Generator is already running");
  }
  a.C = !0;
}
sa.prototype.G = function(a) {
  this.b = a;
};
function ua(a, b) {
  a.f = {Z:b, aa:!0};
  a.a = a.B || a.o;
}
sa.prototype.return = function(a) {
  this.f = {return:a};
  this.a = this.o;
};
function u(a, b, c) {
  a.a = c;
  return {value:b};
}
sa.prototype.s = function(a) {
  this.a = a;
};
function v(a) {
  a.B = 2;
  a.o = 3;
}
function x(a) {
  a.B = 0;
  var b = a.f.Z;
  a.f = null;
  return b;
}
function y(a) {
  a.J = [a.f];
  a.B = 0;
  a.o = 0;
}
function z(a, b) {
  var c = a.J.splice(0)[0];
  (c = a.f = a.f || c) ? c.aa ? a.a = a.B || a.o : void 0 != c.s && a.o < c.s ? (a.a = c.s, a.f = null) : a.a = a.o : a.a = b;
}
function va(a) {
  this.a = new sa;
  this.b = a;
}
function wa(a, b) {
  ta(a.a);
  var c = a.a.i;
  if (c) {
    return xa(a, "return" in c ? c["return"] : function(f) {
      return {value:f, done:!0};
    }, b, a.a.return);
  }
  a.a.return(b);
  return ya(a);
}
function xa(a, b, c, f) {
  try {
    var e = b.call(a.a.i, c);
    if (!(e instanceof Object)) {
      throw new TypeError("Iterator result " + e + " is not an object");
    }
    if (!e.done) {
      return a.a.C = !1, e;
    }
    var h = e.value;
  } catch (k) {
    return a.a.i = null, ua(a.a, k), ya(a);
  }
  a.a.i = null;
  f.call(a.a, h);
  return ya(a);
}
function ya(a) {
  for (; a.a.a;) {
    try {
      var b = a.b(a.a);
      if (b) {
        return a.a.C = !1, {value:b.value, done:!1};
      }
    } catch (c) {
      a.a.b = void 0, ua(a.a, c);
    }
  }
  a.a.C = !1;
  if (a.a.f) {
    b = a.a.f;
    a.a.f = null;
    if (b.aa) {
      throw b.Z;
    }
    return {value:b.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function za(a) {
  this.next = function(b) {
    ta(a.a);
    a.a.i ? b = xa(a, a.a.i.next, b, a.a.G) : (a.a.G(b), b = ya(a));
    return b;
  };
  this.throw = function(b) {
    ta(a.a);
    a.a.i ? b = xa(a, a.a.i["throw"], b, a.a.G) : (ua(a.a, b), b = ya(a));
    return b;
  };
  this.return = function(b) {
    return wa(a, b);
  };
  ha();
  this[Symbol.iterator] = function() {
    return this;
  };
}
function Aa(a) {
  function b(f) {
    return a.next(f);
  }
  function c(f) {
    return a.throw(f);
  }
  return new Promise(function(f, e) {
    function h(k) {
      k.done ? f(k.value) : Promise.resolve(k.value).then(b, c).then(h, e);
    }
    h(a.next());
  });
}
function A(a) {
  return Aa(new za(new va(a)));
}
function Ba(a, b) {
  ha();
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
ra("Array.prototype.values", function(a) {
  return a ? a : function() {
    return Ba(this, function(b, c) {
      return c;
    });
  };
});
var Ca = "function" == typeof Object.assign ? Object.assign : function(a, b) {
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
ra("Object.assign", function(a) {
  return a || Ca;
});
ra("String.prototype.repeat", function(a) {
  return a ? a : function(b) {
    if (null == this) {
      throw new TypeError("The 'this' value for String.prototype.repeat must not be null or undefined");
    }
    var c = this;
    if (0 > b || 1342177279 < b) {
      throw new RangeError("Invalid count value");
    }
    b |= 0;
    for (var f = ""; b;) {
      if (b & 1 && (f += c), b >>>= 1) {
        c += c;
      }
    }
    return f;
  };
});
var Da = preact, C = Da.h, Ea = Da.cloneElement, D = Da.Component, Fa = Da.render;
var Ga = {};
function Ha(a, b) {
  return a.N < b.N ? 1 : a.N > b.N ? -1 : a.index - b.index;
}
function Ia(a, b) {
  try {
    return a.index = b, a.N = a.attributes.default ? 0 : Ja(a.attributes.path).map(Ka).join(""), a.attributes;
  } catch (c) {
    return !1;
  }
}
function Ja(a) {
  return a.replace(/(^\/+|\/+$)/g, "").split("/");
}
function Ka(a) {
  return ":" == a.charAt(0) ? 1 + "*+?".indexOf(a.charAt(a.length - 1)) || 4 : 5;
}
;var E = null, La = [], Ma = [];
function Na() {
  var a;
  E && E.location ? a = E.location : E && E.la ? a = E.la() : a = "undefined" !== typeof location ? location : {};
  return "" + (a.pathname || "") + (a.search || "");
}
function Oa(a) {
  for (var b = !1, c = 0; c < La.length; c++) {
    !0 === Pa(La[c], a) && (b = !0);
  }
  for (c = Ma.length; c--;) {
    Ma[c](a);
  }
  return b;
}
function Qa(a) {
  if (a && a.getAttribute) {
    var b = a.getAttribute("href");
    a = a.getAttribute("target");
    if (b && b.match(/^\//g) && (!a || a.match(/^_?self$/i))) {
      var c = void 0 === c ? !1 : c;
      "string" !== typeof b && b.url && (c = b.replace, b = b.url);
      a: {
        a = b;
        for (var f = La.length; f--;) {
          if (0 < Ra(La[f].props.children, a, !1).length) {
            a = !0;
            break a;
          }
        }
        a = !1;
      }
      if (a) {
        if (a = b, c = c ? "replace" : "push", c = void 0 === c ? "push" : c, E && E[c]) {
          E[c](a);
        } else {
          if ("undefined" !== typeof history && history[c + "State"]) {
            history[c + "State"](null, null, a);
          }
        }
      }
      return Oa(b);
    }
  }
}
function Sa(a) {
  if (0 == a.button) {
    return Qa(a.currentTarget || a.target || this), Ta(a);
  }
}
function Ta(a) {
  a && (a.stopImmediatePropagation && a.stopImmediatePropagation(), a.stopPropagation && a.stopPropagation(), a.preventDefault());
  return !1;
}
function Ua(a) {
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
        if (Qa(b)) {
          return Ta(a);
        }
      }
    } while (b = b.parentNode);
  }
}
var Va = !1;
function Wa() {
  Va || ("function" === typeof addEventListener && (E || addEventListener("popstate", function() {
    Oa(Na());
  }), addEventListener("click", Ua)), Va = !0);
}
function Xa(a) {
  var b = D.call(this, a) || this;
  a.history && (E = a.history);
  b.state = {url:a.url || Na()};
  b.b = null;
  b.a = null;
  b.f = null;
  b.i = null;
  Wa();
  return b;
}
t(Xa, D);
d = Xa.prototype;
d.shouldComponentUpdate = function(a) {
  return !0 !== a.Ha ? !0 : a.url !== this.props.url || a.onChange !== this.props.onChange;
};
function Pa(a, b) {
  a.b = !1;
  a.setState({url:b});
  if (a.a) {
    return 0 < Ra(a.props.children, b, !1).length;
  }
  a.forceUpdate();
  return a.b;
}
d.componentWillMount = function() {
  La.push(this);
  this.a = !0;
};
d.componentDidMount = function() {
  var a = this;
  E && (this.f = E.Da(function(b) {
    Pa(a, "" + (b.pathname || "") + (b.search || ""));
  }));
  this.a = !1;
};
d.componentWillUnmount = function() {
  "function" === typeof this.f && this.f();
  La.splice(La.indexOf(this), 1);
};
d.componentWillUpdate = function() {
  this.a = !0;
};
d.componentDidUpdate = function() {
  this.a = !1;
};
function Ra(a, b, c) {
  return a.filter(Ia).sort(Ha).map(function(f) {
    var e = b;
    var h = f.attributes.path, k = f.attributes, g = /(?:\?([^#]*))?(#.*)?$/, l = e.match(g), m = {};
    if (l && l[1]) {
      l = l[1].split("&");
      for (var p = 0; p < l.length; p++) {
        var n = l[p].split("=");
        m[decodeURIComponent(n[0])] = decodeURIComponent(n.slice(1).join("="));
      }
    }
    e = Ja(e.replace(g, ""));
    h = Ja(h || "");
    g = Math.max(e.length, h.length);
    for (l = 0; l < g; l++) {
      if (h[l] && ":" === h[l].charAt(0)) {
        p = h[l].replace(/(^:|[+*?]+$)/g, "");
        n = (h[l].match(/[+*?]+$/) || Ga)[0] || "";
        var w = ~n.indexOf("+"), B = ~n.indexOf("*"), R = e[l] || "";
        if (!R && !B && (0 > n.indexOf("?") || w)) {
          var ea = !1;
          break;
        }
        m[p] = decodeURIComponent(R);
        if (w || B) {
          m[p] = e.slice(l).map(decodeURIComponent).join("/");
          break;
        }
      } else {
        if (h[l] !== e[l]) {
          ea = !1;
          break;
        }
      }
    }
    if (e = !0 !== k.default && !1 === ea ? !1 : m) {
      return !1 !== c ? (e = Object.assign({}, {url:b, matches:e}, e), delete e.Fa, delete e.key, Ea(f, e)) : f;
    }
  }).filter(Boolean);
}
d.render = function(a, b) {
  var c = a.onChange;
  b = b.url;
  a = Ra(a.children, b, !0);
  var f = a[0] || null;
  this.b = !!f;
  var e = this.i;
  b !== e && (this.i = b, "function" === typeof c && c({Ga:this, url:b, Ea:e, active:a, current:f}));
  return f;
};
function Ya(a) {
  return C("a", Object.assign({}, a, {onClick:Sa}));
}
function Za() {
  var a = D.call(this) || this;
  a.a = a.a.bind(a);
  a.b = null;
  return a;
}
t(Za, D);
Za.prototype.a = function(a) {
  this.b = a;
  this.setState({});
};
Za.prototype.componentDidMount = function() {
  Ma.push(this.a);
};
Za.prototype.componentWillUnmount = function() {
  Ma.splice(Ma.indexOf(this.a) >>> 0, 1);
};
Za.prototype.render = function(a) {
  var b = this.b || Na(), c = b.replace(/\?.+$/, "");
  this.b = null;
  var f = a.children.filter(function(e) {
    return "function" == typeof e;
  });
  return f[0] && f[0]({url:b, path:c, matches:c === a.path});
};
function F(a) {
  var b = Object.assign({}, a), c = void 0 === a.V ? "active" : a.V;
  a = a.path;
  var f = (delete b.V, delete b.path, b);
  return C(Za, {path:a || f.href}, function(e) {
    return C(Ya, Object.assign({}, f, {className:[f.Ca || f.className, e.matches && c].filter(Boolean).join(" ")}));
  });
}
;function $a(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return C("div", Object.assign({}, b, {className:"row" + (a ? " " + a : "")}), c);
}
function ab(a) {
  return C("div", {className:"spinner-grow text-" + (void 0 === a.color ? "danger" : a.color), role:"status"}, C("span", {className:"sr-only"}, "Loading..."));
}
function G(a) {
  var b = Object.assign({}, a), c = a.children;
  a = a.className;
  b = (delete b.children, delete b.className, b);
  return C("div", Object.assign({}, b, {className:"col" + (a ? " " + a : "")}), c);
}
function bb(a) {
  var b = Object.assign({}, a), c = a.P, f = a.className;
  a = a.children;
  b = (delete b.P, delete b.className, delete b.children, b);
  return C("a", Object.assign({}, b, {className:f, href:"#", onClick:function(e) {
    e.preventDefault();
    c(e);
    return !1;
  }}), a);
}
function cb(a) {
  var b = a.T, c = a.type, f = a.value;
  a = {required:a.required, name:a.name, placeholder:a.placeholder, className:"form-control" + (a.file ? "-file" : ""), id:a.id, "aria-describedby":a.v};
  return b ? C("textarea", Object.assign({}, a, {rows:"number" == typeof b ? b : 3}), f) : C("input", Object.assign({}, a, f ? {value:f} : {}, {type:c}));
}
function db(a) {
  var b = a.label, c = void 0 === a.type ? "text" : a.type, f = a.placeholder, e = a.help, h = a.T, k = a.file, g = a.options, l = a.ya, m = "i" + 100000 * Math.random(), p = "h" + m;
  a = {v:p, id:m, value:a.value, name:a.name, required:a.required};
  c = g ? C(eb, Object.assign({}, a, {options:g, ya:l})) : C(cb, Object.assign({}, a, {T:h, placeholder:f, type:c, file:k}));
  return C("div", {className:"form-group"}, C("label", {htmlFor:m}, b), c, e && C("small", {id:p, dangerouslySetInnerHTML:{U:e}, className:"form-text text-muted"}));
}
function eb(a) {
  var b = a.options, c = a.value;
  return C("select", {name:a.name, value:c, required:a.required, className:"custom-select", id:a.id, "aria-describedby":a.v}, C("option"), b.map(function(f) {
    var e = f.value;
    return C("option", {key:e, value:e, selected:e == c}, f.title);
  }));
}
function H(a) {
  return C("span", {}, C("i", {className:a.icon}), " ");
}
function fb() {
  return D.apply(this, arguments) || this;
}
t(fb, D);
fb.prototype.shouldComponentUpdate = function(a, b, c) {
  a = this.props.name;
  return this.context.values[a] != c.values[a];
};
fb.prototype.componentDidMount = function() {
  var a = this.props, b = a.value;
  a = a.name;
  var c = this.context.onChange;
  void 0 !== b && c(a, b);
};
fb.prototype.render = function(a) {
  var b = a.name, c = a.label, f = a.value, e = this.context, h = e.id, k = e.onChange, g = void 0 === e.values ? {} : e.values;
  return C("div", {className:"custom-control custom-switch"}, C("input", {required:void 0 !== a.required, name:b, checked:b in g ? g[b] : f, id:h, type:"checkbox", className:"custom-control-input", "aria-described-by":e.v, onChange:function(l) {
    k(b, l.currentTarget.checked);
  }}), C("label", {htmlFor:h, className:"custom-control-label"}, c));
};
function gb(a) {
  a = a.error;
  if (!a) {
    return null;
  }
  "string" != typeof a && (a = "Ошибка");
  return C("div", {className:"alert alert-danger mt-3", role:"alert"}, a);
}
function hb(a) {
  var b = a.success;
  return b ? C("div", {className:"alert alert-success mt-3", role:"alert"}, a.message || b) : null;
}
;function ib() {
  return C("nav", {className:"nav flex-column"}, C(F, {className:"nav-link", href:"/admin"}, C("i", {className:"fab fa-kickstarter-k"}), " Главная"), C(F, {className:"nav-link", href:"/admin/objects"}, C("i", {className:"fas fa-map-marked-alt"}), " Управление Объектами"), C(F, {className:"nav-link", href:"/admin/add-object", style:"margin-left:2rem"}, C("i", {className:"fas fa-home"}), " Новая Недвижимость"), C(F, {className:"nav-link", href:"/admin/categories"}, C("i", {className:"far fa-list-alt"}), 
  " Категории Каталога"), C(F, {className:"nav-link", href:"/admin/add-category", style:"margin-left:2rem"}, C("i", {className:"fas fa-folder-plus"}), " Добавить"), C(F, {className:"nav-link", href:"/admin/pages"}, C("i", {className:"fas fa-font"}), " Статьи"), C(F, {className:"nav-link", href:"/admin/add-page", style:"margin-left:2rem"}, C("i", {className:"fas fa-pen-nib"}), " Добавить Страницу"), C(F, {className:"nav-link", href:"/admin/special"}, C("i", {className:"fas fa-bolt"}), " Спец. Предложения"), 
  C(F, {className:"nav-link", href:"/admin/offers"}, C("i", {className:"fas fa-grip-lines"}), " Акции"), C(F, {className:"nav-link", href:"/admin/galleries/"}, C("i", {className:"fas fa-camera-retro"}), " Галереи"));
}
;function jb() {
  var a = D.call(this) || this;
  a.state = {loading:!1};
  return a;
}
t(jb, D);
function kb(a) {
  var b, c, f, e;
  return A(function(h) {
    switch(h.a) {
      case 1:
        return a.setState({loading:!0}), v(h), u(h, fetch("/admin-data?" + a.props.path, {method:"POST"}), 5);
      case 5:
        return b = h.b, u(h, b.json(), 6);
      case 6:
        c = h.b, (f = c.error) ? a.setState({error:f}) : (a.props.j(), a.props.K());
      case 3:
        y(h);
        a.setState({loading:!1});
        z(h, 0);
        break;
      case 2:
        e = x(h), a.setState({error:e}), h.s(3);
    }
  });
}
jb.prototype.render = function(a) {
  var b = this, c = a.text, f = a.j, e = void 0 === a.F ? "primary" : a.F, h = a.confirmText, k = void 0 === a.u ? "Отмена" : a.u;
  return C("div", {className:"modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, C("div", {className:"modal-dialog", role:"document"}, C("div", {className:"modal-content"}, C("div", {className:"modal-header"}, C("h5", {className:"modal-title"}, a.title), C("button", {onClick:f, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, C("span", {"aria-hidden":"true"}, "×"))), C("div", {className:"modal-body"}, C("p", {}, c)), C("div", {className:"modal-footer"}, 
  C("button", {onClick:f, type:"button", className:"btn btn-secondary", "data-dismiss":"modal"}, k), C("button", {disabled:this.state.loading, type:"button", className:"btn btn-" + e, onClick:function() {
    return kb(b);
  }}, this.state.loading ? "Отправка..." : h)))));
};
function lb() {
  return D.apply(this, arguments) || this;
}
t(lb, D);
lb.prototype.render = function(a) {
  var b = a.children, c = a.j;
  return C("div", {className:"EditModal modal", tabIndex:"-1", role:"dialog", style:"display: block;"}, C("div", {className:"modal-dialog", role:"document"}, C("div", {className:"modal-content"}, C("div", {className:"modal-header"}, C("h5", {className:"modal-title"}, a.title), C("button", {onClick:c, type:"button", className:"close", "data-dismiss":"modal", "aria-label":"Close"}, C("span", {"aria-hidden":"true"}, "×"))), C("div", {className:"modal-body"}, b))));
};
function mb(a, b) {
  return b = b || {}, new Promise(function(c, f) {
    function e() {
      return {ok:2 == (h.status / 100 | 0), statusText:h.statusText, status:h.status, url:h.responseURL, text:function() {
        return Promise.resolve(h.responseText);
      }, json:function() {
        return Promise.resolve(JSON.parse(h.responseText));
      }, blob:function() {
        return Promise.resolve(new Blob([h.response]));
      }, clone:e, headers:{keys:function() {
        return k;
      }, entries:function() {
        return g;
      }, get:function(p) {
        return l[p.toLowerCase()];
      }, has:function(p) {
        return p.toLowerCase() in l;
      }}};
    }
    var h = new XMLHttpRequest, k = [], g = [], l = {}, m;
    for (m in h.open(b.method || "get", a, !0), h.onload = function() {
      h.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(p, n, w) {
        k.push(n = n.toLowerCase());
        g.push([n, w]);
        l[n] = l[n] ? l[n] + "," + w : w;
      });
      c(e());
    }, h.onerror = f, h.withCredentials = "include" == b.credentials, b.headers) {
      h.setRequestHeader(m, b.headers[m]);
    }
    h.send(b.body || null);
  });
}
;function I(a) {
  var b = this, c, f, e, h, k;
  return A(function(g) {
    switch(g.a) {
      case 1:
        return b.setState({loading:!0}), v(g), u(g, mb("/admin-data?" + a), 5);
      case 5:
        return c = g.b, u(g, c.json(), 6);
      case 6:
        return f = g.b, e = f.error, h = f.data, e ? (b.setState({error:e}), g.return()) : g.return(h);
      case 3:
        y(g);
        b.setState({loading:!1});
        z(g, 0);
        break;
      case 2:
        k = x(g), b.setState({error:k}), g.s(3);
    }
  });
}
;function nb(a, b) {
  var c = this.props, f = c.name, e = a.value;
  if (this.context.values[f] != b.values[f]) {
    return !0;
  }
  if (c.value != e) {
    if (b.onChange) {
      b.onChange(a.name, e);
    }
    return !1;
  }
}
;function ob() {
  var a = D.call(this) || this;
  a.props = a.props;
  return a;
}
t(ob, D);
ob.prototype.shouldComponentUpdate = function(a, b, c) {
  return nb.call(this, a, c);
};
ob.prototype.componentDidMount = function() {
  var a = this.props, b = a.value;
  a = a.name;
  var c = this.context.onChange;
  c && void 0 !== b && c(a, b);
};
ob.prototype.render = function(a) {
  var b = a.options, c = a.name, f = a.value, e = this.context, h = e.onChange, k = void 0 === e.values ? {} : e.values;
  return C("select", {name:c, value:c in k ? k[c] : f, required:a.required, className:"custom-select", id:e.id, "aria-describedby":e.v, onChange:function(g) {
    h(c, g.currentTarget.value);
  }}, C("option"), b.map(function(g) {
    var l = g.value;
    return C("option", {key:l, value:l, selected:l == f}, g.title);
  }));
};
function J() {
  var a = D.call(this) || this;
  a.props = a.props;
  return a;
}
t(J, D);
J.prototype.shouldComponentUpdate = function(a, b, c) {
  return nb.call(this, a, c);
};
J.prototype.componentDidMount = function() {
  var a = this.props, b = r(a.children).next().value;
  a = a.name;
  var c = this.context.onChange;
  b && c(a, b.trim());
};
J.prototype.render = function(a) {
  var b = a.name, c = a.children, f = this.context, e = f.onChange, h = void 0 === f.values ? {} : f.values;
  return C("textarea", {required:a.required, name:b, placeholder:a.placeholder, "aria-describedby":f.v, className:"form-control", id:f.id, onChange:function(k) {
    e(b, k.currentTarget.value);
  }, rows:void 0 === a.rows ? 3 : a.rows}, b in h ? h[b] : c);
};
function K() {
  var a = D.call(this) || this;
  a.props = a.props;
  return a;
}
t(K, D);
K.prototype.shouldComponentUpdate = function(a, b, c) {
  return nb.call(this, a, c);
};
K.prototype.componentDidMount = function() {
  var a = this.props, b = a.value;
  a = a.name;
  var c = this.context.onChange;
  void 0 !== b && c && c(a, b);
};
K.prototype.render = function(a) {
  var b = Object.assign({}, a), c = a.required, f = a.name, e = a.placeholder, h = void 0 === a.type ? "text" : a.type, k = a.file;
  a = a.value;
  b = (delete b.required, delete b.name, delete b.placeholder, delete b.type, delete b.file, delete b.value, b);
  var g = this.context, l = g.onChange, m = void 0 === g.values ? {} : g.values;
  return C("input", Object.assign({}, b, {required:c, name:f, placeholder:e, className:"form-control" + (k ? "-file" : ""), value:f in m ? m[f] : a, type:h, "aria-describedby":g.v, id:g.id, onChange:function(p) {
    l(f, p.currentTarget.value);
  }}));
};
function L() {
  var a = D.call(this) || this;
  a.props = a.props;
  a.state = {formLoading:!1, error:null, success:null};
  return a;
}
t(L, D);
L.prototype.b = function(a) {
  var b = this, c, f, e, h, k;
  return A(function(g) {
    switch(g.a) {
      case 1:
        a.preventDefault();
        if (!b.props.path) {
          return b.setState({error:"Path is not set in the properties of the form."}), g.return(!1);
        }
        b.setState({error:null, success:null});
        c = new FormData(a.target);
        b.setState({formLoading:!0});
        v(g);
        return u(g, mb(b.props.path, {method:"POST", body:c}), 5);
      case 5:
        return f = g.b, u(g, f.json(), 6);
      case 6:
        e = g.b, (h = e.error) ? b.setState({error:h}) : b.setState({success:1});
      case 3:
        y(g);
        b.setState({formLoading:!1});
        z(g, 4);
        break;
      case 2:
        k = x(g);
        b.setState({error:k});
        g.s(3);
        break;
      case 4:
        if (!b.props.submitFinish) {
          g.s(7);
          break;
        }
        return u(g, b.props.submitFinish(f), 7);
      case 7:
        return g.return(!1);
    }
  });
};
L.prototype.a = function() {
  this.setState({error:null, success:null});
};
function M() {
  var a = D.call(this) || this;
  a.state = {values:{}};
  a.props = a.props;
  return a;
}
t(M, D);
M.prototype.getChildContext = function() {
  return {values:this.state.values, onChange:this.onChange.bind(this)};
};
M.prototype.onChange = function(a, b) {
  var c = {};
  this.setState({values:Object.assign({}, this.state.values, (c[a] = b, c))});
  if (this.props.onChange) {
    this.props.onChange(this.state.values);
  }
};
M.prototype.render = function(a) {
  var b = Object.assign({}, a), c = a.children, f = a.formRef;
  a = a.onSubmit;
  b = (delete b.children, delete b.formRef, delete b.onSubmit, delete b.onChange, b);
  return C("form", Object.assign({}, b, {ref:f, onSubmit:a}), c);
};
function N() {
  var a = D.call(this) || this;
  a.id = "i" + Math.floor(100000 * Math.random());
  a.v = "h" + a.id;
  a.props = a.props;
  return a;
}
t(N, D);
N.prototype.getChildContext = function() {
  return {id:this.id, v:this.v};
};
N.prototype.render = function(a) {
  var b = a.children, c = a.label;
  a = a.help;
  return C("div", {className:"form-group"}, c && C("label", {htmlFor:this.id}, c), b, a && C("small", {id:this.v, dangerouslySetInnerHTML:{U:a}, className:"form-text text-muted"}));
};
function pb(a) {
  var b = a.loading, c = a.confirmText, f = void 0 === a.loadingText ? c : a.loadingText;
  a = ["btn", "btn-" + ((void 0 === a.outline ? 0 : a.outline) ? "outline-" : "") + (void 0 === a.type ? "primary" : a.type), a.className].filter(Boolean);
  return C("button", {className:a.join(" "), type:"submit", disabled:b}, b && C("span", {className:"spinner-border spinner-border-sm" + (f ? " mr-2" : ""), role:"status", "aria-hidden":"true"}), b ? f : c);
}
;function qb() {
  var a = D.call(this) || this;
  a.state = {ea:!1};
  a.props = a.props;
  return a;
}
t(qb, D);
qb.prototype.render = function(a) {
  var b = this, c = a.m, f = a.required, e = a.image;
  a = a.help;
  var h = this.state.ea;
  return c && !h ? C(N, {help:a, label:"Изображение"}, C("br"), C("img", {src:e, className:"img-fluid"}), C("a", {onClick:function(k) {
    k.preventDefault();
    b.setState({ea:!0});
    return !1;
  }, href:"#", className:"btn btn-outline-warning"}, "Изменить")) : !c || h ? C(N, {help:a, label:"Изображение"}, C(K, {required:f, name:"image", type:"file", file:"1"})) : null;
};
function rb() {
  return C("span", {className:"echo-loader"}, "Loading…");
}
function sb() {
  var a = window.top;
  return window.open("/admin/editor", "Редактор Статей", "height=650,width=900,top=" + (a.outerHeight / 2 + a.screenY - 325 - 50) + ",left=" + (a.outerWidth / 2 + a.screenX - 450));
}
;function tb(a) {
  var b = a.article, c = a.R;
  a = a.name;
  return C("div", {className:"form-group"}, C("label", {}, "Статья"), C("div", {dangerouslySetInnerHTML:{U:b}, className:"mb-3 ArticleHolder"}), C("a", {onClick:function(f) {
    f.preventDefault();
    window.editorCallback = function(h) {
      e.close();
      c(h);
    };
    window.editorGetData = function() {
      return b;
    };
    var e = sb();
    return !1;
  }, className:"btn btn-outline-success", href:"#"}, "Редактировать"), C("input", {name:a, type:"hidden", value:b}));
}
;function ub() {
  var a = L.call(this) || this;
  Object.assign(a.state, {loading:!1, data:{}, hint:"москва-новостройки", article:""});
  return a;
}
t(ub, L);
ub.prototype.componentDidMount = function() {
  var a = this, b, c, f, e;
  return A(function(h) {
    if (1 == h.a) {
      b = !!a.props.id;
      if (!b) {
        return h.return();
      }
      a.setState({m:!0});
      return u(h, I.bind(a)("categories&id=" + a.props.id), 2);
    }
    if (c = h.b) {
      f = r(c), (e = f.next().value) && a.setState({data:e, hint:e.seo, article:e.article});
    }
    h.a = 0;
  });
};
ub.prototype.render = function(a) {
  var b = this, c = a.confirmText, f = a.w, e = a.title, h = a.id, k = a.j, g = void 0 === a.u ? "Отмена" : a.u, l = this.state, m = l.formLoading, p = l.error, n = l.success;
  a = l.loading;
  var w = l.m, B = l.article;
  l = l.data;
  c = C(M, {onSubmit:this.b.bind(this), onChange:function() {
    b.a();
  }}, C(N, {label:"Название", help:"Название для меню слева."}, C(K, {value:l.title, name:"title", placeholder:"Москва Новостройки", required:!0})), C(N, {help:this.hint, label:"СЕО Название"}, C(K, {value:l.seo, required:!0, name:"seo", placeholder:"москва-новостройки"})), C(N, {label:"Описание", help:"Краткое описание для главной страницы."}, C(J, {rows:"3", required:!0, name:"description", placeholder:"Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий."}, 
  l.description)), C(qb, {m:w, help:"Картинка, отображаемая на главной странице.", required:!0, image:l.cdnImage}), C(tb, {article:B, name:"article", R:function(R) {
    b.setState({article:R});
    b.a();
  }}), w && C("input", {value:h, type:"hidden", name:"id"}), C(gb, {error:p}), C(hb, {success:n, message:f}), C(pb, {confirmText:c, loading:m, loadingText:"Загрузка..."}), k && C("button", {onClick:k, type:"button", className:"FormCancelBtn btn btn-secondary"}, g));
  return C(G, {}, e && C("h1", {}, e), a && C(rb), !a && c);
};
q.Object.defineProperties(ub.prototype, {hint:{configurable:!0, enumerable:!0, get:function() {
  return "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>" + this.state.hint + "</strong>/3х-комнатные-квартиры.";
}}});
function vb() {
  var a = D.call(this) || this;
  a.state = {loading:!0, data:[]};
  return a;
}
t(vb, D);
d = vb.prototype;
d.componentDidMount = function() {
  var a = this;
  return A(function(b) {
    return u(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return A(function(c) {
    if (1 == c.a) {
      return u(c, I.bind(a)("categories"), 2);
    }
    (b = c.b) && a.setState({data:b});
    c.a = 0;
  });
};
d.g = function(a) {
  this.setState({l:a});
};
d.c = function(a) {
  this.setState({D:a});
};
d.render = function() {
  var a = this.state, b = a.loading, c = a.data, f = a.l;
  a = a.D;
  return C(G, {}, C("h1", {}, "Категории Каталога"), C("p", {}, "В каталоге невдижимости содержатся следующие разделы:"), C(wb, {data:c, loading:b, g:this.g.bind(this), c:this.c.bind(this)}), f && C(jb, Object.assign({}, f, {j:this.g.bind(this, null), F:"danger", K:this.load.bind(this)})), a && C(lb, {j:this.c.bind(this, null), title:"Редактирование Категории"}, C(ub, {id:a._id, submitFinish:this.load.bind(this), j:this.c.bind(this, null), path:"/admin-data?categories", w:"Категория успешно отредактирована!", 
  confirmText:"Сохранить"})));
};
function wb(a) {
  var b = a.data, c = a.g, f = a.c;
  a = a.loading;
  return C("div", {}, a && C("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет объектов недвижимости.", b.map(function(e, h) {
    return C(xb, {item:e, key:e._id, g:c, c:f, style:"background:" + (0 != h % 2 ? "#edeee8" : "white") + ";"});
  }));
}
function xb() {
  return D.apply(this, arguments) || this;
}
t(xb, D);
xb.prototype.render = function(a) {
  var b = a.item, c = a.g, f = a.c, e = b.title;
  a = b.description;
  var h = b._id, k = "/каталог/" + b.seo + "/", g = "knedv.ru" + k;
  return C($a, {className:"CategoryRow"}, C(G, {className:"col-3 col-sm-4 "}, C("img", {src:b.image, className:"img-fluid p-1"})), C(G, {}, C("h2", {}, e), C("em", {}, C("a", {href:k}, g)), C("p", {}, a)), C(G, {className:"col-1 CategoryMeta"}, C(bb, {P:function() {
    f(b);
  }, style:"color:brown;"}, " ", C(H, {icon:"fas fa-pen"})), C("br"), C(bb, {P:function() {
    c({l:{text:C("span", {}, "Вы действительно хотите удалить категорию ", C("strong", {}, e), "?"), confirmText:"Удалить", title:"Удаление Категории", path:"categories&id=" + h + "&delete"}});
  }, style:"color:brown;"}, C(H, {icon:"far fa-trash-alt"}))));
};
function yb() {
  var a = D.call(this) || this;
  a.state = {loading:!1, data:{}, hint:"москва-новостройки", article:""};
  return a;
}
t(yb, D);
yb.prototype.render = function(a) {
  var b = this, c = a.qa;
  return C(ub, {submitFinish:function(f) {
    var e, h, k;
    return A(function(g) {
      if (1 == g.a) {
        return c && c(f), u(g, f.json(), 2);
      }
      h = e = g.b;
      k = h.data;
      b.setState({id:k});
      g.a = 0;
    });
  }, title:"Добавить Категорию", W:this.state.id, path:"/admin-data?categories", w:"Категория успешно добавлена!", confirmText:"Добавить"});
};
function zb() {
  var a = L.call(this) || this;
  Object.assign(a.state, {loading:!1, data:{ga:!0}, Y:[], hint:"1-комнатные-апартаменты-воскресенское", X:"апартаменты", article:""});
  a.a = a.a.bind(a);
  a.b = a.b.bind(a);
  return a;
}
t(zb, L);
zb.prototype.componentDidMount = function() {
  var a = this, b, c, f, e;
  return A(function(h) {
    if (1 == h.a) {
      return u(h, Ab(a), 2);
    }
    if (3 != h.a) {
      b = !!a.props.id;
      if (!b) {
        return h.return();
      }
      a.setState({m:1});
      return u(h, I.bind(a)("objects&id=" + a.props.id), 3);
    }
    if (c = h.b) {
      f = r(c), (e = f.next().value) && a.setState({data:Object.assign({}, e, {ga:!e.hidden}), hint:e.seo, X:e.categorySeo, article:e.article});
    }
    h.a = 0;
  });
};
function Ab(a) {
  var b, c, f, e, h, k;
  return A(function(g) {
    switch(g.a) {
      case 1:
        return a.setState({loading:!0}), v(g), u(g, mb("/admin-data?categories"), 5);
      case 5:
        return b = g.b, u(g, b.json(), 6);
      case 6:
        c = g.b, f = c.error, e = c.data, f ? a.setState({error:f}) : (h = e.map(function(l) {
          return {value:l._id, title:l.title};
        }), a.setState({Y:h}));
      case 3:
        y(g);
        a.setState({loading:!1});
        z(g, 0);
        break;
      case 2:
        k = x(g), a.setState({error:k}), g.s(3);
    }
  });
}
zb.prototype.render = function(a) {
  var b = this, c = a.j, f = void 0 === a.u ? "Отмена" : a.u, e = a.w, h = void 0 === a.confirmText ? "Добавить" : a.confirmText, k = a.title, g = a.W, l = this.state, m = l.Y, p = l.formLoading, n = l.data;
  a = l.loading;
  var w = l.error;
  l = l.success;
  c = C(M, {onSubmit:this.b, onChange:this.a}, C(N, {help:"Название для каталога недвижимости.", label:"Название"}, C(K, {value:n.title, name:"title", required:!0, placeholder:"1к. апартаменты, 21 кв.м, п. Воскресенское"})), C(N, {help:"Цена объекта", label:"Цена"}, C(K, {value:n.price, name:"price", required:!0, placeholder:"3 000 000 руб."})), C(N, {help:this.hint, label:"СЕО Название"}, C(K, {value:n.seo, name:"seo", required:!0, placeholder:"1-комнатные-апартаменты-воскресенское"})), C(N, {help:"Описание объекта.", 
  label:"Описание"}, C(J, {rows:10, placeholder:'Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле "современная классика", что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично).', 
  name:"description", required:!0}, n.description)), C(qb, {m:this.m, help:"Картинка, отображаемая на главной странице.", required:!0, image:n.cdnImage}), C(tb, {article:this.state.article, name:"article", R:function(B) {
    b.setState({article:B});
    b.a();
  }}), this.m && C("input", {value:this.props.id, type:"hidden", name:"id"}), C(N, {label:"Раздел", help:"Категория в каталоге"}, C(ob, {options:m, name:"category", value:n.category, required:!0})), C(N, {label:"Включено"}, C(Bb, {value:n.ga, name:"showing", hint:"Показывается в каталоге"})), C(gb, {error:w}), C(hb, {success:l, message:e}), C(pb, {confirmText:h, loading:p, loadingText:"Загрузка..."}), g && C("a", {href:"/admin/albums/" + g, className:"ml-2 btn btn-warning"}, "Загрузить Фотографии"), 
  c && C("button", {onClick:c, type:"button", className:"FormCancelBtn btn btn-secondary"}, f));
  return C(G, {}, k && C("h1", {}, k), a && C(rb), !a && c);
};
q.Object.defineProperties(zb.prototype, {hint:{configurable:!0, enumerable:!0, get:function() {
  return "Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/" + this.state.X + "/<strong>" + this.state.hint + "</strong>.";
}}, m:{configurable:!0, enumerable:!0, get:function() {
  return !!this.props.id;
}}});
function Bb() {
  return D.apply(this, arguments) || this;
}
t(Bb, D);
Bb.prototype.render = function(a) {
  var b = a.name, c = a.value, f = a.hint, e = this.context, h = e.onChange, k = e.id;
  e = void 0 === e.values ? {} : e.values;
  return C("div", {className:"form-check"}, C("input", {checked:b in e ? e[b] : c, id:k, type:"checkbox", className:"form-check-input", name:b, required:a.required, onChange:function(g) {
    h(b, g.currentTarget.checked);
  }}), C("small", {className:"form-text text-muted", style:"padding-top:3px;"}, C("label", {htmlFor:k, className:"form-check-label"}, f)));
};
function Cb() {
  var a = D.call(this) || this;
  a.state = {loading:!1, data:[], l:null, D:null};
  return a;
}
t(Cb, D);
d = Cb.prototype;
d.componentDidMount = function() {
  var a = this;
  return A(function(b) {
    return u(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return A(function(c) {
    if (1 == c.a) {
      return u(c, I.bind(a)("objects"), 2);
    }
    (b = c.b) && a.setState({data:b});
    c.a = 0;
  });
};
d.g = function(a) {
  this.setState({l:a});
};
d.c = function(a) {
  this.setState({D:a});
};
d.render = function() {
  var a = this.state.D;
  return C(G, {}, C("h1", {}, "Объекты Недвижимости"), C("p", {}, "На сайт добалены следующие объекты:"), C(Db, {data:this.state.data, loading:this.state.loading, g:this.g.bind(this), c:this.c.bind(this)}), this.state.l && C(jb, Object.assign({}, this.state.l, {j:this.g.bind(this, null), F:"danger", K:this.load.bind(this)})), a && C(lb, {j:this.c.bind(this, null), title:"Редактирование Объекта"}, C(zb, {id:a._id, submitFinish:this.load.bind(this), j:this.c.bind(this, null), path:"/admin-data?objects", 
  u:"Отмена", w:"Объект успешно отредактирован!", confirmText:"Сохранить"})));
};
function Db(a) {
  var b = a.data, c = a.g, f = a.c;
  a = a.loading;
  return C("div", {}, a && C("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет объектов недвижимости.", b.map(function(e, h) {
    return C(Eb, {item:e, key:e._id, g:c, c:f, style:"background:" + (0 != h % 2 ? "#edeee8" : "white") + ";"});
  }));
}
function Eb() {
  return D.apply(this, arguments) || this;
}
t(Eb, D);
Eb.prototype.render = function(a) {
  var b = a.item, c = a.g, f = a.c, e = b.title, h = b.description, k = b._id, g = b.price, l = b.numberOfPhotos, m = "/каталог/" + b.categorySeo + "/" + b.seo, p = "knedv.ru" + m;
  return C($a, {style:a.style, className:"CategoryRow"}, C(G, {className:"col-3 col-sm-4 "}, C("img", {src:b.image, className:"img-fluid p-1"}), g && "Цена: " + g), C(G, {}, C("h2", {}, e), C("em", {}, C("a", {href:m}, p)), C("p", {}, h)), C(G, {className:"col-1 CategoryMeta"}, C("br"), C("a", {onClick:function(n) {
    n.preventDefault();
    c({text:C("span", {}, "Вы действительно хотите удалить объект ", C("strong", {}, e), "?"), confirmText:"Удалить", title:"Удаление Объекта", path:"objects&id=" + k + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, C(H, {icon:"far fa-trash-alt"})), C("a", {onClick:function(n) {
    n.preventDefault();
    f(b);
    return n;
  }, style:"color:brown;", href:"#"}, C(H, {icon:"fas fa-pen"})), C("a", {href:"/admin/albums/" + k, style:"color:brown;", onClick:function(n) {
    n.preventDefault();
    f(b);
    return n;
  }}, C(H, {icon:"fas fa-images"}), l ? "(" + l + ")" : "")));
};
function Fb() {
  return D.apply(this, arguments) || this;
}
t(Fb, D);
Fb.prototype.render = function(a) {
  var b = this, c = a.qa;
  return (a = a.id) ? C(zb, {id:a, title:"Редактировать Объект", path:"/admin-data?objects", w:"Объект успешно отредактирован!", confirmText:"Сохранить"}) : C(zb, {submitFinish:function(f) {
    var e, h, k;
    return A(function(g) {
      if (1 == g.a) {
        return c && c(f), u(g, f.json(), 2);
      }
      h = e = g.b;
      k = h.data;
      b.setState({id:k});
      g.a = 0;
    });
  }, title:"Добавить Объект", W:this.state.id, path:"/admin-data?objects", w:"Объект успешно добавлен!", confirmText:"Добавить"});
};
function Gb() {
  var a = D.call(this) || this;
  a.state = {loading:!1, data:[]};
  return a;
}
t(Gb, D);
Gb.prototype.componentDidMount = function() {
  var a = this;
  return A(function(b) {
    return u(b, a.load(), 0);
  });
};
Gb.prototype.load = function() {
  var a = this, b, c, f, e, h;
  return A(function(k) {
    switch(k.a) {
      case 1:
        return a.setState({loading:!0}), v(k), u(k, mb("/admin-data?pages"), 5);
      case 5:
        return b = k.b, u(k, b.json(), 6);
      case 6:
        c = k.b, f = c.error, e = c.data, f ? a.setState({error:f}) : a.setState({data:e});
      case 3:
        y(k);
        a.setState({loading:!1});
        z(k, 0);
        break;
      case 2:
        h = x(k), a.setState({error:h}), k.s(3);
    }
  });
};
Gb.prototype.render = function() {
  var a = this;
  return C(G, {}, C("h1", {}, "Материалы Сайта"), C("p", {}, "Контент веб-портала состоит из следующих страниц:"), this.state.loading && C("span", {className:"echo-loader"}, "Loading…"), this.state.data.map(function(b) {
    var c = Object.assign({}, b);
    b = b._id;
    c = (delete c._id, c);
    return C(Hb, Object.assign({}, c, {key:b, id:b, pa:function() {
      return a.load();
    }}));
  }));
};
function Hb() {
  var a = D.call(this) || this;
  a.state = {l:null};
  return a;
}
t(Hb, D);
Hb.prototype.render = function() {
  var a = this, b = this.props, c = b.seo, f = b.id, e = b.description, h = b.pa, k = b.title;
  return C($a, {className:"CategoryRow"}, C(G, {}, C("h2", {}, k), C("em", {}, "knedv.ru/", c), C("p", {}, e)), C(G, {className:"col-1 CategoryMeta"}, C("a", {href:"/admin/add-page/" + f, style:"color:brown;"}, C(H, {icon:"fas fa-pen"})), C("br"), C("a", {onClick:function(g) {
    g.preventDefault();
    a.setState({l:{text:C("span", {}, "Вы действительно хотите удалить страницу ", C("strong", {}, k), "?"), confirmText:"Удалить", title:"Удаление Страницы", path:"pages&id=" + f + "&delete"}});
    return !1;
  }, style:"color:brown;", href:"#"}, C(H, {icon:"far fa-trash-alt"}))), this.state.l && C(jb, Object.assign({}, this.state.l, {j:function() {
    a.setState({l:null});
  }, F:"danger", K:h})));
};
function Ib() {
  var a = D.call(this) || this;
  a.state = {loading:!1, data:{}, article:""};
  a.a = null;
  return a;
}
t(Ib, D);
Ib.prototype.componentDidMount = function() {
  var a = this, b, c, f, e, h, k, g, l, m, p;
  return A(function(n) {
    switch(n.a) {
      case 1:
        b = !!a.props.id;
        if (!b) {
          return n.return();
        }
        a.setState({m:1, loading:!0});
        v(n);
        return u(n, mb("/admin-data?pages&id=" + a.props.id), 5);
      case 5:
        return c = n.b, u(n, c.json(), 6);
      case 6:
        f = n.b, e = f.error, h = f.data, e ? a.setState({error:e}) : (k = r(h), g = k.next().value, a.setState({data:g, article:g.article}));
      case 3:
        y(n);
        a.setState({loading:!1});
        z(n, 0);
        break;
      case 2:
        m = l = x(n), p = m.message, a.setState({error:p}), n.s(3);
    }
  });
};
Ib.prototype.b = function(a) {
  var b = this, c, f, e, h, k;
  return A(function(g) {
    switch(g.a) {
      case 1:
        return b.setState({error:null}), a.preventDefault(), c = new FormData(b.a), c.append("article", b.state.article), b.setState({formLoading:!0}), v(g), u(g, mb("/admin-data?pages", {method:"POST", body:c}), 5);
      case 5:
        return f = g.b, u(g, f.json(), 6);
      case 6:
        e = g.b, (h = e.error) ? b.setState({error:h}) : b.setState({success:1});
      case 3:
        y(g);
        b.setState({formLoading:!1});
        z(g, 4);
        break;
      case 2:
        k = x(g);
        b.setState({error:k});
        g.s(3);
        break;
      case 4:
        return g.return(!1);
    }
  });
};
Ib.prototype.render = function() {
  var a = this, b = this.state.m;
  return C(G, {}, C("h1", {}, this.state.m ? "Редактировать" : "Добавить", " Страницу"), b && this.state.loading && C("span", {className:"echo-loader"}, "Loading…"), !(b && this.state.loading) && C("form", {ref:function(c) {
    return a.a = c;
  }, onSubmit:this.b.bind(this)}, C(db, {value:this.state.data.title, name:"title", placeholder:"Новости", label:"Название", help:"Название для администратора.", required:"1"}), C(db, {help:"Путь страницы, например knedv.ru/<strong>новости</strong>", name:"seo", placeholder:"новости", label:"СЕО Название", value:this.state.data.seo, required:"1"}), C(db, {T:2, name:"description", placeholder:"Раздел Новостей.", label:"Описание", help:"Описание страницы.", value:this.state.data.description, required:"1"}), 
  C(tb, {article:this.state.article, R:function(c) {
    a.setState({article:c});
  }}), b && C("input", {value:this.props.id, type:"hidden", name:"id"}), C("button", {disabled:this.state.formLoading, type:"submit", className:"btn btn-primary"}, this.state.formLoading ? "Загрузка..." : b ? "Сохранить" : "Добавить"), this.state.error && C("div", {className:"alert alert-danger mt-3", role:"alert"}, this.state.error), this.state.success && C("div", {className:"alert alert-success mt-3", role:"alert"}, "Страница успешно ", b ? "сохранена" : "создана", "!")));
};
function Jb() {
  return L.apply(this, arguments) || this;
}
t(Jb, L);
Jb.prototype.render = function(a) {
  var b = this, c = a.item, f = a.j, e = void 0 === a.u ? "Отмена" : a.u, h = a.w;
  a = void 0 === a.confirmText ? "Добавить" : a.confirmText;
  var k = c || {}, g = this.state, l = g.formLoading, m = g.error;
  g = g.success;
  return C(M, {onSubmit:this.b.bind(this), onChange:function() {
    b.a();
  }}, C(N, {label:"Название", help:"Заголовок для главной страницы, напр., Ленинский проспект, дом 114"}, C(K, {value:k.title, placeholder:"Название акции", name:"title", required:!0})), C(N, {label:"Описание", help:"Введите описание акции..."}, C(J, {name:"description", required:!0, placeholder:"Описание акции"}, k.description)), C(qb, {m:c, help:"Картинка, отображаемая на главной странице.", required:!0, image:k.cdnImage}), C(N, {label:"Цена", help:"Задайте цену..."}, C(K, {value:k.price, name:"price", 
  placeholder:"55 000 000 руб."})), C(N, {label:"Переход", help:"Ссылка на страницу каталога, или сайта."}, C(K, {value:k.href, name:"href", placeholder:"/каталог/москва-элитная/лениниский-проспект-дом-114"})), C(N, {help:"Добавить в специальные предложения на главной."}, C(fb, {value:k.show_on_main, label:"Отображать на главной", name:"show_on_main"})), c && C("input", {value:k._id, type:"hidden", name:"id"}), C(gb, {error:m}), C(hb, {success:g, message:h}), C(pb, {confirmText:a, loading:l, loadingText:"Загрузка..."}), 
  f && C("button", {onClick:f, type:"button", className:"FormCancelBtn btn btn-secondary"}, e));
};
function Kb() {
  var a = D.call(this) || this;
  a.state = {loading:!1, data:[]};
  return a;
}
t(Kb, D);
d = Kb.prototype;
d.componentDidMount = function() {
  var a = this;
  return A(function(b) {
    return u(b, a.load(), 0);
  });
};
d.load = function() {
  var a = this, b;
  return A(function(c) {
    if (1 == c.a) {
      return u(c, I.bind(a)("specials"), 2);
    }
    (b = c.b) && a.setState({data:b});
    c.a = 0;
  });
};
d.g = function(a) {
  this.setState({l:a});
};
d.c = function(a) {
  this.setState({D:a});
};
d.render = function() {
  var a = this, b = C("details", {}, C("summary", {}, C("h3", {style:"display: inline-block;vertical-align: middle;"}, "Создать Новое Предложение")), C(Jb, {submitFinish:function() {
    a.load();
  }, path:"/admin-data?specials", w:"Предложение успешно создано!", confirmText:"Добавить"}));
  return C(G, {}, C("h1", {}, "Специальные Предложения"), C(Lb, {data:this.state.data, loading:this.state.loading, g:this.g.bind(this), c:this.c.bind(this)}), C("hr"), b, this.state.l && C(jb, Object.assign({}, this.state.l, {j:this.g.bind(this, null), F:"danger", K:this.load.bind(this)})), this.state.D && C(lb, {j:this.c.bind(this, null), title:"Редактирование"}, C(Jb, {item:this.state.D, submitFinish:this.load.bind(this), j:this.c.bind(this, null), path:"/admin-data?specials", u:"Отмена", w:"Предложение успешно отредактировано!", 
  confirmText:"Сохранить"})));
};
function Lb(a) {
  var b = a.data, c = a.g, f = a.c;
  a = a.loading;
  return C("div", {style:"height:25rem;overflow:scroll;background:wheat; padding:0.5rem;"}, a && C("span", {className:"echo-loader"}, "Loading…"), !a && !b.length && "Нет специальных предложений.", b.map(function(e) {
    return C(Mb, {item:e, key:e._id, g:c, c:f});
  }));
}
function Mb(a) {
  var b = a.item, c = a.g, f = a.c, e = b._id, h = b.title;
  a = b.cdnImage;
  var k = b.description, g = b.price, l = "on" == b.show_on_main;
  return C("div", {className:l ? "IsShownOnMain" : "", style:"border-bottom:1px solid brown;border-top:1px solid lightcoral;"}, C("h4", {}, h, " ", l && C("span", {className:"badge badge-danger"}, "На главной")), C("p", {}, C("img", {src:a, style:"display:block;"}), k, C("span", {style:"font-weight: bold;"}, " ", g)), C("a", {onClick:function(m) {
    m.preventDefault();
    c({text:C("span", {}, "Вы действительно хотите удалить предложение ", C("strong", {}, h), "?"), confirmText:"Удалить", title:"Удаление Предложения", path:"specials&id=" + e + "&delete"});
    return !1;
  }, style:"color:brown;", href:"#"}, C(H, {icon:"far fa-trash-alt"})), C("a", {onClick:function(m) {
    m.preventDefault();
    f(b);
    return m;
  }, style:"color:brown;", href:"#"}, C(H, {icon:"fas fa-pen"})));
}
;function Nb() {
  return L.apply(this, arguments) || this;
}
t(Nb, L);
Nb.prototype.render = function(a) {
  var b = this, c = a.item, f = a.j, e = void 0 === a.u ? "Отмена" : a.u, h = a.w;
  a = void 0 === a.confirmText ? "Добавить" : a.confirmText;
  var k = c || {}, g = this.state, l = g.formLoading, m = g.error;
  g = g.success;
  return C(M, {onSubmit:this.b.bind(this), onChange:function() {
    b.a();
  }}, C(N, {label:"Название", help:"Заголовок альбома для выбора на странице объекта."}, C(K, {value:k.title, placeholder:"Мосфильмовская, дом 70к6", name:"title", required:!0})), C(N, {label:"Описание", help:"Введите описание акции..."}, C(J, {name:"description", required:!0, placeholder:"Описание Альбома"}, k.description)), C(qb, {m:c, help:"Картинка для узнаваемости.", required:!0, image:k.cdnImage}), c && C("input", {value:k._id, type:"hidden", name:"id"}), C(gb, {error:m}), C(hb, {success:g, 
  message:h}), C(pb, {confirmText:a, loading:l, loadingText:"Загрузка..."}), f && C("button", {onClick:f, type:"button", className:"FormCancelBtn btn btn-secondary"}, e));
};
function Ob() {
  var a = D.call(this) || this;
  a.state = {data:[], loading:!0};
  return a;
}
t(Ob, D);
Ob.prototype.componentDidMount = function() {
  var a = this;
  return A(function(b) {
    return u(b, a.load(), 0);
  });
};
Ob.prototype.load = function() {
  var a = this, b;
  return A(function(c) {
    if (1 == c.a) {
      return u(c, I.bind(a)("galleries"), 2);
    }
    (b = c.b) && a.setState({data:b});
    c.a = 0;
  });
};
Ob.prototype.render = function() {
  var a = this, b = this.state.loading;
  return C(G, {}, C("h1", {}, "Галереи"), b && C(rb), !b && !this.state.data.length && "Не существует галерей.", this.state.data.map(function(c) {
    var f = c._id, e = c.title, h = c.description;
    return C($a, {key:f}, C(G, {className:"col-sm-3"}, C("img", {src:c.cdnImage, className:"img-fluid"})), C(G, {}, C("h2", {}, e), C("a", {href:"/admin/galleries/" + f}, "Просмотр"), h));
  }), C("hr"), C(Pb, {title:"Создать Новую Галерею"}, C(Nb, {submitFinish:function() {
    a.load();
  }, path:"/admin-data?galleries", w:"Галерея успешно создана!", confirmText:"Добавить"})));
};
q.Object.defineProperties(Ob.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function Pb(a) {
  var b = a.children;
  return C("details", {}, C("summary", {}, C("h3", {style:"display: inline-block;vertical-align: middle;"}, a.title)), b);
}
;function Qb(a, b, c) {
  for (var f = [], e = 0, h = b; h < b + c; h++) {
    f[e] = "0x" + a.getUint8(h).toString(16), e++;
  }
  a = "";
  var k = f.length;
  for (b = 0; b < k;) {
    switch(c = f[b++], c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        a += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        e = f[b++];
        a += String.fromCharCode((c & 31) << 6 | e & 63);
        break;
      case 14:
        e = f[b++], h = f[b++], a += String.fromCharCode((c & 15) << 12 | (e & 63) << 6 | (h & 63) << 0);
    }
  }
  return a;
}
function Rb(a, b, c, f, e) {
  var h = a.getUint16(c, !e), k = {}, g;
  for (g = 0; g < h; g++) {
    var l = c + 12 * g + 2;
    var m = f[a.getUint16(l, !e)];
    k[m] = Sb(a, l, b, e);
  }
  return k;
}
function Sb(a, b, c, f) {
  var e = a.getUint16(b + 2, !f), h = a.getUint32(b + 4, !f);
  c = a.getUint32(b + 8, !f) + c;
  switch(e) {
    case 1:
    case 7:
      if (1 == h) {
        return a.getUint8(b + 8);
      }
      c = 4 < h ? c : b + 8;
      b = [];
      for (e = 0; e < h; e++) {
        b[e] = a.getUint8(c + e);
      }
      return b;
    case 2:
      return Qb(a, 4 < h ? c : b + 8, h - 1);
    case 3:
      if (1 == h) {
        return a.getUint16(b + 8, !f);
      }
      c = 2 < h ? c : b + 8;
      b = [];
      for (e = 0; e < h; e++) {
        b[e] = a.getUint16(c + 2 * e, !f);
      }
      return b;
    case 4:
      if (1 == h) {
        return a.getUint32(b + 8, !f);
      }
      b = [];
      for (e = 0; e < h; e++) {
        b[e] = a.getUint32(c + 4 * e, !f);
      }
      return b;
    case 5:
      if (1 == h) {
        var k = a.getUint32(c, !f);
        var g = a.getUint32(c + 4, !f);
        a = new Number(k / g);
        a.oa = k;
        a.ka = g;
        return a;
      }
      b = [];
      for (e = 0; e < h; e++) {
        k = a.getUint32(c + 8 * e, !f), g = a.getUint32(c + 4 + 8 * e, !f), b[e] = new Number(k / g), b[e].oa = k, b[e].ka = g;
      }
      return b;
    case 9:
      if (1 == h) {
        return a.getInt32(b + 8, !f);
      }
      b = [];
      for (e = 0; e < h; e++) {
        b[e] = a.getInt32(c + 4 * e, !f);
      }
      return b;
    case 10:
      if (1 == h) {
        return a.getInt32(c, !f) / a.getInt32(c + 4, !f);
      }
      b = [];
      for (e = 0; e < h; e++) {
        b[e] = a.getInt32(c + 8 * e, !f) / a.getInt32(c + 4 + 8 * e, !f);
      }
      return b;
  }
}
;var O = {}, Tb = (O[120] = "Caption-Abstract", O[110] = "Credit", O[25] = "Keywords", O[55] = "DateCreated", O[80] = "By-line", O[85] = "By-lineTitle", O[122] = "Writer-Editor", O[105] = "Headline", O[116] = "CopyrightNotice", O[15] = "Category", O);
var P = {}, Ub = (P[256] = "ImageWidth", P[257] = "ImageHeight", P[258] = "BitsPerSample", P[259] = "Compression", P[262] = "PhotometricInterpretation", P[273] = "StripOffsets", P[274] = "Orientation", P[277] = "SamplesPerPixel", P[278] = "RowsPerStrip", P[279] = "StripByteCounts", P[282] = "XResolution", P[283] = "YResolution", P[284] = "PlanarConfiguration", P[296] = "ResolutionUnit", P[513] = "JpegIFOffset", P[514] = "JpegIFByteCount", P[529] = "YCbCrCoefficients", P[530] = "YCbCrSubSampling", 
P[531] = "YCbCrPositioning", P[532] = "ReferenceBlackWhite", P);
var Q = {}, Vb = (Q[256] = "ImageWidth", Q[257] = "ImageHeight", Q[34665] = "ExifIFDPointer", Q[34853] = "GPSInfoIFDPointer", Q[40965] = "InteroperabilityIFDPointer", Q[258] = "BitsPerSample", Q[259] = "Compression", Q[262] = "PhotometricInterpretation", Q[274] = "Orientation", Q[277] = "SamplesPerPixel", Q[284] = "PlanarConfiguration", Q[530] = "YCbCrSubSampling", Q[531] = "YCbCrPositioning", Q[282] = "XResolution", Q[283] = "YResolution", Q[296] = "ResolutionUnit", Q[273] = "StripOffsets", Q[278] = 
"RowsPerStrip", Q[279] = "StripByteCounts", Q[513] = "JPEGInterchangeFormat", Q[514] = "JPEGInterchangeFormatLength", Q[301] = "TransferFunction", Q[318] = "WhitePoint", Q[319] = "PrimaryChromaticities", Q[529] = "YCbCrCoefficients", Q[532] = "ReferenceBlackWhite", Q[306] = "DateTime", Q[270] = "ImageDescription", Q[271] = "Make", Q[272] = "Model", Q[305] = "Software", Q[315] = "Artist", Q[33432] = "Copyright", Q);
var S = {}, Wb = (S[36864] = "ExifVersion", S[40960] = "FlashpixVersion", S[40961] = "ColorSpace", S[40962] = "PixelXDimension", S[40963] = "PixelYDimension", S[37121] = "ComponentsConfiguration", S[37122] = "CompressedBitsPerPixel", S[37500] = "MakerNote", S[37510] = "UserComment", S[40964] = "RelatedSoundFile", S[36867] = "DateTimeOriginal", S[36868] = "DateTimeDigitized", S[37520] = "SubsecTime", S[37521] = "SubsecTimeOriginal", S[37522] = "SubsecTimeDigitized", S[33434] = "ExposureTime", S[33437] = 
"FNumber", S[34850] = "ExposureProgram", S[34852] = "SpectralSensitivity", S[34855] = "ISOSpeedRatings", S[34856] = "OECF", S[37377] = "ShutterSpeedValue", S[37378] = "ApertureValue", S[37379] = "BrightnessValue", S[37380] = "ExposureBias", S[37381] = "MaxApertureValue", S[37382] = "SubjectDistance", S[37383] = "MeteringMode", S[37384] = "LightSource", S[37385] = "Flash", S[37396] = "SubjectArea", S[37386] = "FocalLength", S[41483] = "FlashEnergy", S[41484] = "SpatialFrequencyResponse", S[41486] = 
"FocalPlaneXResolution", S[41487] = "FocalPlaneYResolution", S[41488] = "FocalPlaneResolutionUnit", S[41492] = "SubjectLocation", S[41493] = "ExposureIndex", S[41495] = "SensingMethod", S[41728] = "FileSource", S[41729] = "SceneType", S[41730] = "CFAPattern", S[41985] = "CustomRendered", S[41986] = "ExposureMode", S[41987] = "WhiteBalance", S[41988] = "DigitalZoomRation", S[41989] = "FocalLengthIn35mmFilm", S[41990] = "SceneCaptureType", S[41991] = "GainControl", S[41992] = "Contrast", S[41993] = 
"Saturation", S[41994] = "Sharpness", S[41995] = "DeviceSettingDescription", S[41996] = "SubjectDistanceRange", S[40965] = "InteroperabilityIFDPointer", S[42016] = "ImageUniqueID", S);
var T = {}, Xb = (T[0] = "GPSVersionID", T[1] = "GPSLatitudeRef", T[2] = "GPSLatitude", T[3] = "GPSLongitudeRef", T[4] = "GPSLongitude", T[5] = "GPSAltitudeRef", T[6] = "GPSAltitude", T[7] = "GPSTimeStamp", T[8] = "GPSSatellites", T[9] = "GPSStatus", T[10] = "GPSMeasureMode", T[11] = "GPSDOP", T[12] = "GPSSpeedRef", T[13] = "GPSSpeed", T[14] = "GPSTrackRef", T[15] = "GPSTrack", T[16] = "GPSImgDirectionRef", T[17] = "GPSImgDirection", T[18] = "GPSMapDatum", T[19] = "GPSDestLatitudeRef", T[20] = "GPSDestLatitude", 
T[21] = "GPSDestLongitudeRef", T[22] = "GPSDestLongitude", T[23] = "GPSDestBearingRef", T[24] = "GPSDestBearing", T[25] = "GPSDestDistanceRef", T[26] = "GPSDestDistance", T[27] = "GPSProcessingMethod", T[28] = "GPSAreaInformation", T[29] = "GPSDateStamp", T[30] = "GPSDifferential", T);
function Yb(a) {
  var b = r(a.split(/\D/));
  a = b.next().value;
  var c = b.next().value, f = b.next().value, e = b.next().value, h = b.next().value;
  b = b.next().value;
  return new Date(a, c - 1, f, e, h, b);
}
;function Zb(a, b, c) {
  c = void 0 === c ? {} : c;
  var f = void 0 === c.coordinates ? "dms" : c.coordinates, e = void 0 === c.parseDates ? !1 : c.parseDates;
  if ("Exif" != Qb(a, b, 4)) {
    return !1;
  }
  c = b + 6;
  if (18761 == a.getUint16(c)) {
    var h = !1;
  } else {
    if (19789 == a.getUint16(c)) {
      h = !0;
    } else {
      return !1;
    }
  }
  if (42 != a.getUint16(c + 2, !h)) {
    return !1;
  }
  var k = a.getUint32(c + 4, !h);
  if (8 > k) {
    return !1;
  }
  b = Rb(a, c, c + k, Vb, h);
  e && b.DateTime && (b.DateTime = Yb(b.DateTime));
  var g = b.ExifIFDPointer, l = b.GPSInfoIFDPointer;
  if (g) {
    for (n in g = Rb(a, c, c + g, Wb, h), g) {
      var m = g[n];
      switch(n) {
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
          m = $b[n][m];
          break;
        case "DateTimeOriginal":
        case "DateTimeDigitized":
          e && (m = Yb(m));
          break;
        case "ExifVersion":
        case "FlashpixVersion":
          m = String.fromCharCode(m[0], m[1], m[2], m[3]);
          break;
        case "ComponentsConfiguration":
          m = $b.Components[m[0]] + $b.Components[m[1]] + $b.Components[m[2]] + $b.Components[m[3]];
      }
      b[n] = m;
    }
  }
  if (l) {
    e = Rb(a, c, c + l, Xb, h);
    for (n in e) {
      l = e[n];
      switch(n) {
        case "GPSVersionID":
          var p = r(l);
          l = p.next().value;
          g = p.next().value;
          m = p.next().value;
          p = p.next().value;
          l = [l, g, m, p].join(".");
      }
      b[n] = l;
    }
    if ("dd" == f) {
      if (b.GPSLongitude) {
        e = r(b.GPSLongitude);
        var n = e.next().value;
        f = e.next().value;
        e = e.next().value;
        l = b.GPSLongitudeRef;
        b.GPSLongitude = (n + f / 60 + e / 3600) * ("S" == l || "W" == l ? -1 : 1);
      }
      b.GPSLatitude && (e = r(b.GPSLatitude), n = e.next().value, f = e.next().value, e = e.next().value, l = b.GPSLatitudeRef, b.GPSLatitude = (n + f / 60 + e / 3600) * ("S" == l || "W" == l ? -1 : 1));
    }
  }
  k = c + k;
  n = a.getUint16(k, !h);
  if (k = a.getUint32(k + 2 + 12 * n, !h)) {
    if (k > a.byteLength) {
      a = {};
    } else {
      k = Rb(a, c, c + k, Ub, h);
      if (k.Compression) {
        switch(k.Compression) {
          case 6:
            k.ia && k.ha && (k.blob = new Blob([new Uint8Array(a.buffer, c + k.ia, k.ha)], {type:"image/jpeg"}));
            break;
          case 1:
            console.log("Thumbnail image format is TIFF, which is not implemented.");
            break;
          default:
            console.log("Unknown thumbnail image format '%s'", k.Compression);
        }
      } else {
        2 == k.PhotometricInterpretation && console.log("Thumbnail image format is RGB, which is not implemented.");
      }
      a = k;
    }
  } else {
    a = {};
  }
  b.thumbnail = a;
  return b;
}
var U = {}, V = {}, W = {}, X = {}, Y = {}, ac = {}, bc = {}, cc = {}, dc = {}, ec = {}, fc = {}, gc = {}, hc = {}, ic = {}, jc = {}, Z = {}, $b = {ExposureProgram:(U[0] = "Not defined", U[1] = "Manual", U[2] = "Normal program", U[3] = "Aperture priority", U[4] = "Shutter priority", U[5] = "Creative program", U[6] = "Action program", U[7] = "Portrait mode", U[8] = "Landscape mode", U), MeteringMode:(V[0] = "Unknown", V[1] = "Average", V[2] = "CenterWeightedAverage", V[3] = "Spot", V[4] = "MultiSpot", 
V[5] = "Pattern", V[6] = "Partial", V[255] = "Other", V), LightSource:(W[0] = "Unknown", W[1] = "Daylight", W[2] = "Fluorescent", W[3] = "Tungsten (incandescent light)", W[4] = "Flash", W[9] = "Fine weather", W[10] = "Cloudy weather", W[11] = "Shade", W[12] = "Daylight fluorescent (D 5700 - 7100K)", W[13] = "Day white fluorescent (N 4600 - 5400K)", W[14] = "Cool white fluorescent (W 3900 - 4500K)", W[15] = "White fluorescent (WW 3200 - 3700K)", W[17] = "Standard light A", W[18] = "Standard light B", 
W[19] = "Standard light C", W[20] = "D55", W[21] = "D65", W[22] = "D75", W[23] = "D50", W[24] = "ISO studio tungsten", W[255] = "Other", W), Flash:(X[0] = "Flash did not fire", X[1] = "Flash fired", X[5] = "Strobe return light not detected", X[7] = "Strobe return light detected", X[9] = "Flash fired, compulsory flash mode", X[13] = "Flash fired, compulsory flash mode, return light not detected", X[15] = "Flash fired, compulsory flash mode, return light detected", X[16] = "Flash did not fire, compulsory flash mode", 
X[24] = "Flash did not fire, auto mode", X[25] = "Flash fired, auto mode", X[29] = "Flash fired, auto mode, return light not detected", X[31] = "Flash fired, auto mode, return light detected", X[32] = "No flash function", X[65] = "Flash fired, red-eye reduction mode", X[69] = "Flash fired, red-eye reduction mode, return light not detected", X[71] = "Flash fired, red-eye reduction mode, return light detected", X[73] = "Flash fired, compulsory flash mode, red-eye reduction mode", X[77] = "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 
X[79] = "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", X[89] = "Flash fired, auto mode, red-eye reduction mode", X[93] = "Flash fired, auto mode, return light not detected, red-eye reduction mode", X[95] = "Flash fired, auto mode, return light detected, red-eye reduction mode", X), SensingMethod:(Y[1] = "Not defined", Y[2] = "One-chip color area sensor", Y[3] = "Two-chip color area sensor", Y[4] = "Three-chip color area sensor", Y[5] = "Color sequential area sensor", 
Y[7] = "Trilinear sensor", Y[8] = "Color sequential linear sensor", Y), SceneCaptureType:(ac[0] = "Standard", ac[1] = "Landscape", ac[2] = "Portrait", ac[3] = "Night scene", ac), SceneType:(bc[1] = "Directly photographed", bc), CustomRendered:(cc[0] = "Normal process", cc[1] = "Custom process", cc), WhiteBalance:(dc[0] = "Auto white balance", dc[1] = "Manual white balance", dc), GainControl:(ec[0] = "None", ec[1] = "Low gain up", ec[2] = "High gain up", ec[3] = "Low gain down", ec[4] = "High gain down", 
ec), Contrast:(fc[0] = "Normal", fc[1] = "Soft", fc[2] = "Hard", fc), Saturation:(gc[0] = "Normal", gc[1] = "Low saturation", gc[2] = "High saturation", gc), Sharpness:(hc[0] = "Normal", hc[1] = "Soft", hc[2] = "Hard", hc), SubjectDistanceRange:(ic[0] = "Unknown", ic[1] = "Macro", ic[2] = "Close view", ic[3] = "Distant view", ic), FileSource:(jc[3] = "DSC", jc), Components:(Z[0] = "", Z[1] = "Y", Z[2] = "Cb", Z[3] = "Cr", Z[4] = "R", Z[5] = "G", Z[6] = "B", Z)};
function kc() {
  var a = D.call(this) || this;
  a.state = {count:3};
  return a;
}
t(kc, D);
kc.prototype.componentDidMount = function() {
  var a = this;
  this.a = setInterval(function() {
    var b = a.state.count + 1;
    3 < b && (b = 0);
    a.setState({count:b});
  }, 250);
};
kc.prototype.componentWillUnmount = function() {
  clearInterval(this.a);
};
kc.prototype.render = function() {
  var a = ".".repeat(this.state.count), b = ".".repeat(3 - this.state.count);
  return C("span", {}, a, C("span", {style:"opacity:0"}, b));
};
function lc() {
  var a = D.call(this) || this;
  a.state = {H:!1, M:null, error:null, S:null, result:null};
  a.a = a.a.bind(a);
  return a;
}
t(lc, D);
lc.prototype.componentDidMount = function() {
  mc(this, this.props.file);
  nc(this, this.props.file);
};
function nc(a, b) {
  var c = new FileReader;
  c.readAsArrayBuffer(b);
  c.onload = function() {
    var f = c.result;
    a: {
      var e = {parseDates:!0};
      var h = new DataView(f);
      if (255 != h.getUint8(0) || 216 != h.getUint8(1)) {
        e = !1;
      } else {
        for (var k = f.byteLength, g = 2, l; g < k;) {
          if (255 != h.getUint8(g)) {
            e = !1;
            break a;
          }
          l = h.getUint8(g + 1);
          if (225 == l) {
            e = Zb(h, g + 4, e);
            break a;
          }
          g += 2 + h.getUint16(g + 2);
        }
        e = void 0;
      }
    }
    a: {
      if (h = new DataView(f), 255 != h.getUint8(0) || 216 != h.getUint8(1)) {
        f = !1;
      } else {
        k = 2;
        for (g = f.byteLength; k < g;) {
          l = k;
          if (56 === h.getUint8(l) && 66 === h.getUint8(l + 1) && 73 === h.getUint8(l + 2) && 77 === h.getUint8(l + 3) && 4 === h.getUint8(l + 4) && 4 === h.getUint8(l + 5)) {
            l = h.getUint8(k + 7);
            0 !== l % 2 && (l += 1);
            0 === l && (l = 4);
            g = k + 8 + l;
            k = h.getUint16(k + 6 + l);
            h = g;
            f = new DataView(f);
            g = {};
            for (l = h; l < h + k;) {
              if (28 === f.getUint8(l) && 2 === f.getUint8(l + 1)) {
                var m = f.getUint8(l + 2);
                if (m in Tb) {
                  var p = f.getInt16(l + 3);
                  m = Tb[m];
                  p = Qb(f, l + 5, p);
                  g.hasOwnProperty(m) ? g[m] instanceof Array ? g[m].push(p) : g[m] = [g[m], p] : g[m] = p;
                }
              }
              l++;
            }
            f = g;
            break a;
          }
          k++;
        }
        f = void 0;
      }
    }
    a.setState({na:{data:e, iptcdata:f}});
  };
}
function mc(a, b) {
  var c = new FileReader;
  c.readAsDataURL(b);
  c.onload = function() {
    oc(a, c.result);
  };
}
function oc(a, b) {
  var c = new Image;
  c.src = b;
  c.onload = function() {
    var f = c.width / c.height;
    f = c.width > c.height ? 250 * f : 250 / f;
    var e = document.createElement("canvas");
    e.width = f;
    e.height = 250;
    e.getContext("2d").drawImage(c, 0, 0, e.width, e.height);
    f = e.toDataURL();
    a.setState({S:f});
  };
}
function pc(a) {
  var b, c;
  A(function(f) {
    b = a.props;
    c = void 0 === b.O ? "/upload-asset" : b.O;
    a.setState({error:null, M:0, H:!1});
    return f.return(qc(a, c));
  });
}
function qc(a, b) {
  var c, f, e, h;
  return A(function(k) {
    c = a.props;
    f = c.file;
    e = new FormData;
    e.append("image", f);
    h = new XMLHttpRequest;
    h.open("POST", b + "&name=" + f.name, !0);
    h.a = 0;
    h.upload.addEventListener("progress", function(g) {
      a.setState({M:100.0 * g.loaded / g.total || 100});
    });
    h.addEventListener("readystatechange", function() {
      4 == h.readyState && a.setState({H:!0, M:null});
      if (4 == h.readyState && 200 == h.status) {
        var g = h.responseText;
        try {
          var l = JSON.parse(g);
          var m = l.error;
          var p = l.result;
          var n = l.photoId;
        } catch (w) {
          m = "Could not parse JSON: " + w.message;
        }
        m ? a.setState({error:m}) : p && (a.setState({result:p, S:null, sa:n}), a.props.ca && a.props.ca(p));
      } else {
        if (4 == h.readyState && 200 != h.status) {
          g = "XHR Error";
          try {
            g = JSON.parse(h.responseText).error;
          } catch (w) {
          }
          a.setState({error:g});
        }
      }
    });
    h.send(e);
    k.a = 0;
  });
}
lc.prototype.a = function(a) {
  a.preventDefault();
  pc(this);
  return !1;
};
lc.prototype.render = function(a) {
  var b = a.name, c = a.L, f = a.A;
  a = void 0 === a.ta ? "photos[]" : a.ta;
  var e = this.state, h = e.M, k = e.error, g = e.S, l = e.H, m = e.result, p = e.na, n = e.sa;
  e = 100 == h && !l;
  f = n && f.some(function(B) {
    return B == n;
  });
  f = m && !f;
  g = m || g;
  try {
    var w = p.data.DateTime;
    w = w.toLocaleString();
  } catch (B) {
  }
  return C(rc, {error:k, ma:f, wa:e, src:g, H:l}, C("div", {className:"Image"}, !g && C("span", {className:"PreviewLoadingSpan"}, "Загрузка превью..."), C("img", {src:g}), C("span", {className:"ImageInfo", style:"top:0;left:0;"}, b, w && C("br"), w), C("span", {onClick:c, className:"ImageInfo CloseSpan"}, "✕"), !m && !k && null === h && C(sc, {style:"background:transparent; padding-left:0;"}, C("a", {onClick:this.a, className:"btn btn-light btn-sm"}, "Загрузить")), null !== h && 100 != h && C(sc, 
  {}, C("progress", {max:100, value:h})), e && C(sc, {}, "Выполняется обработка", C(kc), C("div", {className:"spinner-border text-primary", role:"status"}, C("span", {className:"sr-only"}, "Loading..."))), k && C("p", {className:"ImageInfo PhotoError"}, "Ошибка: ", k), k && C("a", {onClick:this.a, href:"#", className:"btn btn-danger btn-sm", style:"position:absolute;right:0;bottom:0;"}, "Загрузить снова"), m && C("p", {className:"ImageInfo GalleryLink"}, C("a", {href:m, rel:"noopener noreferrer", 
  target:"_blank"}, "Ссылка")), f && n && C("input", {name:a, type:"hidden", value:n})));
};
function rc(a) {
  var b = a.children, c = a.error, f = a.ma, e = a.H, h = a.src, k = "Added";
  a.wa ? k = "Uploading" : c ? k = "Error" : f ? k = "HasInput" : e && (k = "Uploaded");
  a = ["ImageCopy", "PhotoUploader" + k].concat(ka(h ? [] : ["PreviewLoading"])).join(" ");
  return C("div", {className:a}, b);
}
function sc(a) {
  return C("span", {className:void 0 === a.className ? "ImageInfo" : a.className, style:"bottom:0;left:0;" + (void 0 === a.style ? "" : a.style)}, a.children);
}
;var tc = ".PhotoUploader .ImageCopy.PhotoUploaderAdded {\n  background: linear-gradient(lightgrey, grey);\n  border-color: #838383;\n  box-shadow: rgb(98, 98, 98) 1px -5px 15px inset;\n}\n.PhotoUploader .ImageCopy.PhotoUploaderHasInput {\n  background: linear-gradient(yellow, rgb(207, 198, 92));\n  border-color: rgb(156, 158, 9);\n  box-shadow: inset 1px -5px 15px #9e7414;\n}\n.PhotoUploader .ImageCopy.PhotoUploaderError {\n  background: linear-gradient(coral, brown);\n  border-color: red;\n  box-shadow: rgb(162, 31, 31) 1px -5px 15px inset\n}\n.PhotoUploader .ImageCopy.PhotoUploaderUploaded {\n  background: linear-gradient(lightgreen, #82d285);\n  border-color: green;\n  box-shadow: inset 1px -5px 15px #6f9e14;\n}\n.PhotoUploader .ImageCopy.PhotoUploaderUploading {\n  background: linear-gradient(lightblue, blue);\n  border-color: blue;\n  box-shadow: inset 1px -5px 15px #2a33a0;\n}\n\n.PhotoUploader .ImageInfo {\n  background: rgba(255, 255, 255, 0.75);\n  word-break: break-all;\n  max-width: 100%;\n  overflow: scroll;\n  position: absolute;\n  margin: 0;\n  /* margin-left: .5rem; */\n  /* margin-right: .5rem; */\n  padding-left: .25rem;\n  padding-right: .25rem;\n}\n.ImageInfo.PhotoError {\n  background: rgba(156, 66, 60, 0.63);\n  border-color: red;\n  color: navajowhite;\n  text-shadow: 1px 1px brown;\n  bottom: 0;\n  left: 0;\n}\n.PhotoError:hover {\n  z-index: 5;\n}\n.PreviewLoading {\n  width: 290px;\n}\n.PhotoUploader .GalleryLink {\n  bottom: 0;\n  left: 0;\n  padding-left: .25rem;\n  padding-right: .25rem;\n}\n/* .PhotoUploader .Image {\n  padding: .5rem;\n} */\n.PhotoUploader .ImageCopy {\n  padding: .5rem;\n  border: 1px solid grey;\n  background: #cecece;\n  display: inline-block;\n  border-radius: 5px;\n  margin: .25rem;\n  height: 200px;\n  vertical-align: top;\n}\n.PhotoUploader .Image img {\n  max-width: 100%;\n  max-height: 100%;\n  border-radius: 3px;\n  transition: .5s;\n}\n.PhotoUploader .Image:hover img {\n  box-shadow: 0 0 19px 1px white;\n}\n.PhotoUploaderHasInput:hover img {\n  box-shadow: 0 0 19px 1px #ecff4a;\n}\n.PhotoUploaderUploading:hover img {\n  box-shadow: 0 0 19px 1px lightblue;\n}\n.PhotoUploaderError:hover img {\n  box-shadow: 0 0 19px 1px lightsalmon;\n}\n.PhotoUploaderUploaded:hover img {\n  box-shadow: 0 0 19px 1px lightgreen;\n}\n.PhotoLoadingPlaceholder {\n  background:lightgrey;\n  text-align: center;\n}\n.PhotoUploader .Image .CloseSpan {\n  top: 0;\n  right: 0;\n  padding: 5px;\n  cursor: pointer;\n  border-radius: 5px;\n  width: 1.5rem;\n  height: 2rem;\n  overflow: hidden;\n  text-align: center;\n  /* transition: .5s; */\n}\n.PhotoUploader .Image {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.PhotoUploader .PreviewLoadingSpan {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: rgba(255, 255, 255, 0.75);\n  padding: .5rem;\n  text-align: center;\n  white-space: nowrap;\n}";
tc = void 0 === tc ? "" : tc;
if (document) {
  var uc = document.head, vc = document.createElement("style");
  vc.type = "text/css";
  vc.styleSheet ? vc.styleSheet.cssText = tc : vc.appendChild(document.createTextNode(tc));
  uc.appendChild(vc);
}
;function wc() {
  var a = D.call(this) || this;
  a.state = {files:[]};
  a.props = a.props;
  return a;
}
t(wc, D);
function xc(a, b) {
  var c = a.state.files.filter(function(f) {
    return f.file !== b;
  });
  a.setState({files:c});
  a.props.L && a.props.L(b);
}
function yc(a, b) {
  var c, f, e;
  A(function(h) {
    c = r(b);
    f = ja(c);
    e = f.map(function(k) {
      return {file:k, ua:Math.floor(10000 * Math.random())};
    });
    a.setState({files:[].concat(ka(a.state.files), ka(e))});
    a.props.ba && a.props.ba();
    h.a = 0;
  });
}
wc.prototype.render = function(a) {
  var b = this, c = void 0 === a.$ ? "files[]" : a.$, f = a.ra, e = a.A, h = a.O;
  a = this.context;
  var k = 0;
  return C("div", {onDragEnter:function(g) {
    g.preventDefault();
    k++;
    g.currentTarget.style.background = "#E91E63";
  }, className:"PhotoUploader", onDragLeave:function(g) {
    k--;
    0 == k && (g.currentTarget.style.background = "");
  }, onDrop:function(g) {
    g.preventDefault();
    g.stopPropagation();
    g.currentTarget.style.background = "";
    yc(b, g.dataTransfer.files);
  }, onDragOver:function(g) {
    g.preventDefault();
    g.stopPropagation();
  }}, C("input", {id:a.id, "aria-described-by":a.v, onChange:function(g) {
    g.preventDefault();
    yc(b, g.currentTarget.files);
    g.currentTarget.value = null;
  }, accept:"image/*", type:"file", multiple:!0}), this.state.Ba ? "Идет опознование файлов..." : "Или переместите файлы сюда...", C("br"), this.state.files.map(function(g) {
    var l = g.file;
    return C(lc, {O:h, key:g.ua, name:l.name, file:l, L:function() {
      xc(b, l);
    }, $:c, ca:f, A:e});
  }));
};
function zc() {
  var a = D.call(this) || this;
  a.state = {data:null, loading:!0, files:[], A:[], uri:null};
  return a;
}
t(zc, D);
zc.prototype.componentDidMount = function() {
  var a = this;
  return A(function(b) {
    if (1 == b.a) {
      return u(b, a.load(), 2);
    }
    a.setState({va:!0});
    b.a = 0;
  });
};
zc.prototype.load = function() {
  var a = this, b, c, f, e;
  return A(function(h) {
    if (1 == h.a) {
      return b = a.props, c = b.id, f = void 0 === b.fa ? "galleries" : b.fa, c || a.setState({loading:!1, error:"No id"}), u(h, I.bind(a)(f + "&id=" + c), 2);
    }
    (e = h.b) && a.setState({data:e});
    h.a = 0;
  });
};
zc.prototype.render = function() {
  var a = this, b = this.props, c = this.data || {}, f = c.title, e = c.cdnImage, h = c.description, k = c._id;
  c = c.photos;
  var g = this.state, l = g.A, m = g.loading;
  g = g.va;
  return C(G, {}, C("h1", {}, void 0 === b.da ? "Галерея" : b.da), !g && m && C(rb), this.data && C($a, {className:"mb-3"}, C(G, {className:"col-sm-3"}, C("img", {src:e, className:"img-fluid"})), C(G, {}, C("h2", {}, f), h)), this.data && C(Ac, {photos:c, loading:m}), C("hr"), k && C(Bc, {A:l, submitFinish:function(p) {
    var n, w;
    return A(function(B) {
      if (1 == B.a) {
        return u(B, p.json(), 2);
      }
      n = B.b;
      w = n.data;
      if (!w) {
        return B.s(0);
      }
      a.setState({A:[].concat(ka(a.state.A), ka(w))});
      return u(B, a.load(), 0);
    });
  }, galleryId:k, path:"/admin-data?photos", confirmText:"Сохранить Галерею"}));
};
q.Object.defineProperties(zc.prototype, {data:{configurable:!0, enumerable:!0, get:function() {
  return this.state.data;
}}});
function Ac() {
  return D.apply(this, arguments) || this;
}
t(Ac, D);
Ac.prototype.render = function(a) {
  var b = a.loading;
  return C($a, {}, a.photos.map(function(c) {
    return C(G, {key:c._id, className:"col-sm-4", style:"padding:.25rem;"}, C("img", {src:c.file, className:"img-fluid", style:"max-height: 200px;"}));
  }), b && C(G, {className:"col-sm-4"}, C("div", {className:"h-100 w-100 d-flex align-items-center rounded PhotoLoadingPlaceholder"}, C("span", {className:"align-middle", style:"padding:.5rem;"}, "Запрос изображений... ", C("br"), C(ab)))));
};
function Bc() {
  var a = L.call(this) || this;
  a.a = a.a.bind(a);
  a.b = a.b.bind(a);
  return a;
}
t(Bc, L);
Bc.prototype.componentDidMount = function() {
  var a = this;
  return A(function(b) {
    return u(b, a.load(), 0);
  });
};
Bc.prototype.load = function() {
  var a = this, b;
  return A(function(c) {
    if (1 == c.a) {
      return u(c, I.bind(a)("sas"), 2);
    }
    (b = c.b) && a.setState({uri:b});
    c.a = 0;
  });
};
Bc.prototype.render = function(a) {
  var b = a.confirmText, c = a.A, f = this.state, e = f.formLoading, h = f.error, k = f.success;
  f = f.uri;
  return C(M, {onSubmit:this.b}, C("input", {value:a.galleryId, name:"galleryId", type:"hidden"}), C(N, {label:"Загрузка Изображений", help:"Выберите несколько изображений и загрузите их."}, C(wc, {O:f, ra:this.a, ba:this.a, L:this.a, A:c})), C(pb, {loading:e, confirmText:b, loadingText:"Загрузка..."}), C(gb, {error:h}), C(hb, {success:k, message:"Галерея сохранена!"}));
};
function Cc() {
  return C(G, {}, C("h1", {}, "Добро Пожаловать!"));
}
;Fa(C(function() {
  return C($a, {id:"App"}, C(G, {className:"col-md-4"}, C(ib)), C(Xa, {onChange:function(a) {
    a.current && a.current.attributes.title && (document.title = a.current.attributes.title);
  }}, C(Cc, {path:"/admin", title:"Главная"}), C(Cb, {path:"/admin/objects", title:"Объекты Недвижимости"}), C(Fb, {path:"/admin/add-object/:id?", title:"Добавить Объект"}), C(vb, {path:"/admin/categories", title:"Категории Каталога"}), C(yb, {path:"/admin/add-category/:id?", title:"Добавить Категорию"}), C(Gb, {path:"/admin/pages", title:"Статьи"}), C(Ib, {path:"/admin/add-page/:id?", title:"Добавить Страницу"}), C(Kb, {path:"/admin/special", title:"Специальные Предложения"}), C(Ob, {path:"/admin/galleries/", 
  title:"Галереи"}), C(zc, {path:"/admin/galleries/:id", title:"Фотографии"}), C(zc, {path:"/admin/albums/:id", title:"Фото Объекта", fa:"galleries&album", da:"Изображения Объекта"})));
}), document.querySelector("#AppContainer"), document.querySelector("#App"));


//# sourceMappingURL=admin.js.map