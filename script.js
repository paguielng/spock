var scissors = document.getElementById("scissors");
var paper = document.getElementById("paper");
var rock = document.getElementById("rock");
var lizard = document.getElementById("lizard");
var spock = document.getElementById("spock");
var circ = document.getElementsByClassName('circles');
var victory = 0;
var points = localStorage.getItem('points');
var choose = 0;
var rules = document.getElementById("rules-board");
var cpu = document.getElementsByClassName('cpu-circle')[0];

var list = { 0: scissors, 1: paper, 2: rock, 3: lizard, 4: spock };
var icons = { 0: "url(images/icon-scissors.svg)", 1: "url(images/icon-paper.svg)", 2: "url(images/icon-rock.svg)", 3: "url(images/icon-lizard.svg)", 4: "url(images/icon-spock.svg)" };
var topp = {0:"-50px",1:"50px",2:"180px",3:"180px",4:"50px"};
var leftt = {0:"75px",1:"200px",2:"170px",3:"0px",4:"-50px"};
var colors = { 0: "hsl(39, 89%, 49%)", 1: "hsl(230, 89%, 62%)", 2: "hsl(349, 71%, 52%)", 3: "hsl(261, 73%, 60%)", 4: "hsl(189, 59%, 53%)" };
var shadows = { 0: "inset 0 6px 1px rgb(190, 190, 190), 0 6px 0 #c06d21", 1: "inset 0 6px 1px rgb(190, 190, 190), 0 6px 0 #2944c3", 2: "inset 0 6px 1px rgb(190, 190, 190), 0 6px 0 #9b1533", 3: "inset 0 6px 1px rgb(190, 190, 190), 0 6px 0 #6137a9", 4: "inset 0 6px 1px rgb(190, 190, 190), 0 6px 0 #2c8eac" };

var explain = { 1:"Les ciseaux coupent le papier", 4:"La pierre Ã©crase les ciseaux", 5:"Le papier enveloppe la pierre", 9:"Les ciseaux dÃ©capitent le lÃ©zard", 10:"La lÃ©zard mange le papier", 13:"La pierre Ã©crase le lÃ©zard", 16:"Spock casse les ciseaux", 17:"Spock rÃ©fute le papier", 20:"Spock vaporise la pierre", 25:"Le lÃ©zard empoisonne Spock" };

//Init points
if(!(points>0 || points<0 || points==0)) points=0;
document.getElementById('number').innerHTML = points;
localStorage.setItem('points',points);

//Rules
function rulesload(){
	document.getElementById('rules-container').style.zIndex="3";
	rules.style.opacity = "1";
}
function rulesclose(){
    document.getElementById('rules-container').style.zIndex="-1";
    rules.style.opacity = "0";
}
document.getElementsByClassName("rules")[0].onclick = rulesload;
document.getElementById("rules-container").onclick = rulesclose;

   
//Main game
for (let x = 0; x < 5; x++) {
	list[x].addEventListener("click", function () {
		choose = x;
		
		//Change display afeter choice
		document.getElementById('play').style.background = "none";
		for (a = 0; a < 5; a++) {
			if (a != choose) {
				list[a].style.transform = "translate(0, -500px)";
				list[a].style.zIndex = "-5";
				list[a].style.opacity = "-5";
			}
        }
        list[choose].style.left = "-40px";
        list[choose].style.top = "calc(40% - 70px)";
        list[choose].style.border = "12px solid " + colors[choose];
		list[choose].style.width = "125px";
    	list[choose].style.height = "125px";
        list[choose].style.zIndex = "-2"
        cpu.style.zIndex = "1";
        cpu.style.opacity = "1";
		
		//CPU picks an element
        var cpu_value = Math.floor(Math.random() * 5);
        var result;
		var explTxt = explain[choose*choose + cpu_value*cpu_value];

		if (cpu_value == (choose + 1) % 5 || cpu_value == (choose + 3) % 5) {
			victory= 1;
			points++;
			result='GagnÃ© <div class="desc">'+explTxt+'</div>';
        }
        else if (cpu_value == choose) {
			result="EgalitÃ©"
			victory = undefined;
        }
        else {
			points--
            result='Perdu <div class="desc">'+explTxt+'</div>';
			victory=0;
        };
		localStorage.setItem("points",points);
		
		//Delay and display results
		var clock= setInterval(delay, 1500);
        function delay() {
            cpu.style.background = icons[cpu_value];
            cpu.style.backgroundRepeat = "no-repeat";
            cpu.style.backgroundPosition = "center";
            cpu.style.border = "12px solid " + colors[cpu_value];
            cpu.style.backgroundSize = "52.5%";
            cpu.style.backgroundColor = "#dcdcdc";
            cpu.style.boxShadow = shadows[cpu_value];
			
            document.getElementById("after-text").style.opacity = "1";
            document.getElementById("after-text").style.zIndex = "1";
            document.getElementById('result-board').style.opacity="1";
            document.getElementById('result-board').style.zIndex="5";
            document.getElementById('result-board').getElementsByTagName('p')[0].innerHTML=result;
            document.getElementById('number').innerHTML = localStorage.getItem('points');
			
            var wincirc=document.getElementsByClassName('win-gradient')[0];
            if (victory==1) {
                wincirc.style.opacity="1";
                wincirc.style.left="-115px";
            }
            else if (victory==0) {
                wincirc.style.opacity="1";
                wincirc.style.left="74px";
            }
            clearInterval(clock);
		}
	});
}
 
//Again button
function iconInit() {
	document.getElementsByClassName('win-gradient')[0].style.left="auto";
	document.getElementById('play').style.background="url(images/bg-pentagon.svg)";
	document.getElementById('play').style.backgroundPosition="center";
	document.getElementById('play').style.backgroundRepeat="no-repeat";
	document.getElementById('play').style.backgroundSize="contain";
	
	for(let o=0;o<5;o++) {
		list[o].style.transform = "none";
		list[o].style.zIndex = "1";
		list[o].style.opacity = "1";
		
		list[o].style.backgroundImage = icons[o];
		list[o].style.left=leftt[o];
		list[o].style.top=topp[o];
		list[o].style.border = "10px solid " + colors[o];
		list[o].style.boxShadow = shadows[o];
		list[o].style.width = "100px";
    	list[o].style.height = "100px";
	}
	
	cpu.style.zIndex="-3";
	cpu.style.opacity="0";
	cpu.style.background="hsl(237, 49%, 15%)";
	cpu.style.border="none";
	cpu.style.boxShadow="none";
	
	document.getElementById('after-text').style.zIndex="-3";
	document.getElementById('after-text').style.opacity="0";
	
	document.getElementsByClassName('win-gradient')[0].style.zIndex="-3";
	document.getElementsByClassName('win-gradient')[0].style.opacity="0";
	document.getElementById('result-board').style.zIndex="-3";
	document.getElementById('result-board').style.opacity="0";
}
document.getElementById('again').onclick = iconInit;

window.onload = function () { iconInit(); rulesload(); }
