/* =============================================================================
  Copyright (C) 2020 yumetodo <yume-wikijp@live.jp>
  Distributed under the Boost Software License, Version 1.0.
  (See https://www.boost.org/LICENSE_1_0.txt)
============================================================================= */
// @ts-check
/**
 *
 * @param {EventListenerOrEventListenerObject} loaded
 */
function ready(loaded) {
	if (["interactive", "complete"].includes(document.readyState)) {
		loaded();
	} else {
		document.addEventListener("DOMContentLoaded", loaded);
	}
}
ready(()=> {
    const in_ = document.getElementById("in");
    Velato.output = (params) => {
        document.getElementById("out").innerText = params;
    };
    for (const form of document.forms) {
		form.addEventListener("submit", e => {
			e.preventDefault();
            e.stopPropagation();
            console.log(form.in.value);
            const re = Velato.compileJS(form.in.value);
            eval(re);
            console.log(re);
		});
	}
})
