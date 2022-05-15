function DateSelector(val) 
{
	form=document.forms[0];
	var ff=false;
	var date="";
	if(val=="to")
	{
		date=getToDateVal();
		ff=true;
	}
	else if(val=="ccfrom")
	{
		date=getFDVal();
		ff=true;		
	}
	else if(val=="term")
	{
		date=gettermVal();
		ff=true;		
	}
	else
	{
		date=getFromDateVal();
		ff=true;
	}

	if(ff)
	{
		sindate=date.split("/");
		var mn=sindate[0];
		var dy=sindate[1];
		var yr=sindate[2];
		// calculate window center positions
		var v_width  = 200;
		var v_heigth = 200;
		var top=(window.screen.availHeight-v_heigth)/2;
		var left=(window.screen.availWidth-v_width)/2;
		//as we are keeping a common file for Accounting only... so making a conidition not to open that global file   for any other module
		if(window.location.href.indexOf('/BSOS/Accounting/')>0)
		{
            //If Accounting/Employees --Personal profile tab then this loop will execute.
            if(window.location.href.indexOf('/BSOS/Accounting/employees/newconreg14.php')>0)
                remote=window.open('dcalendar.php?mn='+mn+'&dy='+dy+'&yr='+yr+'&val='+val,'cal','width=200,height=200,resizable=no,scrollbars=no,status=0,left='+left+',top='+top);
            else
                remote=window.open('../calendar.php?mn='+mn+'&dy='+dy+'&yr='+yr+'&val='+val,'cal','width=200,height=200,resizable=no,scrollbars=no,status=0,left='+left+',top='+top);
		}
		else
			remote=window.open('dcalendar.php?mn='+mn+'&dy='+dy+'&yr='+yr+'&val='+val,'cal','width=200,height=200,resizable=no,scrollbars=no,status=0,left='+left+',top='+top);
		
			remote.focus();
	}
}
function isnumchardotspace(field,name) 
{
	var str = field.value;
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch))&&(ch!=" ") && (ch < "0" || "9" < ch) && (ch!=".")&& (ch!=",")) 
		{
			alert("\nThe "+name+" field  accepts letters,numbers,Period,Cama and space only.\n\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}
function getFDVal()
{
	form=document.forms[0];
	d1=form.ddmonth.selectedIndex;
	d2=form.ddday.selectedIndex;
	d3=form.ddyear.selectedIndex;
	if((d1>0)&&(d2>0)&&(d3>0))
	{
		day1=form.ddmonth.options[d1].value;
		day2=form.ddday.options[d2].value;
		day3=form.ddyear.options[d3].value;
		return day1+"/"+day2+"/"+day3;
	}
	else
	{
		return form.dateval.value;
	}
}

function gettermVal()
{
	form=document.forms[0];
	d1=form.ter_smonth.selectedIndex;
	d2=form.ter_sday.selectedIndex;
	d3=form.ter_syear.selectedIndex;
	if((d1>0)&&(d2>0)&&(d3>0))
	{
		day1=form.ter_smonth.options[d1].value;
		day2=form.ter_sday.options[d2].value;
		day3=form.ter_syear.options[d3].value;
		return day1+"/"+day2+"/"+day3;
	}
	else
	{
		return form.dateval.value;
	}
}

function getFromDateVal()
{
	form=document.forms[0];
	d1=form.smonth.selectedIndex;
	d2=form.sday.selectedIndex;
	d3=form.syear.selectedIndex;
	if((d1>0)&&(d2>0)&&(d3>0))
	{
		day1=form.smonth.options[d1].value;
		day2=form.sday.options[d2].value;
		day3=form.syear.options[d3].value;
		return day1+"/"+day2+"/"+day3;
	}
	else
	{
		return form.dateval.value;
	}
}

function getToDateVal()
{
	form=document.forms[0];
	d1=form.dmonth.selectedIndex;
	d2=form.dday.selectedIndex;
	d3=form.dyear.selectedIndex;
	if((d1>0)&&(d2>0)&&(d3>0))
	{
		day1=form.dmonth.options[d1].value;
		day2=form.dday.options[d2].value;
		day3=form.dyear.options[d3].value;
		return day1+"/"+day2+"/"+day3;
	}
	else
	{
		return form.dateval.value;
	}
}

function Checkpage7()
{
	form=document.conreg;
    var e=document.conreg.elements;
	flag=false;
	for(i=0;i<document.conreg.elements.length;i++)
	{
		if(e[i].name=="location")
		{
			if(e[i].checked==true)
				flag=true;
		}
	}
	if(flag)
	{
		return flag;
	}
	else
	{
		alert("You haven't selected any Location, Please select a Location");
		return flag;
	}
}

function isDate3()
{
	var yy,mm;
	var im,iy;
	var present_date = new Date();
	yy = present_date.getYear();
	mm = present_date.getMonth();

	im = document.forms[0].smonth.selectedIndex;
	iy = document.forms[0].syear.selectedIndex;
	var entered_month = document.forms[0].smonth.options[im].value - 1; 
	var entered_year = document.forms[0].syear.options[iy].value; 

	if (is_greater_date(entered_year,entered_month,yy,mm,"Start") )
	{
		return true; 
	}
	return false;
}

function isDate4()
{
	var yy,mm;
	var im,iy;
	var present_date = new Date();
	yy = present_date.getYear();
	mm = present_date.getMonth();

	im = document.forms[0].pmonth.selectedIndex;
	iy = document.forms[0].pyear.selectedIndex;

	var entered_month;

	if(document.forms[0].pmonth.options[im].value=="Present")
	{
		return true;
	}
	else
	{
		entered_month = document.forms[0].pmonth.options[im].value - 1; 
		var entered_year = document.forms[0].pyear.options[iy].value; 
		if (is_greater_date(entered_year,entered_month,yy,mm,"End") )
		{
			return true; 
		}
		return false;
	}
}

function isDate()
{
	var yy,mm,dd;
	var im,id,iy;
	var present_date = new Date();
	yy = present_date.getYear();
	mm = present_date.getMonth();
	dd = present_date.getDate();

	im = document.forms[0].smonth.selectedIndex;
	id = document.forms[0].sday.selectedIndex;
	iy = document.forms[0].syear.selectedIndex;
	var entered_month = document.forms[0].smonth.options[im].value - 1; 
	var entered_day = document.forms[0].sday.options[id].value; 
	var entered_year = document.forms[0].syear.options[iy].value; 

	if (is_greater_date1(entered_year,entered_month,entered_day,yy,mm,dd,"Availability") && is_valid_day(entered_month,entered_day,"Availability"))
	{
		availability=entered_year+"-"+(entered_month+1)+"-"+entered_day;
		return true; 
	}
	return false;
}

function is_valid_day(entered_month,entered_day,s)
{
	var days_in_month = "312931303130313130313031";
	var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	if (entered_month != -1)
	{
		if (entered_day > days_in_month.substring(2*entered_month,2*entered_month+2))
		{
			alert ("The "+s+" field is entered wrongly (the day field value exceeds the number of days for the month entered).");
			return false;
		}
	}
	return true;
}

function is_greater_date1(entered_year,entered_month,entered_day,yy,mm,dd,s)
{
	if(yy.toString().length<4)
		yy=yy+1900;
	else
		yy=yy;
	if(entered_month==-1)
	{
		alert("You haven't selected "+s+" Date Month, Please select "+s+" Date Month");
		return false;
	}
	if(entered_day==0)
	{
		alert("You haven't selected "+s+" Date Day, Please select "+s+" Date Day");
		return false;
	}
	if(entered_year==0)
	{
		alert("You haven't selected "+s+" Date Year, Please select "+s+" Date Year");
		return false;
	}
	return true;
}

function numSelected()
{
	var e = document.conreg.elements;
	var bNone = true;
	var iFound = 0;
	for (var i=0; i < e.length; i++)
	{
		if (e[i].name == "tax")
		{
			bNone = false;
			if (e[i].checked == true)
				iFound++;
		}
	}
		if (bNone)
	{
		iFound = -1;
	}
	return iFound;
}

function getOther(value)
{
	if(value=="")
		return "";
	else
		return value;
}

function getValue1(field)
{
	var aa="";
	for(i=0;i<field.length;i++)
	{
		if(field[i].checked)
		{
			if(aa==i)
				aa=field[i].value;
			else
				aa+="|"+field[i].value;
		}
		else
		{	if(aa==i)
				aa="";
			else
				aa+="|"+"";
		}
	}
	return aa;
}

function getRadValue(a)
{
	j=0;
	for(i=0;i<a.length;i++)	
	{
		if(a[i].checked)
		{
			j=i+1;
		}
	}
	if(j!=0)
	{
		return a[j-1].value;
	}
	else
	{
		return "";
	}
}

var endyear="";
function Change()
{
	form=document.conreg;
	for(i=0;i<form.endmonth.options.length;i++)
	{
		if(form.endmonth.options[i].selected)
		{
			if(form.endmonth.options[i].value=="Present")
			{
				form.endyear.selectedIndex="0";
 				form.endyear.disabled=true;
			}
			else
				form.endyear.disabled=false;
		}
	}
}

function isDate1()
{
	var yy,mm;
	var im,iy;
	var present_date = new Date();
	yy = present_date.getYear();
	mm = present_date.getMonth();

	im = document.forms[0].startmonth.selectedIndex;
	iy = document.forms[0].startyear.selectedIndex;
	var entered_month = document.forms[0].startmonth.options[im].value - 1; 
	var entered_year = document.forms[0].startyear.options[iy].value; 

	if (is_greater_date(entered_year,entered_month,yy,mm,"Start") )
	{
		return true; 
	}
	return false;
}

function isDate2()
{
	var yy,mm;
	var im,iy;
	var present_date = new Date();
	yy = present_date.getYear();
	mm = present_date.getMonth();

	im = document.forms[0].endmonth.selectedIndex;
	iy = document.forms[0].endyear.selectedIndex;

	var entered_month;

	if(document.forms[0].endmonth.options[im].value=="Present")
	{
		return true;
	}
	else
	{
		entered_month = document.forms[0].endmonth.options[im].value - 1; 
		var entered_year = document.forms[0].endyear.options[iy].value; 
		if (is_greater_date(entered_year,entered_month,yy,mm,"End") )
		{
			return true; 
		}
		return false;
	}
}

function is_greater_date(entered_year,entered_month,yy,mm,s)
{
	if(yy.toString().length<4)
		yy=yy+1900;
	else
		yy=yy;
	if(entered_month==-1)
	{
		alert("You haven't selected "+s+" Date Month, Please select "+s+" Date Month");
		return false;
	}
	if(entered_year==0)
	{
		alert("You haven't selected "+s+" Date Year, Please select "+s+" Date Year");
		return false;
	}
	return true;
}

function getValue(field)
{
	var si=field.options.selectedIndex;
	return field.options[si].value;
}

function selvalue(dd,mm)
{
	var si=dd.options.selectedIndex;
	if(si==0)
	{
		alert("You haven't selected "+mm+", Please select a  value for "+mm);
		dd.focus();
	}
	else
	{
		return true;
	}
}

function invalid(field,name)
{
	y=field.value;
	if(y.indexOf("|")>=0)
	{
		alert(name+" not accepts | , Please re-enter your "+name);
		field.focus();
		return false;
	}
	return true;
}

function invalid1(field,name)
{
	y=field.value;
	if(y.indexOf("^")>=0)
	{
		alert(name+" not accepts ^ , Please re-enter your "+name);
		field.focus();
		return false;
	}
	return true;
}

function invalid2(field,name)
{
	y=field.value;
	if(y.indexOf("^")>=0)
	{
		alert(name+" not accepts ^ , Please re-enter your "+name);
		field.focus();
		return false;
	}
	return true;
}

function chkemail(email)
{
    var str=email.value
	//var strarr=email.value.split(",");
	//var filter=/^(([\w-])+(\.?)([\w-]*))*[a-zA-Z0-9]@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	var filter=emailRegExp;

   /* if(strarr.length > 0 && strarr != "")
	{
		for(var i=0;i<strarr.length;i++)
		{
		 	strarr1=strarr[i].replace(new RegExp('\\s',"gi"),'');
			if (filter.test(strarr1))
			{
				continue;
			}
			else
			{
				alert("Please enter a valid Email address")
				email.focus();
				return false;
			}
		}
	}*/
	if(str != "")
	{
		str1=str.replace(new RegExp('\\s',"gi"),'');
		if (filter.test(str1))
		{
			return true;
		}
		else
		{
			alert("Please enter a valid Email address")
			email.focus();
			return false;
		}	
	}
	return true;
}

function isNotEmpty(field, name)
{
	
	try{
	var str=field.value.trim();
	if(str=="")
	{
		alert("The " + name + " field is empty. Please enter the " + name + ".");
		field.focus();
		return false;
		}
	}catch(e){
	}
	return true;
}

function isNumber(field,name) 
{
	var str =field.value;
	for(var i=0;i<str.length;i++)
	{
		if((str.substring(i,i+1)<"0") || (str.substring(i,i+1)>"9"))
		{
			alert("The "+name+" accepts numbers only.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}

function isNumberDot(field,name) 
{
	var str =field.value;
	for(var i=0;i<str.length;i++)
	{
		var ch = str.substring(i, i + 1);
		if(((str.substring(i,i+1)<"0") || (str.substring(i,i+1)>"9")) && (ch!="."))
		{
			alert("The "+name+" accepts numbers and decimals only.\n\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}

function isNumberHyphen(field,name) 
{
	try{
	var str = field.value;
		if(str != ""){
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if( (ch < "0" || "9" < ch)) 
		{
			//Show the alert for SSN validation based on QuickBooks Canada
			if(typeof(QBCDefault) != 'undefined' && QBCDefault == 'Y')
			{
				alert("\nThe "+name+" field  accepts numbers only without spaces.\nPlease re-enter your "+name+".");
				field.select();
				field.focus();
				return false;
			}
			else if(ch !="-")
			{
				alert("\nThe "+name+" field  accepts numbers and hyphens only.\nPlease re-enter your "+name+".");	
				field.select();
				field.focus();
				return false;
			}
		}
	}
		}
	}catch(e){
		
	}
	return true;
}

function isPipeCap(field,name)
{
	try{
	var str = field.value.trim();
		if(str != ""){
	for (var i = 0; i < str.length; i++)
	{
		var ch = str.substring(i, i + 1);
		if ( (ch=="^") || (ch=="|") )
		{
			 alert("\nThe "+name+" field  does not accept | and ^ characters.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
		}
	}catch(e){
		
	}
	return true;
}

function isNumberDotDoller(field,name) 
{
	var str =field.value;
	try{
		if(str != ""){
	for(var i=0;i<str.length;i++)
	{
		var ch = str.substring(i, i + 1);
		if(((str.substring(i,i+1)<"0") || (str.substring(i,i+1)>"9")) && (ch!="$") && (ch!="."))
		{
			alert("The "+name+" accepts numbers,doller and dots only.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
		}
	}catch(e){
		
	}
	return true;
}

function isName(field,name) 
{
	var str = field.value;
	try{
		if(str != ""){
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch)) ) 
		{
			alert("\nThe "+name+" field  accepts letters only.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
		}
	}catch(e){
	}
	return true;
}

function isNameSpace(field,name) 
{
	try{
		var str = field.value;
		if(str != ""){
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch))&&(ch!=" ")) 
		{
			alert("\nThe "+name+" field  accepts letters and spaces only.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
		}
	}catch(e){
	}
	return true;
}


function isNumberDotSlash(field,name)
{
	var str =field.value;
	try{
		var str = field.value;
		if(str != ""){
	for(var i=0;i<str.length;i++)
	{
		var ch = str.substring(i, i + 1);
		if(((str.substring(i,i+1)<"0") || (str.substring(i,i+1)>"9")) && (ch!=".")&& (ch!="/"))
		{
			alert("The "+name+" accepts numbers, dots and / only.\n\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
				}
			}
		}
	}catch(e){
	}
	return true;
}

function isNameSpaceDot(field,name) 
{
	var str = field.value;
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch))&&((ch!=" ")&&(ch!="."))) 
		{
			alert("\nThe "+name+" field  accepts letters,spaces and dots only.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}

function isNameNumber(field,name) 
{
	var str = field.value;
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch)) && ((ch!=" ") && (ch < "0" || "9" < ch)) ) 
		{
			alert("\nThe "+name+" field  accepts numbers, letters and spaces only.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}

function isNameSpaceCamaNumber(field,name) 
{
	var str = field.value;
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch) && (ch < "0" || "9" < ch) ) && ((ch!=" ") && (ch!=",")) ) 
		{
			alert("\nThe "+name+" field  accepts letters, number, spaces and commas only.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}

function isNameSpaceCama(field,name) 
{
	var str = field.value;
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch))&&((ch!=" ")&&(ch!=",")&&(ch!="-")))
		{
			alert("\nThe "+name+" field  accepts letters,spaces,hyphens and commas only.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}

function isNameSpaceCamaDot(field,name) 
{
	var str = field.value;
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch))&&((ch!=" ")&&(ch!=",")&&(ch!="."))) 
		{
			alert("\nThe "+name+" field  accepts letters,spaces and commas only.\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}

function chklen1(field,name)
{
	var a=field.value.length;
	if((a<3))
	{
		alert(name+" is minimum of 3 characters");
		field.focus();
		field.select();
		return false;
	}
	return true;
}

function chklen2(field,name)
{
	var a=field.value.length;
	if((a<4))
	{
		alert(name+" is minimum of 4 characters");
		field.focus();
		field.select();
		return false;
	}
	return true;
}

function trimAll(sString)
{
	while (sString.substring(0,1) == ' ')
	{
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' ')
	{
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}


function doPost(url,dest)
{
	form=document.forms[0];
	daction=form.daction.value;
	form.url.value=url;
	form.dest.value=dest;
	flag=true;

	if(dest==1)
		flag=doPage1();
	else if(dest==2)
		flag=doPage2();
	else if(dest==3)
		flag=doPage3();
	else if(dest==4)
		flag=doPage4();
	else if(dest==5)
		flag=doPage5();
	else if(dest==6)
		flag=doPage6();
	else if(dest==7)
		flag=doPage7();
	else if(dest==8)
		flag=doPage8();
	else if(dest==9)
		flag=doPage9();
	else if(dest==10)
		flag=doPage10();
	else if(dest==11)
		flag=doPage11();
	else if(dest==12)
		flag=doPage12();
	else if(dest==13)
		flag=doPage13();
	else if(dest==14)
		flag=doPage14();
	else if(dest==15)
		flag=doPage15();
	else if(dest==17)
		flag=doPage17();
	else if(dest==18)
		flag=doPage18();
	else if(dest==19)
		flag=doPage19();
	else if(dest==20)
		flag=doPage20();
	else if(dest==21)
		flag=doPage21();
	else if(dest==22)
		flag=doPage22();
	else if(dest==24)
		flag=doPage24();
	else if(dest==25)
		flag=doPage25();
	else if(dest==26)
		flag=doPage26();
	else if(dest==27)
		flag=doPage27();
	else if(dest==28)
		flag=doPage28();
    	else if(dest==29)
		flag=doPage29();
    	else if(dest==30)
       		flag=doPage30();
   	else if(dest==31)
       		flag=doPage31();
	
	if(flag)
	{
		form.addr.value="old";
		form.action=daction;
		form.submit();
	}
}

function validate(url,dest)
{
	form=document.conreg;
	daction=form.daction.value;
	form.url.value=url;
	form.dest.value=dest;

	flag=true;
	if(dest==1)
		flag=doPage1();
	else if(dest==2)
		flag=doPage2();
	else if(dest==2)
		flag=doPage2();
	else if(dest==3)
		flag=doPage3();
	else if(dest==4)
		flag=doPage4();
	else if(dest==5)
		flag=doPage5();
	else if(dest==6)
		flag=doPage6();
	else if(dest==7)
		flag=doPage7();
	else if(dest==8)
		flag=doPage8();
	else if(dest==9)
		flag=doPage9();
	else if(dest==10)
		flag=doPage10();
	else if(dest==11)
		flag=doPage11();
	else if(dest==12)
		flag=doPage12();
	else if(dest==13)
		flag=doPage13();
	else if(dest==14)
		flag=doPage14();
	else if(dest==15)
		flag=doPage15();
	else if(dest==17)
		flag=doPage17();
	else if(dest==18)
		flag=doPage18();
	else if(dest==19)
		flag=doPage19();
	else if(dest==20)
		flag=doPage20();
	else if(dest==21)
		flag=doPage21();
	else if(dest==21)
		flag=true;
	else if(dest==24)
		flag=doPage24();
   	else if(dest==25)
		flag=doPage25();
	else if(dest==26)
		flag=doPage26();
	else if(dest==27)
		flag=doPage27();
	else if(dest==28)
		flag=doPage28();
        else if(dest==29)
		flag=doPage29();
        else if(dest==30)
            flag=doPage30();

	if(flag)
	{
		form.action=daction;
		form.submit();
	}
}

function doPage1()
{
	form=document.conreg;
	
	if(location.href.indexOf("/BSOS/Accounting/employees/")>0)
	{
		var accemprnm=form.accemprnm.value;
		var com="Acc_Emp_page1"+form.accemprnm.value;
	}
	else
	{
		var emprnm=form.emprnm.value;
		var com="HRM_EmpMngmt_page1"+form.emprnm.value;
	}
	
	//Checking SyncHR Manadatory Fields is enabled or not
	if (syncHRDefault == 'Y' || akkupayroll=='Y') {
		var synchr_variable = isNotEmpty(form.firstname,"First Name") && isSpace(form.firstname,"First Name") && isSpl(form.firstname,"First Name") && isNotEmpty(form.lastname,"Last Name") && isSpace(form.lastname,"Last Name") && isSpl(form.lastname,"Last Name") && isSpl(form.middleinitial,"Middle") && isNotEmpty(form.email,'Primary E-mail') && chkemail(form.email) && chkemail(form.aemail) && chkemail(form.oemail) && isPipeCap(form.prtitle,"Profile Title");
	}
	else {
		var synchr_variable = isNotEmpty(form.firstname,"First Name") && isSpace(form.firstname,"First Name") && isSpl(form.firstname,"First Name") && isNotEmpty(form.lastname,"Last Name") && isSpace(form.lastname,"Last Name") && isSpl(form.lastname,"Last Name") && isSpl(form.middleinitial,"Middle") && chkemail(form.email) && chkemail(form.aemail) && chkemail(form.oemail) && isPipeCap(form.prtitle,"Profile Title");
	}
	
	if(form.addr.value!="edit")
	{
		if(synchr_variable)
		{
		 	var mailid=(form.email.value).replace(new RegExp('\\s',"gi"),'');
			var amailid=(form.aemail.value).replace(new RegExp('\\s',"gi"),'');
			var omailid=(form.oemail.value).replace(new RegExp('\\s',"gi"),'');
			//form.page1.value=trimAll(form.firstname.value)+"|"+trimAll(form.middleinitial.value)+"|"+trimAll(form.lastname.value)+"|"+trimAll(mailid)+"|"+trimAll(form.prtitle.value);
			//pcou=form.page1.value.split("|").length;
			for(i=0;i<form.elements.length;i++)
			{
				if(form.elements[i].name==com)
				{
					form.elements[i].value=trimAll(form.firstname.value)+"|"+trimAll(form.middleinitial.value)+"|"+trimAll(form.lastname.value)+"|"+trimAll(mailid)+"|"+trimAll(form.prtitle.value)+"|"+trimAll(amailid)+"|"+trimAll(omailid);
					pcou=form.elements[i].value.split("|").length;
					break;
				}
			}
			if(pcou==7)
			{
				flag=true;
			}
			else
			{
				alert("You have entered pipes (|) in some of the fields, We don't allow pipes in any fields.\nPlease remove all the pipes in all the fields");
				flag=false;
			}
		}
		else
		{
			flag=false;
		}
		return flag;
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}	

function doPage24()
{
	form=document.conreg;
	
    	if(location.href.indexOf("/BSOS/Accounting/employees/")>0)
	{
		var accemprnm=form.accemprnm.value;
		var com="Acc_Emp_page24"+form.accemprnm.value;
	}
	else
	{
		var emprnm=form.emprnm.value;
                var com="HRM_EmpMngmt_page24"+form.emprnm.value;
	}
    flag=true;

    if(document.getElementById('Acc1_type_checking').checked)
    acc1_type = "CHECKING";
    else 
    acc1_type = "SAVINGS";

    if(document.getElementById('Acc2_type_checking').checked)
    acc2_type = "CHECKING";
    else 
    acc2_type = "SAVINGS";

    if(document.getElementById('Acc3_type_checking').checked)
    acc3_type = "CHECKING";
    else 
    acc3_type = "SAVINGS";

    if(document.getElementById('Acc4_type_checking').checked)
       acc4_type = "CHECKING";
      else 
       acc4_type = "SAVINGS";
   
   
   if(document.getElementById('Acc5_type_checking').checked)
       acc5_type = "CHECKING";
      else 
       acc5_type = "SAVINGS";
    
	if(form.addr.value!="edit")
	{
		var flag_pay_card_1 = false;
        var flag_pay_card_2 = false;
        var flag_pay_card_3 = false;
        
            if(akkupayroll=='Y')
            {
                var acc1_amount = form.acc1_amount.value;
                var acc1_period = form.acc1_period.value;
                var akkupayAccChkFlag = false;
                var chkflag = "no";

                for (var i=0; i < form.deliverymethod.options.length; i++) 
                    {
                    if(form.deliverymethod.options[i].selected)
                    {
                            if(form.deliverymethod.options[i].text == "Direct Deposit")
                                    chkflag = "yes";
                    }
                }
                if(chkflag == "yes")
                {   
                    if(form.acc1_bname.value!="" || form.acc1_name.value!="" || form.acc1_brno.value!="" || form.acc1_bacno.value!="" || (form.acc1_amount.value != "" && form.acc1_amount.value != "0.00" && form.acc1_amount.value != "0") || form.acc2_bname.value!="" || form.acc2_name.value!="" || form.acc2_brno.value!="" || form.acc2_bacno.value!="" || form.pickAuthorization.value!="" || (form.acc2_amount.value != "" && form.acc2_amount.value != "0.00" && form.acc2_amount.value != "0") || form.acc3_bname.value!="" || form.acc3_name.value!="" || form.acc3_brno.value!="" || form.acc3_bacno.value!="" || (form.acc3_amount.value != "" && form.acc3_amount.value != "0.00" && form.acc3_amount.value != "0")   || form.acc4_bname.value!="" || form.acc4_name.value!="" || form.acc4_brno.value!="" || form.acc4_bacno.value!="" || (form.acc4_amount.value != "" && form.acc4_amount.value != "0.00" && form.acc4_amount.value != "0")  || form.acc5_bname.value!="" || form.acc5_name.value!="" || form.acc5_brno.value!="" || form.acc5_bacno.value!="" || (form.acc5_amount.value != "" && form.acc5_amount.value != "0.00" && form.acc5_amount.value != "0"))
                    {
                        // #Account1
                        for(var i=0; i < form.deposit_type_1.options.length; i++) 
                        {
                            if(form.deposit_type_1.options[i].selected)
                            {
                                if(form.deposit_type_1.options[i].value == "PAYCARD")
                                {
                                    flag_pay_card_1 = true;
                                    console.log('1 PAYCARD true');
                                }
                            }
                        }

                        if(flag_pay_card_1)
                        {
                            akkupayAccChkFlag = true;
                        }
                        else if(form.acc1_brno.value!="" || form.acc1_bacno.value!="" || (form.acc1_amount.value != "" && form.acc1_amount.value != "0.00" && form.acc1_amount.value != "0"))
                        {
							if(isNotSet(form.acc1_brno,"Bank Routing Number in Account1") && validRoutingNumber(form.acc1_brno,"Bank Routing Number in Account1") && isNotSet(form.acc1_bacno,"Bank Account Number in Account1") && isbankAcountNumberValid(form.acc1_bacno,"Bank Account Number in Account1") && isNotSetAmount(form.acc1_amount,"Amount in Account1") && isNumber_validchk(form.acc1_amount,"Amount in Account1"))
							{
							    akkupayAccChkFlag = true;
							}
							else
							{
							    akkupayAccChkFlag = false; 
							}
                        }

                        // #Account2
                        for(var i=0; i < form.deposit_type_2.options.length; i++) 
                        {
                            if(form.deposit_type_2.options[i].selected)
                            {
                                if(form.deposit_type_2.options[i].value == "PAYCARD")
                                {
                                    flag_pay_card_2 = true;
                                    console.log('2 PAYCARD true');
                                }
                            }
                        }

                        if(flag_pay_card_2)
                        {
                            akkupayAccChkFlag = true;
                        }
                        else if(akkupayAccChkFlag)
                        {
                             if(form.acc2_brno.value!="" || form.acc2_bacno.value!="" || (form.acc2_amount.value != "" && form.acc2_amount.value != "0.00" && form.acc2_amount.value != "0")){
                                 if(isNotSet(form.acc2_brno,"Bank Routing Number in Account2") && validRoutingNumber(form.acc2_brno,"Bank Routing Number in Account2") && isNotSet(form.acc2_bacno,"Bank Account Number in Account2") && isbankAcountNumberValid(form.acc2_bacno,"Bank Account Number in Account2") && isNotSetAmount(form.acc2_amount,"Amount in Account2") && isNumber_validchk(form.acc2_amount,"Amount in Account2")){
                                    akkupayAccChkFlag = true;
                                }else{
                                    akkupayAccChkFlag = false;
                                }
                            }
                        }
                        // #Account3
                        var styleflag3 = false;
                        for(i = 18; i < 26; i++)
                        {
                            if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                                   styleflag3 = true;
                            }
                        }
                        if(styleflag3)
                        {
                            if(akkupayAccChkFlag)
                            {
                                for(var i=0; i < form.deposit_type_3.options.length; i++) 
                                {
                                    if(form.deposit_type_3.options[i].selected)
                                    {
                                        if(form.deposit_type_3.options[i].value == "PAYCARD")
                                        {
                                            flag_pay_card_3 = true;
                                            console.log('3 PAYCARD true');
                                        }
                                    }
                                }

                                if(flag_pay_card_3)
                                {
                                    akkupayAccChkFlag = true;
                                }
                                else if( form.acc3_brno.value!="" || form.acc3_bacno.value!="" || (form.acc3_amount.value != "" && form.acc3_amount.value != "0.00" && form.acc3_amount.value != "0") )
                                {
                                    if(isNotSet(form.acc3_brno,"Bank Routing Number in Account3") && validRoutingNumber(form.acc3_brno,"Bank Routing Number in Account3") && isNotSet(form.acc3_bacno,"Bank Account Number in Account3") && isbankAcountNumberValid(form.acc3_bacno,"Bank Account Number in Account3") && isNotSetAmount(form.acc3_amount,"Amount in Account3") && isNumber_validchk(form.acc3_amount,"Amount in Account3")){
                                        akkupayAccChkFlag= true;
                                    }
                                    else
                                    {
                                        akkupayAccChkFlag = false; 
                                    }
                                }
                            }
                        }
                        
                        // # Account 4
                        var styleflag4 = false;
                        for(i = 26; i <34; i++)
                        {
                            if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                                   styleflag4 = true;
                            }
                        }
                        if(styleflag4)
                        {   
                            if(akkupayAccChkFlag){
                                if( form.acc4_brno.value!="" || form.acc4_bacno.value!="" || (form.acc4_amount.value != "" && form.acc4_amount.value != "0.00" && form.acc4_amount.value != "0")){
                                    if(isNotSet(form.acc4_brno,"Bank Routing Number in Account4") && validRoutingNumber(form.acc4_brno,"Bank Routing Number in Account4") && isNotSet(form.acc4_bacno,"Bank Account Number in Account4") && isbankAcountNumberValid(form.acc4_bacno,"Bank Account Number in Account4") && isNotSetAmount(form.acc4_amount,"Amount in Account4") && isNumber_validchk(form.acc4_amount,"Amount in Account4")){
                                        akkupayAccChkFlag= true;
                                    }else{
                                        akkupayAccChkFlag = false; 
                                    }
                                }
                            }
                        }

                        // # Account 5
                        var styleflag5 = false;
                        for(i = 34; i <42; i++)
                        {
                            if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                                   styleflag5 = true;
                            }
                        }
                        if(styleflag5)
                        {   
                            if(akkupayAccChkFlag){
                                if( form.acc5_brno.value!="" || form.acc5_bacno.value!="" || (form.acc5_amount.value != "" && form.acc5_amount.value != "0.00" && form.acc5_amount.value != "0")){
                                    if(isNotSet(form.acc5_brno,"Bank Routing Number in Account5") && validRoutingNumber(form.acc5_brno,"Bank Routing Number in Account5") && isNotSet(form.acc5_bacno,"Bank Account Number in Account5") && isbankAcountNumberValid(form.acc5_bacno,"Bank Account Number in Account5") && isNotSetAmount(form.acc5_amount,"Amount in Account5") && isNumber_validchk(form.acc5_amount,"Amount in Account5")){
                                        akkupayAccChkFlag= true;
                                    }else{
                                        akkupayAccChkFlag = false; 
                                    }
                                }
                            }
                        }
                        if(akkupayAccChkFlag)
                        {
                     
                            if(accountAmountTypecheck(styleflag3,styleflag4,styleflag5))
                            {
                                for(i=0;i<form.elements.length;i++)
                                {
                                        if(form.elements[i].name==com)
                                        {
                                                form.elements[i].value=form.deliverymethod.value+"|"+trimAll(form.acc1_bname.value)+"|"+trimAll(form.acc1_name.value)+"|"+trimAll(form.acc1_brno.value)+"|"+trimAll(form.acc1_bacno.value)+"|"+acc1_type+"|"+trimAll(acc1_amount)+"|"+trimAll(acc1_period)+"|"+trimAll(form.acc2_bname.value)+"|"+trimAll(form.acc2_name.value)+"|"+trimAll(form.acc2_brno.value)+"|"+trimAll(form.acc2_bacno.value)+"|"+acc2_type+"|"+trimAll(form.pickAuthorization.value)+"|"+trimAll(form.acc2_amount.value)+"|"+trimAll(form.acc2_period.value)+"|"+trimAll(form.acc3_bname.value)+"|"+trimAll(form.acc3_name.value)+"|"+trimAll(form.acc3_brno.value)+"|"+trimAll(form.acc3_bacno.value)+"|"+acc3_type+"|"+trimAll(form.acc3_amount.value)+"|"+trimAll(form.acc3_period.value)+"|"+trimAll(form.acc4_bname.value)+"|"+trimAll(form.acc4_name.value)+"|"+trimAll(form.acc4_brno.value)+"|"+trimAll(form.acc4_bacno.value)+"|"+acc4_type+"|"+trimAll(form.acc4_amount.value)+"|"+trimAll(form.acc4_period.value)+"|"+trimAll(form.acc5_bname.value)+"|"+trimAll(form.acc5_name.value)+"|"+trimAll(form.acc5_brno.value)+"|"+trimAll(form.acc5_bacno.value)+"|"+acc5_type+"|"+trimAll(form.acc5_amount.value)+"|"+trimAll(form.acc5_period.value)+"|"+trimAll(form.deposit_type_1.value)+"|"+trimAll(form.vendor_1.value)+"|"+trimAll(form.active_status_1.value)+"|"+trimAll(form.deposit_type_2.value)+"|"+trimAll(form.vendor_2.value)+"|"+trimAll(form.active_status_2.value)+"|"+trimAll(form.deposit_type_3.value)+"|"+trimAll(form.vendor_3.value)+"|"+trimAll(form.active_status_3.value);
                                                break;
                                        }
                                } 
                                return flag;
                            }   
                        }
                    }
                    else
                    {
                        if(chkspchars() && isNumber_validchk(form.acc1_amount,"Amount in Account1") && isNumber_validchk(form.acc2_amount,"Amount in Account2") && isNumber_validchk(form.acc3_amount,"Amount in Account3")  && isNumber_validchk(form.acc4_amount,"Amount in Account4")  && isNumber_validchk(form.acc5_amount,"Amount in Account5"))
                        {
                            for(i=0;i<form.elements.length;i++)
                            {
                                    if(form.elements[i].name==com)
                                    {
                                            form.elements[i].value=form.deliverymethod.value+"|"+trimAll(form.acc1_bname.value)+"|"+trimAll(form.acc1_name.value)+"|"+trimAll(form.acc1_brno.value)+"|"+trimAll(form.acc1_bacno.value)+"|"+acc1_type+"|"+acc1_amount+"|"+acc1_period+"|"+trimAll(form.acc2_bname.value)+"|"+trimAll(form.acc2_name.value)+"|"+trimAll(form.acc2_brno.value)+"|"+trimAll(form.acc2_bacno.value)+"|"+acc2_type+"|"+trimAll(form.pickAuthorization.value)+"|"+trimAll(form.acc2_amount.value)+"|"+trimAll(form.acc2_period.value)+"|"+trimAll(form.acc3_bname.value)+"|"+trimAll(form.acc3_name.value)+"|"+trimAll(form.acc3_brno.value)+"|"+trimAll(form.acc3_bacno.value)+"|"+acc3_type+"|"+trimAll(form.acc3_amount.value)+"|"+trimAll(form.acc3_period.value)+"|"+trimAll(form.acc4_bname.value)+"|"+trimAll(form.acc4_name.value)+"|"+trimAll(form.acc4_brno.value)+"|"+trimAll(form.acc4_bacno.value)+"|"+acc4_type+"|"+trimAll(form.acc4_amount.value)+"|"+trimAll(form.acc4_period.value)+"|"+trimAll(form.acc5_bname.value)+"|"+trimAll(form.acc5_name.value)+"|"+trimAll(form.acc5_brno.value)+"|"+trimAll(form.acc5_bacno.value)+"|"+acc5_type+"|"+trimAll(form.acc5_amount.value)+"|"+trimAll(form.acc5_period.value);
                                            break;
                                    }
                            }

                            return flag;  
                        }
                    }
                }
                else
                {
                    if(chkspchars() && isNumber_validchk(form.acc1_amount,"Amount in Account1") && isNumber_validchk(form.acc2_amount,"Amount in Account2") && isNumber_validchk(form.acc3_amount,"Amount in Account3") && isNumber_validchk(form.acc4_amount,"Amount in Account4") && isNumber_validchk(form.acc5_amount,"Amount in Account5"))
                    {
			for(i=0;i<form.elements.length;i++)
			{
				if(form.elements[i].name==com)
				{
					form.elements[i].value=form.deliverymethod.value+"|"+trimAll(form.acc1_bname.value)+"|"+trimAll(form.acc1_name.value)+"|"+trimAll(form.acc1_brno.value)+"|"+trimAll(form.acc1_bacno.value)+"|"+acc1_type+"|"+acc1_amount+"|"+acc1_period+"|"+trimAll(form.acc2_bname.value)+"|"+trimAll(form.acc2_name.value)+"|"+trimAll(form.acc2_brno.value)+"|"+trimAll(form.acc2_bacno.value)+"|"+acc2_type+"|"+trimAll(form.pickAuthorization.value)+"|"+trimAll(form.acc2_amount.value)+"|"+trimAll(form.acc2_period.value)+"|"+trimAll(form.acc3_bname.value)+"|"+trimAll(form.acc3_name.value)+"|"+trimAll(form.acc3_brno.value)+"|"+trimAll(form.acc3_bacno.value)+"|"+acc3_type+"|"+trimAll(form.acc3_amount.value)+"|"+trimAll(form.acc3_period.value)+"|"+trimAll(form.acc4_bname.value)+"|"+trimAll(form.acc4_name.value)+"|"+trimAll(form.acc4_brno.value)+"|"+trimAll(form.acc4_bacno.value)+"|"+acc4_type+"|"+trimAll(form.acc4_amount.value)+"|"+trimAll(form.acc4_period.value)+"|"+trimAll(form.acc5_bname.value)+"|"+trimAll(form.acc5_name.value)+"|"+trimAll(form.acc5_brno.value)+"|"+trimAll(form.acc5_bacno.value)+"|"+acc5_type+"|"+trimAll(form.acc5_amount.value)+"|"+trimAll(form.acc5_period.value)+"|"+trimAll(form.deposit_type_1.value)+"|"+trimAll(form.vendor_1.value)+"|"+trimAll(form.active_status_1.value)+"|"+trimAll(form.deposit_type_2.value)+"|"+trimAll(form.vendor_2.value)+"|"+trimAll(form.active_status_2.value)+"|"+trimAll(form.deposit_type_3.value)+"|"+trimAll(form.vendor_3.value)+"|"+trimAll(form.active_status_3.value);
					break;
				}
			}
			
			return flag;
                    }   
                }
            }
            else
            {   
                if(madison == "MADISON")
                {
                    var acc1_amount = "";
                    var acc1_period = "";
                    var madisonAcc1ChkFlag = true;
                }
                else
                {
                    var acc1_amount = form.acc1_amount.value;
                    var acc1_period = form.acc1_period.value;
                    var madisonAcc1ChkFlag = isNumber_validchk(form.acc1_amount,"Amount in Account1");
                }
                if(chkspchars() && madisonAcc1ChkFlag && accountchk() && isNumber_validchk(form.acc2_amount,"Amount in Account2") && isNumber_validchk(form.acc3_amount,"Amount in Account3") && isNumber_validchk(form.acc4_amount,"Amount in Account4") && isNumber_validchk(form.acc5_amount,"Amount in Account5"))
		{
		    // #Account3
                    var styleflag3 = false;
                    for(i = 18; i < 26; i++)
                    {
                        if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                               styleflag3 = true;
                        }
                    }

                    // # Account 4
                    var styleflag4 = false;
                    for(i = 26; i <34; i++)
                    {
                        if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                               styleflag4 = true;
                        }
                    }

                    // # Account 5
                    var styleflag5 = false;
                    for(i = 34; i <42; i++)
                    {
                        if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                               styleflag5 = true;
                        }
                    }
					if(accountAmountTypecheck(styleflag3,styleflag4,styleflag5))
                    {
	                    for(i=0;i<form.elements.length;i++)
	                    {
							if(form.elements[i].name==com)
							{
								form.elements[i].value=form.deliverymethod.value+"|"+trimAll(form.acc1_bname.value)+"|"+trimAll(form.acc1_name.value)+"|"+trimAll(form.acc1_brno.value)+"|"+trimAll(form.acc1_bacno.value)+"|"+acc1_type+"|"+acc1_amount+"|"+acc1_period+"|"+trimAll(form.acc2_bname.value)+"|"+trimAll(form.acc2_name.value)+"|"+trimAll(form.acc2_brno.value)+"|"+trimAll(form.acc2_bacno.value)+"|"+acc2_type+"|"+trimAll(form.pickAuthorization.value)+"|"+trimAll(form.acc2_amount.value)+"|"+trimAll(form.acc2_period.value)+"|"+trimAll(form.acc3_bname.value)+"|"+trimAll(form.acc3_name.value)+"|"+trimAll(form.acc3_brno.value)+"|"+trimAll(form.acc3_bacno.value)+"|"+acc3_type+"|"+trimAll(form.acc3_amount.value)+"|"+trimAll(form.acc3_period.value)+"|"+trimAll(form.acc4_bname.value)+"|"+trimAll(form.acc4_name.value)+"|"+trimAll(form.acc4_brno.value)+"|"+trimAll(form.acc4_bacno.value)+"|"+acc4_type+"|"+trimAll(form.acc4_amount.value)+"|"+trimAll(form.acc4_period.value)+"|"+trimAll(form.acc5_bname.value)+"|"+trimAll(form.acc5_name.value)+"|"+trimAll(form.acc5_brno.value)+"|"+trimAll(form.acc5_bacno.value)+"|"+acc5_type+"|"+trimAll(form.acc5_amount.value)+"|"+trimAll(form.acc5_period.value)+"|"+trimAll(form.deposit_type_1.value)+"|"+trimAll(form.vendor_1.value)+"|"+trimAll(form.active_status_1.value)+"|"+trimAll(form.deposit_type_2.value)+"|"+trimAll(form.vendor_2.value)+"|"+trimAll(form.active_status_2.value)+"|"+trimAll(form.deposit_type_3.value)+"|"+trimAll(form.vendor_3.value)+"|"+trimAll(form.active_status_3.value);

								break;
							}
	                    }
				
	                    return flag;
	                }
				}  
            }
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function doPage2()
{
	form=document.conreg;

	if(location.href.indexOf("/BSOS/Accounting/employees/")>0)
	{
		var accemprnm=form.accemprnm.value;
		var com="Acc_Emp_page2"+form.accemprnm.value;
	}
	else
	{
		var emprnm=form.emprnm.value;
		var com="HRM_EmpMngmt_page2"+form.emprnm.value;
	}

	if((madison == 'MADISON' || syncHRDefault == 'Y' || akkupayroll=='Y') && !formValidate('conreg'))
		return;

	if(form.addr.value!="edit")
	{
		checked=true;
		if((isNotEmpty(form.address1,"Address 1")) && isPipeCap(form.address1,"Address 1") && isPipeCap(form.address2,"Address 2") && (isNotEmpty(form.city,"City")) && (isNameSpace(form.city,"City")) && (isNotEmpty(form.zip,"Zip")) && isPipeCap(form.zip,"Zip") && (isNotEmpty(form.primary,"Primary Phone")) && (isPipeCap(form.primary,"Primary Phone")) && (isPipeCap(form.secondary,"Secondary Phone")) && (isPipeCap(form.mobile,"Mobile")) && (isPipeCap(form.fax,"Fax")) && (isPipeCap(form.hphone_extn,"Primary Phone Extension")) && (isPipeCap(form.wphone_extn,"Secondary Phone Extension")) && (isPipeCap(form.newstate,"Other State"))){
		if(symmetrypayroll == 'Y'){
			if((isNotEmpty(form.mail_address1,"Address 1")) && isPipeCap(form.mail_address1,"Address 1") && isPipeCap(form.mail_address2,"Address 2") && (isNotEmpty(form.mail_city,"City")) && (isNameSpace(form.mail_city,"City")) && (isNotEmpty(form.mail_zip,"Zip")) && isPipeCap(form.mail_zip,"Zip")){
				checked=true;
			}else{
				checked=false;
			}
		}else{
			checked=true;
		}
	}
		else
			checked=false;
		
		
		if(symmetrypayroll == 'Y' && checked)
			{
				$.ajax({
						cache: false,
						url: "/BSOS/Accounting/AkkuPaySS/locationCodes.php?loccode=loccheck",
						type: "POST",
						data: {address1:form.address1.value,address2:form.address2.value,city:form.city.value,state:form.state.value,zip:form.zip.value},
						async: false,
						success: function(data) 
						{
							if(data=='false'){
								alert("Provided address not matching!");
								checked=false;
							}else{
							var dloc = data.split("###");
							var errmsg = dloc[10].split("::");
							var stateabvr = dloc[2].split("^");
								if(dloc[9]!='SUCCESS')
								{ 
									
									if(confirm('Suggesting Address\n\nAddress: '+dloc[0]+','+dloc[1]+', '+dloc[11]+'-'+dloc[3]+', '+dloc[4]+'\n\nGeoCode: '+dloc[5]+'\n\nStatus Message: '+errmsg[1]+'Provided address Not matching do you want to override!'))
									{
										var statesabv = "FL,GA,IA,IL,IN,KS,KY,LA,MI,MO,NC,NJ,NY,OH,PA,TN,TX,VA,WI,CO";
										if(!statesabv.includes(dloc[3]))
										{
											alert('The adress is outside of the states we currently support. Please choose a different address.');
											checked=false;
										}
									$("#address1").val(dloc[0]);
									//$("#address2").val(dloc[0]);
									$("#city").val(dloc[1]);
									//$("#statecodeloc").val(dloc[2]);
									getstateid(stateabvr[0]);
									var stateab = document.getElementById("stateabrv").value;
									var stateabt = stateabvr[0]+'^'+stateab;
									$("#state").val(stateabt);
									$("#zip").val(dloc[4]);
									var locationcodeid = $("#locationCodeId").val(dloc[5]);
									}else{
										var locationcodeid = $("#locationCodeId").val(dloc[5]);
										$("#addchangecnl").val('cancel');
										//checked=true;
										alert('Please Enter Valid Address.');
										checked=false;
									} 
								}else{
									var locationcodeid = $("#locationCodeId").val(dloc[5]);
									checked=true;
								}
							}
						}
					});
			   var stateabv = form.statecodeloc.value;
				var dstate = stateabv.split("^");
				$.ajax({
					cache: false,
					url: "/BSOS/Accounting/AkkuPaySS/locationCodes.php?loccode=stateabvr",
					type: "POST",
					data: {stateabv:dstate[0],empuser:form.empuserid.value},
					async: false,
					success: function(data) 
					{
						if(data=='No'){
							//doPost(17,2);
							$("#statediff").val('yes');
							
						}
					}
				});
			}

		if(checked)
		{
			for(i=0;i<form.elements.length;i++)
			{
				if(form.elements[i].name==com)
				{
					var esms = "";
					if(form.esms.checked)
						esms = "Y";

					var asresident = "N";
					if(symmetrypayroll == 'Y'){
						if(form.as_resident.checked){
							asresident = "Y";		
							changeResident();						
						}
					}						

					form.elements[i].value=trimAll(form.address1.value)+"|"+trimAll(form.address2.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+form.zip.value+"|"+form.primary.value+"|"+form.secondary.value+"|"+form.mobile.value+"|"+form.fax.value+"|"+form.hphone_extn.value+"|"+form.wphone_extn.value+"|"+form.newstate.value+"|"+esms+"|"+form.smsprovider.value;
					if(symmetrypayroll == 'Y'){
						form.elements[i].value += "|"+trimAll(form.mail_address1.value)+"|"+trimAll(form.mail_address2.value)+"|"+trimAll(form.mail_city.value)+"|"+trimAll(form.state1.value)+"|"+trimAll(form.mail_country.value)+"|"+form.mail_zip.value+"|"+form.newstate1.value+"|"+asresident+"|"+form.locationCodeId.value+"|"+form.statediff.value;
					}
					pcou=form.elements[i].value.split("|").length;
					break;
				}
			}
			var ccou = (symmetrypayroll == 'Y') ? 25 : 15;
			if(pcou==ccou)
			{
				flag=true;
			}
			else
			{
				alert("You have entered pipes (|) in some of the fields, We don't allow pipes in any fields.\nPlease remove all the pipes in all the fields");
				flag=false;
			}
		}
		else
		{
			flag=false;
		}
		return flag;
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function doPage3()
{
	form=document.conreg;
	flag=true;
	return flag;
}

function doPage4()
{
	var form=document.conreg;
	flag=true;
	if(form.addr.value!="edit")
	{
		var emprnm = document.getElementById("emprnm").value;
		var emppage = "HRM_EmpMngmt_page4"+emprnm;
		var movetabs = "movetabs4"+emprnm;
		var str = geteditColSkills();
		document.getElementById(emppage).value = str;
		if (document.getElementById('newskillsflag').value == 'yes' || document.getElementById(movetabs).value!='') {		 
			document.getElementById(movetabs).value = "tabchanged";
		 }
		flag=true;
		return flag;
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
	}
	return flag;
}

function Dynaddpage4()
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var flag= false;
	var com="HRM_EmpMngmt_page4"+form.emprnm.value;
	if(form.years === undefined)
	{
		flag= true;
	}
	else
	{	
		if(isPipeCap(form.name,"Skill Name") && isNumber(form.years,"Year"))
		{
			flag= true;
			for(i=0;i<form.elements.length;i++)
			{
				if(form.elements[i].name==com)
				{
					if(form.elements[i].value=="")
						form.elements[i].value=trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
					else
						form.elements[i].value+="^"+trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
						
					break;
				}
			}
		}
	}
	return flag;
}

function doPage5()
{
	var form=document.conreg;
	flag=true;
	
	if(form.addr.value!="edit")
	{
		if(form.school.value!="" || form.city.value!="" || form.state.value!="" || form.countryid.value!=0 || form.levelid.value!="" || form.month.selectedIndex!=0 || form.year.selectedIndex!=0)
			flag=DynaddPage5();
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
	}
	return flag;
}

function DynaddPage5()
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page5"+form.emprnm.value;
	var dd=getValue(form.month)+"-"+getValue(form.year);
	var flag= false;
	if( form.school.value!="" || form.city.value!="" || form.state.value!="" || form.countryid.value!="0" || form.levelid.value!="" ||(form.month.selectedIndex!=0)||(form.year.selectedIndex!=0))
	{
		if ((getValue(form.year) == 0 && getValue(form.month) != 0) || (getValue(form.year) != 0 && getValue(form.month) == 0))
		{
			alert("Check the Completion Month & Year");
			return;	
		}
		
		if(isNameSpaceDot(form.school,"School or Program Name") && isNameSpace(form.city,"City") && isNameSpaceDot(form.state,"State") && isPipeCap(form.levelid,"Degree/Level Attained"))
		{
			flag =true;
			for(i=0;i<form.elements.length;i++)
			{
				if(form.elements[i].name==com)
				{
					if(form.elements[i].value == "")
						form.elements[i].value=trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
					else
						form.elements[i].value+="^"+trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
						
					break;
				}
			}
		}
	}
	return flag;
}


function doPage6()
{
	var form=document.conreg;
	flag=true;
	if(form.addr.value!="edit")
	{
		if(form.name.value!="" || form.city.value!="" || form.state.value!="" || form.country.value!="0" || form.title.value!="" || form.discription.value!="" || (form.startmonth.selectedIndex!=0)||(form.startyear.selectedIndex!=0) || (form.endmonth.selectedIndex!=0)||(form.endyear.selectedIndex!=0))
			flag = DynaddPage6();
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
	}
	return flag;
}

function DynaddPage6()
{
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page6"+form.emprnm.value;
	var list="";
	var flag=false;
	if(form.name.value!="" || form.city.value!="" || form.state.value!="" || form.country.value!="0" || form.title.value!="" || form.discription.value!="" || form.compensation_beginning.value!="" || form.leaving_reason.value!="" || (form.startmonth.selectedIndex!=0)||(form.startyear.selectedIndex!=0) || (form.endmonth.selectedIndex!=0)||(form.endyear.selectedIndex!=0))
	{
	if(isNameSpace(form.city,"City") && isNameSpaceDot(form.state,"State") &&  isNameSpaceCama(form.title,"Title") && isPipeCap(form.name,"Company Name") && isPipeCap(form.discription,"Description"))
	{
	   if(getValue(form.endmonth)!='Present')
		if ((getValue(form.startyear) == 0 && getValue(form.startmonth) != 0) || (getValue(form.startyear) != 0 && getValue(form.startmonth) == 0))
		{
			alert("Check the Start Date selected");
			return;	
		}
		else if ((getValue(form.endyear) == 0 && getValue(form.endmonth) != 0) || (getValue(form.endyear) != 0 && getValue(form.endmonth) == 0))
		{
			alert("Check the End Date selected");
			return;	
		}
		else if(parseInt(getValue(form.startyear)+check(getValue(form.startmonth)))>parseInt(getValue(form.endyear)+check(getValue(form.endmonth))))
	        {
			alert("End Date should be greater than Start Date");
			return;	
	        }
	
		dd=getValue(form.startmonth)+"-"+getValue(form.startyear);
		mm=getValue(form.endmonth)+"-"+getValue(form.endyear);
		list=trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"||"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
	}
	}
	if(list!="")
	{
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(form.elements[i].value!="")
				{
					form.elements[i].value+="^"+list;
				}
				else
				{
					form.elements[i].value=list;
				}
				
				break;
			}
		}
		flag = true;
	}
	 return flag;
}

function doPage7()
{
	form=document.conreg;
	flag=true;
	return flag;
}

function doPage8()
{
	var form=document.conreg;
	if(form.addr.value!="edit")
	{
		form.page8.value=getValue1(form.type)+"|"+getValue1(form.status)+"||||";
		pcou=form.page8.value.split("|").length;
		if(pcou==9)
		{
			flag=true;
		}
		else
		{
			alert("You have entered pipes (|) in some of the fields, We don't allow pipes in any fields.\nPlease remove all the pipes in all the fields");
			flag=false;
		}
		return flag;
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function doPage9()
{
	var form	= document.conreg;
	var emprnm	= form.emprnm.value;
	var com		= "HRM_EmpMngmt_page9"+form.emprnm.value;
	var availsess	= "availsess"+form.emprnm.value;

	if(form.type.checked) {
		dd						= "immediate";
		document.getElementById(availsess).value	= dd+"|";
	}
	else {
		if(form.amonth.value != 0 && form.aday.value != 0 && form.ayear.value != 0) {

			dd						= getValue(form.amonth)+"-"+getValue(form.aday)+"-"+getValue(form.ayear);
			document.getElementById(availsess).value	= "other|"+dd;
		}
		else {
			alert("Please select a valid Availability Date");
			return;
		}
	}

	if(form.addr.value != "edit")
	{
		if(isPipeCap(form.statusother,"Status Other"))
		{
			for(i = 0; i<form.elements.length; i++)
			{
				if(form.elements[i].name == com)
				{
					form.elements[i].value	= getRadValue(form.status)+"|"+trimAll(form.statusother.value)+"|"+dd;
					pcou			= form.elements[i].value.split("|").length;
					break;
				}
			}
			
			flag	= true;
			return flag;
		}
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag	= false;
		return flag;
	}

}

function doPage25()
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page25"+form.emprnm.value;

    ad=getVal(form.smonth)+"-"+getVal(form.sday)+"-"+getVal(form.syear);
	sd=getVal(form.dmonth)+"-"+getVal(form.dday)+"-"+getVal(form.dyear);

	if(form.addr.value!="edit")
	{
        
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				form.elements[i].value=ad+"|"+sd;
				break;
			}
		}
		
		flag=true;
		return flag;
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}

}
function doPage10()
{
	form=document.conreg;
	flag=true;
	if(form.addr.value!="edit")
	{
		if(form.companyname.value!="" || form.aff.value != "" || form.smonth.selectedIndex != 0 || form.syear.selectedIndex != 0 || form.pmonth.selectedIndex != 0 || form.pyear.selectedIndex != 0)
			flag = DynaddPage10();
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
	}
	return flag;
}

function DynaddPage10()
{
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page10"+form.emprnm.value;
	var flag = false;
	var list="";
	if(isNameSpaceCama(form.companyname,"Name")  && isNameSpaceCamaDot(form.aff,"Role"))
	{
		if ((getValue(form.syear) == 0 && getValue(form.smonth) != 0) || (getValue(form.syear) != 0 && getValue(form.smonth) == 0))
		{
			alert("Check the Start Date selected");
			return;	
		}
		else if ((getValue(form.pyear) == 0 && getValue(form.pmonth) != 0) || (getValue(form.pyear) != 0 && getValue(form.pmonth) == 0))
		{
			alert("Check the End Date selected");
			return;	
		}
		else if(parseInt(getValue(form.syear)+check(getValue(form.smonth)))>parseInt(getValue(form.pyear)+check(getValue(form.pmonth))))
		{
			alert("End Date should be greater than Start Date");
			return;	
		}
		
		dd=getValue(form.smonth)+"-"+getValue(form.syear);
		mm=getValue(form.pmonth)+"-"+getValue(form.pyear);
		list=trimAll(form.companyname.value)+"|"+trimAll(form.aff.value)+"|"+dd+"|"+mm;
	}
	if(list!="")
	{
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(form.elements[i].value!="")
				{
					form.elements[i].value+="^"+list;
				}
				else
				{
					form.elements[i].value=list;
				}
				
				break;
			}
		}
		flag = true;
	}
	return flag;
}

function doPage11()
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page111"+form.emprnm.value;
	if(isPipeCap(form.addinfo,"Additional Information"))
	{
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				form.elements[i].value = form.addinfo.value;
				break;
			}
		}
		
		flag=true;
		return flag;
	}
}

function doPage12()
{
	form=document.conreg;
	flag=true;
	
	if(form.addr.value!="edit")
	{
		if(form.name.value !="" || form.company.value !="" || form.title.value !="" || form.phone.value !="" || form.phone1.value !="" || form.phone2.value !="" || form.phone3.value !="" || form.email.value !="" || form.secondary.value !="" || form.secondary1.value !="" || form.secondary2.value !=""|| form.secondary3.value !="" || form.mobile.value !="" || form.mobile1.value !="" || form.mobile2.value !="" || form.notes.value !="" || form.download_path.value !="")
		{
			alert("Click on Reset Form to clear data or Update/Add References to Save before moving to another tab.");
			flag = false;
		}
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
	}
	return flag;
}


function DynaddPage12() 
{
	var checked=true;
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page12"+form.emprnm.value;
	var list="";
	var flag = false;
	if(isnumchardotspace(form.name,"Name") && isPipeCap(form.company,"Company") && isnumchardotspace(form.title,"Tile") && isNumber(form.phone,"Phone") && isNumber(form.phone1,"Phone") && isNumber(form.phone2,"Phone") && isNumber(form.phone3,"Phone") && chkemail(form.email) && (isNumber(form.secondary,"Secondary Phone")) && (isNumber(form.secondary1,"Secondary Phone")) && (isNumber(form.secondary2,"Secondary Phone")) && (isNumber(form.secondary3,"Secondary Phone")) && (isNumber(form.mobile,"Mobile")) && (isNumber(form.mobile1,"Mobile")) && (isNumber(form.mobile2,"Mobile")) && (form.notes,"notes") && (form.download_path,"Download Path") )
	{
		if(( form.secondary.value!="" || form.secondary1.value!="" || form.secondary2.value!="" || form.secondary3.value!="") )
		{
			if((chklen1(form.secondary,"Secondary Phone"))&&(chklen1(form.secondary1,"Secondary Phone"))&&(chklen2(form.secondary2,"Secondary Phone")) )
			{
				checked=true;
			}
			else
			{
				checked=false;
			}
		}
		if(( form.mobile.value!="" || form.mobile1.value!="" || form.mobile2.value!="" ) && checked)
		{
			if( chklen1(form.mobile,"Mobile") && chklen1(form.mobile1,"Mobile") && chklen2(form.mobile2,"Mobile"))
			{
				if(checked)
					checked=true;
				else
					checked=false;
			}
			else
			{
				checked=false;
			}
		}
		if(checked)
		{
			list=trimAll(form.name.value)+"|"+trimAll(form.company.value)+"|"+trimAll(form.title.value)+"|"+form.phone.value+"-"+form.phone1.value+"-"+form.phone2.value+"-"+form.phone3.value+"|"+trimAll(form.email.value)+"|"+getRadValue(form.relation)+"|"+form.secondary.value+"-"+form.secondary1.value+"-"+form.secondary2.value+"-"+form.secondary3.value+"|"+form.mobile.value+"-"+form.mobile1.value+"-"+form.mobile2.value+"|"+trimAll(form.notes.value)+"|"+trimAll(form.download_path.value);
		}
	}
	
	if(list!="")
	{
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(form.elements[i].value!="")
				{
					form.elements[i].value+="^"+list;
				}
				else
				{
					form.elements[i].value=list;
				}
				break;
			}
		}
		flag = true;
	}
	return flag;
}

function doSPage1()
{
	form=document.conreg;
	try
	{
		//this is for Accounting consulting vendors Edit candidates--Kiran
		if(window.opener.location.href.indexOf('Accounting/clients/addacccompany.php')!=-1)
		{
			var companyinfo = window.opener.document.markreqman.companyinfo.value;
			var Rnd = window.opener.document.markreqman.Rnd.value;		
			form.companyinfo.value = companyinfo;		
			form.Rnd.value = Rnd;
		}
	}
	catch(e)
	{
	}
	
	if(location.href.indexOf("/BSOS/Accounting/employees/")>0)
	{
		var accemprnm=form.accemprnm.value;
		var com="Acc_Emp_page1"+form.accemprnm.value;
	}
	else
	{
		var emprnm=form.emprnm.value;
		var com="HRM_EmpMngmt_page1"+form.emprnm.value;
	}
	
	form.dest.value=1;
	form.url.value=1;
	form.action="saveconsultreg.php";
	
	//Checking SyncHR Manadatory Fields is enabled or not
	if (syncHRDefault == 'Y' || akkupayroll=='Y') {
		var synchr_variable = isNotEmpty(form.firstname,"First Name") && isSpl(form.firstname,"First Name")&& isSpace(form.firstname,"First Name") && isNotEmpty(form.lastname,"Last Name") && isNotEmpty(form.email,'Primary E-mail') && chkemail(form.email) && chkemail(form.aemail) && chkemail(form.oemail) && isSpace(form.lastname,"Last Name") && isSpl(form.middleinitial,"Middle") &&  isSpl(form.lastname,"Last Name") && isPipeCap(form.prtitle,"Profile Title");
	}
	else {
		var synchr_variable = isNotEmpty(form.firstname,"First Name") && isSpl(form.firstname,"First Name")&& isSpace(form.firstname,"First Name") && isNotEmpty(form.lastname,"Last Name") && chkemail(form.email) && chkemail(form.aemail) && chkemail(form.oemail) && isSpace(form.lastname,"Last Name") && isSpl(form.middleinitial,"Middle") &&  isSpl(form.lastname,"Last Name") && isPipeCap(form.prtitle,"Profile Title");
	}
	
	if(synchr_variable)
	{
	 	var mailid=(form.email.value).replace(new RegExp('\\s',"gi"),'');
		var amailid=(form.aemail.value).replace(new RegExp('\\s',"gi"),'');
		var omailid=(form.oemail.value).replace(new RegExp('\\s',"gi"),'');
		
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				form.elements[i].value=trimAll(form.firstname.value)+"|"+trimAll(form.middleinitial.value)+"|"+trimAll(form.lastname.value)+"|"+trimAll(mailid)+"|"+trimAll(form.prtitle.value)+"|"+trimAll(amailid)+"|"+trimAll(omailid);
				pcou=form.elements[i].value.split("|").length;
				break;
			}
		}
		
		if(pcou!=7)
		{
			alert("You have entered pipes (|) in some of the fields, We don't allow pipes in any fields.\nPlease remove all the pipes in all the fields");
			return;
		}
		form.submit();
	}
}

function doSPage24()
{
	form=document.conreg;
        
        if(location.href.indexOf("/BSOS/Accounting/employees/")>0)
	{
		var accemprnm=form.accemprnm.value;
		var com="Acc_Emp_page24"+form.accemprnm.value;
	}
	else
	{
		var emprnm=form.emprnm.value;
                var com="HRM_EmpMngmt_page24"+form.emprnm.value;
	}
                
        if(document.getElementById('Acc1_type_checking').checked)
           acc1_type = "CHECKING";
          else 
           acc1_type = "SAVINGS";

          if(document.getElementById('Acc2_type_checking').checked)
           acc2_type = "CHECKING";
          else 
           acc2_type = "SAVINGS";

         if(document.getElementById('Acc3_type_checking').checked)
           acc3_type = "CHECKING";
          else 
           acc3_type = "SAVINGS";
       
        if(document.getElementById('Acc4_type_checking').checked){
            acc4_type = "CHECKING";
        }else { 
            acc4_type = "SAVINGS";
        }
       
       
        if(document.getElementById('Acc5_type_checking').checked){
            acc5_type = "CHECKING";
        }else {
            acc5_type = "SAVINGS";
        }
        if(tricom_rep=='Y'){
				var delMethods = document.getElementsByName("deliverymethod")[0];
				var delMethod_txts = delMethods.options[delMethods.selectedIndex].text;
				if(delMethod_txts == 'Direct Deposit'){
					if(form.acc1_brno.value!=''){
						document.getElementById("mark_star1").innerHTML = '<font style="color:red">*</font>';
						document.getElementById("mark_star11").innerHTML = '<font style="color:red">*</font>';
						if(form.acc1_bname.value==''){
							alert('Please enter Bank Name for Account 1');
							return;
						}
						if(form.acc1_bacno.value==''){
							alert('Please enter Bank Account Number for Account 1');
							return;
						}
					}
					if(form.acc2_brno.value!=''){
						document.getElementById("mark_star2").innerHTML = '<font style="color:red">*</font>';
						document.getElementById("mark_star21").innerHTML = '<font style="color:red">*</font>';
						if(form.acc2_bname.value==''){
							alert('Please enter Bank Name for Account 2');
							return;
						}
						if(form.acc2_bacno.value==''){
							alert('Please enter Bank Account Number for Account 2');
							return;
						}
					}
					if(form.acc3_brno.value!=''){
						document.getElementById("mark_star3").innerHTML = '<font style="color:red">*</font>';
						document.getElementById("mark_star31").innerHTML = '<font style="color:red">*</font>';
						if(form.acc3_bname.value==''){
							alert('Please enter Bank Name for Account 3');
							return;
						}
						if(form.acc3_bacno.value==''){
							alert('Please enter Bank Account Number for Account 3');
							return;
						}
					}
					//doSPage25();
					
				}
				//form.submit();
			}


		var flag_pay_card_1 = false;
        var flag_pay_card_2 = false;
        var flag_pay_card_3 = false;

        if(akkupayroll=='Y')
        {   
            var acc1_amount = form.acc1_amount.value;
            var acc1_period = form.acc1_period.value;
            var akkupayAccChkFlag =true;
            var chkflag = "no";
            for (var i=0; i < form.deliverymethod.options.length; i++) 
            {
				if(form.deliverymethod.options[i].selected)
				{
					if(form.deliverymethod.options[i].text == "Direct Deposit")
						chkflag = "yes";
				}
            }

            if(chkflag == "yes")
            {
            	
            	if(form.acc1_bname.value!="" || form.acc1_name.value!="" || form.acc1_brno.value!="" || form.acc1_bacno.value!="" || (form.acc1_amount.value != "" && form.acc1_amount.value != "0.00" && form.acc1_amount.value != "0") || form.acc2_bname.value!="" || form.acc2_name.value!="" || form.acc2_brno.value!="" || form.acc2_bacno.value!="" || form.pickAuthorization.value!="" || (form.acc2_amount.value != "" && form.acc2_amount.value != "0.00" && form.acc2_amount.value != "0") || form.acc3_bname.value!="" || form.acc3_name.value!="" || form.acc3_brno.value!="" || form.acc3_bacno.value!="" || (form.acc3_amount.value != "" && form.acc3_amount.value != "0.00" && form.acc3_amount.value != "0")  || form.acc4_bname.value!="" || form.acc4_name.value!="" || form.acc4_brno.value!="" || form.acc4_bacno.value!="" || (form.acc4_amount.value != "" && form.acc4_amount.value != "0.00" && form.acc4_amount.value != "0")  || form.acc5_bname.value!="" || form.acc5_name.value!="" || form.acc5_brno.value!="" || form.acc5_bacno.value!="" || (form.acc5_amount.value != "" && form.acc5_amount.value != "0.00" && form.acc5_amount.value != "0"))
                {
                    //#Account1
                    for(var i=0; i < form.deposit_type_1.options.length; i++) 
			        {
			            if(form.deposit_type_1.options[i].selected)
			            {
			            	if(form.deposit_type_1.options[i].value == "PAYCARD")
			            	{
			            		flag_pay_card_1 = true;
			                	console.log('1 PAYCARD true');
			            	}
			            }
			        }

			        if(flag_pay_card_1)
			        {
			        	akkupayAccChkFlag = true;
			        }
                    else if(form.acc1_brno.value!="" || form.acc1_bacno.value!="" || (form.acc1_amount.value != "" && form.acc1_amount.value != "0.00" && form.acc1_amount.value != "0") )
                    {
                        if(isNotSet(form.acc1_brno,"Bank Routing Number in Account1") && validRoutingNumber(form.acc1_brno,"Bank Routing Number in Account1") && isNotSet(form.acc1_bacno,"Bank Account Number in Account1") && isbankAcountNumberValid(form.acc1_bacno,"Bank Account Number in Account1") && isNotSetAmount(form.acc1_amount,"Amount in Account1") && isNumber_validchk(form.acc1_amount,"Amount in Account1")){
                          akkupayAccChkFlag = true;
                        }else{
                           akkupayAccChkFlag = false; 
                        }  
                    }
                    
                    //#Account2
                    for(var i=0; i < form.deposit_type_2.options.length; i++) 
			        {
			            if(form.deposit_type_2.options[i].selected)
			            {
			            	if(form.deposit_type_2.options[i].value == "PAYCARD")
			            	{
			            		flag_pay_card_2 = true;
			                	console.log('2 PAYCARD true');
			            	}
			            }
			        }

			        if(flag_pay_card_2)
			        {
			        	akkupayAccChkFlag = true;
			        }
                    else if(akkupayAccChkFlag)
                    {
                        if( form.acc2_brno.value!="" || form.acc2_bacno.value!="" || (form.acc2_amount.value != "" && form.acc2_amount.value != "0.00" && form.acc2_amount.value != "0") ){
                            if(isNotSet(form.acc2_brno,"Bank Routing Number in Account2") && validRoutingNumber(form.acc2_brno,"Bank Routing Number in Account2") && isNotSet(form.acc2_bacno,"Bank Account Number in Account2") && isbankAcountNumberValid(form.acc2_bacno,"Bank Account Number in Account2") && isNotSetAmount(form.acc2_amount,"Amount in Account2") && isNumber_validchk(form.acc2_amount,"Amount in Account2")){

                                akkupayAccChkFlag = true;
                            }else{
                                akkupayAccChkFlag = false; 
                            }
                        }
                    }
                    // #Account3
                    var styleflag3 = false;
                    for(i = 18; i < 26; i++)
                    {
                        if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                               styleflag3 = true;
                        }
                    }
                    if(styleflag3)
                    {   
                        if(akkupayAccChkFlag){

                        	for(var i=0; i < form.deposit_type_3.options.length; i++) 
					        {
					            if(form.deposit_type_3.options[i].selected)
					            {
					            	if(form.deposit_type_3.options[i].value == "PAYCARD")
					            	{
					            		flag_pay_card_3 = true;
					                	console.log('3 PAYCARD true');
					            	}
					            }
					        }

					        if(flag_pay_card_3)
					        {
					        	akkupayAccChkFlag = true;
					        }
		                    else if( form.acc3_brno.value!="" || form.acc3_bacno.value!="" || (form.acc3_amount.value != "" && form.acc3_amount.value != "0.00" && form.acc3_amount.value != "0")){
                                if(isNotSet(form.acc3_brno,"Bank Routing Number in Account3") && validRoutingNumber(form.acc3_brno,"Bank Routing Number in Account3") && isNotSet(form.acc3_bacno,"Bank Account Number in Account3") && isbankAcountNumberValid(form.acc3_bacno,"Bank Account Number in Account3") && isNotSetAmount(form.acc3_amount,"Amount in Account3") && isNumber_validchk(form.acc3_amount,"Amount in Account3")){
                                    akkupayAccChkFlag= true;
                                }else{
                                    akkupayAccChkFlag = false; 
                                }
                            }
                        }
                    }
                    
                    
                    // # Account 4
                    var styleflag4 = false;
                    for(i = 26; i <34; i++)
                    {
                        if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                               styleflag4 = true;
                        }
                    }
                    if(styleflag4)
                    {   
                        if(akkupayAccChkFlag){
                            if( form.acc4_brno.value!="" || form.acc4_bacno.value!="" || (form.acc4_amount.value != "" && form.acc4_amount.value != "0.00" && form.acc4_amount.value != "0")){
                                if(isNotSet(form.acc4_brno,"Bank Routing Number in Account4") && validRoutingNumber(form.acc4_brno,"Bank Routing Number in Account4") && isNotSet(form.acc4_bacno,"Bank Account Number in Account4") && isbankAcountNumberValid(form.acc4_bacno,"Bank Account Number in Account4") && isNotSetAmount(form.acc4_amount,"Amount in Account4") && isNumber_validchk(form.acc4_amount,"Amount in Account4")){
                                    akkupayAccChkFlag= true;
                                }else{
                                    akkupayAccChkFlag = false; 
                                }
                            }
                        }
                    }
                    
                    // # Account 5
                    var styleflag5 = false;
                    for(i = 34; i <42; i++)
                    {
                        if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                               styleflag5 = true;
                        }
                    }
                    if(styleflag5)
                    {   
                        if(akkupayAccChkFlag){
                            if( form.acc5_brno.value!="" || form.acc5_bacno.value!="" || (form.acc5_amount.value != "" && form.acc5_amount.value != "0.00" && form.acc5_amount.value != "0")){
                                if(isNotSet(form.acc5_brno,"Bank Routing Number in Account5") && validRoutingNumber(form.acc5_brno,"Bank Routing Number in Account5") && isNotSet(form.acc5_bacno,"Bank Account Number in Account5") && isbankAcountNumberValid(form.acc5_bacno,"Bank Account Number in Account5") && isNotSetAmount(form.acc5_amount,"Amount in Account5") && isNumber_validchk(form.acc5_amount,"Amount in Account5")){
                                    akkupayAccChkFlag= true;
                                }else{
                                    akkupayAccChkFlag = false; 
                                }
                            }
                        }
                    }
                    
                    
                    if(akkupayAccChkFlag){
                        if(accountAmountTypecheck(styleflag3,styleflag4,styleflag5))
                        {
                            if(form.deliverymethod.value!="" || form.acc1_bname.value!="" || form.acc1_name.value!="" || form.acc1_brno.value!="" || form.acc1_bacno.value!="" || acc1_amount != "" || acc1_period != "" || form.acc2_bname.value!="" || form.acc2_name.value!="" || form.acc2_brno.value!="" || form.acc2_bacno.value!="" || form.Acc2_type.value!="" || form.pickAuthorization.value!="" || form.acc2_amount.value!="" || form.acc2_period.value!="" || form.acc3_bname.value!="" || form.acc3_name.value!="" || form.acc3_brno.value!="" || form.acc3_bacno.value!="" || form.acc3_amount.value!="" || form.acc3_period.value!="" || form.acc4_bname.value!="" || form.acc4_name.value!="" || form.acc4_brno.value!="" || form.acc4_bacno.value!="" || form.acc4_amount.value!="" || form.acc4_period.value!=""  || form.acc5_bname.value!="" || form.acc5_name.value!="" || form.acc5_brno.value!="" || form.acc5_bacno.value!="" || form.acc5_amount.value!="" || form.acc5_period.value!="")
                            {  
                                for(i=0;i<form.elements.length;i++)
                                {
                                        if(form.elements[i].name==com)
                                        {
                                                form.elements[i].value=form.deliverymethod.value+"|"+trimAll(form.acc1_bname.value)+"|"+trimAll(form.acc1_name.value)+"|"+trimAll(form.acc1_brno.value)+"|"+trimAll(form.acc1_bacno.value)+"|"+acc1_type+"|"+trimAll(acc1_amount)+"|"+trimAll(acc1_period)+"|"+trimAll(form.acc2_bname.value)+"|"+trimAll(form.acc2_name.value)+"|"+trimAll(form.acc2_brno.value)+"|"+trimAll(form.acc2_bacno.value)+"|"+acc2_type+"|"+trimAll(form.pickAuthorization.value)+"|"+trimAll(form.acc2_amount.value)+"|"+trimAll(form.acc2_period.value)+"|"+trimAll(form.acc3_bname.value)+"|"+trimAll(form.acc3_name.value)+"|"+trimAll(form.acc3_brno.value)+"|"+trimAll(form.acc3_bacno.value)+"|"+acc3_type+"|"+trimAll(form.acc3_amount.value)+"|"+trimAll(form.acc3_period.value)+"|"+trimAll(form.acc4_bname.value)+"|"+trimAll(form.acc4_name.value)+"|"+trimAll(form.acc4_brno.value)+"|"+trimAll(form.acc4_bacno.value)+"|"+acc4_type+"|"+trimAll(form.acc4_amount.value)+"|"+trimAll(form.acc4_period.value)+"|"+trimAll(form.acc5_bname.value)+"|"+trimAll(form.acc5_name.value)+"|"+trimAll(form.acc5_brno.value)+"|"+trimAll(form.acc5_bacno.value)+"|"+acc5_type+"|"+trimAll(form.acc5_amount.value)+"|"+trimAll(form.acc5_period.value)+"|"+trimAll(form.deposit_type_1.value)+"|"+trimAll(form.vendor_1.value)+"|"+trimAll(form.active_status_1.value)+"|"+trimAll(form.deposit_type_2.value)+"|"+trimAll(form.vendor_2.value)+"|"+trimAll(form.active_status_2.value)+"|"+trimAll(form.deposit_type_3.value)+"|"+trimAll(form.vendor_3.value)+"|"+trimAll(form.active_status_3.value);
                                                break;
                                        }
                                } 
                                form.dest.value=24;
                                form.url.value=24;
                                form.action="saveconsultreg.php";
                                form.submit();
                            }
                            else{
                                form.dest.value=24;
                                form.url.value=24;
                                form.action="saveconsultreg.php";
                                form.submit();
                            }
                        }
                    }
                }
                else 
                {
                    form.dest.value=24;
                    form.url.value=24;
                    form.action="saveconsultreg.php";
                    form.submit();
                }
            }
            else 
            {
                if(chkspchars() && isNumber_validchk(form.acc1_amount,"Amount in Account1") && isNumber_validchk(form.acc2_amount,"Amount in Account2") && isNumber_validchk(form.acc3_amount,"Amount in Account3")  && isNumber_validchk(form.acc4_amount,"Amount in Account4")  && isNumber_validchk(form.acc5_amount,"Amount in Account5"))
                {
                	// #Account3
                    var styleflag3 = false;
                    for(i = 18; i < 26; i++)
                    {
                        if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                               styleflag3 = true;
                        }
                    }

                    // # Account 4
                    var styleflag4 = false;
                    for(i = 26; i <34; i++)
                    {
                        if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                               styleflag4 = true;
                        }
                    }

                    // # Account 5
                    var styleflag5 = false;
                    for(i = 34; i <42; i++)
                    {
                        if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                               styleflag5 = true;
                        }
                    }

                	if(accountAmountTypecheck(styleflag3,styleflag4,styleflag5)) 
                    {
	                    if(form.deliverymethod.value!="" || form.acc1_bname.value!="" || form.acc1_name.value!="" || form.acc1_brno.value!="" || form.acc1_bacno.value!="" || acc1_amount != "" || acc1_period != "" || form.acc2_bname.value!="" || form.acc2_name.value!="" || form.acc2_brno.value!="" || form.acc2_bacno.value!="" || form.Acc2_type.value!="" || form.pickAuthorization.value!="" || form.acc2_amount.value!="" || form.acc2_period.value!="" || form.acc3_bname.value!="" || form.acc3_name.value!="" || form.acc3_brno.value!="" || form.acc3_bacno.value!="" || form.acc3_amount.value!="" || form.acc3_period.value!=""  || form.acc4_bname.value!="" || form.acc4_name.value!="" || form.acc4_brno.value!="" || form.acc4_bacno.value!="" || form.acc4_amount.value!="" || form.acc4_period.value!=""  || form.acc5_bname.value!="" || form.acc5_name.value!="" || form.acc5_brno.value!="" || form.acc5_bacno.value!="" || form.acc5_amount.value!="" || form.acc5_period.value!="")
	                    {
	                        for(i=0;i<form.elements.length;i++)
	                        {
	                                if(form.elements[i].name==com)
	                                {
	                                        form.elements[i].value=form.deliverymethod.value+"|"+trimAll(form.acc1_bname.value)+"|"+trimAll(form.acc1_name.value)+"|"+trimAll(form.acc1_brno.value)+"|"+trimAll(form.acc1_bacno.value)+"|"+acc1_type+"|"+trimAll(acc1_amount)+"|"+trimAll(acc1_period)+"|"+trimAll(form.acc2_bname.value)+"|"+trimAll(form.acc2_name.value)+"|"+trimAll(form.acc2_brno.value)+"|"+trimAll(form.acc2_bacno.value)+"|"+acc2_type+"|"+trimAll(form.pickAuthorization.value)+"|"+trimAll(form.acc2_amount.value)+"|"+trimAll(form.acc2_period.value)+"|"+trimAll(form.acc3_bname.value)+"|"+trimAll(form.acc3_name.value)+"|"+trimAll(form.acc3_brno.value)+"|"+trimAll(form.acc3_bacno.value)+"|"+acc3_type+"|"+trimAll(form.acc3_amount.value)+"|"+trimAll(form.acc3_period.value)+"|"+trimAll(form.acc4_bname.value)+"|"+trimAll(form.acc4_name.value)+"|"+trimAll(form.acc4_brno.value)+"|"+trimAll(form.acc4_bacno.value)+"|"+acc4_type+"|"+trimAll(form.acc4_amount.value)+"|"+trimAll(form.acc4_period.value)+"|"+trimAll(form.acc5_bname.value)+"|"+trimAll(form.acc5_name.value)+"|"+trimAll(form.acc5_brno.value)+"|"+trimAll(form.acc5_bacno.value)+"|"+acc5_type+"|"+trimAll(form.acc5_amount.value)+"|"+trimAll(form.acc5_period.value)+"|"+trimAll(form.deposit_type_1.value)+"|"+trimAll(form.vendor_1.value)+"|"+trimAll(form.active_status_1.value)+"|"+trimAll(form.deposit_type_2.value)+"|"+trimAll(form.vendor_2.value)+"|"+trimAll(form.active_status_2.value)+"|"+trimAll(form.deposit_type_3.value)+"|"+trimAll(form.vendor_3.value)+"|"+trimAll(form.active_status_3.value);
	                                        break;
	                                }
	                        } 

	                        form.dest.value=24;
	                        form.url.value=24;
	                        form.action="saveconsultreg.php";
	                        form.submit();
	                    }
	                    else
	                    {
	                        form.dest.value=24;
	                        form.url.value=24;
	                        form.action="saveconsultreg.php";
	                        form.submit();

	                    }
	                }
                } 
            }
        }
        else
        {
            if(madison == "MADISON")
            {
				var acc1_amount = "";
				var acc1_period = "";
				var madisonAcc1ChkFlag = true;
            }
            else
            {
				var acc1_amount = form.acc1_amount.value;
				var acc1_period = form.acc1_period.value;
				var madisonAcc1ChkFlag = isNumber_validchk(form.acc1_amount,"Amount in Account1");
                
            }
            if(chkspchars() && madisonAcc1ChkFlag && isNumber_validchk(form.acc2_amount,"Amount in Account2") && isNumber_validchk(form.acc3_amount,"Amount in Account3") && isNumber_validchk(form.acc4_amount,"Amount in Account4") && isNumber_validchk(form.acc5_amount,"Amount in Account5") && accountchk())
            {
            	// #Account3
                var styleflag3 = false;
                for(i = 18; i < 26; i++)
                {
                    if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                           styleflag3 = true;
                    }
                }

                // # Account 4
                var styleflag4 = false;
                for(i = 26; i <34; i++)
                {
                    if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                           styleflag4 = true;
                    }
                }

                // # Account 5
                var styleflag5 = false;
                for(i = 34; i <42; i++)
                {
                    if(document.getElementById('DirectDepositBlock'+i).style.display==''){
                           styleflag5 = true;
                    }
                }

            	if(accountAmountTypecheck(styleflag3,styleflag4,styleflag5)) 
                {
		            if(form.deliverymethod.value!="" || form.acc1_bname.value!="" || form.acc1_name.value!="" || form.acc1_brno.value!="" || form.acc1_bacno.value!="" || acc1_amount != "" || acc1_period != "" || form.acc2_bname.value!="" || form.acc2_name.value!="" || form.acc2_brno.value!="" || form.acc2_bacno.value!="" || form.Acc2_type.value!="" || form.pickAuthorization.value!="" || form.acc2_amount.value!="" || form.acc2_period.value!="" || form.acc3_bname.value!="" || form.acc3_name.value!="" || form.acc3_brno.value!="" || form.acc3_bacno.value!="" || form.acc3_amount.value!="" || form.acc3_period.value!=""  || form.acc4_bname.value!="" || form.acc4_name.value!="" || form.acc4_brno.value!="" || form.acc4_bacno.value!="" || form.acc4_amount.value!="" || form.acc4_period.value!="" || form.acc5_bname.value!="" || form.acc5_name.value!="" || form.acc5_brno.value!="" || form.acc5_bacno.value!="" || form.acc5_amount.value!="" || form.acc5_period.value!="")
		            {


		                for(i=0;i<form.elements.length;i++)
		                {
		                        if(form.elements[i].name==com)
		                        {
		                                form.elements[i].value=form.deliverymethod.value+"|"+trimAll(form.acc1_bname.value)+"|"+trimAll(form.acc1_name.value)+"|"+trimAll(form.acc1_brno.value)+"|"+trimAll(form.acc1_bacno.value)+"|"+acc1_type+"|"+trimAll(acc1_amount)+"|"+trimAll(acc1_period)+"|"+trimAll(form.acc2_bname.value)+"|"+trimAll(form.acc2_name.value)+"|"+trimAll(form.acc2_brno.value)+"|"+trimAll(form.acc2_bacno.value)+"|"+acc2_type+"|"+trimAll(form.pickAuthorization.value)+"|"+trimAll(form.acc2_amount.value)+"|"+trimAll(form.acc2_period.value)+"|"+trimAll(form.acc3_bname.value)+"|"+trimAll(form.acc3_name.value)+"|"+trimAll(form.acc3_brno.value)+"|"+trimAll(form.acc3_bacno.value)+"|"+acc3_type+"|"+trimAll(form.acc3_amount.value)+"|"+trimAll(form.acc3_period.value)+"|"+trimAll(form.acc4_bname.value)+"|"+trimAll(form.acc4_name.value)+"|"+trimAll(form.acc4_brno.value)+"|"+trimAll(form.acc4_bacno.value)+"|"+acc4_type+"|"+trimAll(form.acc4_amount.value)+"|"+trimAll(form.acc4_period.value)+"|"+trimAll(form.acc5_bname.value)+"|"+trimAll(form.acc5_name.value)+"|"+trimAll(form.acc5_brno.value)+"|"+trimAll(form.acc5_bacno.value)+"|"+acc5_type+"|"+trimAll(form.acc5_amount.value)+"|"+trimAll(form.acc5_period.value)+"|"+trimAll(form.deposit_type_1.value)+"|"+trimAll(form.vendor_1.value)+"|"+trimAll(form.active_status_1.value)+"|"+trimAll(form.deposit_type_2.value)+"|"+trimAll(form.vendor_2.value)+"|"+trimAll(form.active_status_2.value)+"|"+trimAll(form.deposit_type_3.value)+"|"+trimAll(form.vendor_3.value)+"|"+trimAll(form.active_status_3.value);
		                                break;
		                        }
		                } 

		                form.dest.value=24;
		                form.url.value=24;
		                form.action="saveconsultreg.php";
		                form.submit();
		            }
		            else
		            {
		                form.dest.value=24;
		                form.url.value=24;
		                form.action="saveconsultreg.php";
		                form.submit();

		            }
		        }
			}   
        }
	
}

