(() =>
{
	let t = function ()
	{
		this.terms = {}, this.game = {}, this.interval = -1, this.initiate()
	};
	t.prototype.money = function ()
	{
		let t = document.getElementById("root").children[0].children[0].textContent;
		return Number(t.replace(/[^0-9.-]+/g, ""))
	}, t.prototype.style_text = function (t)
	{
		t.style.borderRadius = "5px", t.style.borderBottom = "5px solid red"
	}, t.prototype.style_img = function (t)
	{
		t.style.borderRadius = "5px", t.style.borderBottom = "5px solid red"
	}, t.prototype.loop = function ()
	{
		if (document.getElementsByClassName("animated tada").length || document.getElementsByClassName("animated jello").length) return !1;
		let t = this.header().textContent,
			e = this.terms.filter(e => e.text == t),
			n = e[Math.floor(Math.random() * e.length)];
		if (!n) return !1;
		let o = n.type;
		if (n = n.answers.filter(t => t.correct)[0], "mc" == o)
		{
			if (n.image)
			{
				let t = document.querySelector(`img[src="${n.image}"]`);
				t && this.style_img(t)
			}
			else if (n.text)
			{
				let t = Array.from(document.querySelectorAll("span")).filter(t => t.textContent == n.text),
					e = t[Math.floor(Math.random() * t.length)];
				this.style_text(e)
			}
		}
		else if ("text" == o)
		{
			let t = this.input();
			t && (t.value = n.text, t.placeholder = n.text)
		}
	}, t.prototype.initiate = function ()
	{
		this.fetch_terms(t =>
		{
			this.interval = setInterval(() =>
			{
				this.loop()
			}, 100)
		})
	}, t.prototype.fetch_terms = function (t = console.log)
	{
		let e = window.location.pathname.split("/"),
			n = new XMLHttpRequest;
		n.open("GET", "https://www.gimkit.com/playInfo?a=" + e[e.length - 1]), n.onreadystatechange = () =>
		{
			if (4 == n.readyState && 200 == n.status)
			{
				let e = JSON.parse(n.responseText);
				this.game = e, this.terms = e.gameData.questions, t && t(e.gameData.questions)
			}
		}, n.send()
	}, t.prototype.header = function ()
	{
		return document.getElementById("root").children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0]
	}, t.prototype.input = function ()
	{
		return document.querySelector("input")
	};
	new t();
})();
