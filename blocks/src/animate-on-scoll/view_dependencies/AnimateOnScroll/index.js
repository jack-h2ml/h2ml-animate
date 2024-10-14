/**
 * Local Dependencies
 */

//import './AnimateOnScroll.scss';

import {
	startObserving,
	requireDebouncing
} from './../GlobalIntersectionObserver';

/**
 * External Dependencies
 */

import 'animate.css/animate.min.css';

/**
 * 
 */

export class H2mlAnimateOnScroll {

	/** */
	//static #elements = new Map();
	static #elements = [];

	/** */
	static #debouncerStore;

	/** */
	static #toggleElement = (elemData, show) => {
		//
		const {
			target,
			animateIn,
			animateOut,
			animateCustomClasses,
			animateInDuration,
			animateOutDuration,
		} = elemData;
		
		//
		target.classList.remove(
			...(!show 
				? []
				: (animateCustomClasses && [animateCustomClasses]) ?? []
			)
		);
		target.classList.add(
			...(show 
				? []
				: (animateCustomClasses && [animateCustomClasses]) ?? []
			)
		);

		//
		if(target.firstElementChild) {
			//
			target.firstElementChild.style.setProperty('--animate-duration', show ? animateInDuration : animateOutDuration);

			//
			target.firstElementChild.classList.remove(
				...(!show  
					? (animateIn && [animateIn]) ?? []
					: (animateOut && [animateOut]) ?? []
				)
			);

			//
			target.firstElementChild.classList.add(
				...(show  
					? (animateIn && [animateIn]) ?? []
					: (animateOut && [animateOut]) ?? []
				)
			);
		}
		//
		elemData.isShown = show;
	}

	/** */
	static #debouncerCallback() {
		const minId = H2mlAnimateOnScroll.#debouncerStore.get('minId');
		const maxId = H2mlAnimateOnScroll.#debouncerStore.get('maxId');
		const scrollingDirection = this.prevScrollPosition < this.currScrollPosition; // False = scrolling towards bottom (forwards), True = scrolling towards top (backwards)
		//
		H2mlAnimateOnScroll.#elements.forEach((elemData, key) => {
			if ((key >= minId) && (key <= maxId + 1)) {

				//
				const {
					elem,
					animateThreshold,
					animateDirection,
					isShown,
				} = elemData;
				//
				const {
					y: currY,
					height,
				} = elem.getBoundingClientRect();
				//
				const currRatio = currY <= 0
					? (height + currY) / height
					: (window.innerHeight - currY) / height
				//
				const thresholdHide = currRatio < animateThreshold;

				//
				let doShow;
				let doHide;

				//
				switch(animateDirection) {
					case ('forwards'): {
						doShow = !isShown && !thresholdHide;
						doHide = !doShow && isShown && !scrollingDirection && thresholdHide && (currY > 0);
						break;
					}
					case ('backwards'): {
						doShow = !isShown && !thresholdHide;
						doHide = !doShow && isShown && scrollingDirection && thresholdHide && (currY < 0);
						break;
					}
					case ('both'): {
						doShow = !isShown && !thresholdHide
						doHide = isShown && thresholdHide;
					}
				}
				if (doShow) {
					H2mlAnimateOnScroll.#toggleElement(elemData, true);
				} else if (doHide) {
					H2mlAnimateOnScroll.#toggleElement(elemData, false);
				}
			}
		});
		H2mlAnimateOnScroll.#debouncerStore.set('minId', null);
		H2mlAnimateOnScroll.#debouncerStore.set('maxId', null);
	}

	/** */
	static #trackerCallback = (Tracker, entry, { isFirstRun, prevScrollPosition, currScrollPosition, scrollDelta }) => {
		const index = Number(Tracker.target.dataset.animateOnScrollKey);
		if (isFirstRun) {
			const {
				intersectionRatio: currRatio,
				boundingClientRect: {
					y: currY
				}
			} = entry;

			//
			const elemData = H2mlAnimateOnScroll.#elements[index];
			const {
				animateThreshold,
				animateDirection
			} = elemData;
			//
			const offScreenUp = currRatio < animateThreshold && currY < 0;
			const offScreenDown = currRatio < animateThreshold && currY > window.innerHeight;
			//
			switch (animateDirection) {
				case ('forwards'): {
					if (offScreenDown) H2mlAnimateOnScroll.#toggleElement(elemData, false);
					break;
				}
				case ('backwards'): {
					if (offScreenUp) H2mlAnimateOnScroll.#toggleElement(elemData, false);
					break;
				}
				case ('both'): {
					if (offScreenUp || offScreenDown) H2mlAnimateOnScroll.#toggleElement(elemData, false);
				}
			}
		} else {
			if (entry.isIntersecting) {
				//
				const minId = H2mlAnimateOnScroll.#debouncerStore.get('minId');
				const maxId = H2mlAnimateOnScroll.#debouncerStore.get('maxId');
				//
				if (minId === null || maxId === null) {
					H2mlAnimateOnScroll.#debouncerStore.set('minId', index);
					H2mlAnimateOnScroll.#debouncerStore.set('maxId', index);
				} else {
					H2mlAnimateOnScroll.#debouncerStore.set('minId', Math.min(minId, index));
					H2mlAnimateOnScroll.#debouncerStore.set('maxId', Math.max(maxId, index));
				}
			}
		}
	}

	/** */
	static #wrap = (elemData) => {
		//
		const {
			elem,
			index
		} = elemData;

		//
		const target = elem;
		if(target.firstElementChild) {
			target.firstElementChild.classList.add('animate__animated');
		}

		//
		elem.dataset.animateOnScrollKey = index;
		//this.#elements.set(index, {...elemData, target});
		this.#elements[index] = {...elemData, target}

		//
		return elem;
	}

	/** */
	static #prepare = (selector) => {
		//
		H2mlAnimateOnScroll.#debouncerStore = requireDebouncing('animateOnScroll', H2mlAnimateOnScroll.#debouncerCallback, 30);
		//
		document.querySelectorAll(selector).forEach((elem, index) => {
			const {
				animateIn = null,
				animateOut = null,
				animateCustomClasses,
				animateOnLoadVisible = false,
				animateInDuration,
				animateOutDuration,
				animateThreshold,
				animateDirection
			} = elem.dataset;
			
			startObserving(
				H2mlAnimateOnScroll.#wrap({
					elem,
					index,
					key: Symbol(),
					animateIn,
					animateOut,
					animateCustomClasses,
					animateOnLoadVisible,
					animateInDuration,
					animateOutDuration,
					animateThreshold,
					animateDirection,
					isShown: true,
				}),
				H2mlAnimateOnScroll.#trackerCallback,
				index
			);
		});
	}

	/** */
	static track = (...selectors) => {
		// Begin observing based on the passed querySelectors.
		selectors.forEach(selector => H2mlAnimateOnScroll.#prepare(selector));
	}
}