function doSPage2()
{
	checked=true;
	form=document.conreg;
	
		
	try
	{
		if(window.opener.location.href.indexOf('Accounting/clients/addacccompany.php')!=-1)
		{
			var companyinfo = window.opener.document.markreqman.companyinfo.value;
			var Rnd = window.opener.document.markreqman.Rnd.value;		
			form.companyinfo.value = companyinfo;		
			form.Rnd.value = Rnd;
		}
	}
	catch(e)
	{
	}

	if(location.href.indexOf("/BSOS/Accounting/employees/")>0)
	{
		var accemprnm=form.accemprnm.value;
		var com="Acc_Emp_page2"+form.accemprnm.value;
	}
	else
	{
		var emprnm=form.emprnm.value;
		var com="HRM_EmpMngmt_page2"+form.emprnm.value;
	}

	form.dest.value=2;
	form.url.value=2;
	form.action="saveconsultreg.php";
	
	
	
	if((madison == 'MADISON' || syncHRDefault == 'Y' || akkupayroll=='Y' || tricom_rep == 'Y') && !formValidate('conreg'))
		return;
	
	if((isNotEmpty(form.address1,"Address 1")) && isPipeCap(form.address1,"Address 1") && isPipeCap(form.address2,"Address 2") && (isNotEmpty(form.city,"City")) && (isNameSpace(form.city,"City")) && (isNotEmpty(form.zip,"Zip")) && isPipeCap(form.zip,"Zip") && (isNotEmpty(form.primary,"Primary Phone")) && (isPipeCap(form.primary,"Primary Phone")) && (isPipeCap(form.secondary,"Secondary Phone")) && (isPipeCap(form.mobile,"Mobile")) && (isPipeCap(form.fax,"Fax")) && (isPipeCap(form.hphone_extn,"Primary Phone Extension")) && (isPipeCap(form.wphone_extn,"Secondary Phone Extension")) && (isPipeCap(form.newstate,"Other State"))){
		if(symmetrypayroll == 'Y'){
			if((isNotEmpty(form.mail_address1,"Address 1")) && isPipeCap(form.mail_address1,"Address 1") && isPipeCap(form.mail_address2,"Address 2") && (isNotEmpty(form.mail_city,"City")) && (isNameSpace(form.mail_city,"City")) && (isNotEmpty(form.mail_zip,"Zip")) && isPipeCap(form.mail_zip,"Zip")){
				checked=true;
			}else{
				checked=false;
			}
		}else{
			checked=true;
		}
	}
	else
		checked=false;
    
	
	if(symmetrypayroll == 'Y' && checked)
	{
		$.ajax({
				cache: false,
				url: "/BSOS/Accounting/AkkuPaySS/locationCodes.php?loccode=loccheck",
				type: "POST",
				data: {address1:form.address1.value,address2:form.address2.value,city:form.city.value,state:form.state.value,zip:form.zip.value},
				async: false,
				success: function(data) 
				{
					if(data=='false'){
						alert("Provided address not matching!");
						checked=false;
					}else{
					var dloc = data.split("###");
					var errmsg = dloc[10].split("::");
					var stateabvr = dloc[2].split("^");
						if(dloc[9]!='SUCCESS')
						{
							if(confirm('Suggesting Address\n\nAddress: '+dloc[0]+','+dloc[1]+', '+dloc[11]+'-'+dloc[3]+', '+dloc[4]+'\n\nGeoCode: '+dloc[5]+'\n\nStatus Message: '+errmsg[1]+'Provided address Not matching do you want to override!'))
							{
								var statesabv = "FL,GA,IA,IL,IN,KS,KY,LA,MI,MO,NC,NJ,NY,OH,PA,TN,TX,VA,WI,CO";
								if(!statesabv.includes(dloc[3]))
								{
									alert('The address is outside of the states we currently support. Please choose a different address.');
									return;
								}
							$("#address1").val(dloc[0]);
							//$("#address2").val(dloc[0]);
							$("#city").val(dloc[1]);
							//$("#statecodeloc").val(dloc[2]);
							getstateid(stateabvr[0]);
							var stateab = document.getElementById("stateabrv").value;
							var stateabt = stateabvr[0]+'^'+stateab;
							$("#state").val(stateabt);
							$("#zip").val(dloc[4]);
							var locationcodeid = $("#locationCodeId").val(dloc[5]);
							}else{
								var locationcodeid = $("#locationCodeId").val(dloc[5]);
								$("#addchangecnl").val('cancel');
								//checked=true;
								alert('Please Enter Valid Address.');
								checked=false;
							} 
						}else{
							var locationcodeid = $("#locationCodeId").val(dloc[5]);
							checked=true;
						}
					}
				}
			});
	   var stateabv = form.statecodeloc.value;
		var dstate = stateabv.split("^");
		$.ajax({
			cache: false,
			url: "/BSOS/Accounting/AkkuPaySS/locationCodes.php?loccode=stateabvr",
			type: "POST",
			data: {stateabv:dstate[0],empuser:form.empuserid.value},
			async: false,
			success: function(data) 
			{
				if(data=='No'){
					//doPost(17,2);
					$("#statediff").val('yes');
					
				}
			}
		});
	}
	
	if(checked)
	{
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				var esms = "";				
				if(form.esms.checked)
					esms = "Y";
				
				var asresident = "N";
				if(symmetrypayroll == 'Y'){
				if(form.as_resident.checked){
					asresident = "Y";
					changeResident();
				}
			}

				form.elements[i].value=trimAll(form.address1.value)+"|"+trimAll(form.address2.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+form.zip.value+"|"+form.primary.value+"|"+form.secondary.value+"|"+form.mobile.value+"|"+form.fax.value+"|"+form.hphone_extn.value+"|"+form.wphone_extn.value+"|"+form.newstate.value+"|"+esms+"|"+form.smsprovider.value;
				if(symmetrypayroll == 'Y'){
					form.elements[i].value += "|"+trimAll(form.mail_address1.value)+"|"+trimAll(form.mail_address2.value)+"|"+trimAll(form.mail_city.value)+"|"+trimAll(form.state1.value)+"|"+trimAll(form.mail_country.value)+"|"+form.mail_zip.value+"|"+form.newstate1.value+"|"+asresident+"|"+form.locationCodeId.value+"|"+form.statediff.value;
				}
				break;
			}
		}
		
		form.submit();
	}
}

