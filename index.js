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
    const inError = document.getElementById("inError");
	const clearServerError = () => {
		inError.innerText = "";
	};
    Velato.output = (params) => {
        document.getElementById("out").innerText = params;
    };
    for (const form of document.forms) {
        const setError = str => {
            inError.innerText = str;
            form.in.setCustomValidity(str);
        };
		form.addEventListener("submit", e => {
            clearServerError();
            form.in.setCustomValidity("");
            form.classList.add("was-validated");
            document.getElementById("out").innerText = "";
			e.preventDefault();
            e.stopPropagation();
            try {
                const re = Velato.compileJS(form.in.value);
                if (re === "" || re === ";") {
                    setError("なぜかは分かりませんが、エラーが起きたことは確かです。");
                } else {
                    eval(re);
                }
            } catch (e) {
                setError(e.message)
                throw e;
            }
		});
	}
})
