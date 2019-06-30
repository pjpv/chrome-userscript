// ==UserScript==
// @name         ZFDev-查看商品历史价格
// @namespace    https://zfdev.com/
// @version      0.1
// @description  查看商品的历史价格，支持京东商城、 天猫商城
// @author       Greendev
// @match        https://item.jd.com/*.html*
// @match        https://detail.tmall.com/item.htm*
// @require      https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min.js
// @connect      tool.manmanbuy.com
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// ==/UserScript==


(function() {

  var hexcase = 0;
  var b64pad = "";
  var chrsz = 8;
  function hex_md5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz))
  }
  function b64_md5(s) {
    return binl2b64(core_md5(str2binl(s), s.length * chrsz))
  }
  function str_md5(s) {
    return binl2str(core_md5(str2binl(s), s.length * chrsz))
  }
  function hex_hmac_md5(key, data) {
    return binl2hex(core_hmac_md5(key, data))
  }
  function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data))
  }
  function str_hmac_md5(key, data) {
    return binl2str(core_hmac_md5(key, data))
  }
  function core_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd)
    }
    return Array(a, b, c, d)
  }
  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
  }
  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
  }
  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
  }
  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
  }
  function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16)
      bkey = core_md5(bkey, key.length * chrsz);
    var ipad = Array(16)
      , opad = Array(16);
    for (var i = 0; i < 16; i++) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128)
  }
  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF)
  }
  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }
  function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin
  }
  function binl2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
      str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
    return str
  }
  function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF)
    }
    return str
  }
  function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
      var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
      for (var j = 0; j < 4; j++) {
        if (i * 8 + j * 6 > binarray.length * 32)
          str += b64pad;
        else
          str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F)
      }
    }
    return str
  }

  var d = {
    zero: ["0", "00", "000", "0000", "00000", "000000", "0000000", "00000000"],
    chars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    strReverse: function(a) {
      var b, c = [];
      var l
      for (b = 0, l = a.length; b < l; b++)
        c[c.length] = a.charAt(b);
      return c.reverse().join("")
    },
    encrypt: function(a, b, e) {
      var a1 = d.shuzi(a);
      var a2 = d.zimu(a);
      a = a2 + a1;
      var f, g = [];
      var l
      for (f = 0, l = a.length; f < l; f++)
        g[g.length] = d.to(a.charCodeAt(f), b);
      return d.rnd(e ? d.strReverse(g.join("")) : g.join(""), 4)
    },
    to: function(a, c) {
      var e = "" + d.round(a + 88, c).toString(16)
        , f = c - e.length;
      return f > 0 ? d.zero[f - 1] + e : e
    },
    round: function(a, b) {
      var c = 1 << 4 * b;
      return 0 > a ? a % c + c : a % c
    },
    shuzi: function(a) {
      return a.replace(/[^0-9]+/ig, "")
    },
    zimu: function(a) {
      return a.toLowerCase().replace(/https/g, "http").replace(/[^a-zA-Z]+/ig, "")
    },
    rnd: function(a, b) {
      return d.rd(b) + hex_md5(a) + d.rd(Math.ceil(Math.random() * 10))
    },
    rd: function(a) {
      var res = "";
      for (var i = 0; i < a; i++) {
        res += d.chars[Math.ceil(Math.random() * 35)]
      }
      return res
    }
  }







  'use strict';
  GM_addStyle(`
#lishitu{
width: 600px;height:400px;
position: absolute;
right: -260px;
top: 0px;
z-index: 99;
background: white;
display: none;
box-shadow: 0px 0px 11px 1px black;
border-radius: 5px;
padding: 5px;

}
#lishitu:hover{
display: block;
}
#showlishi:{
cursor: pointer;
}
.summary-price .dd:hover #lishitu,
#detail .tm-fcs-panel dd:hover #lishitu,
#J_PromoPrice:hover #lishitu{
display: block;
}

div.nolishi{
font-size: 20px;
text-align: center;
line-height: 400px;
}

.summary-price .dd:hover,
#detail .tm-fcs-panel dd:hover,
#J_PromoPrice:hover{
    cursor: help;
}

`);



  const http_synchronous = true;
  function get(url, headers){
    if(!headers){
      headers = {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9',
      };

    }
    return new Promise((resolve, reject)=>{
      GM_xmlhttpRequest({
        method: "GET",
        url: url,
        synchronous: http_synchronous,
        headers: headers,
        onload: function(response) {
          resolve(response.responseText);
        },
        onerror:()=>{reject()},
        onabort:()=>{reject()},
      });
    });
  }

  function getPriceData(url) {
    let token = d.encrypt(url, 2, true)
    let u = 'http://tool.manmanbuy.com/history.aspx?DA=1&action=gethistory&bjid=&spbh=&cxid=&zkid=&w=&token='+ token +'&url=' + encodeURIComponent(url)
    return new Promise((resolve, reject)=>{
      get(u).then(r => {
        if (r === null || r === undefined) {
          resolve(null)
          return null
        }
        const res = JSON.parse(r)
        console.log(res)

        const date = []
        const oldPrice = []
        const price = []
        let max = -1
        let min = -1
        res.listPrice.forEach(item => {
          const d = new Date(Number.parseFloat(item.dt.replace('/Date(', '').replace(')/', '')))
          date.push([d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/'));
          price.push(item.pr);
          oldPrice.push(item.oldPrice);
          if(max === -1) {
            max = item.pr
            min = item.pr
          }
          if(item.pr < min) {
            min = item.pr
          }
          if(item.pr > max){
            max = item.pr
          }
        })
        const diff = max - min
        const currentPrice = res.currentPrice

        const option = {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[pt.length - 31], pt[pt.length - 1]];
            }
          },
          title: {
            left: 'center',
            text: '历史价格',
            subtext: res.spName,
            subtextStyle: {
              fontSize: 12,
              color: '#333',
              fontWeight: 700,
              align: 'left'
            }
          },
          // toolbox: {
          //     feature: {
          //         dataZoom: {
          //             yAxisIndex: 'none'
          //         },
          //         restore: {},
          //         saveAsImage: {}
          //     }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
          },
          yAxis: {
            type: 'value',
            // boundaryGap: [100, '100%']
            max: max + diff * 0.5,
            min: min - diff * 0.5
          },
          dataZoom: [{
            type: 'inside',
            start: 80,
            end: 100
          }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          series: [
            {
              name: '价格',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: '#e84540'
              },
              // areaStyle: {
              //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //         offset: 0,
              //         color: 'rgb(255, 158, 68)'
              //     }, {
              //         offset: 1,
              //         color: 'rgb(255, 70, 131)'
              //     }])
              // },
              data: price,

              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: '最大值',
                    label: {
                      show: true,
                      formatter: '{c}'
                    }
                  },
                  {
                    type: 'min',
                    name: '最小值',
                    label: {
                      show: true,
                      formatter: '{c}'
                    }
                  }
                ]
              },
              markLine: {
                data: [
                  {
                    name: '当前价格',
                    yAxis: currentPrice,
                    label: {
                      show: true,
                      formatter: '{c}'
                    }
                  },
                ]
              },
              scale: true,
            }
          ]
        };

        resolve(option)

      })





    })
  }







  function addChart() {
    var div = document.createElement('div')
    div.id = 'lishitu'
    div.style=""
    document.body.appendChild(div)


    switch(location.host){
      case 'detail.tmall.com':
      {
        let j = document.querySelector('#detail .tm-fcs-panel #J_PromoPrice')
        if (!j) {
          j = document.querySelector('#detail .tm-fcs-panel dd')
        }
        j.appendChild(div)

      }
        break
      case 'item.jd.com':

        document.querySelector('.summary-price .dd').appendChild(div)
        break
      default:
        return
    }



    var myChart = echarts.init(document.getElementById('lishitu'));

    function initChart() {
      getPriceData(location.href)
        .then(option => {
          if(option ===null){
            document.getElementById('lishitu').innerHTML = '<div class="nolishi">暂未收录</div>'
          } else {
            myChart.setOption(option);
          }
        })
    }
    initChart()
    window.onhashchange = initChart

  }


  setTimeout(addChart,1000)
})();