function getstateid(stateabv)
{
	$.ajax({
			cache: false,
			url: "/BSOS/Accounting/AkkuPaySS/locationCodes.php?statecode=statecodeabv",
			type: "POST",
			data: {stateabv:stateabv},
			async: false,
			success: function(data) 
			{
					$("#stateabrv").val(data);
				
			}
		});
}

function doSPage8()
{
	var form=document.conreg;
	form.dest.value=8;
	form.url.value=8;
	form.action="saveconsultreg.php";
	k=0;
	for(i=0;i<form.type.length;i++)
	{
		if(form.type[i].checked)
		{
			k++;
			break;
		}
	}
	//if(k!=0)
	//{
		j=0;
		for(i=0;i<form.status.length;i++)
		{
			if(form.status[i].checked)
			{
				j++;
				break;
			}
		}
		//if(j!=0)
		//{
			form.page8.value=getValue1(form.type)+"|"+getValue1(form.status)+"||||";
			form.submit();
		//}
		/*else
		{
			alert("You haven't selected any Status, Please select a Status");
		}*/
	//}
	/*else
	{
		alert("You haven't selected any Job Type, Please select a Job Type");
	}*/
}
function doSPage9()
{

	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page9"+form.emprnm.value;
	form.dest.value=9;
	form.url.value=9;
	form.action="saveconsultreg.php";
	var checked=true;
	var stat=false;
     	
	var availsess	= "availsess"+form.emprnm.value;

	if(form.type.checked) {
		dd						= "immediate";
		document.getElementById(availsess).value	= dd+"|";
	}
	else {
		if(form.amonth.value != 0 && form.aday.value != 0 && form.ayear.value != 0) {

			dd						= getValue(form.amonth)+"-"+getValue(form.aday)+"-"+getValue(form.ayear);
			document.getElementById(availsess).value	= "other|"+dd;
		}
		else {
			alert("Please select a valid Availability Date");
			return;
		}
	}
     
	if(form.type.checked)
        {
		  dd="immediate";
		  stat=true;
        }
	else
	   {
		if(form.amonth.value!=0 && form.aday.value!=0 && form.ayear.value!=0)
		{
                        dd=getValue(form.amonth)+"-"+getValue(form.aday)+"-"+getValue(form.ayear);
                        stat=true;
                }
                else {
			alert("Please select a valid Availability Date");
			return;
                }
       }
	var temp=getRadValue(form.status);
    if(stat)
    {
    	if(temp=="other")
    	{
          //isNotEmpty(form.statusother,"Status Other") && Ramoved The Empty Validation
    		if(isPipeCap(form.statusother,"Status Other"))
    		{

            	for(i=0;i<form.elements.length;i++)
				{
					if(form.elements[i].name==com)
					{
						form.elements[i].value=getRadValue(form.status)+"|"+trimAll(form.statusother.value)+"|"+dd;
						break;
					}
				}
				
    			form.submit();

    		}
    	}
    	else
    	{
    		if(temp!="")
    		{
               	
				for(i=0;i<form.elements.length;i++)
				{
					if(form.elements[i].name==com)
					{
						form.elements[i].value=getRadValue(form.status)+"|"+"-"+"|"+dd;
						break;
					}
				}
    			form.submit();
    		}
    	}
   }
}
function doSPage25()
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page25"+form.emprnm.value;
	form.dest.value=25;
	form.url.value=25;
	form.action="saveconsultreg.php";
    
	if((form.smonth.selectedIndex!=0)||(form.sday.selectedIndex!=0)||(form.syear.selectedIndex!=0))
	   if((form.smonth.selectedIndex==0)||(form.sday.selectedIndex==0)||(form.syear.selectedIndex==0))
	   {
    	   alert("Select Valid Arrival Date")
    	   return;
	   }

	   if((form.dmonth.selectedIndex!=0)||(form.dday.selectedIndex!=0)||(form.dyear.selectedIndex!=0))
	   if((form.dmonth.selectedIndex==0)||(form.dday.selectedIndex==0)||(form.dyear.selectedIndex==0))
	   {
    	   alert("Select Valid SSN Date")
    	   return;
	   }
	   
    ad=getVal(form.smonth)+"-"+getVal(form.sday)+"-"+getVal(form.syear);
    sd=getVal(form.dmonth)+"-"+getVal(form.dday)+"-"+getVal(form.dyear);
    
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			form.elements[i].value=ad+"|"+sd;
			break;
		}
	}
  	
    form.submit();
}
function doSPage91()
{
	var form=document.conreg;
	form.dest.value=9;
	form.url.value=9;
	form.action="saveconsultreg.php";

	var temp=getRadValue(form.status);
	aa=getRadValue(form.tax);
	dd="immediate";

	if(temp=="other")
	{
		if(isNotEmpty(form.statusother,"Status Other") && isPipeCap(form.statusother,"Status Other") )
		{
			if(aa!="")
			{
				form.page9.value=getRadValue(form.status)+"|"+trimAll(form.statusother.value)+"|"+getRadValue(form.tax)+"|"+dd;
				form.submit();
			}
			else
			{
				alert("you haven't selected Tax, Please select a value for Tax");
			}
		}
	}
	else
	{
		if(aa!="")
		{
			form.page9.value=getRadValue(form.status)+"|"+"-"+"|"+getRadValue(form.tax)+"|"+dd;
		form.submit();
		}
		else
		{
			alert("you haven't selected Tax, Please select a value for Tax");
		}
	}
}

