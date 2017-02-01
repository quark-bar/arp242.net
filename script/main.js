// Generated by CoffeeScript 1.12.3
(function() {
  var by_class, by_id, filter, get_hash_key, main, set_hash_key, sort,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  get_hash_key = function(key) {
    var i, k, len, pair, ref, ref1, v;
    ref = location.hash.substr(1).split(',');
    for (i = 0, len = ref.length; i < len; i++) {
      pair = ref[i];
      if (indexOf.call(pair, '=') < 0) {
        continue;
      }
      ref1 = pair.split('='), k = ref1[0], v = ref1[1];
      if (k === key) {
        return v;
      }
    }
    return '';
  };

  set_hash_key = function(key, value) {
    var i, k, len, new_hash, pair, ref, ref1, v;
    new_hash = '';
    ref = window.location.hash.substr(1).split(',');
    for (i = 0, len = ref.length; i < len; i++) {
      pair = ref[i];
      if (indexOf.call(pair, '=') < 0) {
        continue;
      }
      ref1 = pair.split('='), k = ref1[0], v = ref1[1];
      if (k !== key) {
        new_hash += pair + ",";
      }
    }
    if (value !== '') {
      new_hash += key + "=" + value + ",";
    }
    return window.location.hash = "" + new_hash;
  };

  by_class = function(klass) {
    var i, k, len, ref, results;
    ref = document.getElementsByClassName(klass);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      k = ref[i];
      results.push(k);
    }
    return results;
  };

  by_id = function(id) {
    return document.getElementById(id);
  };

  filter = function() {
    var got_one, lang, nr, status;
    lang = get_hash_key('filter-lang');
    status = get_hash_key('filter-status');
    got_one = false;
    by_class('weblog-brief').forEach(function(elem) {
      var show;
      show = true;
      if (lang !== '') {
        show = elem.className.indexOf("lang-" + lang + " ") >= 0;
      }
      if (status !== '') {
        show = show && elem.className.indexOf("status-" + status) >= 0;
      }
      got_one = got_one || show;
      return elem.style.display = show ? 'block' : 'none';
    });
    console.log(got_one);
    if (got_one) {
      return by_class('no-results').forEach(function(elem) {
        return elem.parentNode.removeChild(elem);
      });
    } else {
      nr = document.createElement('div');
      nr.className = 'weblog-brief no-results';
      nr.innerHTML = '<strong>No results with these filters.</strong>';
      return by_class('weblog-overview')[0].appendChild(nr);
    }
  };

  sort = function() {
    var h, i, len, results, s, sorted;
    h = get_hash_key('sort');
    if (h === '') {
      return;
    }
    sorted = by_class('weblog-brief');
    sorted.forEach(function(elem) {
      return elem.parentNode.removeChild(elem);
    });
    sorted.sort(function(a, b) {
      return a.attributes["data-" + h].value.localeCompare(b.attributes["data-" + h].value);
    });
    if (h === 'updated') {
      sorted.reverse();
    }
    results = [];
    for (i = 0, len = sorted.length; i < len; i++) {
      s = sorted[i];
      results.push(by_class('weblog-overview')[0].appendChild(s));
    }
    return results;
  };

  main = function() {
    var hk, i, j, l, len, len1, len2, opt, ref, ref1, ref2, results;
    if (!by_class('code-projects').length) {
      return;
    }
    filter();
    sort();
    by_id('code-filter-lang').addEventListener('change', function() {
      return set_hash_key('filter-lang', this.options[this.selectedIndex].value);
    });
    by_id('code-filter-status').addEventListener('change', function(e) {
      return set_hash_key('filter-status', this.options[this.selectedIndex].value);
    });
    by_id('code-sort').addEventListener('change', function(e) {
      return set_hash_key('sort', this.options[this.selectedIndex].value);
    });
    ref = by_id('code-filter-lang').options;
    for (i = 0, len = ref.length; i < len; i++) {
      opt = ref[i];
      hk = get_hash_key('filter-lang');
      if (opt.value === hk) {
        opt.selected = true;
      }
    }
    ref1 = by_id('code-filter-status').options;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      opt = ref1[j];
      hk = get_hash_key('filter-status');
      if (opt.value === hk) {
        opt.selected = true;
      }
    }
    ref2 = by_id('code-sort').options;
    results = [];
    for (l = 0, len2 = ref2.length; l < len2; l++) {
      opt = ref2[l];
      hk = get_hash_key('sort');
      if (opt.value === hk) {
        results.push(opt.selected = true);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  document.addEventListener('DOMContentLoaded', function() {
    return main();
  });

  window.addEventListener('hashchange', function() {
    filter();
    return sort();
  });

}).call(this);
