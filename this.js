var decryptElementId;function decryptText(t,e,r){(decryptElementId=t,null==e&&(e=""),null!=r&&r)?decrypt(prompt(e,"")):vcPrompt(e,decrypt)}function decrypt(t){if(""!=t&&null!=t){decryptElementId.constructor!=Array&&(decryptElementId=[decryptElementId]);for(var e=!1,r=0;r<decryptElementId.length;r++){var n=document.getElementById(decryptElementId[r]),i=n.title;try{var s=GibberishAES.dec(i,t);e=!0,n.innerHTML=s,n.title=""}catch(t){}}e||(alert("Wrong Passcode","Harman Singh Hira"),window.location.reload())}}var overlayElt=null,winElt=null,passElt=null,promptElt=null;function vcPrompt(t){null!=overlayElt&&null!=winElt&&null!=passElt&&null!=promptElt||vcCreateDialog(t),promptElt.innerHTML=null!=t?t:"Enter password:",pageSize=getPageSize(),winElt.style.marginTop=Math.round(.3*pageSize[3])+"px",winElt.style.marginLeft=Math.round((pageSize[2]-400)/2)+"px",isIE6=/msie|MSIE 6/.test(navigator.userAgent),isIE6&&(pageScroll=getPageScroll(),overlayElt.style.position="absolute",overlayElt.style.width=pageSize[0]+"px",overlayElt.style.height=pageSize[1]+"px",winElt.style.position="absolute",winElt.style.top=pageScroll[1]+"px",winElt.style.left=pageScroll[0]+"px"),passElt.value="",overlayElt.style.display="block",winElt.style.display="block",passElt.focus(),passElt.select()}function vcCreateDialog(){(overlayElt=document.createElement("div")).setAttribute("id","vcOverlay");var t=overlayElt.style;t.MozOpacity=.1,t.opacity=.1,t.filter="alpha(opacity=10)";var e=document.getElementsByTagName("body").item(0);e.insertBefore(overlayElt,e.firstChild),(winElt=document.createElement("div")).setAttribute("id","vcWin"),(t=winElt.style).position="fixed",t.top=0,t.left=0,t.width="400px",t.zIndex=255,t.margin=0,t.padding=0,e.insertBefore(winElt,e.firstChild);var r=document.createElement("div");r.setAttribute("id","vcInWin"),r.setAttribute("class","input-group"),winElt.appendChild(r),promptElt=document.createElement("div"),(passElt=document.createElement("input")).setAttribute("id","vcPass"),passElt.type="text",passElt.placeholder="Enter Passcode",passElt.className="form-control",passElt.required=!0,passElt.onkeydown=function(t){null==t&&(t=window.event),10!=t.keyCode&&13!=t.keyCode||vcClick(1),27==t.keyCode&&vcClick(0)},r.appendChild(passElt),document.getElementById("vcInWin").insertAdjacentHTML("afterbegin",'<span class="input-group-text"> <i class="ci-locked"></i> </span>');var n=document.createElement("input");n.type="button",n.value="OK",n.onclick=function(){vcClick(1)},n.className="btn btn-primary",r.appendChild(n)}function vcClick(t){winElt.style.display="none",t&&decrypt(passElt.value)}function getPageScroll(){var t,e;return self.pageYOffset?t=self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?t=document.documentElement.scrollTop:document.body&&(t=document.body.scrollTop),self.pageXOffset?e=self.pageXOffset:document.documentElement&&document.documentElement.scrollLeft?e=document.documentElement.scrollLeft:document.body&&(e=document.body.scrollLeft),arrayPageScroll=new Array(e,t),arrayPageScroll}function getPageSize(){var t,e,r,n;return window.innerHeight&&window.scrollMaxY?(t=document.body.scrollWidth,e=window.innerHeight+window.scrollMaxY):document.body.scrollHeight>document.body.offsetHeight?(t=document.body.scrollWidth,e=document.body.scrollHeight):(t=document.body.offsetWidth,e=document.body.offsetHeight),self.innerHeight?(r=self.innerWidth,n=self.innerHeight):document.documentElement&&document.documentElement.clientHeight?(r=document.documentElement.clientWidth,n=document.documentElement.clientHeight):document.body&&(r=document.body.clientWidth,n=document.body.clientHeight),pageHeight=e<n?n:e,pageWidth=t<r?r:t,arrayPageSize=new Array(pageWidth,pageHeight,r,n),arrayPageSize}var GibberishAES={Nr:14,Nb:4,Nk:8,Decrypt:!1,enc_utf8:function(t){try{return unescape(encodeURIComponent(t))}catch(t){throw"Error on UTF-8 encode"}},dec_utf8:function(t){try{return decodeURIComponent(escape(t))}catch(t){throw"Bad Key"}},padBlock:function(t){var e=[];if(t.length<16){var r=16-t.length;e=[r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r]}for(var n=0;n<t.length;n++)e[n]=t[n];return e},block2s:function(t,e){if(null==t)throw"Decryption error: Maybe bad cipher";var r="";if(e){var n=t[15];if(n>16)throw"Decryption error: Maybe bad key";if(16==n)return"";for(var i=0;i<16-n;i++)r+=String.fromCharCode(t[i])}else for(i=0;i<16;i++)r+=String.fromCharCode(t[i]);return r},a2h:function(t){for(var e="",r=0;r<t.length;r++)e+=(t[r]<16?"0":"")+t[r].toString(16);return e},h2a:function(t){var e=[];return t.replace(/(..)/g,(function(t){e.push(parseInt(t,16))})),e},s2a:function(t){t=this.enc_utf8(t);for(var e=[],r=0;r<t.length;r++)e[r]=t.charCodeAt(r);return e},size:function(t){switch(t){case 128:this.Nr=10,this.Nk=4;break;case 192:this.Nr=12,this.Nk=6;break;case 256:this.Nr=14,this.Nk=8;break;default:throw"Invalid Key Size Specified:"+t}},randArr:function(t){for(var e=[],r=0;r<t;r++)e=e.concat(Math.floor(256*Math.random()));return e},openSSLKey:function(t,e){var r=this.Nr>=12?3:2,n=[],i=[];data00=t.concat(e),n[0]=GibberishAES.Hash.MD5(data00),i=n[0];for(var s=1;s<r;s++)n[s]=GibberishAES.Hash.MD5(n[s-1].concat(data00)),i=i.concat(n[s]);return{key:i.slice(0,4*this.Nk),iv:i.slice(4*this.Nk,4*this.Nk+16)}},rawEncrypt:function(t,e,r){e=this.expandKey(e);for(var n=Math.ceil(t.length/16),i=[],s=0;s<n;s++)i[s]=this.padBlock(t.slice(16*s,16*s+16));t.length%16==0&&(i.push([16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16]),n++);var a=[];for(s=0;s<i.length;s++)i[s]=0===s?this.xorBlocks(i[s],r):this.xorBlocks(i[s],a[s-1]),a[s]=this.encryptBlock(i[s],e);return a},rawDecrypt:function(t,e,r){e=this.expandKey(e);for(var n=t.length/16,i=[],s=0;s<n;s++)i.push(t.slice(16*s,16*(s+1)));var a=[];for(s=i.length-1;s>=0;s--)a[s]=this.decryptBlock(i[s],e),a[s]=0===s?this.xorBlocks(a[s],r):this.xorBlocks(a[s],i[s-1]);var c="";for(s=0;s<n-1;s++)c+=this.block2s(a[s]);return c+=this.block2s(a[s],!0),this.dec_utf8(c)},encryptBlock:function(t,e){this.Decrypt=!1;for(var r=this.addRoundKey(t,e,0),n=1;n<this.Nr+1;n++)r=this.subBytes(r),r=this.shiftRows(r),n<this.Nr&&(r=this.mixColumns(r)),r=this.addRoundKey(r,e,n);return r},decryptBlock:function(t,e){this.Decrypt=!0;for(var r=this.addRoundKey(t,e,this.Nr),n=this.Nr-1;n>-1;n--)r=this.shiftRows(r),r=this.subBytes(r),r=this.addRoundKey(r,e,n),n>0&&(r=this.mixColumns(r));return r},subBytes:function(t){for(var e=this.Decrypt?this.SBoxInv:this.SBox,r=[],n=0;n<16;n++)r[n]=e[t[n]];return r},shiftRows:function(t){for(var e=[],r=this.Decrypt?[0,13,10,7,4,1,14,11,8,5,2,15,12,9,6,3]:[0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11],n=0;n<16;n++)e[n]=t[r[n]];return e},mixColumns:function(t){var e=[];if(this.Decrypt)for(r=0;r<4;r++)e[4*r]=this.GEX[t[4*r]]^this.GBX[t[1+4*r]]^this.GDX[t[2+4*r]]^this.G9X[t[3+4*r]],e[1+4*r]=this.G9X[t[4*r]]^this.GEX[t[1+4*r]]^this.GBX[t[2+4*r]]^this.GDX[t[3+4*r]],e[2+4*r]=this.GDX[t[4*r]]^this.G9X[t[1+4*r]]^this.GEX[t[2+4*r]]^this.GBX[t[3+4*r]],e[3+4*r]=this.GBX[t[4*r]]^this.GDX[t[1+4*r]]^this.G9X[t[2+4*r]]^this.GEX[t[3+4*r]];else for(var r=0;r<4;r++)e[4*r]=this.G2X[t[4*r]]^this.G3X[t[1+4*r]]^t[2+4*r]^t[3+4*r],e[1+4*r]=t[4*r]^this.G2X[t[1+4*r]]^this.G3X[t[2+4*r]]^t[3+4*r],e[2+4*r]=t[4*r]^t[1+4*r]^this.G2X[t[2+4*r]]^this.G3X[t[3+4*r]],e[3+4*r]=this.G3X[t[4*r]]^t[1+4*r]^t[2+4*r]^this.G2X[t[3+4*r]];return e},addRoundKey:function(t,e,r){for(var n=[],i=0;i<16;i++)n[i]=t[i]^e[r][i];return n},xorBlocks:function(t,e){for(var r=[],n=0;n<16;n++)r[n]=t[n]^e[n];return r},expandKey:function(t){this.Nb;for(var e=this.Nr,r=this.Nk,n=[],i=[],s=0;s<r;s++){var a=[t[4*s],t[4*s+1],t[4*s+2],t[4*s+3]];n[s]=a}for(s=r;s<4*(e+1);s++){n[s]=[];for(var c=0;c<4;c++)i[c]=n[s-1][c];s%r==0?(i=this.subWord(this.rotWord(i)))[0]^=this.Rcon[s/r-1]:r>6&&s%r==4&&(i=this.subWord(i));for(c=0;c<4;c++)n[s][c]=n[s-r][c]^i[c]}var l=[];for(s=0;s<e+1;s++){l[s]=[];for(var o=0;o<4;o++)l[s].push(n[4*s+o][0],n[4*s+o][1],n[4*s+o][2],n[4*s+o][3])}return l},subWord:function(t){for(var e=0;e<4;e++)t[e]=this.SBox[t[e]];return t},rotWord:function(t){for(var e=t[0],r=0;r<4;r++)t[r]=t[r+1];return t[3]=e,t},SBox:[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],SBoxInv:[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125],Rcon:[1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145],G2X:[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,198,200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,230,232,234,236,238,240,242,244,246,248,250,252,254,27,25,31,29,19,17,23,21,11,9,15,13,3,1,7,5,59,57,63,61,51,49,55,53,43,41,47,45,35,33,39,37,91,89,95,93,83,81,87,85,75,73,79,77,67,65,71,69,123,121,127,125,115,113,119,117,107,105,111,109,99,97,103,101,155,153,159,157,147,145,151,149,139,137,143,141,131,129,135,133,187,185,191,189,179,177,183,181,171,169,175,173,163,161,167,165,219,217,223,221,211,209,215,213,203,201,207,205,195,193,199,197,251,249,255,253,243,241,247,245,235,233,239,237,227,225,231,229],G3X:[0,3,6,5,12,15,10,9,24,27,30,29,20,23,18,17,48,51,54,53,60,63,58,57,40,43,46,45,36,39,34,33,96,99,102,101,108,111,106,105,120,123,126,125,116,119,114,113,80,83,86,85,92,95,90,89,72,75,78,77,68,71,66,65,192,195,198,197,204,207,202,201,216,219,222,221,212,215,210,209,240,243,246,245,252,255,250,249,232,235,238,237,228,231,226,225,160,163,166,165,172,175,170,169,184,187,190,189,180,183,178,177,144,147,150,149,156,159,154,153,136,139,142,141,132,135,130,129,155,152,157,158,151,148,145,146,131,128,133,134,143,140,137,138,171,168,173,174,167,164,161,162,179,176,181,182,191,188,185,186,251,248,253,254,247,244,241,242,227,224,229,230,239,236,233,234,203,200,205,206,199,196,193,194,211,208,213,214,223,220,217,218,91,88,93,94,87,84,81,82,67,64,69,70,79,76,73,74,107,104,109,110,103,100,97,98,115,112,117,118,127,124,121,122,59,56,61,62,55,52,49,50,35,32,37,38,47,44,41,42,11,8,13,14,7,4,1,2,19,16,21,22,31,28,25,26],G9X:[0,9,18,27,36,45,54,63,72,65,90,83,108,101,126,119,144,153,130,139,180,189,166,175,216,209,202,195,252,245,238,231,59,50,41,32,31,22,13,4,115,122,97,104,87,94,69,76,171,162,185,176,143,134,157,148,227,234,241,248,199,206,213,220,118,127,100,109,82,91,64,73,62,55,44,37,26,19,8,1,230,239,244,253,194,203,208,217,174,167,188,181,138,131,152,145,77,68,95,86,105,96,123,114,5,12,23,30,33,40,51,58,221,212,207,198,249,240,235,226,149,156,135,142,177,184,163,170,236,229,254,247,200,193,218,211,164,173,182,191,128,137,146,155,124,117,110,103,88,81,74,67,52,61,38,47,16,25,2,11,215,222,197,204,243,250,225,232,159,150,141,132,187,178,169,160,71,78,85,92,99,106,113,120,15,6,29,20,43,34,57,48,154,147,136,129,190,183,172,165,210,219,192,201,246,255,228,237,10,3,24,17,46,39,60,53,66,75,80,89,102,111,116,125,161,168,179,186,133,140,151,158,233,224,251,242,205,196,223,214,49,56,35,42,21,28,7,14,121,112,107,98,93,84,79,70],GBX:[0,11,22,29,44,39,58,49,88,83,78,69,116,127,98,105,176,187,166,173,156,151,138,129,232,227,254,245,196,207,210,217,123,112,109,102,87,92,65,74,35,40,53,62,15,4,25,18,203,192,221,214,231,236,241,250,147,152,133,142,191,180,169,162,246,253,224,235,218,209,204,199,174,165,184,179,130,137,148,159,70,77,80,91,106,97,124,119,30,21,8,3,50,57,36,47,141,134,155,144,161,170,183,188,213,222,195,200,249,242,239,228,61,54,43,32,17,26,7,12,101,110,115,120,73,66,95,84,247,252,225,234,219,208,205,198,175,164,185,178,131,136,149,158,71,76,81,90,107,96,125,118,31,20,9,2,51,56,37,46,140,135,154,145,160,171,182,189,212,223,194,201,248,243,238,229,60,55,42,33,16,27,6,13,100,111,114,121,72,67,94,85,1,10,23,28,45,38,59,48,89,82,79,68,117,126,99,104,177,186,167,172,157,150,139,128,233,226,255,244,197,206,211,216,122,113,108,103,86,93,64,75,34,41,52,63,14,5,24,19,202,193,220,215,230,237,240,251,146,153,132,143,190,181,168,163],GDX:[0,13,26,23,52,57,46,35,104,101,114,127,92,81,70,75,208,221,202,199,228,233,254,243,184,181,162,175,140,129,150,155,187,182,161,172,143,130,149,152,211,222,201,196,231,234,253,240,107,102,113,124,95,82,69,72,3,14,25,20,55,58,45,32,109,96,119,122,89,84,67,78,5,8,31,18,49,60,43,38,189,176,167,170,137,132,147,158,213,216,207,194,225,236,251,246,214,219,204,193,226,239,248,245,190,179,164,169,138,135,144,157,6,11,28,17,50,63,40,37,110,99,116,121,90,87,64,77,218,215,192,205,238,227,244,249,178,191,168,165,134,139,156,145,10,7,16,29,62,51,36,41,98,111,120,117,86,91,76,65,97,108,123,118,85,88,79,66,9,4,19,30,61,48,39,42,177,188,171,166,133,136,159,146,217,212,195,206,237,224,247,250,183,186,173,160,131,142,153,148,223,210,197,200,235,230,241,252,103,106,125,112,83,94,73,68,15,2,21,24,59,54,33,44,12,1,22,27,56,53,34,47,100,105,126,115,80,93,74,71,220,209,198,203,232,229,242,255,180,185,174,163,128,141,154,151],GEX:[0,14,28,18,56,54,36,42,112,126,108,98,72,70,84,90,224,238,252,242,216,214,196,202,144,158,140,130,168,166,180,186,219,213,199,201,227,237,255,241,171,165,183,185,147,157,143,129,59,53,39,41,3,13,31,17,75,69,87,89,115,125,111,97,173,163,177,191,149,155,137,135,221,211,193,207,229,235,249,247,77,67,81,95,117,123,105,103,61,51,33,47,5,11,25,23,118,120,106,100,78,64,82,92,6,8,26,20,62,48,34,44,150,152,138,132,174,160,178,188,230,232,250,244,222,208,194,204,65,79,93,83,121,119,101,107,49,63,45,35,9,7,21,27,161,175,189,179,153,151,133,139,209,223,205,195,233,231,245,251,154,148,134,136,162,172,190,176,234,228,246,248,210,220,206,192,122,116,102,104,66,76,94,80,10,4,22,24,50,60,46,32,236,226,240,254,212,218,200,198,156,146,128,142,164,170,184,182,12,2,16,30,52,58,40,38,124,114,96,110,68,74,88,86,55,57,43,37,15,1,19,29,71,73,91,85,127,113,99,109,215,217,203,197,239,225,243,253,167,169,187,181,159,145,131,141],enc:function(t,e){var r=this.randArr(8),n=this.openSSLKey(this.s2a(e),r),i=n.key,s=n.iv;t=this.s2a(t);var a=this.rawEncrypt(t,i,s);return a=[[83,97,108,116,101,100,95,95].concat(r)].concat(a),this.Base64.encode(a)},dec:function(t,e){var r=(a=this.Base64.decode(t)).slice(8,16),n=this.openSSLKey(this.s2a(e),r),i=n.key,s=n.iv,a=a.slice(16,a.length);return t=this.rawDecrypt(a,i,s)}};function getOptionHTML(t){const e={"YHI Tyres":'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">YHI Tyres</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>0800 993 344 </p><a href="https://yhiautomotive.co.nz/" target="_blank" class="btn btn-sm btn-primary">Order</a></div></div>\n    ',"Tyre Maxx":'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">Tyre Maxx</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>0508 150 150 </p><a href="http://www.tyremax.co.nz/" target="_blank" class="btn btn-sm btn-primary">Order</a></div></div>\n    ',"Value Tyres":'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">Value Tyres</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>0800 993 344 </p><a href="http://www.valuetyres.co.nz/" target="_blank" class="btn btn-sm btn-primary">Order</a></div></div>\n    ',Tyres4U:'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">Tyres4U</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>0800 888 973 </p><a href="http://www.tyres4u.co.nz/" target="_blank" class="btn btn-sm btn-primary">Order</a></div></div>\n    ',"Tyre Line":'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">Tyre Line</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>0800 474 639 </p><a href="https://order.tyreline.co.nz/WebOrder" target="_blank" class="btn btn-sm btn-primary">Order</a></div></div>\n    ',"Blairs Tyres":'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">Blairs Tyres</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>0800 809 096 </p><a href="http://www.blairs.co.nz/" target="_blank" class="btn btn-sm btn-primary">Order</a></div></div>\n    ',"Level Tyres":'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">Level Tyres</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>07 847 5189 </p><a href="http://nationwide.sprint3.com/" target="_blank" class="btn btn-sm btn-primary">Order</a></div></div>\n    ',DTM:'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">DTM</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>0800 621 233 </p><a href="http://www.dtm.co.nz/" target="_blank" class="btn btn-sm btn-primary">Order</a></div></div>\n    ',TDM:'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">Tyres Direct NZ Limited</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>0800 383 777 </p><a href="http://www.tyres-direct.co.nz/" target="_blank" class="btn btn-sm btn-primary">Order</a></div></div>\n    ',"South Pacific":'\n    <div class="card border-0 shadow" style="display: flex !important"><div class="card-content text-center"><h5 class=" card-title">South Pacific</h5><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>09 442 5217 </p><p class="card-text fs-smtext-muted"><i class="ci-eye align-middle mt-n1 me-2"></i>0800 803 567 </p></div></div>\n    '};return"Pirelli"===t?getOptionHTML("YHI Tyres")+getOptionHTML("Tyres4U"):"Michelin"===t?getOptionHTML("Tyre Line")+getOptionHTML("DTM"):"Maxxis"===t?getOptionHTML("Level Tyres")+getOptionHTML("Tyre Maxx"):"Nexen"===t?getOptionHTML("Tyres4U")+getOptionHTML("DTM"):e[t]||"<p>No data available for this option.</p>"}function showText(){const t=document.getElementById("optionSelect").value,e=document.getElementById("displayText"),r=getOptionHTML(t);e.innerHTML=r}GibberishAES.Hash={MD5:function(t){function e(t,e){return t<<e|t>>>32-e}function r(t,e){var r,n,i,s,a;return i=2147483648&t,s=2147483648&e,a=(1073741823&t)+(1073741823&e),(r=1073741824&t)&(n=1073741824&e)?2147483648^a^i^s:r|n?1073741824&a?3221225472^a^i^s:1073741824^a^i^s:a^i^s}function n(t,n,i,s,a,c,l){return t=r(t,r(r(function(t,e,r){return t&e|~t&r}(n,i,s),a),l)),r(e(t,c),n)}function i(t,n,i,s,a,c,l){return t=r(t,r(r(function(t,e,r){return t&r|e&~r}(n,i,s),a),l)),r(e(t,c),n)}function s(t,n,i,s,a,c,l){return t=r(t,r(r(function(t,e,r){return t^e^r}(n,i,s),a),l)),r(e(t,c),n)}function a(t,n,i,s,a,c,l){return t=r(t,r(r(function(t,e,r){return e^(t|~r)}(n,i,s),a),l)),r(e(t,c),n)}function c(t){var e,r,n=[];for(r=0;r<=3;r++)e=t>>>8*r&255,n=n.concat(e);return n}var l,o,d,h,u,p,m,f,y,v=Array();for(v=function(t){for(var e,r=t.length,n=r+8,i=16*((n-n%64)/64+1),s=Array(i-1),a=0,c=0;c<r;)a=c%4*8,s[e=(c-c%4)/4]=s[e]|t[c]<<a,c++;return a=c%4*8,s[e=(c-c%4)/4]=s[e]|128<<a,s[i-2]=r<<3,s[i-1]=r>>>29,s}(t),p=1732584193,m=4023233417,f=2562383102,y=271733878,l=0;l<v.length;l+=16)o=p,d=m,h=f,u=y,p=n(p,m,f,y,v[l+0],7,3614090360),y=n(y,p,m,f,v[l+1],12,3905402710),f=n(f,y,p,m,v[l+2],17,606105819),m=n(m,f,y,p,v[l+3],22,3250441966),p=n(p,m,f,y,v[l+4],7,4118548399),y=n(y,p,m,f,v[l+5],12,1200080426),f=n(f,y,p,m,v[l+6],17,2821735955),m=n(m,f,y,p,v[l+7],22,4249261313),p=n(p,m,f,y,v[l+8],7,1770035416),y=n(y,p,m,f,v[l+9],12,2336552879),f=n(f,y,p,m,v[l+10],17,4294925233),m=n(m,f,y,p,v[l+11],22,2304563134),p=n(p,m,f,y,v[l+12],7,1804603682),y=n(y,p,m,f,v[l+13],12,4254626195),f=n(f,y,p,m,v[l+14],17,2792965006),p=i(p,m=n(m,f,y,p,v[l+15],22,1236535329),f,y,v[l+1],5,4129170786),y=i(y,p,m,f,v[l+6],9,3225465664),f=i(f,y,p,m,v[l+11],14,643717713),m=i(m,f,y,p,v[l+0],20,3921069994),p=i(p,m,f,y,v[l+5],5,3593408605),y=i(y,p,m,f,v[l+10],9,38016083),f=i(f,y,p,m,v[l+15],14,3634488961),m=i(m,f,y,p,v[l+4],20,3889429448),p=i(p,m,f,y,v[l+9],5,568446438),y=i(y,p,m,f,v[l+14],9,3275163606),f=i(f,y,p,m,v[l+3],14,4107603335),m=i(m,f,y,p,v[l+8],20,1163531501),p=i(p,m,f,y,v[l+13],5,2850285829),y=i(y,p,m,f,v[l+2],9,4243563512),f=i(f,y,p,m,v[l+7],14,1735328473),p=s(p,m=i(m,f,y,p,v[l+12],20,2368359562),f,y,v[l+5],4,4294588738),y=s(y,p,m,f,v[l+8],11,2272392833),f=s(f,y,p,m,v[l+11],16,1839030562),m=s(m,f,y,p,v[l+14],23,4259657740),p=s(p,m,f,y,v[l+1],4,2763975236),y=s(y,p,m,f,v[l+4],11,1272893353),f=s(f,y,p,m,v[l+7],16,4139469664),m=s(m,f,y,p,v[l+10],23,3200236656),p=s(p,m,f,y,v[l+13],4,681279174),y=s(y,p,m,f,v[l+0],11,3936430074),f=s(f,y,p,m,v[l+3],16,3572445317),m=s(m,f,y,p,v[l+6],23,76029189),p=s(p,m,f,y,v[l+9],4,3654602809),y=s(y,p,m,f,v[l+12],11,3873151461),f=s(f,y,p,m,v[l+15],16,530742520),p=a(p,m=s(m,f,y,p,v[l+2],23,3299628645),f,y,v[l+0],6,4096336452),y=a(y,p,m,f,v[l+7],10,1126891415),f=a(f,y,p,m,v[l+14],15,2878612391),m=a(m,f,y,p,v[l+5],21,4237533241),p=a(p,m,f,y,v[l+12],6,1700485571),y=a(y,p,m,f,v[l+3],10,2399980690),f=a(f,y,p,m,v[l+10],15,4293915773),m=a(m,f,y,p,v[l+1],21,2240044497),p=a(p,m,f,y,v[l+8],6,1873313359),y=a(y,p,m,f,v[l+15],10,4264355552),f=a(f,y,p,m,v[l+6],15,2734768916),m=a(m,f,y,p,v[l+13],21,1309151649),p=a(p,m,f,y,v[l+4],6,4149444226),y=a(y,p,m,f,v[l+11],10,3174756917),f=a(f,y,p,m,v[l+2],15,718787259),m=a(m,f,y,p,v[l+9],21,3951481745),p=r(p,o),m=r(m,d),f=r(f,h),y=r(y,u);return c(p).concat(c(m),c(f),c(y))}},GibberishAES.Base64={chars:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"],encode:function(t,e){var r=[],n="";totalChunks=Math.floor(16*t.length/3);for(var i=0;i<16*t.length;i++)r.push(t[Math.floor(i/16)][i%16]);for(i=0;i<r.length;i+=3)n+=this.chars[r[i]>>2],n+=this.chars[(3&r[i])<<4|r[i+1]>>4],null!=r[i+1]?n+=this.chars[(15&r[i+1])<<2|r[i+2]>>6]:n+="=",null!=r[i+2]?n+=this.chars[63&r[i+2]]:n+="=";var s=n.slice(0,64)+"\n";for(i=1;i<Math.ceil(n.length/64);i++)s+=n.slice(64*i,64*i+64)+(Math.ceil(n.length/64)==i+1?"":"\n");return s},decode:function(t){t=t.replace(/\s/g,"");for(var e=[],r=[],n=[],i=0;i<t.length;i+=4)r[0]=this.chars.indexOf(t.charAt(i)),r[1]=this.chars.indexOf(t.charAt(i+1)),r[2]=this.chars.indexOf(t.charAt(i+2)),r[3]=this.chars.indexOf(t.charAt(i+3)),n[0]=r[0]<<2|r[1]>>4,n[1]=(15&r[1])<<4|r[2]>>2,n[2]=(3&r[2])<<6|r[3],e.push(n[0],n[1],n[2]);return e=e.slice(0,e.length-e.length%16)}},Array.indexOf||(Array.prototype.indexOf=function(t,e){for(var r=e||0;r<this.length;r++)if(this[r]==t)return r});