function doDelete()
{
	numAddrs = numSelected();
	valAddrs = valSelected();
	
	if (numAddrs < 0)
	{
		alert("No Records are available to Delete.");
		return;
	}
	if (! numAddrs)
	{
		alert("You need to select atleast one Record to Delete from the available List.");
		return;
	}

	if(confirm("Deleted Records are no longer available to you.\nAre you sure want to Delete all the selected Records?"))
	{
		document.conreg.aa.value = "delete";
		document.conreg.addr.value = valAddrs;
		aa=document.conreg.aa.value;
		addr=document.conreg.addr.value;
		conreg.action="addh1info.php?aa="+aa+"&addr="+addr;
		document.conreg.submit();
	}
}

function doEdit()
{
	numAddrs = numSelected();
    valAddrs = valSelected();

	if (numAddrs < 0)
	{
		alert("No Records are available to Edit.");
		return;
	}
	if (! numAddrs)
	{
		alert("You need to select one Record to Edit from the available List.");
		return;
	}

	if (numAddrs > 1)
	{
		alert("You can't edit more than one Record at a time.");
		return;
	}

	document.conreg.aa.value = "edit";
	document.conreg.addr.value = valAddrs;
	aa=document.conreg.aa.value;
	addr=document.conreg.addr.value;
	
	remote=window.open("newh1info.php?addr="+addr+"&aa="+aa,"h1info","width=700,height=400,statusbar=no,menubar=no,scrollbars=no,resizable=no,hotkeys=no");
	remote.focus();
}

