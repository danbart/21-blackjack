const miModulo = (() => { let e = []; const t = ["C", "D", "H", "S"],
        n = ["A", "J", "Q", "K"],
        a = document.querySelectorAll("small"),
        r = document.querySelectorAll(".divCartas"); let o = []; const l = document.querySelector("#btnPedir"),
        d = document.querySelector("#btnDetener"),
        s = document.querySelector("#btnNuevo"),
        c = (t = 2) => { e = i(), o = []; for (let e = 0; e < t; e++) o.push(0);
            a.forEach(e => e.innerText = 0), r.forEach(e => e.innerHTML = ""), l.disabled = !1, d.disabled = !1 },
        i = () => { for (let n = 2; n <= 10; n++)
                for (let a of t) e.push(n + a); for (let a of t)
                for (let t of n) e.push(t + a); return _.shuffle(e) },
        u = () => { if (0 === e.length) throw "No hay cartas en el deck"; return e.pop() },
        h = (e, t) => (o[t] += (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), a[t].innerText = o[t], o[t]),
        m = (e, t) => { const n = document.createElement("img");
            n.src = `assets/cartas/${e}.png`, n.classList.add("carta"), r[t].append(n) },
        f = e => { let t = 0;
            do { const e = u();
                t = h(e, o.length - 1), m(e, o.length - 1) } while (t < e && e <= 21);
            (() => { const [e, t] = o;
                setTimeout(() => { t === e ? alert("Nadie Gana =(") : e > 21 ? alert("Computadora Gana") : t > 21 ? alert("Jugador gana") : 21 === t ? alert("Computadora Gana") : 21 === e && alert("Jugador Gana") }, 100) })() }; return l.addEventListener("click", () => { const e = u(); let t = h(e, 0);
        m(e, 0), t > 21 ? (console.warn("Lo siento mucho perdiste"), l.disabled = !0, d.disabled = !0, f(t)) : 21 === t && (console.warn("genial"), l.disabled = !0, d.disabled = !0, f(t)) }), d.addEventListener("click", () => { l.disabled = !0, d.disabled = !0, f(o[0]) }), s.addEventListener("click", () => { c() }), { nuevoJuego: c } })();