function doDelete1()
{
	numAddrs = numSelected1();
	valAddrs = valSelected1();
	
	if (numAddrs < 0)
	{
		alert("No Records are available to Delete.");
		return;
	}
	if (! numAddrs)
	{
		alert("You need to select atleast one Record to Delete from the available List.");
		return;
	}

	if(confirm("Deleted Records are no longer available to you.\nAre you sure want to Delete all the selected Records?"))
	{
		document.conreg.aa.value = "delete";
		document.conreg.addr.value = valAddrs;
		aa=document.conreg.aa.value;
		addr=document.conreg.addr.value;
		conreg.action="addgreencardinfo.php?aa="+aa+"&addr="+addr;
		document.conreg.submit();
	}
}

function doEdit1()
{
	numAddrs = numSelected1();
    valAddrs = valSelected1();

	if (numAddrs < 0)
	{
		alert("No Records are available to Edit.");
		return;
	}
	if (! numAddrs)
	{
		alert("You need to select one Record to Edit from the available List.");
		return;
	}

	if (numAddrs > 1)
	{
		alert("You can't edit more than one Record at a time.");
		return;
	}

	document.conreg.aa.value = "edit";
	document.conreg.addr.value = valAddrs;
	aa=document.conreg.aa.value;
	addr=document.conreg.addr.value;
	
	remote=window.open("newgreencard.php?addr="+addr+"&aa="+aa,"greencard","width=700,height=400,statusbar=no,menubar=no,scrollbars=no,resizable=no,hotkeys=no");
	remote.focus();
}

function numSelected()
{
	var e = document.getElementsByName('auids[]');
	var bNone = true;
	var iFound = 0;
	for (var i=0; i < e.length; i++)
	{
		if (e[i].name == "auids[]")
		{
			bNone = false;
			if (e[i].checked == true)
				iFound++;
		}
	}
		if (bNone)
	{
		iFound = -1;
	}
	return iFound;
}

function valSelected()
{
	var e = document.getElementsByName('auids[]');
	var bNone = true;
	var iVal = "";
	for (var i=0; i < e.length; i++)
	{
		if (e[i].name == "auids[]")
		{
			bNone = false;
			if (e[i].checked == true)
			if(iVal=="")
				iVal=e[i].value;
			else
				iVal+=","+e[i].value;
		}
	}
	if (bNone)
	{
		iVal = "";
	}
	return iVal;
}

function numSelected1()
{
	var e = document.getElementsByName('auids1[]');
	var bNone = true;
	var iFound = 0;
	for (var i=0; i < e.length; i++)
	{
		if (e[i].name == "auids1[]")
		{
			bNone = false;
			if (e[i].checked == true)
				iFound++;
		}
	}
		if (bNone)
	{
		iFound = -1;
	}
	return iFound;
}

function valSelected1()
{
	var e = document.getElementsByName('auids1[]');
	var bNone = true;
	var iVal = "";
	for (var i=0; i < e.length; i++)
	{
		if (e[i].name == "auids1[]")
		{
			bNone = false;
			if (e[i].checked == true)
			if(iVal=="")
				iVal=e[i].value;
			else
				iVal+=","+e[i].value;
		}
	}
	if (bNone)
	{
		iVal = "";
	}
	return iVal;
}

function clearAll()
{
  var e = document.getElementsByName('auids[]');
  for (var i=0; i < e.length; i++)
    if (e[i].name == "auids[]")
      e[i].checked = false;
}

function checkAll()
{
  var e = document.getElementsByName('auids[]');
  for (var i=0; i < e.length; i++)
    if (e[i].name == "auids[]")
      e[i].checked = true;
}

function chke(e)
{ 
	if(!e)
		var e=document.conreg.chk11;
	if(e.checked==true)
		checkAll();
	else
		clearAll();
}

function clearAll1()
{
  var e = document.getElementsByName('auids1[]');
  for (var i=0; i < e.length; i++)
    if (e[i].name == "auids1[]")
      e[i].checked = false;
}
function checkAll1()
{
  var e = document.getElementsByName('auids1[]');
  for (var i=0; i < e.length; i++)
    if (e[i].name == "auids1[]")
      e[i].checked = true;
}

function chke1(e)
{ 
	if(!e)
		var e=document.conreg.chk12;
	if(e.checked==true)
		checkAll1();
	else
		clearAll1();
}

function getVal(dm)
{
	var si=dm.options.selectedIndex;
	return dm.options[si].value;
}
function isTrim(field,name)
{
	var str=field.value;
	var len=str.length;
	if(str.indexOf(' ')==0)
	{
		alert("\nThe "+name+" field  contains space at the beginning.\n\nPlease re-enter your "+name+".");
		field.select();
		field.focus();
		return false;
	}
	if(str.lastIndexOf(' ')==len-1)
	{
		alert("\nThe "+name+" field  contains space at the end.\n\nPlease re-enter your "+name+".");
		field.select();
		field.focus();
		return false;
	}
	return true;
}

function doSPage10()
{
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page10"+form.emprnm.value;
	if(form.companyname.value!="" || form.aff.value!="" )
	{
		if(isSpl(form.companyname,"Name")  && isNameSpaceCamaDot(form.aff,"Role"))
		{
			//if(isDate3())
			//{
			//	if(isDate4())
				//{
				if ((getValue(form.syear) == 0 && getValue(form.smonth) != 0) || (getValue(form.syear) != 0 && getValue(form.smonth) == 0))
				{
					alert("Check the Start Date selected");
					return;	
				}
				else if ((getValue(form.pyear) == 0 && getValue(form.pmonth) != 0) || (getValue(form.pyear) != 0 && getValue(form.pmonth) == 0))
				{
					alert("Check the End Date selected");
					return;	
				}
				else if(parseInt(getValue(form.syear)+check(getValue(form.smonth)))>parseInt(getValue(form.pyear)+check(getValue(form.pmonth))))
				{
					alert("End Date should be greater than Start Date");
					return;	
				}	
					var dd=getValue(form.smonth)+"-"+getValue(form.syear);
					var mm=getValue(form.pmonth)+"-"+getValue(form.pyear);
					
					for(i=0;i<form.elements.length;i++)
					{
						if(form.elements[i].name==com)
						{
							if(form.elements[i].value=="")
								form.elements[i].value=trimAll(form.companyname.value)+"|"+trimAll(form.aff.value)+"|"+dd+"|"+mm;
							else
								form.elements[i].value+="^"+trimAll(form.companyname.value)+"|"+trimAll(form.aff.value)+"|"+dd+"|"+mm;
							break;
						}
					}
					
					form.dest.value=10;
					form.url.value=10;
					form.action="saveconsultreg.php";
					form.submit();
				//}
			//}
		}
	}
	else
	{
		if ((getValue(form.syear) == 0 && getValue(form.smonth) != 0) || (getValue(form.syear) != 0 && getValue(form.smonth) == 0))
		{
			alert("Check the Start Date selected");
			return;	
		}
		else if ((getValue(form.pyear) == 0 && getValue(form.pmonth) != 0) || (getValue(form.pyear) != 0 && getValue(form.pmonth) == 0))
		{
			alert("Check the End Date selected");
			return;	
		}
		else if(parseInt(getValue(form.syear)+check(getValue(form.smonth)))>parseInt(getValue(form.pyear)+check(getValue(form.pmonth))))
		{
			alert("End Date should be greater than Start Date");
			return;	
		}
		
		form.dest.value=10;
		form.url.value=10;
		form.action="saveconsultreg.php";
		form.submit();
	}
}

function addPage10()
{
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page10"+form.emprnm.value;
	daction=form.daction.value;
	form.dest.value=10;
	form.url.value=10;
	form.action=daction;
	var list="";
	if(isNameSpaceCama(form.companyname,"Name")  && isNameSpaceCamaDot(form.aff,"Role"))
	{
		//if(isDate3())
		///{
			//if(isDate4())
			//{
			if ((getValue(form.syear) == 0 && getValue(form.smonth) != 0) || (getValue(form.syear) != 0 && getValue(form.smonth) == 0))
			{
				alert("Check the Start Date selected");
				return;	
			}
			else if ((getValue(form.pyear) == 0 && getValue(form.pmonth) != 0) || (getValue(form.pyear) != 0 && getValue(form.pmonth) == 0))
			{
				alert("Check the End Date selected");
				return;	
			}
			else if(parseInt(getValue(form.syear)+check(getValue(form.smonth)))>parseInt(getValue(form.pyear)+check(getValue(form.pmonth))))
			{
				alert("End Date should be greater than Start Date");
				return;	
			}
				dd=getValue(form.smonth)+"-"+getValue(form.syear);
				mm=getValue(form.pmonth)+"-"+getValue(form.pyear);
				list=trimAll(form.companyname.value)+"|"+trimAll(form.aff.value)+"|"+dd+"|"+mm;
			//}
		//}
	}
	if(list!="")
	{
		
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(form.elements[i].value!="")
				{
					form.elements[i].value+="^"+list;
				}
				else
				{
					form.elements[i].value=list;
				}
				
				break;
			}
		}
		
		form.submit();
	}
}

function doSPage11()
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page111"+form.emprnm.value;
	form.dest.value=11;
	form.url.value=11;
	form.action="saveconsultreg.php";
	if(isPipeCap(form.addinfo,"Additional Information"))
	{
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				form.elements[i].value=trimAll(form.addinfo.value);
				break;
			}
		}
		form.submit();
	}
}

function doSPage12()
{
	var checked=true;
	form=document.conreg;
	var com="HRM_EmpMngmt_page12"+form.emprnm.value;

	if(form.name.value!="" || form.company.value!="" || form.title.value!="" || form.phone.value!="" || form.phone1.value!="" || form.phone2.value!="" || form.phone3.value!="" || form.email.value!="" || form.secondary.value!="" || form.secondary1.value!="" || form.secondary2.value!="" || form.secondary3.value!="" || form.mobile.value!="" || form.mobile1.value!="" || form.mobile2.value!=""|| form.notes.value!=""|| form.download_path.value!="")
	{
		//if(isNotEmpty(form.name,"Name") && isNotEmpty(form.company,"Company") && isNotEmpty(form.title,"Title") && isNotEmpty(form.phone,"Phone") && isNotEmpty(form.phone1,"Phone") && isNotEmpty(form.phone2,"Phone") && isNotEmpty(form.email,"Email") )
		//{
			if(isnumchardotspace(form.name,"Name") && isPipeCap(form.company,"Company Name") && isnumchardotspace(form.title,"Tile") && isNumber(form.phone,"Phone") && isNumber(form.phone1,"Phone") && isNumber(form.phone2,"Phone") && isNumber(form.phone3,"Phone") && chkemail(form.email) && (isNumber(form.secondary,"Secondary Phone")) && (isNumber(form.secondary1,"Secondary Phone")) && (isNumber(form.secondary2,"Secondary Phone")) && (isNumber(form.secondary3,"Secondary Phone")) && (isNumber(form.mobile,"Mobile")) && (isNumber(form.mobile1,"Mobile")) && (isNumber(form.mobile2,"Mobile")) && (form.notes,"Notes") && (form.download_path,"Download Path"))
			{
				/*if(( form.secondary.value!="" || form.secondary1.value!="" || form.secondary2.value!="" || form.secondary3.value!="") )
				{
					if((chklen1(form.secondary,"Secondary Phone"))&&(chklen1(form.secondary1,"Secondary Phone"))&&(chklen2(form.secondary2,"Secondary Phone")) )
						checked=true;
					else
						checked=false;
				}
				if( (form.mobile.value!="" || form.mobile1.value!="" || form.mobile2.value!="") && checked)
				{
					if( chklen1(form.mobile,"Mobile") && chklen1(form.mobile1,"Mobile") && chklen2(form.mobile2,"Mobile"))
						checked=true;
					else
						checked=false;
				}*/
				if(checked)
				{				
						if(document.getElementById(com).value == "")
						{
							document.getElementById(com).value = trimAll(form.name.value)+"|"+trimAll(form.company.value)+"|"+trimAll(form.title.value)+"|"+form.phone.value+"-"+form.phone1.value+"-"+form.phone2.value+"-"+form.phone3.value+"|"+trimAll(form.email.value)+"|"+getRadValue(form.relation)+"|"+form.secondary.value+"-"+form.secondary1.value+"-"+form.secondary2.value+"-"+form.secondary3.value+"|"+form.mobile.value+"-"+form.mobile1.value+"-"+form.mobile2.value+"|"+form.notes.value+"|"+form.download_path.value;			
						}
					
					form.dest.value=12;
					form.url.value=12;
					form.action="saveconsultreg.php";
					document.getElementById("formsloading").style.display = 'block';
					$('.overlay').show();
					form.submit();
				}
			}
		//}
	}
	else
	{
		form.dest.value=12;
		form.url.value=12;
		form.action="saveconsultreg.php";
		document.getElementById(com).value ="";
		document.getElementById("formsloading").style.display = 'block';
		$('.overlay').show();
		form.submit();
	}
}

function addPage12()
{
	var checked=true;
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page12"+form.emprnm.value;

	form.dest.value=12;
	form.url.value=12;

	if(isNotEmpty(form.name,"Name") && isNotEmpty(form.company,"Company") && isNotEmpty(form.title,"Title") && isNotEmpty(form.phone,"Phone") && isNotEmpty(form.phone1,"Phone") && isNotEmpty(form.phone2,"Phone") && isNotEmpty(form.email,"Email") )
	{
		doSPage12();
	}
}
function addPage4()
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page4"+form.emprnm.value;
	form.dest.value=4;
	form.url.value=4;
	daction=form.daction.value;
	if(isPipeCap(form.name,"Skill Name") && isNumber(form.years,"Year"))
	{
		
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(form.elements[i].value=="")
					form.elements[i].value=trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
				else
					form.elements[i].value+="^"+trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
					
				break;
			}
		}
		form.action=daction;
		form.submit();
   	}
}
function doSPage4()
{ 
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page4"+form.emprnm.value;
       /* if( form.name.value=="" && form.page4.value=="" )
		{
            alert("No Skills are added, Please add atleast one Skill");
            return;
        }*/
	
		if( form.name.value!="" || form.years.value!="" )
		{
			//if((isNotEmpty(form.name,"Skill Name")) && (isNotEmpty(form.years,"Years")) )
			//{
				if(isPipeCap(form.name,"Skill Name") && isNumber(form.years,"Year"))
				{
					
					for(i=0;i<form.elements.length;i++)
					{
						if(form.elements[i].name==com)
						{
							if(form.elements[i].value != "")
								form.elements[i].value+="^"+trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
							else
								form.elements[i].value=trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
								
							break;
						}
					}
					
					form.dest.value=4;
					form.url.value=4;
					form.action="saveconsultreg.php";					
					form.submit();
				}
			//}
		}
		else
		{
			form.dest.value=4;
			form.url.value=4;
			form.action="saveconsultreg.php";
			form.submit();
		}
}
function delPage4(a)
{
	var exp1="";
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page4"+form.emprnm.value;
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			exp=form.elements[i].value;
			break;
		}
	}
	daction=form.daction.value;
	sinexp=exp.split("^");
	for(i=0;i<sinexp.length;i++)
	{
		if(i!=a)
		{
			if(exp1=="")
				exp1=sinexp[i];
			else
				exp1+="^"+sinexp[i];
		}
	}
	
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			form.elements[i].value=exp1;
			break;
		}
	}
	form.url.value=4;
	form.dest.value=4;
	form.action=daction;
	form.submit();
}
function editPage4(val)
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page4"+form.emprnm.value;
	daction=form.daction.value;
	form.dest.value=4;
	form.url.value=4;
	form.action=daction;
	
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			page4=form.elements[i].value;
			break;
		}
	}
	sinpage4=page4.split("^");
	reqpage4="";
	for(i=0;i<sinpage4.length;i++)
	{
		if(i!=val)
		{
			if(reqpage4=="")
				reqpage4=sinpage4[i];
			else
				reqpage4+="^"+sinpage4[i];
		}
	}
	if(isPipeCap(form.name,"Skill Name") && isNumber(form.years,"Year"))
	{
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(reqpage4!="")
					form.elements[i].value=reqpage4+"^"+trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
				else
					form.elements[i].value=trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
					
				break;
			}
		}
		form.submit();
   	}
}
function doSPage5()
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page5"+form.emprnm.value;
	 /*if( form.school.value=="" && form.page5.value=="" )
		{
            alert("No Educations are added, Please add atleast one Education");
            return;
        }*/
	
	if( form.school.value!="" || form.city.value!="" || form.state.value!="" || form.countryid.value!="0" || form.levelid.value!="" ||(form.month.selectedIndex!=0)||(form.year.selectedIndex!=0))
	{
		if ((getValue(form.year) == 0 && getValue(form.month) != 0) || (getValue(form.year) != 0 && getValue(form.month) == 0))
		{
			alert("Check the Completion Month & Year");
			return;	
		}
		
		if(isNameSpaceDot(form.school,"School or Program Name") && isNameSpace(form.city,"City") && isNameSpaceDot(form.state,"State") && isPipeCap(form.levelid,"Degree/Level Attained"))
		{
			var dd=getValue(form.month)+"-"+getValue(form.year);
			
			
			for(i=0;i<form.elements.length;i++)
			{
				if(form.elements[i].name==com)
				{
					if(form.elements[i].value!="")
						form.elements[i].value+="^"+trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
					else
						form.elements[i].value=trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
						
					break;
				}
			}
			
			form.dest.value=5;
			form.url.value=5;
			form.action="saveconsultreg.php";
			form.submit();
		}
	}
	else
	{
		form.dest.value=5;
		form.url.value=5;
		form.action="saveconsultreg.php";
		form.submit();
	}
}
function addPage5()
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page5"+form.emprnm.value;
	form.dest.value=5;
	form.url.value=5;
	daction=form.daction.value;
	var dd=getValue(form.month)+"-"+getValue(form.year);
	if( form.school.value!="" || form.city.value!="" || form.state.value!="" || form.countryid.value!="0" || form.levelid.value!="" ||(form.month.selectedIndex!=0)||(form.year.selectedIndex!=0))
	{
		if ((getValue(form.year) == 0 && getValue(form.month) != 0) || (getValue(form.year) != 0 && getValue(form.month) == 0))
		{
			alert("Check the Completion Month & Year");
			return;	
		}
	if(isNameSpaceDot(form.school,"School or Program Name") && isNameSpace(form.city,"City") && isNameSpaceDot(form.state,"State") && isPipeCap(form.levelid,"Degree/Level Attained"))
	{
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(form.elements[i].value == "")
					form.elements[i].value=trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
				else
					form.elements[i].value+="^"+trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
					
				break;
			}
		}
		
		form.action=daction;
		form.submit();
	}
	}
}
function editPage5(val)
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page5"+form.emprnm.value;
	daction=form.daction.value;
	form.dest.value=5;
	form.url.value=5;
	form.action=daction;
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			page5=form.elements[i].value;
			break;
		}
	}
	sinpage5=page5.split("^");
	reqpage5="";
	for(i=0;i<sinpage5.length;i++)
	{
		if(i!=val)
		{
			if(reqpage5=="")
				reqpage5=sinpage5[i];
			else
				reqpage5+="^"+sinpage5[i];
		}
	}
	if(isNameSpaceDot(form.school,"School or Program Name") && isNameSpace(form.city,"City") && isNameSpaceDot(form.state,"State") && isPipeCap(form.levelid,"Degree/Level Attained"))
	{
		var dd=getValue(form.month)+"-"+getValue(form.year);
		
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(reqpage5!="")
					form.elements[i].value=reqpage5+"^"+trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
				else
					form.elements[i].value=trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
				break;
			}
		}
		form.submit();
	}
}
function delPage5(a)
{
	var exp1="";
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page5"+form.emprnm.value;
	daction=form.daction.value;
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			exp=form.elements[i].value;
			break;
		}
	}
	sinexp=exp.split("^");
	for(i=0;i<sinexp.length;i++)
	{
		if(i!=a)
		{
			if(exp1=="")
				exp1=sinexp[i];
			else
				exp1+="^"+sinexp[i];
		}
	}
	
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			form.elements[i].value=exp1;
			break;
		}
	}
	form.url.value=5;
	form.dest.value=5;
	form.action=daction;
	form.submit();
}
function doSPage6()
{
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page6"+form.emprnm.value;
	var txt = $('#compensation_beginning').val();
	var re = /^[ A-Za-z0-9_@.,/$]*$/;
	
	dd=getValue(form.startmonth)+"-"+getValue(form.startyear);
	mm=getValue(form.endmonth)+"-"+getValue(form.endyear);
	if(form.name.value!="" || form.city.value!="" || form.state.value!="" || form.country.value!="0" || form.title.value!="" || form.discription.value!="" || (form.startmonth.selectedIndex!=0)||(form.startyear.selectedIndex!=0) || (form.endmonth.selectedIndex!=0)||(form.endyear.selectedIndex!=0))
	
	{
		if(isNameSpace(form.city,"City") && isNameSpaceDot(form.state,"State") && isNameSpaceCama(form.title,"Title") && isPipeCap(form.name,"Company Name") && isPipeCap(form.discription,"Description"))
		{
			if(getValue(form.endmonth)!='Present'){
				
				start_month = parseInt(check(getValue(form.startmonth)))+1;
				end_month = parseInt(check(getValue(form.endmonth)))+1;
				var start_date = new Date(getValue(form.startyear)+'-'+start_month).getTime() / 1000;
				var end_date = new Date(getValue(form.endyear)+'-'+end_month).getTime() / 1000;
				if ((getValue(form.startyear) == 0 && getValue(form.startmonth) != 0) || (getValue(form.startyear) != 0 && getValue(form.startmonth) == 0))
				{
					alert("Check the Start Date selected");
					return;	
				}
				else if ((getValue(form.endyear) == 0 && getValue(form.endmonth) != 0) || (getValue(form.endyear) != 0 && getValue(form.endmonth) == 0))
				{
					alert("Check the End Date selected");
					return;	
				}
				else if(parseInt(start_date) > parseInt(end_date))
				{
					 alert("End Date should be greater than Start Date");
					 return;	
				}
			}	
				if (!re.test(txt)) {
				alert ("Please enter valid data. (/,@,$,. are allowed)");
				form.compensation_beginning.focus();
				return;
					
				}
				else
				{
				for(i=0;i<form.elements.length;i++)
				{
					if(form.elements[i].name==com)
					{
						if(form.elements[i].value=="")
							form.elements[i].value=trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"||"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
						else
							form.elements[i].value+="^"+trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"||"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);

						break;
					}
				}
				}
			
			form.dest.value=6;
			form.url.value=6;
			form.action="saveconsultreg.php";
			form.submit();
		}
	}
	else
	{
		form.dest.value=6;
		form.url.value=6;
		form.action="saveconsultreg.php";
		form.submit();
	}
}
function editPage6(val)
{
	var form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page6"+form.emprnm.value;
	var txt = $('#compensation_beginning').val();
	var re = /^[ A-Za-z0-9_@.,/$]*$/;
	daction=form.daction.value;
	form.dest.value=6;
	form.url.value=6;
	form.action=daction;
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			page6=form.elements[i].value;
			break;
		}
	}
	sinpage6=page6.split("^");
	reqpage6="";
	for(i=0;i<sinpage6.length;i++)
	{
		if(i!=val)
		{
			if(reqpage6=="")
				reqpage6=sinpage6[i];
			else
				reqpage6+="^"+sinpage6[i];
		}
	}
	if(isPipeCap(form.name,"Company Name") && isNameSpace(form.city,"City") && isNameSpaceDot(form.state,"State") && isNameSpaceCama(form.title,"Title") && isPipeCap(form.discription,"Description") && isPipeCap(form.compensation_beginning,"Compensation Beginning") && isPipeCap(form.leaving_reason,"Leaving Reason"))
	{
		 if(getValue(form.endmonth)!='Present'){
		start_month = parseInt(check(getValue(form.startmonth)))+1;
		end_month = parseInt(check(getValue(form.endmonth)))+1;
		var start_date = new Date(getValue(form.startyear)+'-'+start_month).getTime() / 1000;
		var end_date = new Date(getValue(form.endyear)+'-'+end_month).getTime() / 1000;
	 	if(parseInt(start_date) > parseInt(end_date))
		{
			alert("End Date should be greater than Start Date");
			return;	
		}
		}
		
		dd=getValue(form.startmonth)+"-"+getValue(form.startyear);
		mm=getValue(form.endmonth)+"-"+getValue(form.endyear);
		
		if (!re.test(txt)) {
		alert ("Please enter valid data. (/,@,$,. are allowed)");
		form.compensation_beginning.focus();
		return;
			
		}
		else
		{
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(reqpage6!="")
					form.elements[i].value=reqpage6+"^"+trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"||"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
				else
					form.elements[i].value=trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"||"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
					
				break;
			}
		}
		}
		
		form.submit();
	}
}


function check(mon)
{
  var  months=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
  for(i=0;i<months.length;i++)
	{
	  if(months[i]==mon)
		   {return i;}
	}
}


function addPage6()
{
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page6"+form.emprnm.value;
	var txt = $('#compensation_beginning').val();
	var re = /^[ A-Za-z0-9_@.,/$]*$/;
	
	form.dest.value=6;
	form.url.value=6;
	daction=form.daction.value;
	form.action=daction;

	var list="";
	if(form.name.value!="" || form.city.value!="" || form.state.value!="" || form.country.value!="0" || form.title.value!="" || form.discription.value!="" || (form.startmonth.selectedIndex!=0)||(form.startyear.selectedIndex!=0) || (form.endmonth.selectedIndex!=0)||(form.endyear.selectedIndex!=0))
	{
	if(isNameSpace(form.city,"City") && isNameSpaceDot(form.state,"State") &&  isNameSpaceCama(form.title,"Title") && isPipeCap(form.name,"Company Name") && isPipeCap(form.discription,"Description"))
	{
	 if(getValue(form.endmonth)!='Present'){
		start_month = parseInt(check(getValue(form.startmonth)))+1;
		end_month = parseInt(check(getValue(form.endmonth)))+1;
		var start_date = new Date(getValue(form.startyear)+'-'+start_month).getTime() / 1000;
		var end_date = new Date(getValue(form.endyear)+'-'+end_month).getTime() / 1000;
		if ((getValue(form.startyear) == 0 && getValue(form.startmonth) != 0) || (getValue(form.startyear) != 0 && getValue(form.startmonth) == 0))
		{
			alert("Check the Start Date selected");
			return;	
		}
		else if ((getValue(form.endyear) == 0 && getValue(form.endmonth) != 0) || (getValue(form.endyear) != 0 && getValue(form.endmonth) == 0))
		{
			alert("Check the End Date selected");
			return;	
		}
		else if(parseInt(start_date) > parseInt(end_date))
				{
					 alert("End Date should be greater than Start Date");
					 return;	
				}
				}
		if (!re.test(txt)) {
		alert ("Please enter valid data. (/,@,$,. are allowed)");
		form.compensation_beginning.focus();
		return;
			
		}
		else
		{		
		dd=getValue(form.startmonth)+"-"+getValue(form.startyear);
		mm=getValue(form.endmonth)+"-"+getValue(form.endyear);
		list=trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"||"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
		}		
	}
	}
	if(list!="")
	{
		
		for(i=0;i<form.elements.length;i++)
		{
			if(form.elements[i].name==com)
			{
				if(form.elements[i].value!="")
				{
					form.elements[i].value+="^"+list;
				}
				else
				{
					form.elements[i].value=list;
				}
				
				break;
			}
		}
		
		form.submit();
	}
}



function delPage6(a)
{
	var exp1="";
	form=document.conreg;
	var emprnm=form.emprnm.value;
	var com="HRM_EmpMngmt_page6"+form.emprnm.value;
	daction=form.daction.value;
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			exp=form.elements[i].value;
			break;
		}
	}
	sinexp=exp.split("^");
	for(i=0;i<sinexp.length;i++)
	{
		if(i!=a)
		{
			if(exp1=="")
				exp1=sinexp[i];
			else
				exp1+="^"+sinexp[i];
		}
	}
	form.dest.value=6;
	form.url.value=6;
	form.action=daction;
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==com)
		{
			form.elements[i].value=exp1;
			break;
		}
	}
	form.submit();
}

function disableimm()
{
	form = document.conreg;
	var returnresp = true;

	if(form.type.checked)
	{
		if(confirm("Do you want to change the availability from 'Immediate' to a Specified Date?\nAvailability status in Availability tab will be updated.\n\nClick OK to continue.\nClick Cancel to return."))
		{
			form.type.checked = false;
			returnresp = true;
		}
		else {
			returnresp = false;
		}
	}
	
	return returnresp;
}

function disabledate(bVal)
{
    if(bVal)
    {
        form=document.conreg;

        if(form.syear.options.selectedIndex!=0||form.smonth.options.selectedIndex!=0||form.sday.options.selectedIndex!=0)
        {
          if(confirm("Do you want to change the availability to 'Immediate'"))
           {
            form.syear.options.selectedIndex=0;
            form.smonth.options.selectedIndex=0;
            form.sday.options.selectedIndex=0;
           }
          else
              form.type.checked=false;
        }
    }
 }
function isSpace(field, name)
{
	var str = field.value;
	if(str.length!=0)
	{
	   for (var i = 0; i < str.length; i++)
	   {
	       	var ch = str.substring(i, i + 1);
            if ( ch!=" ")
            {
                return true;
            }
	   }
	   alert("The " + name + " field is Empty. Please enter the " + name + ".");
	   field.select();
	   field.focus();
	   return false;
	}
	return true;
}

function isSpl(field,name)
{
	var str = field.value;
	for (var i = 0; i < str.length; i++)
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch))&&(ch!=" ") && (ch < "0" || "9" < ch) && (ch!="&") && (ch!="'")&& (ch!=".") && (ch!="-"))
		{
			alert("\nThe "+name+" field  accepts letters,numbers,'&',single quote,Period, hyphen and space only.\n\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}

function doManage(nameManage,name1)
{
	/* var v_width  = 600; */
	var v_width  = window.screen.availWidth * 0.55; 
    var v_heigth = 300;
	var top=(window.screen.availHeight-v_heigth)/2;
	var left=(window.screen.availWidth-v_width)/2;
	remote=window.open("/BSOS/Manage/add.php?nameManage="+nameManage+"&name1="+name1,"cat",'width='+v_width+',height=300,statusbar=no,menubar=no,scrollbars=yes,resizable=yes,hotkeys=no,left='+left+',top='+top);
	remote.focus();
}

function DirectoptionChk()
{
	frm=document.conreg;
	if(frm.deliverymethod.selectedIndex != 0)
	{
		 document.getElementById('DirectDepositBlock1').style.display='none';
		 document.getElementById('DirectDepositBlock2').style.display='none';
		 document.getElementById('DirectDepositBlock3').style.display='none';
		 document.getElementById('DirectDepositBlock4').style.display='none';
		 document.getElementById('DirectDepositBlock5').style.display='none';
		 document.getElementById('DirectDepositBlock6').style.display='none';
		 document.getElementById('DirectDepositBlock7').style.display='none';
		 document.getElementById('DirectDepositBlock8').style.display='none';
		 document.getElementById('DirectDepositBlock9').style.display='none';
		 document.getElementById('DirectDepositBlock10').style.display='none';
		 document.getElementById('DirectDepositBlock11').style.display='none';
		 document.getElementById('DirectDepositBlock12').style.display='none';
		 document.getElementById('DirectDepositBlock13').style.display='none';
		 document.getElementById('DirectDepositBlock14').style.display='none';
		 document.getElementById('DirectDepositBlock15').style.display='none';
   }	 
	else
	{
		 document.getElementById('DirectDepositBlock1').style.display = '';
		 document.getElementById('DirectDepositBlock2').style.display = '';
		 document.getElementById('DirectDepositBlock3').style.display = '';
		 document.getElementById('DirectDepositBlock4').style.display = '';
		 document.getElementById('DirectDepositBlock5').style.display = '';
		 document.getElementById('DirectDepositBlock6').style.display = '';
		 document.getElementById('DirectDepositBlock7').style.display = '';
		 document.getElementById('DirectDepositBlock8').style.display = '';
		 document.getElementById('DirectDepositBlock9').style.display = '';
		 document.getElementById('DirectDepositBlock10').style.display = '';
		 document.getElementById('DirectDepositBlock11').style.display = '';
		 document.getElementById('DirectDepositBlock12').style.display = '';
		 document.getElementById('DirectDepositBlock13').style.display = '';
		 document.getElementById('DirectDepositBlock14').style.display = '';
		 document.getElementById('DirectDepositBlock15').style.display = '';
	}	 
}

//added functions for dynamic state change when country selected
//On changing the country, populating the states.
var stateSelectIndex=0;
var stateValue=0;

function onStateChange(stateVal,dup_num)
{
	//var countrySno = document.getElementById("countryIdVal"+dup_num).value;
	document.getElementById("newstate"+dup_num).style.display = "none";
	//Get the canada country sno value if available
	if(document.getElementById("cacountryVal"))
	{
		var cacountryVal = document.getElementById("cacountryVal").value;	
	}
	else
	{
		var cacountryVal = "";
	}
	//Check if selected stateVal is not empty and is US states with country is not canada, then select the us as country and if other is selected, then display the free textfield for entry
	if(stateVal != "" && stateVal.indexOf("^") > 0 && document.getElementById("country").value != cacountryVal)
	{
		//document.getElementById("country").value=countrySno;
		var StateOptVal = document.getElementById("state"+dup_num).options[document.getElementById("state"+dup_num).options.selectedIndex].value;
		if(StateOptVal == 'Other^0')
			document.getElementById("newstate"+dup_num).style.display = "block";
		else
			document.getElementById("newstate"+dup_num).style.display = "none";
	}
	else if(stateVal != "" && document.getElementById("country").value == cacountryVal) // if country selected is canada, then if other is selected display free text field for entry
	{
		if(stateVal == 'Other^0')
			document.getElementById("newstate"+dup_num).style.display = "block";
		else
			document.getElementById("newstate"+dup_num).style.display = "none";
	}
	else
	{
		//deselect the country and append the us states options when not selected any state or deselect the state field
		//document.getElementById("country").value="0";
		var theSelectList = document.getElementById("state"+dup_num);
		theSelectList.length = 2;
		$("#state"+dup_num).append(usStateOptions);
		theSelectList.options[0].selected = true;
	}
}

function onCountryChange(countryVal,chkStatus)
{
    var countrySno = document.getElementById("countryIdVal").value;
	var oldStateVal = document.getElementById("state").value;
	var showState = countrySno != countryVal && countryVal != 0;
	//Get the canada country sno value if available
	if(document.getElementById("cacountryVal"))
	{
		var cacountryVal = document.getElementById("cacountryVal").value;	
	}
	else
	{
		var cacountryVal = "";
	}
	if(chkStatus == 'OL')
	{
		if(document.getElementById("state").options[document.getElementById("state").options.selectedIndex].value != '')
			showState = countrySno != countryVal;
	}
	
	//Reset the states list and append the us states by default
	var theSelectList = document.getElementById("state");
	var oldselval =  theSelectList.value;
	theSelectList.length = 2;
	$("#state").append(usStateOptions);
	//when page loads and selected contry is not US
	if(showState)
	{
		//If selected country is canada then append the canada states to state field
		if(countryVal == cacountryVal)
		{
			//Reset the states list and append the canada states
			theSelectList.length = 2;
			$("#state").append(caStateOptions);
			//If state is selected as other, then display the free text field else enable the state field and show the states list
			if(document.getElementById("state").value == 'Other^0')
			{
				document.getElementById("newstate").style.display = "block";
			}
			else
			{
				document.getElementById("newstate").style.display = "none";
				//If selected state is US state and changed the country then show the text field for entry else hide the text field
				if((document.getElementById("state").value.indexOf("^") > 0 || chkStatus == 'OC'))
				{
					if(oldselval == 'Other^0' && chkStatus == 'OC')
					{
						document.getElementById("newstate").style.display = "block";
						theSelectList.options[1].selected = true;
					}
					else
					{
						document.getElementById("newstate").style.display = "none";
						theSelectList.options[0].selected = true;
					}
				}				
			}
			document.getElementById("state").disabled = false;
		}
		else
		{
			if(stateSelectIndex == 0)
			{
				stateValue = document.getElementById("state").value;
				var theSelectList = document.getElementById("state");
				theSelectList.selectedIndex = 'Other^0';
				stateSelectIndex = theSelectList.selectedIndex;
			}
			
			document.getElementById("state").value="Other^0";
			document.getElementById("state").disabled = true;
			
			if(document.getElementById("country").disabled == true)
			{
				document.getElementById("newstate").disabled = true;
			}
			
			document.getElementById("newstate").style.display = "";
			
			if(document.getElementById("newstate").disabled == false)
				document.getElementById("newstate").focus();
		}
	}
    else // else then changed the country after loading the page
	{
		//If selected country is canada then append the canada states to state field
		if(countryVal == cacountryVal)
		{
			//Reset the states list and append the canada states
			theSelectList.length = 2;
			$("#state").append(caStateOptions);
			//If state is selected as other, then display the free text field else enable the state field and show the states list
			if(document.getElementById("state").value == 'Other^0')
			{
				document.getElementById("newstate").style.display = "block";
			}
			else
			{
				document.getElementById("newstate").style.display = "none";
				//If selected state is US state and changed the country then show the text field for entry else hide the text field
				if((document.getElementById("state").value.indexOf("^") > 0 || chkStatus == 'OC'))
				{
					if(oldselval == 'Other^0' && chkStatus == 'OC')
					{
						document.getElementById("newstate").style.display = "block";
						theSelectList.options[1].selected = true;
					}
					else
					{
						document.getElementById("newstate").style.display = "none";
						theSelectList.options[0].selected = true;
					}
				}	
			}			
			document.getElementById("state").disabled = false;
		}
		else
		{
			//Disable/Enable the state field and toggle the free text field based on state selection
			stateValue = document.getElementById("state").value;
			if(countryVal == "0")
				document.getElementById("state").value="";
			else
				document.getElementById("state").value=stateValue;
			
			document.getElementById("state").disabled = false;
			
			var StateOptVal = document.getElementById("state").options[document.getElementById("state").options.selectedIndex].value;
			
			if(StateOptVal == 'Other^0')
				document.getElementById("newstate").style.display = "block";
			else
				document.getElementById("newstate").style.display = "none";
			
			if(document.getElementById("country").disabled == true)
			{
				document.getElementById("state").disabled = true;
				document.getElementById("newstate").disabled = true;
			}
			
			stateSelectIndex = 0;
		}
	}
	
	//Reset the free text field value if the previous selected state is not other
	if(oldStateVal != "Other^0")
		document.getElementById("newstate").value="";
		
	showState = "";
}

function enableSMS()
{
	form=document.conreg;
	if(form.esms.checked)
	{
		form.smsprovider.disabled=false;
	}
	else
	{
		form.smsprovider.value="";
		form.smsprovider.disabled=true;
	}
}

function inArraySearch(needle, haystack) {
	var length = haystack.length;
	for(var i = 0; i < length; i++) {
	    if(haystack[i] == needle) return true;
	}
	return false;
}

function checkObject(obj){
	return obj && obj !== "null" && obj !== "undefined";
}

function getaddColSkills() {
	var allskills = "";
	var elements = document.getElementsByClassName('addedchkboxes');
	
	if(checkObject(elements)) {
		for(i=0;i<elements.length;i++)
		{
			if(checkObject(document.getElementById('name'+i)))
			{
				allskills += "^"+document.getElementById('name'+i).value+"|"+document.getElementById('usedid'+i).value+"|"+document.getElementById('levelid'+i).value+"|"+document.getElementById('years'+i).value+"|0|"+document.getElementById('dev_skill_id'+i).value;
			}
		}
	}
	return allskills;
}

function geteditColSkills() {
	var allskills = "";
	var getselskills = document.getElementById('selected_skills').value;
	getselskills = getselskills.split(',');
	
	var emprnm = document.getElementById('emprnm').value;
	var emppage = "HRM_EmpMngmt_page4"+emprnm;
	var getavailskills = document.getElementById(emppage).value;
	resultArr=new Array();
	dataArr=new Array();
	
	if(getavailskills != "") {
		var showRow=getavailskills.split("^");
		for(var j=0;j<showRow.length;j++)
		{
			var dispText=showRow[j].split("|");
			if (dispText[5] == 0) {
				allskills += "^"+showRow[j];
			}
			else {
				resultArr[j] = dispText[5];
				dataArr[dispText[5]] = showRow[j];
			}
		}
	}
	
	if(getselskills != "") {
		for(i=0;i<getselskills.length;i++)
		{
			if(inArraySearch(getselskills[i], resultArr))
			{
				if(checkObject(document.getElementById('txtskillname'+getselskills[i])))
				{
					allskills += "^"+document.getElementById('txtskillname'+getselskills[i]).value+"|"+document.getElementById('selexp'+getselskills[i]).value+"|"+document.getElementById('levelid'+getselskills[i]).value+"|"+document.getElementById('yearsexp'+getselskills[i]).value+"|0|"+getselskills[i];
				}
				else
				{
					allskills += "^"+dataArr[getselskills[i]];
				}
			}
			else
			{
				if(checkObject(document.getElementById('txtskillname'+getselskills[i])))
				{
					allskills += "^"+document.getElementById('txtskillname'+getselskills[i]).value+"|"+document.getElementById('selexp'+getselskills[i]).value+"|"+document.getElementById('levelid'+getselskills[i]).value+"|"+document.getElementById('yearsexp'+getselskills[i]).value+"|0|"+getselskills[i];
				}
				else
				{
					allskills += "^"+dataArr[getselskills[i]];
				}
			}
		}
	}
	return allskills;
}

function doPage28()
{
	var checked		= true;
	form			= document.conreg;
	var emprnm		= form.emprnm.value;
	var com			= "HRM_EmpMngmt_page28"+form.emprnm.value;
	var availsess		= "availsess"+form.emprnm.value;
	var schdateval		= form.schavaildate.value;
	var getavailval		= getRadValue(form.availcandstatus);
	
	if (getavailval == 'other' && schdateval == '') {
		alert("Please select a valid Availability Date");
		flag	= false;
		return flag;
	}
	else {
		//forming selected dates and time string
		var smtfstr = "";
		$('#dateSelGridDiv input[type=hidden]').each(function() {
	
			var elementName = $(this).attr('name');			
			if(elementName == "smiternoval[]") {
	
				var elementId	= $(this).attr('id');	
				var iterno	= $("#"+elementId).val();
	
				smtfstr += $("#smdatetimeval"+iterno).val() + "^" + $("#smdatetimeminval"+iterno).val() + "^" + $("#smdatetimemaxval"+iterno).val() + "^" + $("#smdatetimerecno"+iterno).val() + "^" + $("#smdatetimegrpno"+iterno).val() + "^" + $("#smshiftstatus"+iterno).val() + "|";
			}
		});
	
		var availsdate					= schdateval.replace(new RegExp('/',"gi"),"-");		
		document.getElementById(availsess).value	= getavailval+"|"+availsdate;
		
		for(i = 0; i < form.elements.length; i++)
		{
			if(form.elements[i].name == com)
			{
				form.elements[i].value = getavailval+"|"+schdateval+"|"+smtfstr;
				break;
			}
		}
	
		flag	= true;
		return flag;
	}
}

function doSPage28()
{
	var checked		= true;
	form			= document.conreg;
	var emprnm		= form.emprnm.value;
	var com			= "HRM_EmpMngmt_page28"+form.emprnm.value;
	var availsess		= "availsess"+form.emprnm.value;
	var schdateval		= form.schavaildate.value;
	var getavailval		= getRadValue(form.availcandstatus);
	
	if (getavailval == 'other' && schdateval == '') {
		alert("Please select a valid Availability Date");
		return;
	}
	else {
		//forming selected dates and time string
		var smtfstr = "";
		$('#dateSelGridDiv input[type=hidden]').each(function() {
	
			var elementName = $(this).attr('name');			
			if(elementName == "smiternoval[]") {
	
				var elementId	= $(this).attr('id');	
				var iterno	= $("#"+elementId).val();
	
				smtfstr += $("#smdatetimeval"+iterno).val() + "^" + $("#smdatetimeminval"+iterno).val() + "^" + $("#smdatetimemaxval"+iterno).val() + "^" + $("#smdatetimerecno"+iterno).val() + "^" + $("#smdatetimegrpno"+iterno).val() + "^" + $("#smshiftstatus"+iterno).val() + "|";
			}
		});
	
		var availsdate					= schdateval.replace(new RegExp('/',"gi"),"-");		
		document.getElementById(availsess).value	= getavailval+"|"+availsdate;
	
		for(i = 0; i < form.elements.length; i++)
		{
			if(form.elements[i].name == com)
			{
				form.elements[i].value = getavailval+"|"+schdateval+"|"+smtfstr;
				break;
			}
		}
	
		form.dest.value = 28;
		form.url.value = 28;
		form.action = "saveconsultreg.php";
		form.submit();
	}
}

//Function to check immedidate is checked in the status tab and confirm the details
function disableavaildate()
{
      form			= document.conreg;

      if(form.ayear.options.selectedIndex != 0 || form.amonth.options.selectedIndex != 0 || form.aday.options.selectedIndex != 0)
      {
	    if(confirm("Do you want to change the availability from Specified Date to 'Immediate'?\nAvailability status in Availability tab will be updated.\n\nClick OK to continue.\nClick Cancel to return."))
	    {
		  form.ayear.options.selectedIndex	= 0;
		  form.amonth.options.selectedIndex	= 0;
		  form.aday.options.selectedIndex	= 0;
	    }
	    else
		  form.type.checked			= false;
      }
}

//Function used to select availability date in Status Tab
function statusTabDateSelector(val)
{
	if (disableimm()) {

		form	= document.forms[0];
		var d1	= form.amonth.selectedIndex;
		var d2	= form.aday.selectedIndex;
		var d3	= form.ayear.selectedIndex;
		
		if((d1 > 0) && (d2 > 0) && (d3 > 0))
		{
			var mn	= form.amonth.options[d1].value;
			var dy	= form.aday.options[d2].value;
			var yr	= form.ayear.options[d3].value;
		}
		else {
			sindate	= form.dateval.value.split("/");

			var mn	= sindate[0];
			var dy	= sindate[1];
			var yr	= sindate[2];
		}
	
		// calculate window center positions
		var v_width	= 200;
		var v_heigth	= 200;
		var top		= (window.screen.availHeight-v_heigth)/2;
		var left	= (window.screen.availWidth-v_width)/2;
		
		remote		= window.open('dcalendar.php?mn='+mn+'&dy='+dy+'&yr='+yr+'&val='+val,'cal','width=200,height=200,resizable=no,scrollbars=no,status=0,left='+left+',top='+top);
		remote.focus();
	}
}

//Function to check the status change between availability/preference tabs and alert the user
function chkstatuschange(selval,tabsel)
{
	if(selval == "immediate") {
		enabledisablecalshiftsch('no');
	}
	else {
		enabledisablecalshiftsch('yes');
	}	
}

function accountAmountTypecheck(styleflag3,styleflag4,styleflag5){
        form=document.conreg;
	var chkflag = "no";
	for (var i=0; i < form.deliverymethod.options.length; i++) 
	{
		if(form.deliverymethod.options[i].selected)
		{
			if(form.deliverymethod.options[i].text == "Direct Deposit")
				chkflag = "yes";
		}
	}
	if(chkflag == "yes")
	{
		
            var acc1_period = form.acc1_period.value;
            var acc2_period = form.acc2_period.value;
            var acc3_period = form.acc3_period.value;
            var acc4_period = form.acc4_period.value;
            var acc5_period = form.acc5_period.value;

            var acc1_deposit_type = form.deposit_type_1.value;
            var acc2_deposit_type = form.deposit_type_2.value;
            var acc3_deposit_type = form.deposit_type_3.value;

            var j=0;
            for(var i=1;i<=3;i++)
            {
            	if(document.getElementById('deposit_type_'+i).value=='PAYCARD')
            		j++;
            }

            if(j>1)
            {
            	alert("Please select only one Rapid Paycard vendor between all accounts.");
            	return false;
            }

            var acc1_pay_active = Number('0.00');
        	var acc2_pay_active = Number('0.00');
        	var acc3_pay_active = Number('0.00');
        	if(form.active_status_1.value=='ACTIVE')
        	{
        		var acc1_pay_active = Number(form.acc1_amount.value);
        	}
        	if(form.active_status_2.value=='ACTIVE')
        	{
        		var acc2_pay_active = Number(form.acc2_amount.value);
        	}
        	if(form.active_status_3.value=='ACTIVE')
        	{
        		var acc3_pay_active = Number(form.acc3_amount.value);
        	}
            
            if(acc1_period=='percent' && (form.acc1_brno.value!="" || form.acc1_bacno.value!="" || form.deposit_type_1.value=='PAYCARD')){
              var acc1_pay = Number(acc1_pay_active);
              var acc1_per = 'percent';
            }else{
               var acc1_pay = 0;
               var acc1_per ='amount';
            }
            
            if(acc2_period=='percent' &&  (form.acc2_brno.value!="" || form.acc2_bacno.value!="" || form.deposit_type_2.value=='PAYCARD')){
              var acc2_pay = Number(acc2_pay_active);
              var acc2_per = 'percent';
            }else{
               var acc2_pay = 0;
                var acc2_per ='amount';
            }
           
            if(acc3_period=='percent' && (form.acc3_brno.value!="" || form.acc3_bacno.value!="" || form.deposit_type_3.value=='PAYCARD')){
              var acc3_pay = Number(acc3_pay_active);
              var acc3_per = 'percent';
            }else{
               var acc3_pay = 0;
               var acc3_per ='amount';
            }
            
            if(acc4_period=='percent' && (form.acc4_brno.value!="" || form.acc4_bacno.value!="")){
              var acc4_pay = Number(form.acc4_amount.value); 
              var acc4_per = 'percent';
            }else{
               var acc4_pay = 0;
               var acc4_per ='amount';
            }
            
            if(acc5_period=='percent' && (form.acc5_brno.value!="" || form.acc5_bacno.value!="")){
              var acc5_pay = Number(form.acc5_amount.value); 
              var acc5_per = 'percent';
            }else{
               var acc5_pay = 0;
               var acc5_per ='amount';
            }
           
            if(styleflag3 && styleflag4 && styleflag5){
                if((acc1_per=='percent' || acc2_per=='percent' || acc3_per=='percent'  || acc4_per=='percent'  || acc5_per=='percent') && (acc1_pay+acc2_pay+acc3_pay+acc4_pay+acc5_pay)!=100){

                        alert('Please update Amount/Pay Period Percentages to equal 100% between all accounts.');
                        return false;
                }
            }else if(styleflag3 && styleflag4 && styleflag5==false){
                if((acc1_per=='percent' || acc2_per=='percent' || acc3_per=='percent'  || acc4_per=='percent') && (acc1_pay+acc2_pay+acc3_pay+acc4_pay)!=100){

                        alert('Please update Amount/Pay Period Percentages to equal 100% between all accounts.');
                        return false;
                }
            }else if(styleflag3 && styleflag5 && styleflag4==false){
               if((acc1_per=='percent' || acc2_per=='percent' || acc3_per=='percent'  || acc5_per=='percent') && (acc1_pay+acc2_pay+acc3_pay+acc5_pay)!=100){

                        alert('Please update Amount/Pay Period Percentages to equal 100% between all accounts.');
                        return false;
                }
            } else if(styleflag4 && styleflag5 && styleflag3==false){
                if((acc1_per=='percent' || acc2_per=='percent' || acc4_per=='percent'  || acc5_per=='percent') && (acc1_pay+acc2_pay+acc4_pay+acc5_pay)!=100){

                        alert('Please update Amount/Pay Period Percentages to equal 100% between all accounts.');
                        return false;
                }
            } else if(styleflag3 && styleflag4==false && styleflag5==false){

                if((acc1_per=='percent' || acc2_per=='percent' || acc3_per=='percent') && (acc1_pay+acc2_pay+acc3_pay)!=100){

                        alert('Please update Amount/Pay Period Percentages to equal 100% between all active accounts.');
                        return false;
                }
            } else if(styleflag4 && styleflag3==false && styleflag5==false){
                if((acc1_per=='percent' || acc2_per=='percent' || acc4_per=='percent') && (acc1_pay+acc2_pay+acc4_pay)!=100){

                        alert('Please update Amount/Pay Period Percentages to equal 100% between all accounts.');
                        return false;
                }
           } else if(styleflag5 && styleflag3==false && styleflag4==false){
                if((acc1_per=='percent' || acc2_per=='percent' || acc5_per=='percent') && (acc1_pay+acc2_pay+acc5_pay)!=100){

                        alert('Please update Amount/Pay Period Percentages to equal 100% between all accounts.');
                        return false;
                }
            }else{
                if((acc1_per=='percent' || acc2_per=='percent') && (acc1_pay+acc2_pay)!=100){

                         alert('Please update Amount/Pay Period Percentages to equal 100% between all accounts.');
                         return false;
                } 
            }

        }
	return true; 
}

function isNotSet(field, name)
{
	
	var str=field.value;
	if(str=="")
	{
		alert("The " + name + " is empty.\n\nPlease enter the " + name + ".");
		field.focus();
		return false;
	}
	return true;
}

function isNotSetAmount(field, name)
{
	
	var str=field.value;
	if(str=="" || str=="0.00" || str=="0")
	{
		alert("The " + name + " is empty.\n\nPlease enter the " + name + ".");
		field.focus();
		return false;
	}
	return true;
}

// Validate Routing number Akkupay changes
function validRoutingNumber(field,name) {
    var routing =field.value;
    if (routing.length !== 9) {  // all valid routing numbers are 9 numbers in length
        alert("The "+name+" accepts 9 digits only .\n\nPlease re-enter your "+name+".");
        field.select();
        field.focus();
        return false;
    }
    
    for(var i=0;i<routing.length;i++)
    {
        var ch = routing.substring(i, i + 1);
        if((routing.substring(i,i+1)<"0") || (routing.substring(i,i+1)>"9"))
        {
                alert("The "+name+" accepts numbers only .\n\nPlease re-enter your "+name+".");
                field.select();
                field.focus();
                return false;
        }
    }
    
    var checksumTotal = (7 * (parseInt(routing.charAt(0),10) + parseInt(routing.charAt(3),10) + parseInt(routing.charAt(6),10))) +
                        (3 * (parseInt(routing.charAt(1),10) + parseInt(routing.charAt(4),10) + parseInt(routing.charAt(7),10))) +
                        (9 * (parseInt(routing.charAt(2),10) + parseInt(routing.charAt(5),10) + parseInt(routing.charAt(8),10)));
    
    var checksumMod = checksumTotal % 10;
    
    if (checksumMod !== 0) {
        
        alert("Invalid "+name+" .\n\nPlease enter valid "+name+".");
        field.select();
        field.focus();
        return false;
        
    } else {
        return true;
    }
}
//function for updating credentials on adding 
function addupdatePage27()
{
	var checked	= true;
	form		= document.conreg;
	var emprnm	= form.emprnm.value;
	var com		= "HRM_EmpMngmt_page27"+form.emprnm.value;
	form.dest.value	= 27;
	form.url.value	= 27;
	var countries	= document.getElementById("countries_sel").value;
	var states	= document.getElementById("states_sel").value;
	
	if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To') && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {

		if (chkspchars() == true) {

			if(chkcrenamealreadyexists() == true) {
				doSPage27();
			}
		}
	}
}

//This function will call when click on other tabs and gives alert to save the data before going to other tabs
function doPage27()
{
	form= document.conreg;
	if(form.addr.value!="edit")
	{
		var chk_country_flag  = 0;
		if(form.countries_sel.value == "US" || form.countries_sel.value == "")
		{
				var chk_country_flag = 1;
		}
            flag = true;
            if (form.credential_type.value != "0" || form.credential_name.value != "" || form.credential_number.value != "" || form.acquired_date.value != "" || form.valid_from.value != "" || form.valid_to.value != "" || form.verified_by.value != "0" || form.verified_date.value != "" || form.comments.value != "" || form.states_sel.value != "" || form.download_path.value != "" || chk_country_flag == 0) {
                
                alert("Click on Reset Form to clear data or Update/Add Credentials to Save before moving to another tab.");
                flag = false;
                return flag;
            }
            else
            {
                return flag;
            }
	}
	else
	{
            alert("Click on Update to save the data or Cancel before moving to another tab.");
            flag	= false;
            return flag;
	}
	
}

function selAllCredentials() {
  
	 var form	= document.conreg;
	 var e		= form.elements;
	 var len	= e.length;
	 for(var i=0;i<len;i++)
	 {
		 if(e[i].name == "chkcredentials" || e[i].name == "con")
		 {
		   if(form.topCredentialBox.checked)
				e[i].checked=true;
			else
				 e[i].checked=false;
		 }
	 }
}

function chkTopCredentials() {

	var form	= document.conreg;
	var e		= form.chkcredentials;
	var len		= e.length;
	var chkcount	= 0;

	if(isNaN(form.chkcredentials.length)) { //only 1 row
	    if(form.chkcredentials.checked)
			form.topCredentialBox.checked	= true;
		else
			form.topCredentialBox.checked	= false;
	}
	else { //more than 1 row
		for(var i=0;	i<len;	i++)
		{
			if(e[i].checked)
				chkcount++;
			else
			{
				form.topCredentialBox.checked	= false;
				return;
			}
		}
		if(chkcount == form.chkcredentials.length)
			form.topCredentialBox.checked	= true;
	}
}

//This function will call when click on update in EDIT MODE
function editPage27(val)
{
	var checked	= true;
	var form	= document.conreg;
	form.dest.value	= 27;
	form.url.value	= 27;
	var emprnm	= form.emprnm.value;
	var com		= "HRM_EmpMngmt_page27"+emprnm;
	var cred_status = 'ACTIVE';
	var countries	= document.getElementById("countries_sel").value;
	var states	= document.getElementById("states_sel").value;
	if (form.credential_type.value != "0" || form.credential_name.value != "" || form.credential_number.value != "" || form.acquired_date.value != "" || form.valid_from.value != "" || form.valid_to.value != "" || form.verified_by.value != "0" || form.verified_date.value != "" || form.comments.value != "" || form.countries_sel.value != "" || form.states_sel.value != "" || form.download_path.value != "") {

            if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To') && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {

                if (chkspchars() == true) {

                    if(chkcrenamealreadyexists() == true) {
                        if(document.getElementById(com).value == "") {

                            document.getElementById(com).value= form.credential_type.value+"|"+form.credential_name.value+"|"+form.credential_number.value+"|"+states+"|"+form.acquired_date.value+"|"+form.valid_from.value+"|"+form.valid_to.value+"|"+form.verified_by.value+"|"+form.verified_date.value+"|"+countries+"|"+form.comments.value+"|ACTIVE|"+form.empcredentialid.value+"||AKKENDOCS||"+form.download_path.value;
                        }
                        form.dest.value = 27;
                        form.url.value = 27;
                        form.action = "saveconsultreg.php";
                        document.getElementById("formsloading").style.display = 'block';
                        $('.overlay').show();
                        form.submit();					
                    }
                }
            }
	}
	else {
            form.dest.value = 27;
            form.url.value = 27;
            document.getElementById(com).value='';
            form.action = "saveconsultreg.php";
            document.getElementById("formsloading").style.display = 'block';
            $('.overlay').show();
            form.submit();		
	}	
}

//This function will call when click on update
function doSPage27()
{
	var checked	= true;
	var form	= document.conreg;
	var com		= "HRM_EmpMngmt_page27"+form.emprnm.value;
	var countries	= document.getElementById("countries_sel").value;
	var states	= document.getElementById("states_sel").value;
	
	if (form.credential_type.value != "0" || form.credential_name.value != "" || form.credential_number.value != "" || form.acquired_date.value != "" || form.valid_from.value != "" || form.valid_to.value != "" || form.verified_by.value != "0" || form.verified_date.value != "" || form.comments.value != "" || form.countries_sel.value != "" || form.states_sel.value != "" || form.download_path.value != "") {

            if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To') && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {

                if (chkspchars() == true) {

                    if(chkcrenamealreadyexists() == true) {
                        if(document.getElementById(com).value == "") {

                                document.getElementById(com).value = form.credential_type.value+"|"+form.credential_name.value+"|"+form.credential_number.value+"|"+states+"|"+form.acquired_date.value+"|"+form.valid_from.value+"|"+form.valid_to.value+"|"+form.verified_by.value+"|"+form.verified_date.value+"|"+countries+"|"+form.comments.value+"||AKKENDOCS||"+form.download_path.value;
                        }
                        form.dest.value = 27;
                        form.url.value = 27;
                        form.action = "saveconsultreg.php";
                        document.getElementById("formsloading").style.display = 'block';
                        $('.overlay').show();
                        form.submit();					
                    }
                }
            }
	}
	else {

            form.dest.value = 27;
            form.url.value = 27;
            form.action = "saveconsultreg.php";
            document.getElementById(com).value ="";
            document.getElementById("formsloading").style.display = 'block';
            $('.overlay').show();
            form.submit();		
	}	
}

// Deleting the credentials new functions added for the Employee Credentials Tab
function delCredentailsNewFunc() {

	var form	= document.conreg;
	var emprnm	= form.emprnm.value;
	var e		= form.elements;
	var len		= e.length;
        var getnonsel = "";
	var count	= 0;
        for (var i=0; i < len; i++) {

            if (e[i].name == "chkcredentials") {

                if (e[i].checked) {

                    if (getnonsel == "")
                    {
                            getnonsel = e[i].value;
                    }
                    else
                    {
                            getnonsel = getnonsel+","+e[i].value;
                    }
                    count++;
                }
            }
	}
        if (count == 0) {

		alert("Select at least one record to Delete");
		return;
	}
        if(confirm("You are deleting credential(s) for this employee. Click on OK to Continue or Cancel to return.")) {
           
		form.dest.value	= 27;
		form.url.value	= 27;
                form.deleteCredsIds.value = getnonsel;
                form.actionForCreds.value = 'DoDelete';
                form.action = "saveconsultreg.php";
		document.getElementById("formsloading").style.display = 'block';
		$('.overlay').show();
		form.submit();	
	}
}

//Make credential status from active to inactive
// Archiving the credentials new functions added for the Employee Credentials Tab
function doArchive_credentialsNewFunc() {

	var form	= document.conreg;
	var emprnm	= form.emprnm.value;
	var e		= form.elements;
	var len		= e.length;
        var getnonsel = "";
	var count	= 0;
        for (var i=0; i < len; i++) {

            if (e[i].name == "chkcredentials") {

                if (e[i].checked) {

                    if (getnonsel == "")
                    {
                            getnonsel = e[i].value;
                    }
                    else
                    {
                            getnonsel = getnonsel+","+e[i].value;
                    }
                    count++;
                }
            }
	}
	if (count == 0) {

		alert("Select at least one record to Archive");
		return;
	}

	if(confirm("Are you sure, you want to Archive the selected Credential(s) ?\nClick on OK to Continue or Cancel to return.")) {

		
            form.dest.value	= 27;
            form.url.value	= 27;
            form.archiveCredsIds.value = getnonsel;
            form.actionForCreds.value = 'DoArchive';
            form.action = "saveconsultreg.php";
            document.getElementById("formsloading").style.display = 'block';
            $('.overlay').show();
            form.submit();
	}
}

// this function i have added to stop user not to redirect to activities tab from Credentials tab without saving credentials
function doRedirectToActivitiesTab(dest,redirectUrl){
        flag = true;
        if(dest==27)
		{
            form= document.conreg;
			var chk_country_flag  = 0;
            if(form.countries_sel.value == "US" || form.countries_sel.value == "")
			{
				var chk_country_flag = 1;
			}

            if (form.credential_type.value != "0" || form.credential_name.value != "" || form.credential_number.value != "" || form.acquired_date.value != "" || form.valid_from.value != "" || form.valid_to.value != "" || form.verified_by.value != "0" || form.verified_date.value != "" || form.comments.value != "" || chk_country_flag == 0 || form.states_sel.value != "" || form.download_path.value != "") {
                
                if(form.addr.value!="edit"){
                   alert("Click on Reset Form to clear data or Update/Add Credentials to Save before moving to another tab.");
                    return;  
                }else{
                    alert("Click on Update to save the data or Cancel before moving to another tab.");
                    return; 
                }
            }
            else
            {   
                window.location = redirectUrl;
            }
        }else{
            return flag;
        }
}
function resetCredentialsForm(){
    document.getElementById("conreg").reset();
    document.getElementById("temp_path").value='';
    document.getElementById("file_name").value='';
    document.getElementById("session_data").value='';
    document.getElementById("download_path").value='';
    document.getElementById("files_removed").value='';
    document.getElementById("commmentslabel").style.display = "none";
    document.getElementById("commmentslabel").innerHTML='';
    document.getElementById("comments").value='';
    document.getElementById("comments").innerHTML='';
    $(".ajax-file-upload-statusbar").remove();
    $(".ajax-file-upload-error").remove();
    $(".ajax-file-upload-filename").remove();
    $(".ajax-file-upload-red").remove();
    $(".ajax-file-upload-green").remove();
    $(".ajax-file-loading").remove();
    $(".select2-search-choice").remove();
    $("#countries_sel").val('');
    $("#states_sel").val('');
    $("#credsAttachTds").html('');
    $("#credsAttachTds").html('<div id="multiplefileuploader">Attach Documents</div>');

     var countrycodes = {id:'US',text:'United States'};
     $('#countries').select2('data', countrycodes);
	 $("#countries_sel").val('US');
	 $("#s2id_autogen2").attr('placeholder','Select State');
	 $(".select2-default").css('color','#484848'); 

    var settings = {
	url: "/include/credential_management/attachfile.php",				
	dragDrop:false,
	multiple:true,
	showFileCounter: false,				
	showProgress: true,
	uploadButtonClass: "ajax-file-upload-blue",				
	showDownload: true,    
	showAbort:false,
	showDone:false,
	statusBarWidth: 437,
	deletelStr: "X",
	fileName: "uploadfile",
	allowedTypes:"*",
	maxFileSize: 20971520, // in bytes. Max Size: 20MB
	returnType:"json",
	maxFileCount:10,
	onLoad:function(obj)
	{																
		$.ajax({
		cache: false,
		url: "/include/credential_management/attachments.php",
		dataType: "json",
		type: "POST",
		data: { all_details: all_file_details},
		success: function(data) 
		{		    
		    if (data != null) {
			for(var i=0;i<data.length;i++)
			{
			    obj.createProgress(data[i]);			    
			}
		    }
		}
		});
	},
	onSuccess:function(files,data,xhr)
	{	   
		if ($("#temp_path").val() == "") {
			$("#temp_path").val(data['temp_path']);
		}else{															
			$("#temp_path").val($("#temp_path").val()+"|^"+data['temp_path']);
		}
		if ($("#file_name").val() == "") {
			$("#file_name").val(data['file_name']);
		}else{															
			$("#file_name").val($("#file_name").val()+"|^"+data['file_name']);
		}
		if ($("#file_size").val() == "") {
			$("#file_size").val(data['file_size']);
		}else{															
			$("#file_size").val($("#file_size").val()+"|^"+data['file_size']);
		}
		if ($("#session_data").val() == "") {
			$("#session_data").val(data['session_data']);
		}else{															
			$("#session_data").val($("#session_data").val()+"|^"+data['session_data']);
		}															    
		if ($("#download_path").val() == "") {
			$("#download_path").val(data['download_path']);
		}else{															
			$("#download_path").val($("#download_path").val()+"||AKKENSPLIT||"+data['download_path']);
		}
		$("#folder_name").val(data['folder_name']);
																	    
	},
	showDelete:true,
	deleteCallback: function(data,pd)
	{	   
	    var del_file_details = data.download_path;
	    
	    var arrSplit_del_file_details = del_file_details.split("|AKKEN|");															    	    
	    
	    // Get the complete list of files uploaded
	    var files_uploaded_str = $("#download_path").val();
	    
	    var arrSplit_files_uploaded_str	= files_uploaded_str.split("||AKKENSPLIT||");
	    
	    var file_index = arrSplit_files_uploaded_str.indexOf(del_file_details);
	    
	    if (file_index >= 0) {
		removeFileUploaded(file_index, 'uploaded_files'); 
	    }
	    	  
	    pd.statusbar.hide(); //You choice to hide/not.
	},
	downloadCallback:function(files,pd)
	{		
		var file_temp_path = files.temp_path;		
		if (file_temp_path.indexOf("|-") >=0 ) {
			var arrSplit_file_temp_path = file_temp_path.split("|-");
			var temp_name = arrSplit_file_temp_path[1];
		}
		
		var file_download_path = "attachfolder="+files.folder_name+"&fname="+files.file_name+"&tempname="+temp_name;		
		location.href = "/include/show_attach.php?"+file_download_path;																
	}
    }
    $("#multiplefileuploader").uploadFile(settings);
}
// function will call on click of reset References form
function resetReferencesForm()
{
    $("#conreg").trigger("reset");
    $("#temp_path").val('');
    $("#file_name").val('');
    $("#session_data").val('');
    $("#download_path").val('');
    $("#files_removed").val('');
    $("#commmentslabel").css("display","none");
    $("#commmentslabel").html('');
    $("#comments").val('');
    $("#comments").html('');

    $(".ajax-file-upload-statusbar").remove();
    $(".ajax-file-upload-error").remove();
    $(".ajax-file-upload-filename").remove();
    $(".ajax-file-upload-red").remove();
    $(".ajax-file-upload-green").remove();
    $(".ajax-file-loading").remove();
    $(".select2-search-choice").remove();
    $("#refersAttachTds").html('');
    $("#refersAttachTds").html('<div id="multiplefileuploader">Attach Document</div>');
    var settings = {
	url: "/include/credential_management/attachfile.php?tab=ref",				
	dragDrop:false,
	multiple:false,
	showFileCounter: false,				
	showProgress: true,
	uploadButtonClass: "ajax-file-upload-blue",				
	showDownload: true,    
	showAbort:false,
	showDone:false,
	statusBarWidth: 437,
	deletelStr: "X",
	fileName: "uploadfile",
	allowedTypes:"*",
	maxFileSize: 20971520, // in bytes. Max Size: 20MB
	returnType:"json",
	maxFileCount:1,
	onSelect:function(obj)
	{
		$(".ajax-file-upload-blue").hide();
	},
	onLoad:function(obj)
	{
		if(all_file_details != "")
		{
		
		$.ajax({
		cache: false,
		url: "/include/credential_management/attachments.php?tab=ref",
		dataType: "json",
		type: "POST",
		data: { all_details: all_file_details},
		success: function(data) 
		{
		    if (data != null) {
			$(".ajax-file-upload-blue").hide();
			obj.createProgress(data);			
		    }
		}
		});
		}
	},
	onSuccess:function(files,data,xhr)
	{	   
		if ($("#temp_path").val() == "") {
			$("#temp_path").val(data['temp_path']);
		}else{															
			$("#temp_path").val($("#temp_path").val()+"|^"+data['temp_path']);
		}
		if ($("#file_name").val() == "") {
			$("#file_name").val(data['file_name']);
		}else{															
			$("#file_name").val($("#file_name").val()+"|^"+data['file_name']);
		}
		if ($("#file_size").val() == "") {
			$("#file_size").val(data['file_size']);
		}else{															
			$("#file_size").val($("#file_size").val()+"|^"+data['file_size']);
		}
		if ($("#session_data").val() == "") {
			$("#session_data").val(data['session_data']);
		}else{															
			$("#session_data").val($("#session_data").val()+"|^"+data['session_data']);
		}															    
		if ($("#download_path").val() == "") {
			$("#download_path").val(data['download_path']);
		}else{															
			$("#download_path").val($("#download_path").val()+"|^"+data['download_path']);
		}
		$("#folder_name").val(data['folder_name']);
		$(".ajax-file-upload-blue").hide(); 
																	    
	},
	showDelete:true,
	deleteCallback: function(data,pd)
	{	   
	    var del_file_details = data.download_path;						    	    

	    // Get the complete list of files uploaded
	    var files_uploaded_str = $("#download_path").val();
	    
	    var file_index = files_uploaded_str.indexOf(del_file_details);
	    
	    if (file_index >= 0) {
		removeUploadedFiles(file_index, 'uploaded_files'); 
	    }
	    	  
	    pd.statusbar.hide(); //You choice to hide/not.
	},
	downloadCallback:function(files,pd)
	{		
		var file_temp_path = files.temp_path;		
		if (file_temp_path.indexOf("|-") >=0 ) {
			var arrSplit_file_temp_path = file_temp_path.split("|-");
			var temp_name = arrSplit_file_temp_path[1];
		}
		
		var file_download_path = "attachfolder="+files.folder_name+"&fname="+files.file_name+"&tempname="+temp_name;		
		location.href = "/include/show_attach.php?"+file_download_path;																
	}
    }
     var uploadObj = $("#multiplefileuploader").uploadFile(settings);
}
//Akkupay New bank Account validation
function isbankAcountNumberValid(field,name) 
{
	var str = field.value;
	for (var i = 0; i < str.length; i++) 
	{
		var ch = str.substring(i, i + 1);
		if ( ((ch < "a" || "z" < ch) && (ch < "A" || "Z" < ch)) && (ch < "0" || "9" < ch) && (ch!="-")) 
		{
			alert("\nThe "+name+" field accepts Letters, Numbers and Hyphen only.\n\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
}
//Validating the date in Credentials tab
function isvalidDate(date, message)
{
		var dateReg = /^\d{2}[/]\d{2}[/]\d{4}$/;
		var dformat = date.split('/');
		var id      = message.toLowerCase(message.replace(" ", "_"));
		//alert(id);
	if(date!=''){
		dtMonth = dformat[0];
		dtDay= dformat[1];
	    dtYear = dformat[2];     
	     
		if(!dformat && date!='') {
			alert("The " + message + " format is not valid, Please enter correct format.");
		    $('#'+id).focus();	
		}
		if(dtMonth < 1 || dtMonth > 12){
			alert("The " + message + " format is not valid, Please enter correct format.");
		    $('#'+id).focus();	
			return false;
		}
		if (dtDay <1  || dtDay >31) {
			alert("The " + message + " format is not valid, Please enter correct format.");
			 $('#'+id).focus();	
			return false;
		}
	}
		
	return true;			
}

// RESTRICT FOR ESC |ENTER | TAB
$(document).ready(function(){
	$("#acquired_date,#valid_from,#valid_to,#verified_date").on('keyup',function(e) {
		//alert();
		var keyCode = e.which;
		var target = e.target || e.srcElement;
		var i;
		if(target.id == 'acquired_date') {     i = 0; }
		if(target.id == 'valid_from') {        i = 1; }
		if(target.id == 'valid_to') {          i = 2; }
		if(target.id == 'verified_date') {     i = 3; }
		if (e.keyCode == 27) {
		A_TCALS[i].f_toggle();
		}
		if (e.keyCode == 9) {
		A_TCALS[i].f_toggle();
		}
	});
});

$(document).ready(function(){
$("#acquired_date,#valid_from,#valid_to,#verified_date").keypress(function(e){
    var keyCode = e.which;
    var target = e.target || e.srcElement;
    //console.log(target.id); 
    var i;
    if(target.id == 'acquired_date') {     i = 0; }
    if(target.id == 'valid_from') {        i = 1; }
    if(target.id == 'valid_to') {          i = 2; }
    if(target.id == 'verified_date') {     i = 3; }
   
    /*
    8 - (backspace)
    32 - (space)
    48-57 - (0-9)Numbers
    47 -/ [allowing]
    9 - tab
    13 - Enter
    27 - Escap
    */

	if(keyCode == 13){
		A_TCALS[i].f_toggle();
		return true;
	}
	else if ( (keyCode != 8 || keyCode == 32 ) && (keyCode < 48 || keyCode > 57 ) && keyCode != 47 ) { 
		return false;
    }

  });
});


// function will call when only the Acquired Date
function resetCredentialsAcquiredDate(){
    $("#acquired_date").val('');
}
// function will call when only the Valid From Date
function resetCredentialsValidFDate(){
    $("#valid_from").val('');
}
// function will call when only the Valid To Date
function resetCredentialsValidTDate(){
    $("#valid_to").val('');
}
// function will call when only the Verified Date
function resetCredentialsVerifiedDate(){
    $("#verified_date").val('');
}
function doPage31()
{

	form=document.conreg;
	if(form.addr.value!="edit")
    {
		if(location.href.indexOf("/BSOS/Accounting/employees/")>0)
		{
			var accemprnm=form.accemprnm.value;
			var com="Acc_Emp_page31"+form.accemprnm.value;
		}
		else
		{
			var emprnm=form.emprnm.value;
	                var com="HRM_EmpMngmt_page31"+form.emprnm.value;
		}
	    flag=true;

	    for(i=0;i<form.elements.length;i++)
	    {
			if(form.elements[i].name==com)
			{
				form.elements[i].value=form.vendor.value+"|"+trimAll(form.account_number.value)+"|"+trimAll(form.confirm_account_number.value)+"|"+trimAll(form.employeeIdVal.value);
				break;
			}
	    }
	}
	else
    {
        alert("You are in edit mode, Please save this data first");
        flag=false;
    }
	return flag;
    
}

