var valMadisonFlag = true; 
var valSyncHRFlag = true;
// Define the quick books validation flag
var valQBCFlag = true;
var AkkuFrmHire = false;
var valTricomFlag = true;
function monthvalue1(month1)
{
  var ss=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
  for(i=0;i<ss.length;i++)
  {
    if(month1==ss[i])
        return i;
  }

}
function DateSelector1(val)
{
	form=document.forms[0];
	var ff=false;
	var date="";
	
	if(val=="from")
	{
		date=getFromDateVal1();
		ff=true;
	}
	else if(val=="vfrom")
	{
		date=getVFromDateVal1();
		ff=true;
	}
	else (val=="to")
	{
		date=getToDateVal1();
		ff=true;
	}

	if(ff)
	{
		sindate=date.split("/");
		var mn=sindate[0];
		var dy=sindate[1];
		var yr=sindate[2];

       	var v_width  = 200;
    	var v_heigth = 200;
    	var top=(window.screen.availHeight-v_heigth)/2;
    	var left=(window.screen.availWidth-v_width)/2;

		remote=window.open('ecalendar.php?mn='+mn+'&dy='+dy+'&yr='+yr+'&val='+val,'cal','width=200,height=200,resizable=no,scrollbars=no,status=0,left='+left+',top='+top);
		remote.focus();
	}
}

function getFromDateVal1()
{
	form=document.forms[0];
	d1=form.fmonth.selectedIndex;
	d2=form.fday.selectedIndex;
	d3=form.fyear.selectedIndex;
	if((d1>0)&&(d2>0)&&(d3>0))
	{
		day1=form.fmonth.options[d1].value;
		day2=form.fday.options[d2].value;
		day3=form.fyear.options[d3].value;
		return day1+"/"+day2+"/"+day3;
	}
	else
	{
		return form.dateval.value;
	}
}
function getVFromDateVal1()
{
	form=document.forms[0];
	d1=form.vmonth.selectedIndex;
	d2=form.vday.selectedIndex;
	d3=form.vyear.selectedIndex;
	if((d1>0)&&(d2>0)&&(d3>0))
	{
		day1=form.vmonth.options[d1].value;
		day2=form.vday.options[d2].value;
		day3=form.vyear.options[d3].value;
		return day1+"/"+day2+"/"+day3;
	}
	else
	{
		return form.dateval.value;
	}
}
function getToDateVal1()
{
	form=document.forms[0];
	d1=form.vtmonth.selectedIndex;
	d2=form.vtday.selectedIndex;
	d3=form.vtyear.selectedIndex;
	if((d1>0)&&(d2>0)&&(d3>0))
	{
		day1=form.vtmonth.options[d1].value;
		day2=form.vtday.options[d2].value;
		day3=form.vtyear.options[d3].value;
		return day1+"/"+day2+"/"+day3;
	}
	else
	{
		return form.dateval.value;
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
			if(i==0)
				aa=field[i].value;
			else
				aa+="|"+field[i].value;
		}
		else
		{	
			if(i==0)
				aa="";
			else
				aa+="|"+"";
		}
	}
	return aa;
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
function getVal(dm)
{
	var si=dm.options.selectedIndex;
	return dm.options[si].value;
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
		alert("You haven't selected "+mm+", Please select a value for "+mm);
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
		alert("Invalid "+name+". "+name+" not accepts | , Please re-enter your "+name);
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
		alert("Invalid "+name+". "+name+" not accepts ^ , Please re-enter your "+name);
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
		alert("Invalid "+name+". "+name+" not accepts ^ , Please re-enter your "+name);
		field.focus();
		return false;
	}
	return true;
}

function chkemail(email)
{
    var str=email.value
	var filter=emailRegExp;

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
	var str=field.value.trim();
	if(str=="")
	{
		alert("The " + name + " field is Empty. Please enter the " + name + ".");
		field.focus();
		return false;
	}
	return true;
}

function isNotEmptyField(field, name)
{
	var str=field.value;
	if(str=="")
	{
		alert("The " + name + " field is Empty. Please enter the " + name + ".");
		field.focus();
		return false;
	}
	return true;
}


function isNumberDotSlash(field,name)
{
	var str =field.value;
	for(var i=0;i<str.length;i++)
	{
		var ch = str.substring(i, i + 1);
		if(((str.substring(i,i+1)<"0") || (str.substring(i,i+1)>"9")) && (ch!=".")&& (ch!="/"))
		{
			alert("The "+name+" accepts numbers, decimals and / only.\n\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
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
	var str = field.value;
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
	return true;
}

function isPipeCap(field,name)
{
	var str = field.value;
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
	return true;
}


function isName(field,name) 
{
	var str = field.value;
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
	return true;
}

function isNameSpace(field,name) 
{
	var str = field.value;
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

// Hours validations per Day & per Week
function isHrsValidate(field,name)
{
	form2=document.conreg;
	var a=field.value;
	var str;
	//str = form2.shper.options.selectedIndex;
	if(str==0)
	{
		if((a>24))
		{
			alert(name+" per day should not exceed 24 hours");
			field.focus();
			field.select();
			return false;
		}
	}
	else
	{
		if((a>168))
		{
			alert(name+" per week should not exceed 168 hours");
			field.focus();
			field.select();
			return false;
		}
	}
    return true;
}
    
function doPost(url,dest)
{
	form=document.forms[0];
	daction=form.daction.value;
	form.url.value=url;
	form.dest.value=dest;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
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
	else if(dest==23)
		flag=doPage23();
	else if(dest==24)
		flag=doPage24();
	else if(dest==25)
		flag=doSPage25();
	else if(dest==26)
		flag=doPage26();
	else if(dest==27)
		flag=doPage27();
        else if(dest==28)
		flag=doPage28();
        else if(dest==29)
		flag=doPage29();

	if(flag)
	{
		form.addr.value="old";
		form.action=daction;
		enableCommissionRoles();
                enableDisabledRateFields();
		form.submit();
	}
}

function doPage25()
{
	form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page25name=eval("document.conreg.page25"+hrmhmsessionrn);
	
	if(form.addr.value!="edit")
	{
		page25name.value=trimAll(form.bname.value)+"|"+trimAll(form.name.value)+"|"+form.brno.value+"|"+form.bacno.value+"|"+form.deliverymethod.value+"|"+trimAll(form.pickAuthorization.value);
		pcou=page25name.value.split("|").length;
		if(pcou==6)
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

function validate(url,dest)
{
	form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	form.url.value=url;
	form.dest.value=dest;
	daction=form.daction.value;
	flag=true;
	
	//this is for Accounting consulting vendors add candidates--Kiran
	

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
	else if(dest==22)
		flag=doPage22();
	else if(dest==23)
		flag=doPage23();
	else if(dest==24)
		flag=doPage24();
	else if(dest==25)
		flag=doSPage25();
	else if(dest==26)
		flag=doPage26();
	else if(dest==27)
		flag=doPage27();
        else if(dest==28)
		flag=doPage28();
        else if(dest==29)
		flag=doPage29();
  
	if(flag)
	{
		
		form.action=daction;
		if(dest==25 && url == 100)
		{
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
					doSPage25();
					
				}
				//form.submit();
			} 
			
			var hrmhmsessionrn=form.hrmhmsessionrn.value;
			var page25name=eval("document.conreg.page25"+hrmhmsessionrn);
			var str = page25name.value;
			
			try {
				var candsno = form.exist.value;
			}
			catch(e) { var candsno = "";}
			if(candsno == '')
			{
				DynCls_Ajax_result('/BSOS/Include/emailcheck.php?navigateModuleName=Hiring&dest_val='+dest+'&valid_madison='+form.validateMadison_ses.value+'&HRM_HM_SESSIONRN='+hrmhmsessionrn,'Name','str='+str,'Name_SSN_Checking()');
			}
			else
			{
				DynCls_Ajax_result('/BSOS/Include/emailcheck.php?navigateModuleName=Hiring&dest_val='+dest+'&cand_sno='+candsno+'&valid_madison='+form.validateMadison_ses.value+'&HRM_HM_SESSIONRN='+hrmhmsessionrn,'Name','str='+str,'Name_SSN_Checking()');
			}
			
		}
		else if(dest == 14 && url == 100)
		{
			
			var hrmhmsessionrn=form.hrmhmsessionrn.value;
			var page14name=eval("document.conreg.page14"+hrmhmsessionrn);
			var ssn_val = form.ssn.value;
			var str_14 = page14name.value;

			try {
				var candsno = form.exist.value;
			}
			catch(e) { var candsno = "";}
			if(candsno == '')
			{
				DynCls_Ajax_result('/BSOS/Include/emailcheck.php?navigateModuleName=Hiring&dest_val=14&str_14='+str_14+'&ssn_val='+ssn_val+'&valid_madison='+form.validateMadison_ses.value+'&HRM_HM_SESSIONRN='+hrmhmsessionrn,'Name','','Name_SSN_Checking()');
			}
			else
			{
				DynCls_Ajax_result('/BSOS/Include/emailcheck.php?navigateModuleName=Hiring&dest_val=14&str_14='+str_14+'&ssn_val='+ssn_val+'&cand_sno='+candsno+'&valid_madison='+form.validateMadison_ses.value+'&HRM_HM_SESSIONRN='+hrmhmsessionrn,'Name','','Name_SSN_Checking()');
			}	
		}
		else
		{
			enableCommissionRoles();
            enableDisabledRateFields();
			form.submit();
		}
	}
}

function doPage1()
{
	form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page1name=eval("document.conreg.page1"+hrmhmsessionrn);
	
	if (syncHRDefault == 'Y' || akkupayroll == "Y") {
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
			page1name.value=trimAll(form.firstname.value)+"|"+trimAll(form.middleinitial.value)+"|"+trimAll(form.lastname.value)+"|"+trimAll(mailid)+"|"+trimAll(form.prtitle.value)+"|"+trimAll(amailid)+"|"+trimAll(omailid);
			pcou=page1name.value.split("|").length;
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

function doPage2()
{
	form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page2name=eval("document.conreg.page2"+hrmhmsessionrn);
	if(form.addr.value!="edit")
	{
		if((madison == 'MADISON' || syncHRDefault == 'Y' || akkupayroll == "Y" || tricom_rep=='Y') && !formValidate('conreg'))
			return;

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
										alert('The address is outside of the states we currently support. Please choose a different address.');
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
			}

		if(checked)
		{
			var asresident = "N";
			if(symmetrypayroll == 'Y'){
				if(form.as_resident.checked){
					asresident = "Y";
					changeResident();
				}
			}				

			page2name.value=trimAll(form.address1.value)+"|"+trimAll(form.address2.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+form.zip.value+"|"+form.primary.value+"|"+form.secondary.value+"|"+form.mobile.value+"|"+form.fax.value+"|"+form.hphone_extn.value+"|"+form.wphone_extn.value+"|"+form.newstate.value+"|"+form.mobcarrier.value;
			if(symmetrypayroll == 'Y'){
				page2name.value += "|"+trimAll(form.mail_address1.value)+"|"+trimAll(form.mail_address2.value)+"|"+trimAll(form.mail_city.value)+"|"+trimAll(form.state1.value)+"|"+trimAll(form.mail_country.value)+"|"+form.mail_zip.value+"|"+form.newstate1.value+"|"+asresident+"|"+form.locationCodeId.value+"|"+form.statecodeloc.value;
			}
			
			pcou=page2name.value.split("|").length;
			var ccou = (symmetrypayroll == 'Y') ? 24 : 14;
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

function doPage3()
{
	form=document.conreg;
	if(form.addr.value!="edit")
	{
		if(invalid(form.objective,"Objective") && invalid(form.summary,"Summary") )
		{
			form.page3.value=trimAll(form.objective.value)+"|"+trimAll(form.summary.value);
			pcou=form.page3.value.split("|").length;
			if(pcou==2)
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

function doPage4()
{
	var form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page4name=eval("document.conreg.page4"+hrmhmsessionrn);
	flag=true;
	if(form.addr.value!="edit")
	{
		if( form.name.value!="" || form.years.value!="" )
		{
			flag=false;
			//if((isNotEmpty(form.name,"Skill Name")) && (isNotEmpty(form.years,"Years")) )
			//{
				if(isPipeCap(form.name,"Skill Name") && isNumber(form.years,"Year"))
				{
					if(page4name.value!="")
						page4name.value+="^"+trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
					else
						page4name.value=trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
					flag=true;
					return flag;
				}
			//}
		}
		
		else
		{
            flag=true;
            return flag;
        }
		
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function delPage4(a)
{
	var exp1=exp2="";
	form=document.conreg;
	daction=form.daction.value;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page4name=eval("document.conreg.page4"+hrmhmsessionrn);
	exp=page4name.value;
	var getdelid = document.getElementById('dev_skill_id'+a).value;
	getselskills = document.getElementById('selected_skills').value;
	getselsklarray = getselskills.split(",");
	for(j=0;j<getselsklarray.length;j++)
	{
		if(getselsklarray[j]!=getdelid)
		{
			if(exp2=="")
				exp2=getselsklarray[j];
			else
				exp2+=","+getselsklarray[j];
		}
	}
	document.getElementById('selected_skills').value = exp2;
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
	page4name.value=exp1;
	form.url.value=4;
	form.dest.value=4;
	form.action=daction;
        enableDisabledRateFields();
	form.submit();
}

function addPage4()
{
	var form=document.conreg;
	form.dest.value=4;
	form.url.value=4;
	daction=form.daction.value;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page4name=eval("document.conreg.page4"+hrmhmsessionrn);
	if( form.name.value!="" || form.years.value!="" )
	{

	if(isPipeCap(form.name,"Skill Name") && isNumber(form.years,"Year"))
	{
		if(page4name.value=="")
		{
			page4name.value=trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
			form.action=daction;
                        enableDisabledRateFields();
			form.submit();
		}
		else
		{
	 		page4name.value+="^"+trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
			form.action=daction;
                        enableDisabledRateFields();
			form.submit();
		}
   	}
	}
}

function doPage5()
{
	var form=document.conreg;
	flag=true;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page5name=eval("document.conreg.page5"+hrmhmsessionrn);
	if(form.addr.value!="edit")
	{
		if( form.school.value!="" || form.city.value!="" || form.state.value!="" || form.countryid.value!="0" || form.levelid.value!="" )
		{
			flag=false;
			if(isnumchardotspace(form.school,"School or Program Name") && isnumchardotspace(form.city,"City") && isnumchardotspace(form.state,"State") && isnumchardotspace(form.countryid,"Country") && isPipeCap(form.levelid,"Degree/Level Attained"))
			{
				var dd=getValue(form.month)+"-"+getValue(form.year);
				if(page5name.value!="")
					page5name.value+="^"+trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
				else
					page5name.value=trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
				page5name.value=page5name.value;
				flag=true;
				return flag;
			}
		}
		else
		{
			return flag;
		}
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function delPage5(a)
{
	var exp1="";
	form=document.conreg;
	daction=form.daction.value;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page5name=eval("document.conreg.page5"+hrmhmsessionrn);
	exp=page5name.value;
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
	page5name.value=exp1;
	form.url.value=5;
	form.dest.value=5;
	form.action=daction;
        enableDisabledRateFields();
	form.submit();
}

function addPage5()
{
	
	var form=document.conreg;
	form.dest.value=5;
	form.url.value=5;
	daction=form.daction.value;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page5name=eval("document.conreg.page5"+hrmhmsessionrn);
	var dd=getValue(form.month)+"-"+getValue(form.year);
	if( form.school.value!="" || form.city.value!="" || form.state.value!="" || form.countryid.value!="0" || form.levelid.value!="" ||(form.month.selectedIndex!=0)||(form.year.selectedIndex!=0))
	{
	if(isnumchardotspace(form.school,"School or Program Name") && isnumchardotspace(form.city,"City") && isnumchardotspace(form.state,"State") && isnumchardotspace(form.countryid,"Country") && isPipeCap(form.levelid,"Degree/Level Attained"))
	{
		if(page5name.value=="")
			page5name.value=trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
		else
			page5name.value+="^"+trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
		form.action=daction;
                enableDisabledRateFields();
		form.submit();
	}
}
}

function doPage6()
{
	flag=true;
	form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page6name=eval("document.conreg.page6"+hrmhmsessionrn);
	if(form.addr.value!="edit")
	{
		dd=getValue(form.startmonth)+"-"+getValue(form.startyear);
		mm=getValue(form.endmonth)+"-"+getValue(form.endyear);
		
		var abc=getValue(form.startmonth);
        var abc1=getValue(form.endmonth);
        var aa=monthvalue1(abc);
        var bb=monthvalue1(abc1);
        var x=new Date();
        var y=new Date();
		var txt = $('#compensation_beginning').val();
		var re = /^[ A-Za-z0-9_@.,/$]*$/;

        x.setFullYear(getValue(form.startyear),aa,0);
        y.setFullYear(getValue(form.endyear),bb,0);
        if(x>y)
        {
            alert("End Date should be greater than Start Date");
            return;
        }

		if(form.name.value!="" || form.city.value!="" || form.state.value!="" || form.country.value!="0" || form.title.value!="" || form.discription.value!="" || form.compensation_beginning.value!="" || form.leaving_reason.value!="")
		{
			flag=false;
			if(isnumchardotspace(form.city,"City") && isnumchardotspace(form.state,"State") && isnumchardotspace(form.country,"Country") && isnumchardotspace(form.title,"Title") && isPipeCap(form.name,"Company Name") && isPipeCap(form.discription,"Description") && isPipeCap(form.compensation_beginning,"Compensation Beginning") && isPipeCap(form.leaving_reason,"Reason for Leaving"))
			{
			
				if (!re.test(txt)) {
				alert ("Please enter valid data. (/,@,$,. are allowed)");
				form.compensation_beginning.focus();
				return;
				
				}
				else
				{
					if(page6name.value=="")
						page6name.value=trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"|"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
					else
						page6name.value+="^"+trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"|"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
					flag=true;
					return flag;
				}					
			}
		}
		else
		{
			return flag;
		}
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function addPage6()
{
	form=document.conreg;
	form.dest.value=6;
	form.url.value=6;
	daction=form.daction.value;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page6name=eval("document.conreg.page6"+hrmhmsessionrn);
	var list="";
	if(form.name.value!="" || form.city.value!="" || form.state.value!="" || form.country.value!="0" || form.title.value!="" || form.discription.value!="" || form.compensation_beginning.value!="" || form.leaving_reason.value!="" || (form.startmonth.selectedIndex!=0)||(form.startyear.selectedIndex!=0) || (form.endmonth.selectedIndex!=0)||(form.endyear.selectedIndex!=0))
	{
		if(isnumchardotspace(form.city,"City") && isnumchardotspace(form.state,"State") && isnumchardotspace(form.country,"Country") && isnumchardotspace(form.title,"Title") && isPipeCap(form.name,"Company Name") && isPipeCap(form.discription,"Description") && isPipeCap(form.compensation_beginning,"Compensation Beginning") && isPipeCap(form.leaving_reason,"Reason for Leaving"))
		{
			var dd=getValue(form.startmonth)+"-"+getValue(form.startyear);
			var mm=getValue(form.endmonth)+"-"+getValue(form.endyear);
			
			var abc=getValue(form.startmonth);
			var abc1=getValue(form.endmonth);
			var aa=monthvalue1(abc);
			var bb=monthvalue1(abc1);
			var x=new Date();
			var y=new Date();
			var txt = $('#compensation_beginning').val();
			var re = /^[ A-Za-z0-9_@.,/$]*$/;
			
			x.setFullYear(getValue(form.startyear),aa,0);
			y.setFullYear(getValue(form.endyear),bb,0);
			if(x>y)
			{
				alert("End Date should be greater than Start Date");
				return;
			}
			if (!re.test(txt)) {
			alert ("Please enter valid data. (/,@,$,. are allowed)");
			form.compensation_beginning.focus();
			return;
				
			}
			else
			{
			list=trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"|"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
			}
		}
	}
	if(list!="")
	{
		if(page6name.value!="")
		{
			page6name.value+="^"+list;
		}
		else
		{
			page6name.value=list;
		}
                enableDisabledRateFields();
		form.submit();
	}
	
}

function delPage6(a)
{
	var exp1="";
	form=document.conreg;
	daction=form.daction.value;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page6name=eval("document.conreg.page6"+hrmhmsessionrn);
	exp=page6name.value;
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
	page6name.value=exp1;
        enableDisabledRateFields();
	form.submit();
}


function doPage7()
{
	form=document.conreg;
	if(form.addr.value!="edit")
	{
		var temp=getRadValue(form.relocate);
		flag=true;
		if(temp=="Yes")
		{
			if(form.city.value!="" || form.state.value!="" || form.country.value!="0" )
			{
				flag=false;
				if(isNotEmpty(form.city,"City") && isNotEmpty(form.state,"State") && isNotEmpty(form.country,"Country"))
				{
					if(isnumchardotspace(form.city,"City") && isnumchardotspace(form.state,"State") && isnumchardotspace(form.country,"Country"))
					{
						if(form.page7.value=="")
							form.page7.value=trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value);
						else
							form.page7.value+="^"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value);
						form.relocate.value="Yes";
						flag=true;
						return flag;
					}
				}
			}
			else
			{
				form.relocate.value="Yes";
				return flag;
			}
		}
		else
		{
			if(form.page7.value!="")
			{
				if(confirm("You have choosen willing to relocate any where as No. \n You will loss data entered for the Desired Locations."))
				{
					form.page7.value="";
					form.relocate.value="No";
					return flag;
				}
				else
				{
					return false;
				}
			}
			else
			{
				form.page7.value="";
				form.relocate.value="No";
				return flag;
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

function delPage7(a)
{
	var exp1="";
	form=document.conreg;
	daction=form.daction.value;
	exp=form.page7.value;
	var temp=getRadValue(form.relocate);
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
	form.dest.value=7;
	form.url.value=7;
	form.action=daction;
	form.page7.value=exp1;
	form.relocate.value=temp;
        enableDisabledRateFields();
	form.submit();
}

function addPage7()
{
	form=document.conreg;
	daction=form.daction.value;
	var list="";
	var temp=getRadValue(form.relocate);
	if(temp=="Yes")
	{
		//if(isNotEmpty(form.city,"City") && isNotEmpty(form.state,"State") && isNotEmpty(form.country,"Country") )
		//{
			if(isnumchardotspace(form.city,"City") && isnumchardotspace(form.state,"State") && isnumchardotspace(form.country,"Country"))
			{
				list=trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value);
			}
		//}
		if(list!="")
		{
			if(form.page7.value!="")
			{
				form.page7.value+="^"+list;
			}
			else
			{
				form.page7.value=list;
			}
			form.dest.value=7;
			form.url.value=7;
			form.action=daction;
			form.relocate.value="Yes";
                        enableDisabledRateFields();
			form.submit();
		}
	}
	else
	{
		alert("You can not add Desired Locations. \n Do you want to add Locations, please select willing to relocate as Yes");
	}
}

function doPage8()
{
	var form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page8name=eval("document.conreg.page8"+hrmhmsessionrn);
	if(form.addr.value!="edit")
	{
	    	page8name.value=getValue1(form.type)+"|"+getValue1(form.status)+"||||";
			pcou=page8name.value.split("|").length;
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

function doPage23()
{
	var form=document.conreg;
	var checked=true;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page23name=eval("document.conreg.page23"+hrmhmsessionrn);

 	if(form.addr.value!="edit")
	{
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

		form.page99.value=ad+"|"+sd;
		page23name.value=ad+"|"+sd;
		return true;
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
	var form		= document.conreg;
	var hrmhmsessionrn	= form.hrmhmsessionrn.value;
	var page9name		= eval("document.conreg.page9"+hrmhmsessionrn);
	var availsess		= eval("document.conreg.availsess"+hrmhmsessionrn);
	var checked		= true;
	var stat		= false;

 	if(form.addr.value!="edit")
	{
	      if(form.type.checked)
	      {
		    dd			= "immediate";
		    stat		= true;
		    availsess.value	= dd+"|";
	      }
	      else
	      {
		    if(form.amonth.value!=0 && form.aday.value!=0 && form.ayear.value!=0)
		    {
			  dd			= getValue(form.amonth)+"-"+getValue(form.aday)+"-"+getValue(form.ayear);
			  stat			= true;
			  availsess.value	= "other|"+dd;
		    }
		    else {
			  alert("Please select a valid Availability Date");
			  return;
		    }
	      }

	      var temp = getRadValue(form.status);
	      if(stat)
	      {
		    if(temp == "other")
		    {
			  //isNotEmpty(form.statusother,"Status Other") && Removed The Empty Validation For Status Other
			  if(isPipeCap(form.statusother,"Status Other"))
			  {
				page9name.value		= getRadValue(form.status)+"|"+trimAll(form.statusother.value)+"|"+dd+"||";
				return true;
			  }
		    }
		    else
		    {
			  if(temp!="")
			  {
				page9name.value		= getRadValue(form.status)+"|"+"-"+"|"+dd+"||";
				return true;
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

function doPage10()
{
	form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page10name=eval("document.conreg.page10"+hrmhmsessionrn);
	if(form.addr.value!="edit")
	{
		flag=true;
		
		var dd=getValue(form.smonth)+"-"+getValue(form.syear);
		var mm=getValue(form.pmonth)+"-"+getValue(form.pyear);

        var abc=getValue(form.smonth);
        var abc1=getValue(form.pmonth);
        var aa=monthvalue1(abc);
        var bb=monthvalue1(abc1);
        var x=new Date();
        var y=new Date();
        x.setFullYear(getValue(form.syear),aa,0);
        y.setFullYear(getValue(form.pyear),bb,0);
        if(x>y)
        {
            alert("End Date should be greater than Start Date");
            return;
        }
                        
		if(form.companyname.value!="" || form.aff.value!="" )
		{
			if(isnumchardotspace(form.companyname,"Name")  && isnumchardotspace(form.aff,"Role"))
			{
				flag=false;
				//if(isDate3())
				//{
					///if(isDate4())
					///{
						var dd=getValue(form.smonth)+"-"+getValue(form.syear);
						var mm=getValue(form.pmonth)+"-"+getValue(form.pyear);

						form.addr.value="new";
						if(page10name.value=="")
							page10name.value=trimAll(form.companyname.value)+"|"+trimAll(form.aff.value)+"|"+dd+"|"+mm;
						else
							page10name.value+="^"+trimAll(form.companyname.value)+"|"+trimAll(form.aff.value)+"|"+dd+"|"+mm;
						flag=true;
						return flag;
					//}
				//}
			}
		}
		else
		{
			return flag;
		}
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function delPage10(a)
{
	var exp1="";
	form=document.conreg;
	daction=form.daction.value;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page10name=eval("document.conreg.page10"+hrmhmsessionrn);
	exp=page10name.value;
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
	page10name.value=exp1;
	form.dest.value=10;
	form.url.value=10;
	form.action=daction;
        enableDisabledRateFields();
	form.submit();
}

function addPage10()
{
	form=document.conreg;
	daction=form.daction.value;
	form.dest.value=10;
	form.url.value=10;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page10name=eval("document.conreg.page10"+hrmhmsessionrn);
	var list="";
	if(isnumchardotspace(form.companyname,"Name")  && isnumchardotspace(form.aff,"Role"))
	{
		//if(isDate3())
		//{
			//if(isDate4())
			//{
				dd=getValue(form.smonth)+"-"+getValue(form.syear);
				mm=getValue(form.pmonth)+"-"+getValue(form.pyear);
				
				var abc=getValue(form.smonth);
                var abc1=getValue(form.pmonth);
                var aa=monthvalue1(abc);
                var bb=monthvalue1(abc1);
                var x=new Date();
                var y=new Date();
                x.setFullYear(getValue(form.syear),aa,0);
                y.setFullYear(getValue(form.pyear),bb,0);
                if(x>y)
                {
                    alert("End Date should be greater than Start Date");
                    return;
                }
				list=trimAll(form.companyname.value)+"|"+trimAll(form.aff.value)+"|"+dd+"|"+mm;
			//}
		//}
	}
	if(list!="")
	{
		if(page10name.value!="")
		{
			page10name.value+="^"+list;
		}
		else
		{
			page10name.value=list;
		}
                enableDisabledRateFields();
		form.submit();
	}
}

function doPage11()
{
	var form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page111name=eval("document.conreg.page111"+hrmhmsessionrn);
	if(form.addr.value!="edit")
	{
		if(invalid1(form.addinfo,"Additional Information"))
		{
			page111name.value=trimAll(form.addinfo.value);
			pcou=page111name.value.split("|").length;
			if(pcou==1)
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
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function doPage12()
{
	var checked=true;
	form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page12name=eval("document.conreg.page12"+hrmhmsessionrn);
	if(form.addr.value!="edit")
	{
		flag=true;
		if(form.name.value!="" || form.company.value!="" || form.title.value!="" || form.phone.value!="" || form.phone1.value!="" || form.phone2.value!="" || form.phone3.value!="" || form.email.value!="" || form.secondary.value!="" || form.secondary1.value!="" || form.secondary2.value!="" || form.secondary3.value!="" || form.mobile.value!="" || form.mobile1.value!="" || form.mobile2.value!="" || form.notes.value!="" || form.download_path.value!="")
		{
			flag=false;
			//if(isNotEmpty(form.name,"Name") && isNotEmpty(form.company,"Company") && isNotEmpty(form.title,"Title") && isNotEmpty(form.phone,"Phone") && isNotEmpty(form.phone1,"Phone") && isNotEmpty(form.phone2,"Phone") && isNotEmpty(form.email,"Email") )
			///{
				if(isnumchardotspace(form.name,"Name") && isPipeCap(form.company,"Company Name") && isnumchardotspace(form.title,"Tile") && isNumber(form.phone,"Phone") && isNumber(form.phone1,"Phone") && isNumber(form.phone2,"Phone") && isNumber(form.phone3,"Phone") && chkemail(form.email) && (isNumber(form.secondary,"Secondary Phone")) && (isNumber(form.secondary1,"Secondary Phone")) && (isNumber(form.secondary2,"Secondary Phone")) && (isNumber(form.secondary3,"Secondary Phone")) && (isNumber(form.mobile,"Mobile")) && (isNumber(form.mobile1,"Mobile")) && (isNumber(form.mobile2,"Mobile")) )
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
					if( (form.mobile.value!="" || form.mobile1.value!="" || form.mobile2.value!="") && checked)
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
						if(page12name.value=="")
							page12name.value=trimAll(form.name.value)+"|"+trimAll(form.company.value)+"|"+trimAll(form.title.value)+"|"+form.phone.value+"-"+form.phone1.value+"-"+form.phone2.value+"-"+form.phone3.value+"|"+trimAll(form.email.value)+"|"+getRadValue(form.relation)+"|"+form.secondary.value+"-"+form.secondary1.value+"-"+form.secondary2.value+"-"+form.secondary3.value+"|"+form.mobile.value+"-"+form.mobile1.value+"-"+form.mobile2.value+"|"+trimAll(form.notes.value)+"|"+trimAll(form.download_path.value);
						else
							page12name.value+="^"+trimAll(form.name.value)+"|"+trimAll(form.company.value)+"|"+trimAll(form.title.value)+"|"+form.phone.value+"-"+form.phone1.value+"-"+form.phone2.value+"-"+form.phone3.value+"|"+trimAll(form.email.value)+"|"+getRadValue(form.relation)+"|"+form.secondary.value+"-"+form.secondary1.value+"-"+form.secondary2.value+"-"+form.secondary3.value+"|"+form.mobile.value+"-"+form.mobile1.value+"-"+form.mobile2.value+"|"+trimAll(form.notes.value)+"|"+trimAll(form.download_path.value);
						flag=true;
					}
				}
			//}
			return flag;
		}
		else
		{
			return flag;
			form.addr.value="old";
		}
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function delPage12(a)
{
	var exp1="";
	form=document.conreg;
	daction=form.daction.value;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page12name=eval("document.conreg.page12"+hrmhmsessionrn);
	exp=page12name.value;
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
	page12name.value=exp1;
	form.dest.value=12;
	form.url.value=12;
	form.action=daction;
        enableDisabledRateFields();
	form.submit();
}

function addPage12()
{
	var checked=true;
	form=document.conreg;
	daction=form.daction.value;
	form.dest.value=12;
	form.url.value=12;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page12name=eval("document.conreg.page12"+hrmhmsessionrn);
	var list="";
	if(isNotEmpty(form.name,"Name") && isNotEmpty(form.company,"Company") && isNotEmpty(form.title,"Title") && isNotEmpty(form.phone,"Phone") && isNotEmpty(form.phone1,"Phone") && isNotEmpty(form.phone2,"Phone") && isNotEmpty(form.email,"Email") )
	{
		if(isnumchardotspace(form.name,"Name") && isPipeCap(form.company,"Company") && isnumchardotspace(form.title,"Tile") && isNumber(form.phone,"Phone") && isNumber(form.phone1,"Phone") && isNumber(form.phone2,"Phone") && isNumber(form.phone3,"Phone") && chkemail(form.email) && (isNumber(form.secondary,"Secondary Phone")) && (isNumber(form.secondary1,"Secondary Phone")) && (isNumber(form.secondary2,"Secondary Phone")) && (isNumber(form.secondary3,"Secondary Phone")) && (isNumber(form.mobile,"Mobile")) && (isNumber(form.mobile1,"Mobile")) && (isNumber(form.mobile2,"Mobile")) )
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
	}
	if(list!="")
	{
		if(page12name.value!="")
		{
			page12name.value+="^"+list;
		}
		else
		{
			page12name.value=list;
		}
                enableDisabledRateFields();
        document.getElementById("formsloading").style.display = 'block';
		$('.overlay').show();
		form.submit();
	}
}

function editPage1()
{
	form=document.conreg;
	daction=form.daction.value;
	form.dest.value=1;
	form.url.value=1;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page1name=eval("document.conreg.page1"+hrmhmsessionrn);
	if( (isNotEmpty(form.firstname,"First Name")) && (isNotEmpty(form.lastname,"Last Name")) && isNotEmpty(form.email,"Email") && (chkemail(form.email)) && (isSpl(form.firstname,"First Name")) && (isSpl(form.lastname,"Last Name")) && isSpl(form.middleinitial,"Middle") && isPipeCap(form.prtitle,"Profile Title"))
	{
	 	var mailid=(form.email.value).replace(new RegExp('\\s',"gi"),'');
		page1name.value=trimAll(form.firstname.value)+"|"+trimAll(form.middleinitial.value)+"|"+trimAll(form.lastname.value)+"|"+trimAll(mailid)+"|"+trimAll(form.referredby.value);
                enableDisabledRateFields();
		form.submit();
	}
}

function editPage2()
{
	checked=true;
	form=document.conreg;
	daction=form.daction.value;
	form.dest.value=2;
	form.url.value=2;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page2name=eval("document.conreg.page2"+hrmhmsessionrn);
	if(isPipeCap(form.address1,"Address Line1") && (isnumchardotspace(form.city,"City")) && (isnumchardotspace(form.state,"State")) && (isnumchardotspace(form.country,"Country")) && isPipeCap(form.zip,"Zip") && (isNumber(form.primary,"Primary Phone")) && (isNumber(form.primary1,"Primary Phone")) && (isNumber(form.primary2,"Primary Phone")) && (isNumber(form.primary3,"Primary Phone")) && (isNumber(form.secondary,"Secondary Phone")) && (isNumber(form.secondary1,"Secondary Phone")) && (isNumber(form.secondary2,"Secondary Phone")) && (isNumber(form.secondary3,"Secondary Phone")) && (isNumber(form.mobile,"Mobile")) && (isNumber(form.mobile1,"Mobile")) && (isNumber(form.mobile2,"Mobile")) && (isNumber(form.fax,"Fax")) && (isNumber(form.fax1,"Fax")) && (isNumber(form.fax2,"Fax")) )
	{
		if(( form.primary.value!="" || form.primary1.value!="" || form.primary2.value!="" || form.primary3.value!="") )
		{
			if( (chklen1(form.primary,"Primary Phone")) && (chklen1(form.primary1,"Primary Phone")) && (chklen2(form.primary2,"Primary Phone")) )
				checked=true;
			else
				checked=false;
		}
		if(( form.secondary.value!="" || form.secondary1.value!="" || form.secondary2.value!="" || form.secondary3.value!="") && checked)
		{
			if((chklen1(form.secondary,"Secondary Phone"))&&(chklen1(form.secondary1,"Secondary Phone"))&&(chklen2(form.secondary2,"Secondary Phone")) )
				checked=true;
			else
				checked=false;
		}
		if( form.mobile.value!="" || form.mobile1.value!="" || form.mobile2.value!="" && checked)
		{
			if( chklen1(form.mobile,"Mobile") && chklen1(form.mobile1,"Mobile") && chklen2(form.mobile2,"Mobile"))
				checked=true;
			else
				checked=false;
		}
		if( (form.fax.value!="" || form.fax1.value!="" || form.fax2.value!="") && checked)
		{
			if( chklen1(form.fax,"Fax") && chklen1(form.fax1,"Fax") && chklen2(form.fax2,"Fax"))
				checked=true;
			else
				checked=false;
		}
	}
	else
	{
		checked=false;
	}
	if(checked)
	{
		page2name.value=trimAll(form.address1.value)+"|"+trimAll(form.address2.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+form.zip.value+"|"+form.primary.value+"-"+form.primary1.value+"-"+form.primary2.value+"-"+form.primary3.value+"|"+form.secondary.value+"-"+form.secondary1.value+"-"+form.secondary2.value+"-"+form.secondary3.value+"|"+form.mobile.value+"-"+form.mobile1.value+"-"+form.mobile2.value+"|"+form.fax.value+"-"+form.fax1.value+"-"+form.fax2.value;
                enableDisabledRateFields();
		form.submit();
	}
}

function editPage3()
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=3;
	form.url.value=3;
	form.action=daction;
	if( invalid(form.objective,"Objective") && invalid(form.summary,"Summary") )
	{
		form.page3.value=trimAll(form.objective.value)+"|"+trimAll(form.summary.value);
                enableDisabledRateFields();
		form.submit();
	}
}

function editPage4(val)
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=4;
	form.url.value=4;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page4name=eval("document.conreg.page4"+hrmhmsessionrn);
	page4=page4name.value;
	sinpage4=page4.split("^");
	reqpage4="";
	var updSkill = '';
	var updInc=0;
	if(isPipeCap(form.name,"Skill Name") && isNumber(form.years,"Year"))
	{
				updSkill=trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value)+"|"+"editskill"+val+"|"+trimAll(form.dev_skill_id.value);
				updInc=1;
  	}
	for(i=0;i<sinpage4.length;i++)
	{
		if(i!=val)
		{
			if(reqpage4=="")
				reqpage4=sinpage4[i];
			else
				reqpage4+="^"+sinpage4[i];
		}
		else{
			if(reqpage4=="")
				reqpage4=updSkill;
			else
				reqpage4+="^"+updSkill;
		   }
	}
	if(updInc ==1)
	{
	    page4name.value=reqpage4;
		enableDisabledRateFields();
		form.submit();
   	}
}

function editPage5(val)
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=5;
	form.url.value=5;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page5name=eval("document.conreg.page5"+hrmhmsessionrn);
	page5=page5name.value;
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
	if(isnumchardotspace(form.school,"School or Program Name") && isnumchardotspace(form.city,"City") && isnumchardotspace(form.state,"State") && isnumchardotspace(form.countryid,"Country") && isPipeCap(form.levelid,"Degree/Level Attained"))
	{
		var dd=getValue(form.month)+"-"+getValue(form.year);
		if(reqpage5!="")
			page5name.value=reqpage5+"^"+trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
		else
			page5name.value=trimAll(form.school.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+ trimAll(form.countryid.value)+"|"+trimAll(form.levelid.value)+"|"+dd;
                    
                enableDisabledRateFields();
		form.submit();
	}
}

function editPage6(val)
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=6;
	form.url.value=6;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page6name=eval("document.conreg.page6"+hrmhmsessionrn);
	var txt = $('#compensation_beginning').val();
	var re = /^[ A-Za-z0-9_@.,/$]*$/;
	
	page6=page6name.value;
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
	if(invalid(form.name,"Company Name") && invalid2(form.name,"Company Name") && isnumchardotspace(form.city,"City") && isnumchardotspace(form.state,"State") && isnumchardotspace(form.country,"Country") && isnumchardotspace(form.title,"Title") && isPipeCap(form.name,"Company Name") && isPipeCap(form.discription,"Description") && isPipeCap(form.compensation_beginning,"Compensation Beginning") && isPipeCap(form.leaving_reason,"Reason for Leaving"))
	{
		dd=getValue(form.startmonth)+"-"+getValue(form.startyear);
		mm=getValue(form.endmonth)+"-"+getValue(form.endyear);
		
		var abc=getValue(form.startmonth);
        var abc1=getValue(form.endmonth);
        var aa=monthvalue1(abc);
        var bb=monthvalue1(abc1);
        var x=new Date();
        var y=new Date();
        x.setFullYear(getValue(form.startyear),aa,0);
        y.setFullYear(getValue(form.endyear),bb,0);
        if(x>y)
        {
            alert("End Date should be greater than Start Date");
            return;
        }
		if (!re.test(txt)) {
			alert ("Please enter valid data. (/,@,$,. are allowed)");
			form.compensation_beginning.focus();
			return;
			
		}
		else
		{
			if(reqpage6!="")
				page6name.value=reqpage6+"^"+trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"|"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
			else
				page6name.value=trimAll(form.name.value)+"|"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value)+"|"+trimAll(form.title.value)+"|"+dd+"|"+mm+"|"+trimAll(form.discription.value)+"|"+trimAll(form.compensation_beginning.value)+"|"+trimAll(form.leaving_reason.value);
                    
	                enableDisabledRateFields();
			form.submit();
		}
	}
}

function editPage7(val)
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=7;
	form.url.value=7;
	form.action=daction;

	page7=form.page7.value;
	sinpage7=page7.split("^");
	reqpage7="";
	for(i=0;i<sinpage7.length;i++)
	{
		if(i!=val)
		{
			if(reqpage7=="")
				reqpage7=sinpage7[i];
			else
				reqpage7+="^"+sinpage7[i];
		}
	}
	var temp=getRadValue(form.relocate);
	if(temp=="Yes")
	{
		if(isNotEmpty(form.city,"City") && isNotEmpty(form.state,"State") && isNotEmpty(form.country,"Country"))
		{
			if(isnumchardotspace(form.city,"City") && isnumchardotspace(form.state,"State") && isnumchardotspace(form.country,"Country"))
			{
				if(reqpage7!="")
					form.page7.value=reqpage7+"^"+trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value);
				else
					form.page7.value=trimAll(form.city.value)+"|"+trimAll(form.state.value)+"|"+trimAll(form.country.value);
				form.relocate.value="Yes";
                                enableDisabledRateFields();
				form.submit();
			}
		}
	}
	else
	{
		if(form.page7.value!="")
		{
			if(confirm("You have choosen willing to relocate any where as No. \n You will loss data entered for the Desired Locations."))
			{
				form.relocate.value="No";
				form.page7.value="";
                                enableDisabledRateFields();
				form.submit();
			}
		}
		else
		{
			form.relocate.value="No";
			form.page7.value="";
                        enableDisabledRateFields();
			form.submit();
		}
	}
}

function editPage8()
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=8;
	form.url.value=8;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page8name=eval("document.conreg.page8"+hrmhmsessionrn);
	page8name.value=getValue1(form.type)+"||||"+getValue(form.salarytypeid)+"|";
        enableDisabledRateFields();
        form.submit();
}

function editPage23()
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=23;
	form.url.value=23;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page23name=eval("document.conreg.page23"+hrmhmsessionrn);
	ad=getVal(form.smonth)+"-"+getVal(form.sday)+"-"+getVal(form.syear);
	sd=getVal(form.dmonth)+"-"+getVal(form.dday)+"-"+getVal(form.dyear);
	
	page23name.value=ad+"|"+sd;
        enableDisabledRateFields();
	form.submit();
}
function editPage9()
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=9;
	form.url.value=9;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page9name=eval("document.conreg.page9"+hrmhmsessionrn);
	if(form.type.checked)
	dd="immediate";
	else
		dd=getValue(form.amonth)+"-"+getValue(form.aday)+"-"+getValue(form.ayear);

	var temp=getRadValue(form.status);

	if(temp=="other")
	{
		if(isNotEmpty(form.statusother,"Status Other") && isPipeCap(form.statusother,"Status Other"))
		{
			page9name.value=getRadValue(form.status)+"|"+trimAll(form.statusother.value)+"|"+dd+"||";
                        enableDisabledRateFields();
			form.submit();
		}
	}
	else
	{
		if(temp!="")
		{
			page9name.value=getRadValue(form.status)+"|"+"-"+"|"+dd+"||";
                        enableDisabledRateFields();
			form.submit();
		}
	}
}
function editPage10(val)
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=10;
	form.url.value=10;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page10name=eval("document.conreg.page10"+hrmhmsessionrn);
	page10=page10name.value;
	sinpage10=page10.split("^");
	reqpage10="";
	for(i=0;i<sinpage10.length;i++)
	{
		if(i!=val)
		{
			if(reqpage10=="")
				reqpage10=sinpage10[i];
			else
				reqpage10+="^"+sinpage10[i];
		}
	}
	if(isnumchardotspace(form.companyname,"Name")  && isnumchardotspace(form.aff,"Role"))
	{
		//if(isDate3())
		//{
			//if(isDate4())
			//{
				dd=getValue(form.smonth)+"-"+getValue(form.syear);
				mm=getValue(form.pmonth)+"-"+getValue(form.pyear);
				if(reqpage10!="")
					page10name.value=reqpage10+"^"+trimAll(form.companyname.value)+"|"+trimAll(form.aff.value)+"|"+dd+"|"+mm;
				else
					page10name.value=trimAll(form.companyname.value)+"|"+trimAll(form.aff.value)+"|"+dd+"|"+mm;
                                
                                enableDisabledRateFields();
				form.submit();
			///}
		//}
	}
}

function editPage11()
{
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=11;
	form.url.value=11;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page111name=eval("document.conreg.page111"+hrmhmsessionrn);
	page111name.value=trimAll(form.addinfo.value);
        enableDisabledRateFields();
	form.submit();
}

function editPage12(val)
{
	var checked=true;
	var form=document.conreg;
	daction=form.daction.value;
	form.dest.value=12;
	form.url.value=12;
	form.action=daction;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page12name=eval("document.conreg.page12"+hrmhmsessionrn);
	page12=page12name.value;
	sinpage12=page12.split("^");
	reqpage12="";
	for(i=0;i<sinpage12.length;i++)
	{
		if(i!=val)
		{
			if(reqpage12=="")
				reqpage12=sinpage12[i];
			else
				reqpage12+="^"+sinpage12[i];
		}
	}
	if(isNotEmpty(form.name,"Name") && isNotEmpty(form.company,"Company") && isNotEmpty(form.title,"Title") && isNotEmpty(form.phone,"Phone") && isNotEmpty(form.phone1,"Phone") && isNotEmpty(form.phone2,"Phone") && isNotEmpty(form.email,"Email") )
	{
		if(isnumchardotspace(form.name,"Name") && isPipeCap(form.company,"Company") && isnumchardotspace(form.title,"Tile") && isNumber(form.phone,"Phone") && isNumber(form.phone1,"Phone") && isNumber(form.phone2,"Phone") && isNumber(form.phone3,"Phone") && chkemail(form.email) && (isNumber(form.secondary,"Secondary Phone")) && (isNumber(form.secondary1,"Secondary Phone")) && (isNumber(form.secondary2,"Secondary Phone")) && (isNumber(form.secondary3,"Secondary Phone")) && (isNumber(form.mobile,"Mobile")) && (isNumber(form.mobile1,"Mobile")) && (isNumber(form.mobile2,"Mobile")) )
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
				if(reqpage12!="")
					page12name.value=reqpage12+"^"+trimAll(form.name.value)+"|"+trimAll(form.company.value)+"|"+trimAll(form.title.value)+"|"+form.phone.value+"-"+form.phone1.value+"-"+form.phone2.value+"-"+form.phone3.value+"|"+trimAll(form.email.value)+"|"+getRadValue(form.relation)+"|"+form.secondary.value+"-"+form.secondary1.value+"-"+form.secondary2.value+"-"+form.secondary3.value+"|"+form.mobile.value+"-"+form.mobile1.value+"-"+form.mobile2.value+"|"+form.notes.value+"|"+form.download_path.value;
				else
					page12name.value=trimAll(form.name.value)+"|"+trimAll(form.company.value)+"|"+trimAll(form.title.value)+"|"+form.phone.value+"-"+form.phone1.value+"-"+form.phone2.value+"-"+form.phone3.value+"|"+trimAll(form.email.value)+"|"+getRadValue(form.relation)+"|"+form.secondary.value+"-"+form.secondary1.value+"-"+form.secondary2.value+"-"+form.secondary3.value+"|"+form.mobile.value+"-"+form.mobile1.value+"-"+form.mobile2.value+"|"+form.notes.value+"|"+form.download_path.value;
                                enableDisabledRateFields();

                document.getElementById("formsloading").style.display = 'block';
				$('.overlay').show();
				form.submit();
			}
		}
	}
}

function chkObjectType(obj){
    return obj && obj !== "null" && obj!== "undefined";
}


function getPage15()
{
	form=document.forms[0];
	var val=document.forms[0].staff.value;
	var smformdataFlag = 0;
	if(chkObjectType(form.hrmhmsessionrn))
	{
	  var hrmhmsessionrn=form.hrmhmsessionrn.value;
	  var page15name=eval("document.conreg.page15"+hrmhmsessionrn);
	  var page215name=eval("document.conreg.page215"+hrmhmsessionrn);
	  var hireCalname=eval("document.conreg.hireCal"+hrmhmsessionrn);
	  var smformdataname=eval("document.conreg.sm_form_data"+hrmhmsessionrn);
	  smformdataFlag = 1;
	  if(typeof(hireCalname) == "object")
		var vals=hireCalname.value;
	  else
		var vals="";
	}
	else
	{
	  var page15name=form.page15;
	  var page215name=form.page215;
	  
	  if(typeof(document.forms[0].hireCal) == "object")
		var vals=document.forms[0].hireCal.value;
	  else
		var vals="";
	}
	
	if (page215name.value != 'OP' && vals != 'YES')
	{
	      if(madison == "MADISON")
	      {
		      var validateMadisonVal		= form.validateMadison_ses.value;
		      var splitPageMad14		= validateMadisonVal.split("Page14|");
		      var splitPageMad15		= splitPageMad14[1].split("Page15|");
		      splitPageMad15[0]			= form.jotitle.value+"|Page15|";
		      form.validateMadison_ses.value	= splitPageMad14[0]+"Page14|"+splitPageMad15[0]+splitPageMad15[1];
	      }

	      if (syncHRDefault == "Y" || akkupayroll == "Y" ) {
		      var validateSyncHRVal	= form.validateSyncHR_ses.value;	
		      var splitPage14		= validateSyncHRVal.split("Page14|");
		      var splitPage15		= splitPage14[1].split("Page15|");
		      splitPage15[0]		= form.jotitle.value+"|Page15|";
		      form.validateSyncHR_ses.value = splitPage14[0]+"Page14|"+splitPage15[0]+splitPage15[1];
	      }
	}

	if(vals!="YES")
	{
		page15name.value="";
		page215name.value=val;
		var hiredetails;

		//validating fields if syncHR is enabled
		if((syncHRDefault == 'Y'|| akkupayroll == "Y") && !formSyncHRValidate('Hiring')) {
		      return;
		}

		if(form.jotype.value=="")
		{
			page15name.value="";
			return true;
		}
		else{
		    if(window.location.href.indexOf('/HRM/Hiring_Mngmt/newconreg15.php')!=-1)
		    {
			var jobval	= form.jotype.value.split("|");
			if(jobval[1] != "Direct" || jobval[1] != "Internal Direct")
			{
			    var payBillValidationFlag = validateBillableRates();
			    var PayBillValidationArr  = payBillValidationFlag.split("|");
			    if (PayBillValidationArr[0]=="1") {
				
				    if (!confirm("Do you want to continue with Nulls or Zero for Pay/Bill Rate(s).\n\nClick OK to continue\nClick Cancel to return"))
				    {
					    if (PayBillValidationArr[1]=="1") {
						    //$("#comm_payrate").focus();
						    $("#payratetype").focus();
						    
					    }
					    else if (PayBillValidationArr[1]=="2") {
						    //$("#comm_billrate").focus();
						    $("#billratetype").focus();
					    }
					    return;
				    }
			    }
			    var payBillCompareFlag = comparePayBillRates();
			    var payBillCompareArr  = payBillCompareFlag.split("|");
			    if (payBillCompareArr[0]==1) {
				    var dynMsg = "Bill Rate is equal/less than the pay rate for the selected rate(s).";
				    
				    if (payBillCompareArr[1]=="2") {
					    dynMsg = "Bill Rate is equal/less than the pay rate, which will affect the Margin.";
				    }
				    if (!confirm(dynMsg+".\n\nClick OK to continue\nClick Cancel to return"))
				    {
					    if (payBillCompareArr[1]=="2") {
						    //$("#comm_billrate").focus();
						    $("#billratetype").focus();
					    }
					    return;
				    }
			    }  		
			}
		    }
		}

		if(form.staff.value=="" && form.jotype.value!="")
		{
			alert("Assignment type is not selected, please select Assignment type");
			flag=false;
			return flag;
		}
		else
		{
			//checking any shift schedule is enabled or not
			if(chkObjectType(form.hrmhmsessionrn)) {
			      var smenabledoption = document.getElementById('sm_enabled_option'+hrmhmsessionrn).value;
			}
			else {
			      var smenabledoption = document.getElementById('sm_enabled_option').value;
			}

			if (smenabledoption == 'NEW') {
			    var smgetcalseldates = document.getElementById('getcalsel_dates').value;
			    
			    if(smgetcalseldates != '') {
				//checking any shift legends are checked -- /PSOS/scripts/shift_schedule/schCal_timeframe.js
				var chkshiftlegend = chkShiftLegendsChecked();
			  
				if (chkshiftlegend == 'N') {
				    alert('Please select a shift name to create an Assignment.');
				    return;
				}
				else if (chkshiftlegend == 'CN') {
				    alert('You can select only one shift to create an Assignment.');
				    return;
				}
			    }
			}

			if(madison=='MADISON' && !formValidate('conreg'))
				return;
			
			var jobval=form.jotype.value.split("|");
			if(MADISON_PAYROLL_PROCESS)
			{
				if(!validate_madison(jobval[1]))
				{
					flag = false;	
					return;
				}
			}
			
			hiredata=getHireDetails();
			var hdata=hiredata+"|"
			hiredet=hdata.split("|");

			//shift scheduling time frame details
			//forming selected dates and time string
			var smtfstr = getShiftTimeSlots();

			if( hiredet.length!=2)
			{
				var bt_details = "";
				var bi_details = "";
                                var custom_rates_details = "";
                                var custom_rates_ids = "";
				try
				{
					bt_details = document.getElementById('hdnbt_details').value;						
					bi_details = document.getElementById('hdnbi_details').value;
					//replacing the | with BTSPLIT to identify the multiple records if any
					bt_details = bt_details.replace(/[|]/g, "^^BTSPLIT^^");
					bi_details = bi_details.replace(/[|]/g, "^^BTSPLIT^^");
				}
				catch(btErr)
				{
				}
                                
                                
                                var bill_bt_details = "";
				var bill_bi_details = "";
                                try
				{
					bill_bt_details = document.getElementById('bill_hdnbt_details').value;						
					bill_bi_details = document.getElementById('bill_hdnbi_details').value;
					//replacing the | with BTSPLIT to identify the multiple records if any
					bill_bt_details = bill_bt_details.replace(/[|]/g, "^^BTSPLIT^^");
					bill_bi_details = bill_bi_details.replace(/[|]/g, "^^BTSPLIT^^");
				}
				catch(btErr)
				{
				}
                                
                                
                                
				try
				{						
					//var crArr = document.getElementById('selectedcustomratetypeids').value.split(",");
					custom_rates_ids = document.getElementById('selectedcustomratetypeids').value;

					//for(var i = 0; i < selectedprtidsarray.length; i++)
					var j = 0;
					$('.crRowClass').each(function() {

							var i = $(this).attr('crRowId');
							if(i != "")
							{
								var crSno = $(this).attr('crselectrateId');
								var cr_PR_Rate = document.getElementById('mulpayRateTxt['+i+']').value;
								var cr_PR_Period = document.getElementById('payratePeriod['+i+']').value;
								var cr_PR_Currency = document.getElementById('payrateCurrency['+i+']').value;
								var cr_PR_Billable = "N";
								var cr_PR_BillableObj = document.getElementById('billableR['+i+']');
								if(cr_PR_BillableObj.checked)
								{
										cr_PR_Billable = "Y";
								}

								var cr_BR_Rate = document.getElementById('mulbillRateTxt['+i+']').value;
								var cr_BR_Period = document.getElementById('billratePeriod['+i+']').value;
								var cr_BR_Currency = document.getElementById('billrateCurrency['+i+']').value;

								var cr_BR_Taxable = "N";
								var cr_BR_TaxableObj = document.getElementById('taxableR['+i+']');						
								if(cr_BR_TaxableObj.checked)
								{
										cr_BR_Taxable = "Y";
								}
								//ratetype^sno^rate^period^currency^payratebillable^billratetaxable
								var crStr = "payrate^"+crSno+"^"+cr_PR_Rate+"^"+cr_PR_Period+"^"+cr_PR_Currency+"^"+cr_PR_Billable+"^N";

								crStr += "^^CRSPLIT^^";

								//billrate
								crStr += "billrate^"+crSno+"^"+cr_BR_Rate+"^"+cr_BR_Period+"^"+cr_BR_Currency+"^N^"+cr_BR_Taxable;

								custom_rates_details += crStr+"^^CRSPLIT^^";
								j++;
							}
					});
				}
				catch(crErr)
				{
				}
                                var worksiteCode = "";
                                    if(akkupayroll=='Y'){
                                      worksiteCode = form.worksitecode.value;  
                                    }
        var symmetry = form.symmetry.value;
				var daypay = 'No';
				if(symmetry == 'Y'){

					if($('#daypay').prop('checked') == true){
	                		var daypay = 'Yes';
	            	}
				}
				var hiredetails=hiredata+"|"+bt_details+"|"+bi_details+"|"+custom_rates_ids+"|"+custom_rates_details+"|"+bill_bt_details+"|"+bill_bi_details+"||"+worksiteCode+"|"+daypay;
				//var hiredetails=hiredata+"|"+bt_details+"|"+bi_details;
				page15name.value=hiredetails;
				if(smformdataFlag == 1)
				{
					smformdataname.value = smtfstr;
				}
				flag=true;
				if(jobval[1]=="Direct")
				{
                                    if(akkupayroll=='Y' && AkkuFrmHire===true){
                                        flag=true;
                                        return flag;  
                                    }else{
                                      if(form.assignment.value == 'hireassignment')
                                        {					
                                           ok="ok";
                                           hireEmployee(ok);
                                        }
                                        else if(form.assignment.value == 'accountactiveassign')
                                        {
                                                ok="ok";
                                                hireEmployee6(ok);
                                        }
                                        flag=false;
                                        return flag;  
                                    }
				}
				else
				{
					flag=true;
					return flag;
				}
			}
			else
			{
				flag=false;
				return flag;
			}
		}
	}
	else
	{
		form=document.conreg;
    	flag=true;
    	return flag;
	}	
}

function getPage13()
{
	
	flag=false;
	form=document.conreg;
	dd=getVal(form.smonth)+"-"+getVal(form.sday)+"-"+getVal(form.syear);
	
	var validateSyncHRVal	= form.validateSyncHR_ses.value;
	var splitPage2		= validateSyncHRVal.split("Page2|");
	var splitPage13		= splitPage2[1].split("Page13|");
	splitPage13[0]		= dd+"|Page13|";
	form.validateSyncHR_ses.value = splitPage2[0]+"Page2|"+splitPage13[0]+splitPage13[1];
	
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page13name=eval("document.conreg.page13"+hrmhmsessionrn);
	

	
	if((madison == 'MADISON' || syncHRDefault == 'Y' || akkupayroll == "Y" || tricom_rep == "Y") && !formValidateDate('conreg'))
		return;
	


	if((syncHRDefault == 'Y' || akkupayroll == "Y") && !is_valid_popupday(getVal(form.syear),getVal(form.smonth),getVal(form.sday),"Please select a valid Date of Hire."))
		return;
		
	var validateMadisonVal = form.validateMadison_ses.value;
	var splitPage213 = validateMadisonVal.split("Page2|");
	var splitPage1314 = splitPage213[1].split("Page13|");
	var benfitStr=document.getElementById("hrconbenid").value;
	var earnedBenftRatObj=document.getElementsByName("ernd_bnfts_rate[]");
	var earnedBenftRatPerObj=document.getElementsByName("ernd_bnfts_rateper[]");
	var earnedBenftRatCurrObj=document.getElementsByName("ernd_bnfts_ratecurr[]");
	var earnedBenftRatAssgnrObj=document.getElementsByName("ernd_bnfts_rateassgn[]");
	var earnedBenftRatSpChkrObj=document.getElementsByName("ernd_bnfts_ratesepcheck[]");
	var earnedBenftNamObj=document.getElementsByName("erndBfntNm[]");
	var earned_bill_text=document.getElementsByName("earned_bill_text[]");
	var cntr=0;
	var perdiemchk;
	benfitStr='';
	for(cntr=0;cntr<earnedBenftRatObj.length;cntr++){
		if(!isNumbervalidation(earnedBenftRatObj[cntr],earnedBenftNamObj[cntr].value)){
			return;
		}
		var earned_bill_value="";
		var earned_billable_chk="N";
		var indexValue=parseInt(cntr)+parseInt(1);
		var earnedObj=document.getElementById("ernd_bnfts_billable"+indexValue);
		if(earnedObj.checked)
		{
			if(!isNumbervalidation(earned_bill_text[cntr],earnedBenftNamObj[cntr].value+" Bill Rate"))
				return;
			earned_bill_value = earned_bill_text[cntr].value;
			earned_billable_chk = "Y";
		}
		if(benfitStr==''){
			benfitStr=cntr+"^^^"+earnedBenftNamObj[cntr].value+"^^^"+earnedBenftRatObj[cntr].value+"^^^"+earnedBenftRatPerObj[cntr].options[earnedBenftRatPerObj[cntr].selectedIndex].value+"^^^"+earnedBenftRatCurrObj[cntr].options[earnedBenftRatCurrObj[cntr].selectedIndex].value+"^^^"+(earnedBenftRatAssgnrObj[cntr].checked?"Y":"N")+"^^^"+(earnedBenftRatSpChkrObj[cntr].checked?"Y":"N")+"^^^"+earned_billable_chk+"^^^"+earned_bill_value;
		}
		else{
			benfitStr=benfitStr+"~~~"+cntr+"^^^"+earnedBenftNamObj[cntr].value+"^^^"+earnedBenftRatObj[cntr].value+"^^^"+earnedBenftRatPerObj[cntr].options[earnedBenftRatPerObj[cntr].selectedIndex].value+"^^^"+earnedBenftRatCurrObj[cntr].options[earnedBenftRatCurrObj[cntr].selectedIndex].value+"^^^"+(earnedBenftRatAssgnrObj[cntr].checked?"Y":"N")+"^^^"+(earnedBenftRatSpChkrObj[cntr].checked?"Y":"N")+"^^^"+earned_billable_chk+"^^^"+earned_bill_value;
		}
	}
	if(!isNumbervalidation(document.getElementById("dbltimerate"),"Double time rate")){
		return;
	}
	
	var dbltimerateDetls=document.getElementById("dbltimerate").value+"^^^"+document.getElementById("dbltimerateper").options[document.getElementById("dbltimerateper").selectedIndex].value+"^^^"+document.getElementById("dbltimeratecurr").options[document.getElementById("dbltimeratecurr").selectedIndex].value+"^^^"+(document.getElementById("dbltimerateassgn").checked?"Y":"N")
	
	var assignOvtRt=document.getElementById("paycheck_ovt").checked?"Y":"N";
	var chkDoubleRate = document.getElementById("dbltimerateassgn").checked?"Y":"N";
	if(document.getElementById("paycheck_brt"))
		var assignBnRt=document.getElementById("paycheck_brt").checked?"Y":"N";
	else
		var assignBnRt='';
	var nav = "NAV";
	if(form.empcheck.checked)
		ec = 'Y';
	else
		ec = 'N';
	if(form.crmcheck.checked)
		crc = 'Y';
	else
		crc = 'N';
	if(form.paycheck.checked)
		cc = 'Y';
	else
		cc = 'N';
	if(form.notimesheet.checked)
		notime = 'Y';
	else
		notime = 'N';
    if(form.perdiemchk.checked)
		perdiemchk = 'Y';
	else
		perdiemchk = 'N';
		
	var chkworkcompcode = document.getElementById('chkworkcompcode').checked ? "Y" : "N";
	// var chkpaybasedcomp = document.getElementById('chkpaybasedcomp').checked ? "Y" : "N";
	
	if(MADISON_VALIDATION)
	{
		if(form.jtype.value == 'Direct' || form.jtype.value == 'Internal Direct' || form.jtype.value == '')
			var title = "Salary";
		else
			var title = "Payrate";
		
		if((!isNotEmpty_earned(form.salary,title)) || (!isNumberDot(form.salary,title)) || (!isNotEmpty_earned(form.otr,"Overtime Rate")) || (!isNumberDot(form.otr,"Overtime Rate")) || (!isNotEmpty_earned(form.dbltimerate,"Double Time Rate")) || (!isNumberDot(form.dbltimerate,"Double Time Rate")))
		return;
	}
	
	// if((chkpaybasedcomp == 'N') && ((!isNotEmpty_earned(form.txtpayhours,"Standard Hours / Pay Period")) || (!isNumberDot_earned(form.txtpayhours,"Standard Hours / Pay Period")) || (!isNotEmpty_earned(form.txtpaydays,"No. of Days in Pay Period")) || (!isNumberDot_earned(form.txtpaydays,"No. of Days in Pay Period"))))
	// 	return;
	var chkpaybasedcomp = 'N';
	
	// Validation Tricom 
	if(tricom_rep == "Y"){
	if (isSelDept(form.location,"Location") == false) {
		return false;} 
	if (isSelDept(form.dept,"Department") == false) {
		return false;} 
	}

	 

	//if(isSelDept(form.dept,"Department") && isNotEmpty(form.jobname,"Title") && isSelDept(form.location,"Location") )
	//{
		flag=false;
	
	if((getRadValue(form.radio_billabletype) == 'Y' && !isNumbervalidation(form.txtperdiem,"Perdiem Billrate")) || (getRadValue(form.rdobonus) == 'Y' && !isNumbervalidation(form.txtbonus,"Bonus Billrate")))
		return;
	 var paygroupcode = "0";
        /*if(akkupayroll == 'Y')
        {*/
            paygroupcode = form.paygroupcode.value;
        //}
        
	if(form.jtype.value == 'Direct' || form.jtype.value == 'Internal Direct' || form.jtype.value == '')
	{
		if(chkspchars()==true && isNumberDot_salary(form.salary,"Salary") && isNumberDot(form.otr,"Over Time Rate") && isNumberDot(form.bonus,"Bonus") && isNotEmptyPaygroup(paygroupcode,"Pay Schedule Name"))
		{	  

			page13name.value=form.empid.value+"|"+getVal(form.dept)+"|"+dd+"|"+getVal(form.location)+"|active|"+form.salary.value+"||"+form.otr.value+"|"+form.rev_per.value+"|"+form.inc.value+"|"+form.bonus.value+"|"+form.jobname.value+"|"+getText(form.dept)+"|"+nav+"|"+getVal(form.salper)+"||"+form.jtype.value+"|"+form.currencyid.value+"|"+form.otrcurrencyid.value+"|"+form.otrsalper.value+"|"+crc+"|||"+cc+"||||"+ec+"|"+notime+"|"+form.payrateassign.value+"|"+form.snoforwork.value+"|"+form.Hrstype.value+"|"+form.retschsno.value+"||"+benfitStr+"|"+dbltimerateDetls+"|"+assignOvtRt+"|"+assignBnRt+"|"+form.txt_lodging.value+"|"+form.txt_mie.value+"|"+form.txt_total.value+"|"+form.sel_perdiem2.value+"|"+form.sel_perdiem.value+"|"+getRadValue(form.radio_billabletype)+"|"+getRadValue(form.radio_taxabletype)+"|"+perdiemchk+"|"+getRadValue(form.rdobonus)+"|"+form.txtbonus.value+"|"+form.txtworkcompcode.value+"|"+chkworkcompcode+"|"+chkpaybasedcomp+"|"+form.lstpayperiod.value+"|"+form.txtpayhours.value+"|"+form.txtpaydays.value+"|"+form.txtperdiem.value+"|"+form.lstsetup1.value+"|"+form.lstsetup2.value+"|"+form.lstsetup3.value+"|"+paygroupcode;
			if(symmetrypayroll == 'Y'){
				page13name.value +="|"+form.company_code.value;
			}
			pcou=page13name.value.split("|").length;
			
			var date_hire = (dd == "0-0-0") ? "" : dd;
			var sal_val = ((form.salary.value == "0.00" || form.salary.value == "" || form.salary.value == "0") && cc == "Y" ) ? "0" : form.salary.value;
			var ovrate_val = ((form.otr.value == "0.00" || form.otr.value == "" || form.otr.value == "0") && assignOvtRt == "Y") ? "0" : form.otr.value;
			var dbrate_val = ((form.dbltimerate.value == "0.00" || form.dbltimerate.value == "" || form.dbltimerate.value == "0" ) && chkDoubleRate == "Y") ? "0" : form.dbltimerate.value;	
			var wcomp_code = (form.txtworkcompcode.value == "" && chkworkcompcode == "Y") ? "0" : form.txtworkcompcode.value;	

			splitPage1314[0]=form.jtype.value+"|"+date_hire+"|"+sal_val+"|"+ovrate_val+"|"+dbrate_val+"|"+wcomp_code+"|Page13|";
			form.validateMadison_ses.value = splitPage213[0]+"Page2|"+splitPage1314[0]+splitPage1314[1];

			if(form.typename.value=="Direct")
			{
				if(form.typecheck.value == 'hireassignment')
				{					
				   ok="ok";
				   hireEmployee(ok);
				}
				flag=false;
				return flag;
			}
			else
			{
				flag=true;
				return flag;
			}
		}
	}
	else if(form.jtype.value == 'Temp/Contract' || form.jtype.value == 'Temp/Contract to Direct' || form.jtype.value == 'Internal Temp/Contract' )
	{
		if(cc == 'N')
		{
			if(chkspchars()==true && isNumberDot(form.salary,"Pay Rate") && isNumberDot(form.otr,"Over Time Rate") && isNumberDot(form.bonus,"Bonus") && isNotEmptyPaygroup(paygroupcode,"Pay Schedule Name") )
			{	  
				page13name.value=form.empid.value+"|"+getVal(form.dept)+"|"+dd+"|"+getVal(form.location)+"|active|"+form.salary.value+"||"+form.otr.value+"|"+form.rev_per.value+"|"+form.inc.value+"|"+form.bonus.value+"|"+form.jobname.value+"|"+getText(form.dept)+"|"+nav+"|"+getVal(form.salper)+"||"+form.jtype.value+"|"+form.currencyid.value+"|"+form.otrcurrencyid.value+"|"+form.otrsalper.value+"|"+crc+"|||"+cc+"||||"+ec+"|"+notime+"|"+form.payrateassign.value+"|"+form.snoforwork.value+"|"+form.Hrstype.value+"|"+form.retschsno.value+"||"+benfitStr+"|"+dbltimerateDetls+"|"+assignOvtRt+"|"+assignBnRt+"|"+form.txt_lodging.value+"|"+form.txt_mie.value+"|"+form.txt_total.value+"|"+form.sel_perdiem2.value+"|"+form.sel_perdiem.value+"|"+getRadValue(form.radio_billabletype)+"|"+getRadValue(form.radio_taxabletype)+"|"+perdiemchk+"|"+getRadValue(form.rdobonus)+"|"+form.txtbonus.value+"|"+form.txtworkcompcode.value+"|"+chkworkcompcode+"|"+chkpaybasedcomp+"|"+form.lstpayperiod.value+"|"+form.txtpayhours.value+"|"+form.txtpaydays.value+"|"+form.txtperdiem.value+"|"+form.lstsetup1.value+"|"+form.lstsetup2.value+"|"+form.lstsetup3.value+"|"+paygroupcode;
				if(symmetrypayroll == 'Y'){
					page13name.value +="|"+form.company_code.value;
				}
				pcou=page13name.value.split("|").length;
				var date_hire = (dd == "0-0-0") ? "" : dd;
				var sal_val = ((form.salary.value == "0.00" || form.salary.value == "" || form.salary.value == "0") && cc == "Y" ) ? "0" : form.salary.value;
				var ovrate_val = ((form.otr.value == "0.00" || form.otr.value == "" || form.otr.value == "0") && assignOvtRt == "Y") ? "0" : form.otr.value;
				var dbrate_val = ((form.dbltimerate.value == "0.00" || form.dbltimerate.value == "" || form.dbltimerate.value == "0" ) && chkDoubleRate == "Y") ? "0" : form.dbltimerate.value;	
				var wcomp_code = (form.txtworkcompcode.value == "" && chkworkcompcode == "Y") ? "0" : form.txtworkcompcode.value;	
				
				splitPage1314[0]=form.jtype.value+"|"+date_hire+"|"+sal_val+"|"+ovrate_val+"|"+dbrate_val+"|"+wcomp_code+"|Page13|";
				form.validateMadison_ses.value = splitPage213[0]+"Page2|"+splitPage1314[0]+splitPage1314[1];

				//code provided for diplaying the alert box
				if(form.typename.value=="Direct")
				{
					if(form.typecheck.value == 'hireassignment')
					{					
					   ok="ok";
					   hireEmployee(ok);
					}
					flag=false;
					return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
			}
		}
		else if(cc == 'Y')
		{
			if(chkspchars()==true  && isNumberDot_salary(form.salary,"Pay Rate") && isNumberDot(form.otr,"Over Time Rate") && isNumberDot(form.bonus,"Bonus") && isNotEmptyPaygroup(paygroupcode,"Pay Schedule Name"))
			{	  
				page13name.value=form.empid.value+"|"+getVal(form.dept)+"|"+dd+"|"+getVal(form.location)+"|active|"+form.salary.value+"||"+form.otr.value+"|"+form.rev_per.value+"|"+form.inc.value+"|"+form.bonus.value+"|"+form.jobname.value+"|"+getText(form.dept)+"|"+nav+"|"+getVal(form.salper)+"||"+form.jtype.value+"|"+form.currencyid.value+"|"+form.otrcurrencyid.value+"|"+form.otrsalper.value+"|"+crc+"|||"+cc+"||||"+ec+"|"+notime+"|"+form.payrateassign.value+"|"+form.snoforwork.value+"|"+form.Hrstype.value+"|"+form.retschsno.value+"||"+benfitStr+"|"+dbltimerateDetls+"|"+assignOvtRt+"|"+assignBnRt+"|"+form.txt_lodging.value+"|"+form.txt_mie.value+"|"+form.txt_total.value+"|"+form.sel_perdiem2.value+"|"+form.sel_perdiem.value+"|"+getRadValue(form.radio_billabletype)+"|"+getRadValue(form.radio_taxabletype)+"|"+perdiemchk+"|"+getRadValue(form.rdobonus)+"|"+form.txtbonus.value+"|"+form.txtworkcompcode.value+"|"+chkworkcompcode+"|"+chkpaybasedcomp+"|"+form.lstpayperiod.value+"|"+form.txtpayhours.value+"|"+form.txtpaydays.value+"|"+form.txtperdiem.value+"|"+form.lstsetup1.value+"|"+form.lstsetup2.value+"|"+form.lstsetup3.value+"|"+paygroupcode;
				if(symmetrypayroll == 'Y'){
					page13name.value +="|"+form.company_code.value;
				}
				pcou=page13name.value.split("|").length;
			
				var date_hire = (dd == "0-0-0") ? "" : dd;
				var sal_val = ((form.salary.value == "0.00" || form.salary.value == "" || form.salary.value == "0") && cc == "Y" ) ? "0" : form.salary.value;
				var ovrate_val = ((form.otr.value == "0.00" || form.otr.value == "" || form.otr.value == "0") && assignOvtRt == "Y") ? "0" : form.otr.value;
				var dbrate_val = ((form.dbltimerate.value == "0.00" || form.dbltimerate.value == "" || form.dbltimerate.value == "0" ) && chkDoubleRate == "Y") ? "0" : form.dbltimerate.value;					
				var wcomp_code = (form.txtworkcompcode.value == "" && chkworkcompcode == "Y") ? "0" : form.txtworkcompcode.value;	
				
				splitPage1314[0]=form.jtype.value+"|"+date_hire+"|"+sal_val+"|"+ovrate_val+"|"+dbrate_val+"|"+wcomp_code+"|Page13|";
				
				form.validateMadison_ses.value = splitPage213[0]+"Page2|"+splitPage1314[0]+splitPage1314[1];
				//code provided for diplaying the alert box
				if(form.typename.value=="Direct")
				{
					if(form.typecheck.value == 'hireassignment')
					{					
					   ok="ok";
					   hireEmployee(ok);
						   
					}
					flag=false;
					return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
			}
		}
			
	}
	
	//}
	return flag;
}

function getPage1()
{
	flag=false;
	form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page1name=eval("document.conreg.page1"+hrmhmsessionrn);
	
	//Checking SyncHR Manadatory Fields is enabled or not
	if (syncHRDefault == 'Y'|| akkupayroll == "Y") {
		var synchr_variable = isNotEmpty(form.firstname,"First Name") && isSpace(form.firstname,"First Name") && isSpl(form.firstname,"First Name") && isNotEmpty(form.lastname,"Last Name") && isSpace(form.lastname,"Last Name") && isSpl(form.lastname,"Last Name") && isSpl(form.middleinitial,"Middle") && isNotEmpty(form.email,'Primary E-mail') && chkemail(form.email) && chkemail(form.aemail) && chkemail(form.oemail) && isPipeCap(form.prtitle,"Profile Title");
	}
	else {
		var synchr_variable = isNotEmpty(form.firstname,"First Name") && isSpace(form.firstname,"First Name") && isSpl(form.firstname,"First Name") && isNotEmpty(form.lastname,"Last Name") && isSpace(form.lastname,"Last Name") && isSpl(form.lastname,"Last Name") && isSpl(form.middleinitial,"Middle") &&  chkemail(form.email) && chkemail(form.aemail) && chkemail(form.oemail) && isPipeCap(form.prtitle,"Profile Title");
	}
	
	if(synchr_variable)
	{
	 	var mailid=(form.email.value).replace(new RegExp('\\s',"gi"),'');
		var amailid=(form.aemail.value).replace(new RegExp('\\s',"gi"),'');
		var omailid=(form.oemail.value).replace(new RegExp('\\s',"gi"),'');
		
		page1name.value=trimAll(form.firstname.value)+"|"+trimAll(form.middleinitial.value)+"|"+trimAll(form.lastname.value)+"|"+trimAll(mailid)+"|"+trimAll(form.prtitle.value)+"|"+trimAll(amailid)+"|"+trimAll(omailid);
		//code provided for diplaying the alert box
		if(form.typename.value=="Direct")
		{
			if(form.typecheck.value == 'hireassignment')
			{					
			   ok="ok";
			   hireEmployee(ok);				   
			}
			flag=false;
			return flag;
		}
	
		
	flag=true;
	}
	return flag;
}

function getPage4()
{
	flag=true;	
	var form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page4name=eval("document.conreg.page4"+hrmhmsessionrn);
	
	if(page4name.value=="")
	{
		if(chkspchars()==true)
		{
			
				if(page4name.value!="")
					page4name.value+="^"+trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
				else
					page4name.value=trimAll(form.name.value)+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+trimAll(form.years.value);
					
				//code provided for diplaying the alert box
				if(form.typename.value=="Direct")
				{
					if(form.typecheck.value == 'hireassignment')
					{					
					   ok="ok";
					   hireEmployee(ok);
						   
					}
					flag=false;
					return flag;
				}
				else
				{
					flag=true;
					return flag;
				}
		}
	}
	else
	{
		//code provided for diplaying the alert box
		if(form.typename.value=="Direct")
		{
			if(form.typecheck.value == 'hireassignment')
			{					
				ok="ok";
				hireEmployee(ok);
			}
			flag=false;
			return flag;
		}
		else
		{
			return flag;
		}
	}	   
}

function doSaveHire(val)
{
	form=document.conreg;
	form.savehire.value="Yes";
	if(form.addr.value=='edit'){
		doUHire(val);
	}else{
		doHire(val);
	}
}

function doHire(val)
{
	form=document.conreg;
	
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	
	try
	{
		var candsno = form.exist.value;
	}
	catch(e)
	{
		var candsno = "";
	}
	//this is for Accounting consulting vendors add candidates--Kiran

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
	

	if(val==1)
	{
		flag=getPage1();
		var page1name=eval("document.conreg.page1"+hrmhmsessionrn);
		var str = page1name.value;
		var dynamicUdfColVals = getdynamicudfcols();
	}
	else if(val==4)
	{
		flag=getPage4();
		var page4name=eval("document.conreg.page4"+hrmhmsessionrn);
		var str = page4name.value;
	}
	else if(val==13)
	{
		flag=getPage13();
		var page13name=eval("document.conreg.page13"+hrmhmsessionrn);
		var str = page13name.value;
	}
	else if(val==15)
	{
        if(window.location.href.indexOf('/HRM/Hiring_Mngmt/newconreg15.php')!=-1){
            AkkuFrmHire=true;
        }else{
            AkkuFrmHire=false;
        }
		flag=getPage15();
		var page15name=eval("document.conreg.page15"+hrmhmsessionrn);
		var str = page15name.value;
		var dynamicJobUdfColVals = getdynamicudfcols();

		//getting assignment tab >> time slots session data 
		var page15_smdata = eval("document.conreg.sm_form_data"+hrmhmsessionrn);
		var str_smdata = page15_smdata.value;
	}
	else if(val==26)
	{
		flag=getPage26();
		var page26name=eval("document.conreg.page26"+hrmhmsessionrn);
		var str = page26name.value;
		var dynamicUdfColVals = getdynamicudfcols();
	}

	if(flag)
	{
		
		if(val==26){
			document.getElementById("formsloading").style.display = 'block';
			$('.overlay').show();
		}
		form.dest.value=val;
		if(candsno == '')
		{
			if(val == 1)
			{
				var f_name = form.firstname.value;
				var l_name = form.lastname.value;
				DynCls_Ajax_result('/BSOS/Include/emailcheck.php?navigateModuleName=Hiring&f_name='+f_name+'&l_name='+l_name+'&dest_val='+val+'&str='+str+'&dynamicUdfColVals='+dynamicUdfColVals+'&valid_madison='+form.validateMadison_ses.value+'&HRM_HM_SESSIONRN='+hrmhmsessionrn,'Name','','Name_SSN_Checking()');
			}
			else
			{
				DynCls_Ajax_result('/BSOS/Include/emailcheck.php?navigateModuleName=Hiring&dest_val='+val+'&valid_madison='+form.validateMadison_ses.value+'&HRM_HM_SESSIONRN='+hrmhmsessionrn,'Name','str='+str+'&dynamicJobUdfColVals='+dynamicJobUdfColVals+'&str_smdata='+str_smdata+'&tricom_rep='+tricom_rep,'Name_SSN_Checking()');	
			}
		}
		else
		{
			if(val == 1)
			{
				var f_name = form.firstname.value;
				var l_name = form.lastname.value;
				DynCls_Ajax_result('/BSOS/Include/emailcheck.php?navigateModuleName=Hiring&f_name='+f_name+'&l_name='+l_name+'&dest_val='+val+'&str='+str+'&dynamicUdfColVals='+dynamicUdfColVals+'&cand_sno='+candsno+'&valid_madison='+form.validateMadison_ses.value+'&HRM_HM_SESSIONRN='+hrmhmsessionrn,'Name','','Name_SSN_Checking()');
			}
			else
			{
				DynCls_Ajax_result('/BSOS/Include/emailcheck.php?navigateModuleName=Hiring&cand_sno='+candsno+'&dest_val='+val+'&valid_madison='+form.validateMadison_ses.value+'&HRM_HM_SESSIONRN='+hrmhmsessionrn,'Name','str='+str+'&dynamicJobUdfColVals='+dynamicJobUdfColVals+'&str_smdata='+str_smdata,'Name_SSN_Checking()');	
			}
		}
	}
}

function Name_SSN_Checking()
{
	var ret_status=DynCls_Ajx_responseTxt;
	try { var candsno = form.exist.value; }
	catch(e) { var candsno = "";}
	form = document.conreg;
	var hrmhmsessionrn = form.hrmhmsessionrn.value;
	var hirecalval = "";
	if(chkObjectType(form.hrmhmsessionrn))
	{
        var hrmhmsessionrn = form.hrmhmsessionrn.value;
        var hireCalname = eval("document.conreg.hireCal"+hrmhmsessionrn);

        if(typeof(hireCalname) == "object")
            hirecalval = hireCalname.value;
	}
	else
	{
        if(typeof(document.forms[0].hireCal) == "object")
            hirecalval = document.forms[0].hireCal.value;
	}
        
	// IF quickbooks canada is enabled, do the QBC validation
	if (madison != "MADISON" && QBCDefault == "Y" && akkupayroll != "Y"){
		validQBCMandtory();
    }else if(madison != "MADISON" && QBCDefault == "Y" && akkupayroll == "Y") {
        validSyncHRMandtory(hirecalval);
    } else if (madison != "MADISON" && (syncHRDefault == "Y" || akkupayroll == "Y")){
		validSyncHRMandtory(hirecalval);
    } else if(madison == "MADISON" && ret_status == ''){
		validMadisonMandtory();
    }
   
    if (tricom_rep == 'Y') {
    	validTricomMandtory(hrmhmsessionrn);
    }
 
   
	if (valSyncHRFlag == true && valMadisonFlag == true && valQBCFlag == true && valTricomFlag == true) {
            
		if(ret_status == '')
		{
			if(valMadisonFlag == true)
            {
				if(candsno == '')
					form.action="chkconreg.php?hrmhmsessionrn="+hrmhmsessionrn;
				else
					form.action="chkconreg.php?cand_sno="+candsno+"&hrmhmsessionrn="+hrmhmsessionrn;
            }
            else
            {
				form.action="storeresume.php?hrmhmsessionrn="+hrmhmsessionrn;
            }
            enableCommissionRoles();
            disablealllinks();
            enableDisabledRateFields();
            form.submit();	
                    
        }
		else if(ret_status == 'location')
		{
			alert("You haven't selected a value for Location. Please select Location."); 
			if(form.dest.value != 13)
			{
				if(candsno != '')
				      form.action="storeresume.php?cand_sno="+candsno+"&mode=back&hrmhmsessionrn="+hrmhmsessionrn+"&locurl=13";
				else
				      form.action="storeresume.php?hrmhmsessionrn="+hrmhmsessionrn+"&locurl=13";
				enableDisabledRateFields();
				form.submit();
			}
			else
			{
				return;
			}
		}
		else if(ret_status == 'department')
		{
			alert("You haven't selected a value for Department. Please select Department."); 
			if(form.dest.value != 13)
			{
				if(candsno != '')
				      form.action="storeresume.php?cand_sno="+candsno+"&mode=back&hrmhmsessionrn="+hrmhmsessionrn+"&locurl=13";
				else
				      form.action="storeresume.php?hrmhmsessionrn="+hrmhmsessionrn+"&locurl=13";
				enableDisabledRateFields();
				form.submit();
			}
			else
			{
				return;
			}
		}
		else if(ret_status == 'loc_dept')
		{
			alert("You haven't selected either Location or Department. Please select Location / Department."); 
			if(form.dest.value != 13)
			{
				if(candsno != '')
				    form.action="storeresume.php?cand_sno="+candsno+"&mode=back&hrmhmsessionrn="+hrmhmsessionrn+"&url=13";
				else
				    form.action="storeresume.php?hrmhmsessionrn="+hrmhmsessionrn+"&url=13";
				enableDisabledRateFields();
				form.submit();
			}
			else
			{
				return;
			}
		}
		else if(ret_status == 'ssn')
		{
			alert('Employee with this Social Security Number already exists in Employee Management.\nPlease try entering a different Social Security Number and Hire.'); 
			if(form.dest.value != 14)
			{
				if(candsno != '')
					window.location.href='/BSOS/HRM/Hiring_Mngmt/newconreg14.php?cand_sno='+candsno+'&mode=back&HRM_HM_SESSIONRN='+hrmhmsessionrn;
				else
					window.location.href='/BSOS/HRM/Hiring_Mngmt/newconreg14.php?HRM_HM_SESSIONRN='+hrmhmsessionrn;
			}
			else
			{
				return;
			}
		}
		else if(ret_status == 'ssn_tax')
		{
			alert('There is an Employee record already exists with same Tax Profile in Employee Management. Please rehire.'); 
			if(form.dest.value != 14)
			{
				if(candsno != '')
					window.location.href='/BSOS/HRM/Hiring_Mngmt/newconreg14.php?cand_sno='+candsno+'&mode=back&HRM_HM_SESSIONRN='+hrmhmsessionrn;
				else
					window.location.href='/BSOS/HRM/Hiring_Mngmt/newconreg14.php?HRM_HM_SESSIONRN='+hrmhmsessionrn;
			}
			else
			{
				return;
			}
		}
		else if(ret_status == 'ssn_archive')
		{
			alert('There is a record with same SSN in Archived state. Please make it Available.'); 
			if(form.dest.value != 14)
			{
				if(candsno != '')
					window.location.href='/BSOS/HRM/Hiring_Mngmt/newconreg14.php?cand_sno='+candsno+'&mode=back&HRM_HM_SESSIONRN='+hrmhmsessionrn;
				else
					window.location.href='/BSOS/HRM/Hiring_Mngmt/newconreg14.php?HRM_HM_SESSIONRN='+hrmhmsessionrn;
			}
			else
			{
				return;
			}
		}
		else if(ret_status == 'name')
		{
			
			PopMsgFLineArr['duplicate_chk']="Employee with similar name already exists in Employee Management.";
			PopMsgQueArr['duplicate_chk']="Click on OK to continue hiring this employee.";
			PopMsgSLineArr['duplicate_chk']="";
			PopMsgExtMsgArr['duplicate_chk']='';
			if(candsno == '')
				display_Dynmic_Message('duplicate_chk','ok','cancel','','displaydupnamealert');
			else
				display_Dynmic_Message('duplicate_chk','ok','cancel','','displaydupnamealert');
		}
	}
	else
	{
		if (form.url.value != form.dest.value) {
		    form.action="storeresume.php?hrmhmsessionrn="+hrmhmsessionrn;
            enableDisabledRateFields();
		    form.submit();
		}
		else
		{
		    return false;
		}
	}

	return;	
}

function displaydupnamealert(retstatus)
{
	form = document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	try {
	var candsno = form.exist.value;
	}
	catch(e) { var candsno = "";}
	 switch(retstatus)
     {
    	case 'ok':
                                    if(valMadisonFlag == true && valSyncHRFlag == true)
                                    {
                                        
                                             
                                                if(candsno == '')
							form.action="chkconreg.php?hrmhmsessionrn="+hrmhmsessionrn;
						else
							form.action="chkconreg.php?cand_sno="+candsno+"&hrmhmsessionrn="+hrmhmsessionrn;    
                                        
                                     } else
					{
						form.action="storeresume.php?hrmhmsessionrn="+hrmhmsessionrn;
					}
					enableCommissionRoles();	
					disablealllinks();
                                        enableDisabledRateFields();
					form.submit();
					break;
		case 'cancel':
					if(form.dest.value != 1)
					{
						if(candsno != '')
							window.location.href='/BSOS/HRM/Hiring_Mngmt/newconreg1.php?cand_sno='+candsno+'&mode=back&HRM_HM_SESSIONRN='+hrmhmsessionrn;
						else
							window.location.href='/BSOS/HRM/Hiring_Mngmt/newconreg1.php?HRM_HM_SESSIONRN='+hrmhmsessionrn;
					}
					else
						return;
					break;
	 }
	
}

function disablealllinks()
{
  var link=document.getElementsByTagName("a");
  var linkcount=link.length;
  for(var i =0; i < linkcount; i++)
   {
	 var objmenu=document.getElementsByTagName("a")[i].href;
	 document.getElementsByTagName("a")[i].disabled = true;
	 document.getElementsByTagName("a")[i].style.cursor='default';
	 document.getElementsByTagName("a")[i].href="#";
  }
}

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
       	var v_width  = 200;
    	var v_heigth = 200;
    	var top=(window.screen.availHeight-v_heigth)/2;
    	var left=(window.screen.availWidth-v_width)/2;
		remote=window.open('dcalendar.php?mn='+mn+'&dy='+dy+'&yr='+yr+'&val='+val,'cal','width=200,height=200,resizable=no,scrollbars=no,status=0,left='+left+',top='+top);
		remote.focus();
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
			alert("\nThe "+name+" field accepts letters, numbers, '&' , single quote, Period, hyphen and space only.\n\nPlease re-enter your "+name+".");
			field.select();
			field.focus();
			return false;
		}
	}
	return true;
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

var cancelStatus="No";
valvarforupdateassignment = '';
linkobjectforupdateassignment = '';
actstatusvarforpalcement = '';

function SaveAsgn(retstatus)
{
	switch(retstatus)
	{
		case 'cancel': break;
		case 'true':
		    submitAssignment(valvarforupdateassignment,linkobjectforupdateassignment,actstatusvarforpalcement);		    
		    break;
	}
}

function doApprove(val,e,actstatus,savestatus)
{
  form=document.conreg;
  form.actstatus.value=actstatus;



  //////////////// validations for Pay Burden and Bill Burden required///////////////////////
	var ispayburdenenabled = document.getElementById("payburdenstatus").value;
	var isbillburdenenabled = document.getElementById("billburdenstatus").value;
    var jobtype = form.jotype.options[form.jotype.selectedIndex].text;
    
    
    if(ispayburdenenabled == 'Y')
    {
    	var payburden = document.getElementById("burdenType").value;
	    if(payburden == "" && jobtype != 'Direct' && jobtype != 'Internal Direct')
	    {
	    	alert("Please select a Pay Burden");
	    	document.getElementById("burdenType").focus();
	    	return;
	    }
	    
	}
	if(isbillburdenenabled == 'Y')
	{
		var billburden = document.getElementById("bill_burdenType").value;
		if(billburden == "" && jobtype != 'Direct' && jobtype != 'Internal Direct')
	    {
	    	alert("Please select a Bill Burden");
	    	document.getElementById("bill_burdenType").focus();
	    	return;
	    }
	}

   //////////////// validations for Pay Burden and Bill Burden required///////////////////////
  
  //setting value for hidden variable in the assignment.php file - rajesh
  if (savestatus === undefined) {
      form.savestatus.value = "";
      var smsavestatus = "";
  }else
  {
      form.savestatus.value = savestatus;
      var getassigncheck = 'save';
      var smsavestatus =  'save';
  }
  var hdnbralertflag = 0;
  
  try
  {
	if(actstatus == 'update')
	{
		hdnbralertflag = form.hdnbralertflag.value;
	}
  }
  catch(bralertErr)
  {
  }

  if(actstatus=="approve" && form.savestatus.value == "")
  {
	  document.getElementById("cancel_notes").style.display="none";
	  	if (document.getElementById("cancelReason")) {
			document.getElementById("cancelReason").style.display="none";
		}
	  cancelStatus="No";
	  form.astatus.value="active";
	  var getassigncheck = 'approve';
  }
  else if(actstatus == 'update') {
	  var getassigncheck = 'update';
  }
  else if(actstatus == 'cancel') {
	  var getassigncheck = 'cancel';
  }
  
  // Reason Code 
  var assign_status_reason_code = form.astatus.value;
  console.log("assign_status_reason_code => "+assign_status_reason_code);
  if (assign_status_reason_code == "cancel") {

  	if (document.getElementById('cancel_reason') && document.getElementById('requiredCancelReason')) {
  		var reason_cancel_code = form.cancel_reason.value;
  		var required_reason_cancel = form.requiredCancelReason.value;
  		if ((reason_cancel_code == "0" || reason_cancel_code == "") && required_reason_cancel =="Y") {
  			alert('Please select Cancel Reason.');
		    return;
  		}
  	};
  }else if(assign_status_reason_code == "closed") {
  	if (document.getElementById('close_reason') && document.getElementById('requiredCloseReason')) {
  		var reason_close_code = form.close_reason.value;
  		var required_reason_close = form.requiredCloseReason.value;
  		if ((reason_close_code == "0" || reason_close_code == "") && required_reason_close == "Y") {
  			alert('Please select Close Reason.');
		    return;
  		}
  	};
  };
  // End Reason Code


	//checking any shift schedule is enabled or not
	var smenabledoption = document.getElementById('sm_enabled_option').value;

	if (smenabledoption == 'NEW') {
	    var smgetcalseldates = document.getElementById('getcalsel_dates').value;
	    
	    if (smgetcalseldates != '') {
		//checking any shift legends are checked -- /PSOS/scripts/shift_schedule/schCal_timeframe.js
		var chkshiftlegend = chkShiftLegendsChecked();
	  
		if (chkshiftlegend == 'N') {
		    alert('Please select a shift name to '+getassigncheck+' an Assignment.');
		    return;
		}
		else if (chkshiftlegend == 'CN') {
		    alert('You can select only one shift to '+getassigncheck+' an Assignment.');
		    return;
		}
	    }
	}
	
	var jobval=form.jotype.value.split("|");
	if(tricom_rep=='Y'){
					if(form.workcode.value=='')
					{
						alert('Please select Workers Comp Code');
						return;
					}
				}

	if(getassigncheck!="cancel" && form.astatus.value=="active" && jobval[1] != "Direct" && jobval[1] != "Internal Direct")
	{
	      var payBillValidationFlag = validateBillableRates();
	      var PayBillValidationArr  = payBillValidationFlag.split("|");
		  if(tricom_rep=='Y'){
					if(form.comm_payrate.value=='')
					{
						alert('Please enter Regular Pay Rate');
						return;
					}
					if(form.otrate_pay.value=='')
					{
						alert('Please enter OverTime Pay Rate');
						return;
					}
					if(form.db_time_pay.value=='')
					{
						alert('Please enter DoubleTime Pay Rate');
						return;
					}
					if(form.comm_billrate.value=='')
					{
						alert('Please enter Regular Bill Rate');
						return;
					}
					if(form.otrate_bill.value=='')
					{
						alert('Please enter OverTime Bill Rate');
						return;
					}
					if(form.db_time_bill.value=='')
					{
						alert('Please enter DoubleTime Bill Rate');
						return;
					}
					/*var selectcustratecnt = form.selectedcustomratetypeids.value;
					if(selectcustratecnt!='')
					{
						for(var j = 0; j < selectcustratecnt.split(",").length; j++)
						{
							//if(document.getElementById ("payRateTxt["+j+"]").innerText=='Holiday Pay Rate')
							if(document.getElementById("payRateTxt["+j+"]").hasAttribute("holidayp")==true)
							{
								if(document.getElementById("mulpayRateTxt["+j+"]").value=='')
								{
									alert('Please Enter Holiday Pay Rate');
									return;
								}
							}
							//if(document.getElementById ("billRateTxt["+j+"]").innerText=='Holiday Bill Rate')
						    if(document.getElementById("billRateTxt["+j+"]").hasAttribute("holidayb")==true)		
							{
								if(document.getElementById("mulbillRateTxt["+j+"]").value=='')
								{
									alert('Please Enter Holiday Bill Rate');
									return;
								}
							}
						}
						
					}*/
					 var rolesLens = document.getElementById("hdnRoleCount").value;
					 if(rolesLens==''){
						 alert('Please select atleast one Commission Person.');
						 return;
					 }
					
				}
	      if (PayBillValidationArr[0]=="1") {
		  
		      if (!confirm("Do you want to continue with Nulls or Zero for Pay/Bill Rate(s).\n\nClick OK to continue\nClick Cancel to return"))
		      {
			      if (PayBillValidationArr[1]=="1") {
				      //$("#comm_payrate").focus();
				      $("#payratetype").focus();
				      
			      }
			      else if (PayBillValidationArr[1]=="2") {
				      //$("#comm_billrate").focus();
				      $("#billratetype").focus();
			      }
			      return;
		      }
	      }
	      var payBillCompareFlag = comparePayBillRates();
	      var payBillCompareArr  = payBillCompareFlag.split("|");
	      if (payBillCompareArr[0]==1) {
		      var dynMsg = "Bill Rate is equal/less than the pay rate for the selected rate(s).";
		      
		      if (payBillCompareArr[1]=="2") {
			      dynMsg = "Bill Rate is equal/less than the pay rate, which will affect the Margin.";
		      }
		      if (!confirm(dynMsg+".\n\nClick OK to continue\nClick Cancel to return"))
		      {
			      if (payBillCompareArr[1]=="2") {
				      //$("#comm_billrate").focus();
				      $("#billratetype").focus();
			      }
			      return;
		      }
	      }      
	}
    if(tricom_rep=='Y')
					{
						var rolesLens = document.getElementById("hdnRoleCount").value;
						 if(rolesLens==''){
							 alert('Please select atleast one Commission Person.');
							 return;
						 }
						if(jobval[1] == 'Direct' || jobval[1] == 'Internal Direct')
						{
							if(form.otrate_pay.value=='')
							{
								alert('Please enter OverTime Pay Rate');
								return;
							}
							if(form.db_time_pay.value=='')
							{
								alert('Please enter DoubleTime Pay Rate');
								return;
							}
						}
						
						
					}
	//shift scheduling time frame details
	//forming selected dates and time string
	//var smtfstr = getShiftTimeSlots();
	var smtfstr ='';
	document.getElementById('sm_form_data').value = smtfstr;
  	if (smenabledoption == 'NEW') {
	    // this function to check the employee avaliablity
	    /*if (document.getElementById("empcandid")) {
	    	recval = document.getElementById("empcandid").value;
	    	valEmployeesno = recval;
	    }else{
	    	recval = document.conreg.recno.value.split("|");
	    	valEmployeesno = recval[3];
	    }*/
	    if (document.getElementById("smTimeslotChangedflag") && smsavestatus !="save" && (actstatus == 'approve' || actstatus == 'update')) {
	    	var smChangedFlag = document.getElementById("smTimeslotChangedflag").value;
	    	if (smChangedFlag == 'Y') {
	    		alert("Employee/Candidate availability will be updated with the shift schedule from this Assignment.");
	    	}
	    }
		/*var EmployeeAvailabilityStatus = checkEmployeeAvailability(valEmployeesno,smtfstr);
		if (EmployeeAvailabilityStatus == "true") {
			if (confirm("Employee Avaliablity shifts are mismached or no shift are avaliable.so do you want to udate the Assignment shift to Employee Avaliablity.\nClick OK to update Employee Avaliablity\nClick Cancel to continue.")) {
				document.getElementById('overrideshifttimeslotempcand').value ="yes";
				
			}else{
				document.getElementById('overrideshifttimeslotempcand').value = "no";
				
			}
		}*/
	}
  if (actstatus == 'approve' || actstatus == 'update')
  {
  	if(hdnbralertflag == 1)
	{
		if(confirm("There are undelivered invoices in Accounting. Changing the bill rate on this assignment will affect the rates on the undelivered invoices.\nClick on OK to process or Cancel to return."))
		{
			hdnbralertflag = 0;
		}
		else
		{
			return;
		}
		
	}
	if(hdnbralertflag == 0)
	{
		//validating fields if syncHR is enabled
		if((syncHRDefault == 'Y'|| akkupayroll == "Y") && !formSyncHRValidate('Employee')) {
		      return;
		}
		
		var hiredata=getHireDetails();
		
		if(hiredata.indexOf("|") >= 0)
		{
		  var valhiredata = hiredata.split("|");
		  var valsd = valhiredata[12];
		  var valed = valhiredata[16];
		  var valassignsno = valhiredata[48];
		  
		  var valuserid = form.conusername.value;
		  var valempytype = 'approveAssignment';
		  
		  if(form.jotype.value=="")
		  {
			  alert("Job type is not selected, please select Job type");
			  flag=false;
			  return ;
		  }
		  else
		  {
		  if((form.smonth.value=="0" || form.sday.value=="0" || form.syear.value=="0"))
		  {
			  alert("Please select Start Date for this Assignment.");
			  document.getElementById("sched-start-date").className="crmsummary-edit-table-yellow";
			  return;
		  }
		  else
		  {
			  // PO NUMBER VALIDATION CHECK
			  if (form.po_num.value != "") {
	  
				  var objRegExp	= /^[A-Za-z0-9 _@./#:&-]*$/;
				  var po_number	= form.po_num.value;
	  
				  if (objRegExp.test(po_number) == false && form.po_num.className	!= "ponumber-error") {
	  
					  alert("PO Number field accepts alphabets, numbers & special characters _@./#:&- only. Please re-enter PO Number");
					  form.po_num.className	= "ponumber-error";
					  form.po_num.focus();
					  return;
	  
				  } else if(form.po_num.className	== "ponumber-error"){
					  form.po_num.focus();
					  return;
				  }else {
				  form.po_num.className	= "ponumber";
				  }
			  }

			// New Shiftname/ Time Functionality starts here
			var shiftName 			= "";
			var shift_st_time_val 	= "";
			var shift_et_time_val 	= "";

			if(smenabledoption=='OLD')
			{
				shiftNameDet 	  = form.new_shift_name.value;
			    	shiftNameInfo 	  = shiftNameDet.split("|");
			    	shiftName 	  = shiftNameInfo[1];
				shift_st_time_val = form.shift_start_time.value;
				shift_st_time 	  = $('#shift_start_time').find("option:selected").text();
				shift_et_time_val = form.shift_end_time.value;
				shift_et_time 	  = $('#shift_end_time').find("option:selected").text();
			}

			if(shiftName=='0')
			{
				shiftName = "";
			}
			var jobDet = form.jotype.value.split("|");
			var job_type = jobDet[1];
			if(job_type!="Direct" && job_type!="Internal Direct")
			{
				if(shiftName!='')
				{
				 	if((shift_st_time_val=="" || shift_st_time_val=='0') && (shift_et_time_val=="" || shift_et_time_val=='0'))
				    	{
				    		alert("Please Select Start Time and End Time");
				    		$("#shift_start_time").focus();
						return;
				   	 }
					else if(shift_st_time_val!="" && shift_st_time_val!='0'  && (shift_et_time_val=="" || shift_et_time_val=='0'))
					{
						alert("Please Select End Time");
						$('#shift_end_time').focus();
						return;
					}
					else if(shift_et_time_val!="" && shift_et_time_val!='0'  && (shift_st_time_val=="" || shift_st_time_val=='0'))
					{
						alert("Please Select Start Time");
						$('#shift_start_time').focus();
						return;
					}
					else
					{
						$('#shift_time_from').val(shift_st_time_val);
						$('#shift_time_to').val(shift_et_time_val);
					}
				    
				}
				else if(shift_st_time_val!="" && shift_st_time_val!='0'  && shift_et_time_val!="" && shift_et_time_val!='0' )
				{
					alert("Please Select Shift Name");
					$("#new_shift_name").focus();
					return;
				}
		   	}

			if (form.savestatus.value == "")//Checking if user clicked on the save/approve based on that only calling ajax - rajesh
			{
			  $.ajax({
			  url: "/BSOS/Include/getExistingAssignment.php?empytype="+valempytype+"&empuserid="+valuserid+"&sdate="+valsd+"&edate="+ed+"&assignsno="+valassignsno,
			  type: 'GET',
			  async:false,	      
			  success: function(data) {
				    
				    //assignsexists = confirm("This candidate has already been placed on an assignment in this work period.  \n\nAdditional assignments might result in overtime hours. Do you want to continue?");
				    
				    valvarforupdateassignment = val;
				    linkobjectforupdateassignment = e;
				    actstatusvarforpalcement = actstatus;
				    
				    var splitarray = data.split("^^AKKENSPLIT^^");
				    
				    if(splitarray[1] >= 1)
				    {
				    //assignsexists = confirm("This candidate has already been placed on an assignment in this work period.  \n\nAdditional assignments might result in overtime hours. Do you want to continue?");
				  
				    PopMsgHeadArr['AssignAlert']='ASSIGNMENT(S) ALERT';
				    PopMsgFLineArr['AssignAlert']="";
				    PopMsgQueArr['AssignAlert']="<span>This candidate/employee has already been placed on the below assignment(s) during this work period.<br><br>"+splitarray[0]+"<br><br>Additional assignments might result in overtime hours. Do you want to continue?</span>";
				    PopMsgSLineArr['AssignAlert']="";
				    PopMsgBtnTxtArr['assignButTxt']='OK';
				    PopMsgBtnValArr['assignButTxt']='true';
				    PopMsgExtMsgArr['AssignAlert']='';
				    display_Dynmic_Message('AssignAlert','cancel','assignButTxt','','SaveAsgn');
				    }
				    else
				    {
				      submitAssignment(val,e,actstatus);
				    }	   
			  }
			  });
			}
			else
			{
			  submitAssignment(val,e,actstatus);
			}
		  }
		  }
		  }
    }
  }
  else
  {
    // New Shiftname/ Time Functionality starts here
    var shiftName 			= "";
    var shift_st_time_val 	= "";
    var shift_et_time_val 	= "";

    if(smenabledoption=='OLD')
    {
	    shiftNameDet 	  = form.new_shift_name.value;
	    shiftNameInfo 	  = shiftNameDet.split("|");
	    shiftName 		  = shiftNameInfo[1];
	    shift_st_time_val = form.shift_start_time.value;
	    shift_et_time_val = form.shift_end_time.value;
	    $('#shift_time_from').val(shift_st_time_val);
	    $('#shift_time_to').val(shift_et_time_val);
    }    
    submitAssignment(val,e,actstatus);
  }
	
}


function submitAssignment(val,e,actstatus) {
  form=document.conreg;
  form.actstatus.value=actstatus;

  if(actstatus=="approve")
  {
	  	document.getElementById("cancel_notes").style.display="none";
	  	if (document.getElementById("cancelReason")) {
    		document.getElementById("cancelReason").style.display="none";
    	}
	  
	  cancelStatus="No";
	  form.astatus.value="active";
  }

  var jobval=form.jotype.value.split("|");

  if(madison=='MADISON' && !formValidate('conreg'))
	  return;

  if(MADISON_PAYROLL_PROCESS)
  {
	  if(!validate_madison(jobval[1]))
	  {
		  flag = false;	
		  return;
	  }
  }
  
  //validating fields if syncHR is enabled
  if((syncHRDefault == 'Y'|| akkupayroll == "Y") && !formSyncHRValidate('Employee')) {
	  return;
  }
  
    var cancel_falg="";	
    if(val=="cancelled" && cancelStatus=="No")
    {
	    document.getElementById("cancel_notes").style.display="";
	    if (document.getElementById("cancelReason")) {
	    	document.getElementById("cancelReason").style.display="";
	    	$.get('/BSOS/Accounting/Assignment/getReasonCodeData.php', 'module=assigncancelcode&getdata=all', function(data) {
				document.getElementById("cancel_reason").innerHTML = data;
			});
	    }	
	    form.astatus.value="cancel";
	    form.cancelstatus.value="cancel";
	    cancelStatus="YES";
	    disablelinksPrevious(e);
	    return;
    }
    else if(cancelStatus=="YES")
    {
	    val=15;		
    }

    if(typeof(document.getElementById("cancel_notes"))=='object')
	    cancel_falg=document.getElementById("cancel_notes").style.display;

    if(form.astatus.value=='cancel' && cancel_falg == "none")
    {
	    document.getElementById("cancel_notes").style.display="";
	    if (document.getElementById("cancelReason")) {
	    	document.getElementById("cancelReason").style.display="";
	    }	    
	    return;
    }

    if(document.getElementById("cancel_notes").style.display=="")
	    cancelStatus="YES";

    if(typeof(document.getElementById("cancel_notes"))=='object' && form.notes_cancel.value=='' && cancel_falg == "" && cancelStatus=="YES")
    {
    	
	    if(isNotEmptyField(form.notes_cancel,"Reason for Cancel"))
		    flag=true;
	    else
		    return;
    }

    if(form.astatus.value=='closed' || form.astatus.value=='cancel' || form.astatus.value=='active')
    {
	    if((form.smonth.value=="0" || form.sday.value=="0" || form.syear.value=="0") && document.getElementById("sched-start-date").style.display=="")
	    {
		    alert("Please select Start Date for this Assignment.");
		    document.getElementById("sched-start-date").className="crmsummary-edit-table-yellow";
		    return;
	    }
    }

    if(jobval[1] == "Direct" || jobval[1] == "Temp/Contract to Direct")
    {
		supusr=form.Supuser.value;
		curuser=form.usernme.value;
		if(supusr == curuser)
		{
			alert("You can not set job type as '"+jobval[1]+"' for Super User.");
			flag = false;
			return;
		}
		else
		{
			if(jobval[1] == "Direct" || (jobval[1] == "Temp/Contract to Direct" && form.astatus.value=="closed"))
			{
				if(form.dmonth.value=="0" || form.dday.value=="0" || form.dyear.value=="0")
				{
				  if (form.savestatus.value == "") //Checking if user clicked on the save/approve based on that hiding the alert message - rajesh
				  {
					alert("Please select End Date for this Assignment.\nTimesheets will not be allowed to Bill against this Assignment after the Selected End Date.");
					document.getElementById("sched-end-date").className="crmsummary-edit-table-yellow";
					form.dmonth.focus();
					return;
				  }
				}

				if(form.astatus.value!='cancel')
				{
				  if (form.savestatus.value == "")//Checking if user clicked on the save/approve based on that hiding popup window - rajesh
				  {
					directJobPopUp();
					return;
				  }
				}
			}
		}
    }

    if(form.astatus.value=='closed' || form.astatus.value=='cancel')
    {
	    if(form.dmonth.value=="0" || form.dday.value=="0" || form.dyear.value=="0")
	    {
		    alert("Please select an End Date for this Assignment.\nTimesheets will not be allowed to Bill against this Assignment after the Selected End Date.");
		    document.getElementById("sched-end-date").className="crmsummary-edit-table-yellow";
		    form.dmonth.focus();
		    return;
	    }
    }

    if(val==15)
	    flag=getPage15();

    if(flag)
    {
	    if(actstatus=="approve" && jcsSetup>0 && form.astatus.value=="active" && candChk3=="Y")
	    {
		    popup_JO_CAND();
	    }
	    else if(jcsSetup>0 && form.astatus.value=="closed" && (candChk1=="Y" || joChk1=="Y" || noteChk1=="Y"))
	    {
		    popup_JO_CAND();
	    }
	    else if(jcsSetup>0 && form.astatus.value=="cancel" && (candChk2=="Y" || joChk2=="Y" || noteChk2=="Y"))
	    {
		    popup_JO_CAND();
	    }
	    else
	    {
	            enableCommissionRoles();
                    enableDisabledRateFields();
		    form.dest.value=15;
		    form.action="approveempconreg.php";
		    if(tempflag == true)
		    {
			    updtFlg=1;
			    return;
		    }
		    disablelinks(e);
		    form.submit();
	    }
    }
  
}

function popup_JO_CAND()
{
	var form=document.conreg;
	var jobval=form.jotype.value.split("|");
	var recval=form.recno.value.split("|");
	popup_Msg_Close_Status='No';  // to open one more popup in same function

	PopMsgFLineArr['UpdAsgnStatus']="";
	PopMsgQueArr['UpdAsgnStatus']="";
	PopMsgSLineArr['UpdAsgnStatus']="";
	
	var getTerminateCloseHTML = getReHirePopUpData();

	if(form.astatus.value=="active")
	{
		PopMsgHeadArr['UpdAsgnStatus']='<font face=arial size=2>Updating Candidate Status</font>';

		PopMsgExtMsgArr['UpdAsgnStatus']="<table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" width=\"98%\">";
		PopMsgExtMsgArr['UpdAsgnStatus']+="<tr id=tcandStat3 style=\"display:none;\"><td><font size=\"1.0em\">&nbsp;Update Candidate Status to </font></td><td>"+candStat3+"</td></tr>";

		if (recval[2] == 'pending') {
		      PopMsgExtMsgArr['UpdAsgnStatus']+=getTerminateCloseHTML;
		}

		PopMsgExtMsgArr['UpdAsgnStatus']+="</table>";
	}
	else if(form.astatus.value=="closed")
	{
		PopMsgHeadArr['UpdAsgnStatus']='<font face=arial size=2>Updating Job Order / Candidate Status</font>';

		PopMsgExtMsgArr['UpdAsgnStatus']="<table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" width=\"98%\">";
		PopMsgExtMsgArr['UpdAsgnStatus']+="<tr id=tcandStat1 style=\"display:none;\"><td><font size=\"1.0em\">&nbsp;Update Candidate Status to </font></td><td>"+candStat1+"</td></tr>";
		PopMsgExtMsgArr['UpdAsgnStatus']+="<tr id=tjoStat1 style=\"display:none;\"><td><font size=\"1.0em\">&nbsp;Update Job Order Status to </font></td><td>"+joStat1+"</td></tr>";
		PopMsgExtMsgArr['UpdAsgnStatus']+="<tr id=tnoteStat1 style=\"display:none;\"><td valign=top><font size=\"1.0em\">Notes</font><font size=\"1.0em\"><br>(Shows in Candidate and Job Order Notes)</font></td><td valign=\"top\" align=\"left\"><textarea name=\"notes_new1\" cols=\"40\" rows=\"2\" id=\"notes_new1\"></textarea><br><font size=\"1.0em\">&nbsp;Note Type </font>"+noteStat1+"</td></tr>";
		PopMsgExtMsgArr['UpdAsgnStatus']+=getTerminateCloseHTML;
		PopMsgExtMsgArr['UpdAsgnStatus']+="</table>";
	}
	else if(form.astatus.value=="cancel")
	{
		PopMsgHeadArr['UpdAsgnStatus']='<font face=arial size=2>Updating Job Order / Candidate Status</font>';

		PopMsgExtMsgArr['UpdAsgnStatus']="<table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" width=\"98%\">";
		PopMsgExtMsgArr['UpdAsgnStatus']+="<tr id=tcandStat2 style=\"display:none;\"><td><font size=\"1.0em\">&nbsp;Update Candidate Status to </font></td><td>"+candStat2+"</td></tr>";
		PopMsgExtMsgArr['UpdAsgnStatus']+="<tr id=tjoStat2 style=\"display:none;\"><td><font size=\"1.0em\">&nbsp;Update Job Order Status to </font></td><td>"+joStat2+"</td></tr>";
		PopMsgExtMsgArr['UpdAsgnStatus']+="<tr id=tnoteStat2 style=\"display:none;\"><td valign=top><font size=\"1.0em\">Notes</font><font size=\"1.0em\"><br>(Shows in Candidate and Job Order Notes)</font></td><td valign=\"top\" align=\"left\"><textarea name=\"notes_new2\" cols=\"40\" rows=\"2\" id=\"notes_new2\"></textarea><br><font size=\"1.0em\">&nbsp;Note Type </font>"+noteStat2+"</td></tr>";
		PopMsgExtMsgArr['UpdAsgnStatus']+=getTerminateCloseHTML;
		PopMsgExtMsgArr['UpdAsgnStatus']+="</table>";
	}

	PopMsgBtnTxtArr['approve']='Update';
	PopMsgBtnValArr['approve']='Update';
	
	if (recval[2] == 'approved' && form.astatus.value == "active") {
		display_Dynmic_Message('UpdAsgnStatus','cancel','update','','JobCandApprove_Chk');
	}
	else {
		if (form.savestatus.value == "")//checks whether have to display popup window based on the save/update - rajesh
		{
		  display_Dynmic_Message('UpdAsgnStatus','cancel','update','','JobCand_Chk');
		}
		else{
		  JobCand_Chk('update');//bypassing the popup and calling the same function when click on OK of popup - rajesh
		}
	}

	if(navigator.appName!='Microsoft Internet Explorer')
	{
		document.getElementById("divClassUAS").style.height = '150px';
		document.getElementById("divMainYNC").style.height = '250px';
		document.getElementById("DHTMLSuite_modalBox_contentDiv").style.height = '300px';
		document.getElementById("DHTMLSuite_modalBox_shadowDiv").style.height = '300px';
	}

	showJoCandStatus();
}

function showJoCandStatus()
{
	var form=document.conreg;
	var radioVal = form.astatus.value;

	if(radioVal == "closed" && jcsSetup>0)
	{
		if(candChk1=="Y")
			document.getElementById("tcandStat1").style.display='';

		if(joChk1=="Y")
			document.getElementById("tjoStat1").style.display='';

		if(noteChk1=="Y")
			document.getElementById("tnoteStat1").style.display='';
	}

	if(radioVal == "cancel" && jcsSetup>0)
	{
		if(candChk2=="Y")
			document.getElementById("tcandStat2").style.display='';

		if(joChk2=="Y")
			document.getElementById("tjoStat2").style.display='';

		if(noteChk2=="Y")
			document.getElementById("tnoteStat2").style.display='';
	}

	if(radioVal == "active" && jcsSetup>0)
	{
		if(candChk3=="Y")
			document.getElementById("tcandStat3").style.display='';
	}
}

function JobCandApprove_Chk(retstatus)
{
	switch(retstatus)
	{
		case 'cancel': break;
		case 'update': JobCand_ChkStatus(); break;
	}
}

function JobCand_Chk(retstatus)
{
	switch(retstatus)
	{
		case 'cancel': break;
		case 'update': var getResStat = directJobAppASGN(); if(getResStat == true) { JobCand_ChkStatus(); } break;
	}
}

function JobCand_ChkStatus()
{
	form = document.conreg;
	var recval = form.recno.value.split("|");

	if(form.astatus.value=="active")
	{
	  if (form.savestatus.value == "")//Checking if user clicked on the save/approve based on that bypassing the assingment popup window - rajesh
	  {
		if(jcsSetup>0 && candChk3=="Y")
			form.getCandStatus.value = document.getElementById("candstat3").value;

		if (recval[2] == 'pending') {
			var getTerminateDate = document.getElementById("termonth").value+"-"+document.getElementById("terday").value+"-"+document.getElementById("teryear").value;
			var getEndDate = document.getElementById("endmonth").value+"-"+document.getElementById("endday").value+"-"+document.getElementById("endyear").value;
	
			if(document.getElementById('terminate').checked==true)
			{
				form.hterminate.value = "Y";
				form.hterdate.value = getTerminateDate;
			}
		
			if(document.getElementById('closeasgn').checked==true)
			{
				form.hcloseasgn.value = "Y";
				form.henddate.value = getEndDate;
			}
		}
	  }
	}
	else if(form.astatus.value=="closed")
	{
		if(jcsSetup>0 && joChk1=="Y")
			form.getJobStatus.value = document.getElementById("jostat1").value;

		if(jcsSetup>0 && candChk1=="Y")
			form.getCandStatus.value = document.getElementById("candstat1").value;

		if(document.getElementById("notes_new1"))
			form.getNotesNew.value = document.getElementById("notes_new1").value;

		if(document.getElementById("notestat1"))
			form.getNotesType.value = document.getElementById("notestat1").value;

		var getTerminateDate = document.getElementById("termonth").value+"-"+document.getElementById("terday").value+"-"+document.getElementById("teryear").value;
		var getEndDate = document.getElementById("endmonth").value+"-"+document.getElementById("endday").value+"-"+document.getElementById("endyear").value;

		if(document.getElementById('terminate').checked==true)
		{
			form.hterminate.value = "Y";
			form.hterdate.value = getTerminateDate;
		}
	
		if(document.getElementById('closeasgn').checked==true)
		{
			form.hcloseasgn.value = "Y";
			form.henddate.value = getEndDate;
		}
	}
	else
	{
		if(jcsSetup>0 && joChk2=="Y")
			form.getJobStatus.value = document.getElementById("jostat2").value;

		if(jcsSetup>0 && candChk2=="Y")
			form.getCandStatus.value = document.getElementById("candstat2").value;

		if(document.getElementById("notes_new2"))
			form.getNotesNew.value = document.getElementById("notes_new2").value;

		if(document.getElementById("notestat2"))
			form.getNotesType.value = document.getElementById("notestat2").value;

		var getTerminateDate = document.getElementById("termonth").value+"-"+document.getElementById("terday").value+"-"+document.getElementById("teryear").value;
		var getEndDate = document.getElementById("endmonth").value+"-"+document.getElementById("endday").value+"-"+document.getElementById("endyear").value;

		if(document.getElementById('terminate').checked==true)
		{
			form.hterminate.value = "Y";
			form.hterdate.value = getTerminateDate;
		}
	
		if(document.getElementById('closeasgn').checked==true)
		{
			form.hcloseasgn.value = "Y";
			form.henddate.value = getEndDate;
		}
	}

	enableCommissionRoles();
	form.dest.value=15;
	form.action="approveempconreg.php";
	if(tempflag == true)
	{
		updtFlg=1;
		return;
	}
        enableDisabledRateFields();
	document.getElementById("astatus").disabled = false;
	form.submit();
}

function directJobPopUp()
{
	var form=document.conreg;
	var conusername=form.conusername.value;
	var pusername=form.hdnAssid.value;

	DynCls_Ajax_result('activeAsgn.php?junktime='+(new Date().valueOf())+'&pusername='+pusername+'&conusername='+conusername,'','','setActiveAssignments()');
}

function setActiveAssignments()
{
	var form=document.conreg;
	var jobval=form.jotype.value.split("|");

	var activeAssignments = "";
	var ret_status=DynCls_Ajx_responseTxt;

	if(ret_status!="")
		activeAssignments = ret_status;
	else
		activeAssignments = "No Active Assignments are available.";

	var asgnDay = "";
	var asgnMonth = "";
	var optionvalue = "";
	var asgnselected = "";

	var asgnArryMonth = new Array('','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

	for(i = 1 ; i <= 31; i++)
	{
		optionvalue = (i < 10) ? '0'+i : i;
		asgnselected = (optionvalue == asgnAlertEndDay) ? 'selected' : '';
		asgnDay+="<option value=\""+optionvalue+"\" "+asgnselected+">"+optionvalue+"</option>";
	}

	for(i = 1; i < asgnArryMonth.length; i++)
	{
		optionvalue = (i < 10) ? '0'+i : i;		
		asgnselected = (optionvalue == asgnAlertEndMonth) ? 'selected' : '';
		asgnMonth+="<option value=\""+optionvalue+"\" "+asgnselected+">"+asgnArryMonth[i]+"</option>";
	}

	var getDYear = new Date();
	var sYear = getDYear.getFullYear() - 10;
	var eYear = getDYear.getFullYear() + 20;

	if(form.actstatus.value=="approve")
		PopMsgHeadArr['UpdAsgnStatus']='<font face=arial size=2>Approving '+jobval[1]+' Assignment</font>';
	else
		PopMsgHeadArr['UpdAsgnStatus']='<font face=arial size=2>Updating '+jobval[1]+' Assignment</font>';
	PopMsgFLineArr['UpdAsgnStatus']="";
	PopMsgQueArr['UpdAsgnStatus']="";
	PopMsgSLineArr['UpdAsgnStatus']="";

	PopMsgExtMsgArr['UpdAsgnStatus']="<table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" width=\"98%\">";
	
	//Get the candidate status of closed when assignment is closed for temp/contract to direct job type
	if(jobval[1] == 'Temp/Contract to Direct')
	{
		if(jcsSetup>0 && candChk1=="Y")
		{
			PopMsgExtMsgArr['UpdAsgnStatus']+="<tr><td colspan=\"2\"><font size=\"1.0em\">&nbsp;Update Candidate Status to </font>"+candStat1+"</td></tr>";
		}
	}
	else
	{
		if(jcsSetup>0 && candChk3=="Y")
		{
			PopMsgExtMsgArr['UpdAsgnStatus']+="<tr><td colspan=\"2\"><font size=\"1.0em\">&nbsp;Update Candidate Status to </font>"+candStat3+"</td></tr>";
		}
	}

	PopMsgExtMsgArr['UpdAsgnStatus']+="<tr><td colspan=\"2\"><fieldset><table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" width=\"100%\"><tr><td valign=\"center\"><font size=\"2.0em\">";
	PopMsgExtMsgArr['UpdAsgnStatus']+="<u><b>"+jobval[1]+" assignments require one of the following options:</b></u></font></td></tr><tr><td valign=\"top\"><INPUT type=checkbox value=\"Y\" name=\"terminate\" id=\"terminate\" checked><font size=\"1.0em\">Terminate employee with a Terminate Date of </font> <select name=\"termonth\" id=\"termonth\"><option value=\"0\">Month</option>"+asgnMonth+"</select><select name=\"terday\" id=\"terday\"><option value=\"0\">Day</option>"+asgnDay+"</select><select name=\"teryear\" id=\"teryear\"><option value=\"0\">Year</option>";
	for(var i=sYear; i<=eYear; i++)
	{
		asgnselected = (i == asgnAlertEndYear) ? 'selected' : '';
		PopMsgExtMsgArr['UpdAsgnStatus']+="<option value="+i+" "+asgnselected+">"+i+"</option>";
	}

	PopMsgExtMsgArr['UpdAsgnStatus']+="</select>&nbsp;<a href=\"javascript:calDateSelector('aterdate','terminate')\"><img src=/BSOS/images/crm/sm-icon-cal.gif width=\"14\" height=\"15\" title=\"\" border=\"0\" align=\"\"></a></td></tr><td valign=\"top\"><INPUT type=checkbox value=\"Y\" name=\"closeasgn\" id=\"closeasgn\" checked><font size=\"1.0em\">Close all active assignments for employee with a closed date of </font> <select name=\"endmonth\" id=\"endmonth\"><option value=\"0\">Month</option>"+asgnMonth+"</select><select name=\"endday\" id=\"endday\"><option value=\"0\">Day</option>"+asgnDay+"</select><select name=\"endyear\" id=\"endyear\"><option value=\"0\">Year</option>";
	for(var i=sYear; i<=eYear; i++)
	{
		asgnselected = (i == asgnAlertEndYear) ? 'selected' : '';
		PopMsgExtMsgArr['UpdAsgnStatus']+="<option value="+i+" "+asgnselected+">"+i+"</option>";
	}

	PopMsgExtMsgArr['UpdAsgnStatus']+="</select>&nbsp;<a href=\"javascript:calDateSelector('aenddate','enddate')\"><img src=/BSOS/images/crm/sm-icon-cal.gif width=\"14\" height=\"15\" title=\"\" border=\"0\" align=\"\"></a></td></tr>";

	if (jobval[1] == "Direct" || jobval[1] == "Temp/Contract to Direct") {
		PopMsgExtMsgArr['UpdAsgnStatus']+="<tr id=tjoStat1 colspan=\"2\"><td><font size=\"1.0em\">&nbsp;Update Job Order Status to </font>"+joStat1+"</td></tr><tr><td valign=\"top\">";
	}else{
		PopMsgExtMsgArr['UpdAsgnStatus']+="<tr><td valign=\"top\">";
	}

	PopMsgExtMsgArr['UpdAsgnStatus']+="<br><u><b><font size=\"2.0em\">Current Active Assignments:</font></u></b><br>";
	PopMsgExtMsgArr['UpdAsgnStatus']+="<font size=\"1.0em\"><b>Assignment ID (Start Date - End Date)</b><br>";
	PopMsgExtMsgArr['UpdAsgnStatus']+=activeAssignments;
	PopMsgExtMsgArr['UpdAsgnStatus']+="</font><br><br></td></tr></table></fieldset></td></tr></table>";

	if(form.actstatus.value=="approve")
	{
		PopMsgBtnTxtArr['approve']='Approve';
		PopMsgBtnValArr['approve']='approve';
		display_Dynmic_Message('UpdAsgnStatus','cancel','approve','','directJobApp_Chk');
	}
	else
	{
		PopMsgBtnTxtArr['approve']='Update';
		PopMsgBtnValArr['approve']='update';
		display_Dynmic_Message('UpdAsgnStatus','cancel','update','','directJobApp_Chk');
	}

	if(navigator.appName!='Microsoft Internet Explorer')
	{
		document.getElementById("divClassUAS").style.height = '350px';
		document.getElementById("divMainYNC").style.height = '460px';
		document.getElementById("DHTMLSuite_modalBox_contentDiv").style.height = '500px';
		document.getElementById("DHTMLSuite_modalBox_shadowDiv").style.height = '505px';				
	}
}

function directJobApp_Chk(retstatus)
{
	switch(retstatus)
	{
		case 'cancel': break;
		case 'approve': var getResStat = directJobAppASGN(); if(getResStat == true) {  directJobAppASGNStatus(); } break;
		case 'update': var getResStat = directJobAppASGN(); if(getResStat == true) {  directJobAppASGNStatus(); } break;
	}
}

function directJobAppASGN()
{
  if (form.savestatus.value == "")//bypassing the popup windows based on the save/approve clicks -  rajesh
  {
	if(document.getElementById('terminate').checked==true)
	{
		if(document.getElementById("termonth").value=="0" || document.getElementById("terday").value=="0" || document.getElementById("teryear").value=="0")
		{
			alert("Please select Termination Date.");
			return false;
		}

		var getValidDate = is_popup_valid_day(document.getElementById("teryear").value,document.getElementById("termonth").value,document.getElementById("terday").value,"Please select a valid date.");

		if(getValidDate == false)
			return false;
	}

	if(document.getElementById('closeasgn').checked==true)
	{
		if(document.getElementById("endmonth").value=="0" || document.getElementById("endday").value=="0" || document.getElementById("endyear").value=="0")
		{
			alert("Please select an End Date for Assignment(s).\nTimesheets & Expenses can be submitted only till the Selected End Date.");
			return false;
		}

		var getValidDate = is_popup_valid_day(document.getElementById("endyear").value,document.getElementById("endmonth").value,document.getElementById("endday").value,"Please select a valid date.");

		if(getValidDate == false)
			return false;
	}
  }
  return true;
}

function directJobAppASGNStatus()
{
	form = document.conreg;

	var getTerminateDate = document.getElementById("termonth").value+"-"+document.getElementById("terday").value+"-"+document.getElementById("teryear").value;
	var getEndDate = document.getElementById("endmonth").value+"-"+document.getElementById("endday").value+"-"+document.getElementById("endyear").value;

	if(document.getElementById('terminate').checked==true)
	{
		form.hterminate.value = "Y";
		form.hterdate.value = getTerminateDate;
	}

	if(document.getElementById('closeasgn').checked==true)
	{
		form.hcloseasgn.value = "Y";
		form.henddate.value = getEndDate;
	}

	if(form.actstatus.value=="approve")
	{
		if(jcsSetup>0 && candChk3=="Y")
			form.getCandStatus.value = document.getElementById("candstat3").value;
	}
	
	//This is for updating the candidate status when closed for temp/contract to direct job type
	var jobval=form.jotype.value.split("|");
	if(form.actstatus.value=="update" &&  form.astatus.value=="closed" && jobval[1] == 'Temp/Contract to Direct')
	{
		if(jcsSetup>0 && candChk1=="Y")
			form.getCandStatus.value = document.getElementById("candstat1").value;

		if(jcsSetup>0 && joChk1=="Y"){
			if (document.getElementById("jostat1")) {
				form.getJobStatus.value = document.getElementById("jostat1").value;
			}			
		}
	}
	// This is used to Update the JobOrder Status when Direct JobType is Approving (Direct will be closed when approving) -- SARANESH AR
	if (form.astatus.value=="active" && jobval[1] == 'Direct') {
		if(jcsSetup>0 && joChk1=="Y"){
			if (document.getElementById("jostat1")) {
				form.getJobStatus.value = document.getElementById("jostat1").value;
			}
		}
	}
		

	flag=getPage15();

	if(flag)
	{
		enableCommissionRoles();
		form.dest.value=15;
		form.action="approveempconreg.php";
		if(tempflag == true)
		{
			updtFlg=1;
			return;
		}
                enableDisabledRateFields();
		form.submit();
	}
}

function calDateSelector(val, frm)
{
	if(frm=="terminate")
	{
		var tempday = "terday";
		var tempmonth = "termonth";
		var tempyear = "teryear";
	}
	else
	{
		var tempday = "endday";
		var tempmonth = "endmonth";
		var tempyear = "endyear";
	}

	if(document.getElementById(tempmonth).value=="0" || document.getElementById(tempday).value=="0" || document.getElementById(tempyear).value=="0")
	{
		var getCurDateSel = new Date();
		var mn=getCurDateSel.getMonth()+1;
		var dy=getCurDateSel.getDate();
		var yr=getCurDateSel.getFullYear();
	}
	else
	{
		var mn=document.getElementById(tempmonth).value;
		var dy=document.getElementById(tempday).value;
		var yr=document.getElementById(tempyear).value;
	
	}

	var v_width  = 250;
	var v_heigth = 180;
	var top=(window.screen.availHeight-v_heigth)/2;
	var left=(window.screen.availWidth-v_width)/2;	
	remote=window.open('dcalendar.php?mn='+mn+'&dy='+dy+'&yr='+yr+'&val='+val,'cal', 'width='+v_width+',height='+v_heigth+',resizable=no,scrollbars=no,status=0,left='+left+',top='+top);
	remote.focus();
}

function getIntvalue(val)
{
	val=""+val;
	if(val.indexOf("0")==0 && val.length>1)
		val=val.substr(1);
	return parseInt(val);
}

function is_popup_valid_day(yy,mm,dd,msg)	
{
	var dd1=dd;
	dd=(typeof dd!="object")?getIntvalue(dd):getIntvalue(dd.value);
	mm=(typeof mm!="object")?getIntvalue(mm):getIntvalue(mm.value);
	yy=(typeof yy!="object")?getIntvalue(yy):getIntvalue(yy.value);
	mm=mm-1;

	var date=new Date();
	date.setFullYear(yy,mm,dd);

	if(getIntvalue(date.getFullYear())!=yy || getIntvalue(date.getMonth())!=mm || getIntvalue(date.getDate())!=dd)
	{
		if(msg==null)
			msg="Invalid Date";

		alert(msg);

		if(typeof dd1=="object")
			dd1.focus();
		return false;
	}
	else 
		return true;
}

function doPage41()
{
	var flag = true;
	trimtextbox();
	var form=document.conreg;
	if(form.addr.value!="edit")
	{
		if( form.name.value!="" || form.years.value!="" )
		{
			flag=false;
			if(isPipeCap(form.name,"Skill Name"))
			{
				if(form.page4.value!="")
					form.page4.value+="^"+form.name.value+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+form.years.value;
				else
					form.page4.value=form.name.value+"|"+getValue(form.usedid)+"|"+getValue(form.levelid)+"|"+form.years.value;
				flag=true;
				return flag;
			}
		}
		else
            return true;
	}
	else
	{
		alert("You are in edit mode, Please save this data first");
		flag=false;
		return flag;
	}
}

function validate1(url,dest)
{
    form=document.conreg;
	form.url.value=url;
	form.dest.value=dest;
	daction=form.daction.value;
	flag=doPage41();
    if(flag)
	{
		form.action=daction;
                enableDisabledRateFields();
		form.submit();
	}
}

function hireEmployee(retstatus)
{
	form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
  	if(form.pagename.value == "page1")
 		form.dest.value=1;
	else if(form.pagename.value == "page15")
 		form.dest.value=15;
	else if(form.pagename.value == "page4")
 		form.dest.value=4;
	else if(form.pagename.value == "page13")
 		form.dest.value=13;
 	else if(form.pagename.value == "page26")
 		form.dest.value=26;
	else
 		form.dest.value=21;

	enableCommissionRoles();
	form.action="chkconreg.php?hrmhmsessionrn="+hrmhmsessionrn;
        enableDisabledRateFields();
	form.submit();
}

function hireEmployee6(retstatus)//for accounting assignmente-Active and For Approvals
{
	if(form.astatus.value=="cancel")
	{
		popup_JO_CAND();
	}
	else
	{
		form=document.conreg;
		var jobval=form.jotype.value.split("|");
		var csstatus=form.currentStatus.value.split("|");
		form.dest.value=15;
		enableCommissionRoles();
		form.action="approveempconreg.php";
                enableDisabledRateFields();
		form.submit();
	}
}

//for Accounting Assignments if the status is Needs Approval
function addInternalDirect2()
{
	form=document.conreg;
	form.dest.value=15;
  	form.confirmToClose.value="YES";
	form.action="approveempconreg.php";	
	enableCommissionRoles();
        enableDisabledRateFields();
	form.submit();
}

function noInternalDirect2()
{
	form=document.conreg;
	form.dest.value=15;
	form.action="approveempconreg.php";
	enableCommissionRoles();
        enableDisabledRateFields();
	form.submit();
}

function displayInternalDirectAlert2(retstatus)
{
	switch(retstatus)
	{
		case 'cancel':  break;
		case 'yes':	addInternalDirect2();break;
		case 'no':	noInternalDirect2();break;
	}
}

function alertJobtiledisplay(EmpName)
{
	PopMsgHeadArr['assignalert']='Replace Employee Title';
	PopMsgFLineArr['assignalert']=EmpName+" is already an active employee in the system";
	PopMsgQueArr['assignalert']="Do you want this Job Title to replace "+EmpName+"’s current title?";
	PopMsgSLineArr['assignalert']=" ";
	PopMsgExtMsgArr['assignalert']='';	
	popup_Msg_Close_Status='No';//variable set to get the second alert also
	display_Dynmic_Message('assignalert','cancel','yes','no','displayassignalert1');
	return;
	
}
function displayassignalert1(retstatus)
{
	switch(retstatus)
	{
		case 'cancel':return;  break;
		case 'yes': addJobtitle(); break;
		case 'no':	noJobtitle(); break;
	}
}

function addJobtitle()
{
	form=document.conreg;
	form.action="approveempconreg.php";
	enableCommissionRoles();
	form.acceptJobtitle.value="YES";
        enableDisabledRateFields();
	form.submit();
}
function noJobtitle()
{
	form=document.conreg;
	enableCommissionRoles();
	form.action="approveempconreg.php";
        enableDisabledRateFields();
	form.submit();
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
   }	 
	else
	{
		 document.getElementById('DirectDepositBlock1').style.display= '';
		 document.getElementById('DirectDepositBlock2').style.display= '';
		 document.getElementById('DirectDepositBlock3').style.display= '';
		 document.getElementById('DirectDepositBlock4').style.display= '';
		 document.getElementById('DirectDepositBlock5').style.display= '';
	}	 
}

function disablelinksPrevious(objtag)
{
	var link=objtag.document.getElementsByTagName("a");
	var linkcount=link.length;
	for(var i =0; i < linkcount; i++)
	{
		var objmenu=document.getElementsByTagName("a")[i].href;
		if(objmenu=="javascript:doApprove(15,this)")
		{
			document.getElementsByTagName("a")[i].disabled = true;
			document.getElementsByTagName("a")[i].style.cursor='default';
			document.getElementsByTagName("a")[i].href="#";
		}
	}
}

function saveConsultant(val)
{
   doHire(val);
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

function validMadisonMandtory()
{
	var form=document.conreg;
	var validateMadisonVal = form.validateMadison_ses.value;
	var splitPage213 = validateMadisonVal.split("Page2|");
	var splitPage1314 = splitPage213[1].split("Page13|");
	var splitPage1417 = splitPage1314[1].split("Page14|");
	
	if((syncHRDefault == "Y") && (validateMadisonVal.indexOf("Page15|") > -1))
	    var splitPage1415 = splitPage1417[1].split("Page15|");
	
	var page2Value = splitPage213[0];
	var page13Value = splitPage1314[0];
	var page14Value = splitPage1417[0];
	
	if((syncHRDefault == "Y") && (validateMadisonVal.indexOf("Page15|") > -1))
	{
	    var page15Value = splitPage1415[0];
	    var page17Value = splitPage1415[1];
	}
	else
	    var page17Value = splitPage1417[1];
	
	var splitPage2Val = page2Value.split("|");
	var splitPage13Val = page13Value.split("|");
	var splitPage14Val = page14Value.split("|");

	if((syncHRDefault == "Y") && (validateMadisonVal.indexOf("Page15|") > -1))
	    var splitPage15Val = page15Value.split("|");

	var splitPage17Val = page17Value.split("|");

	var mandPage2Arr=Array;
	var flag=true

	if(syncHRDefault == "Y")
	    mandPage2Arr = Array('Address Line1','City','State','Country','Zip','Primary Phone');
	else
	    mandPage2Arr = Array('Address Line1','City','State','Zip');

	var Page2ArrLen = mandPage2Arr.length;
	
	var mandPage13Arr=Array;
	var sal_prate_val = (splitPage13Val[0] == "Internal Direct") ? 'Salary' : 'Pay Rate';	
	mandPage13Arr=Array('Employee Type','Date of Hire',sal_prate_val,'Over Time Rate','Double Time Rate','Workers Comp Code');
	var Page13ArrLen = mandPage13Arr.length;	
	
	var mandPage14Arr=Array;

	if(syncHRDefault == "Y")
	    mandPage14Arr = Array('Date of Birth','SSN');
	else
	    mandPage14Arr = Array('SSN');

	var Page14ArrLen = mandPage14Arr.length;
	
	if((syncHRDefault == "Y") && (validateMadisonVal.indexOf("Page15|") > -1))
	{
	    var mandPage15Arr = Array;
	    mandPage15Arr = Array('Assignment Name');
	    var Page15ArrLen = mandPage15Arr.length;
	}
	
	var mandPage17Arr=Array;
	mandPage17Arr=Array('W-2','Total Federal Tax Allowances','Withholding state of the employee','Total State Tax Allowances');
	var Page17ArrLen = mandPage17Arr.length;
	
	for(var i=0;i<Page2ArrLen;i++)
	{
		if(splitPage2Val[i] == "")
		{
			alert("The "+mandPage2Arr[i]+" Field in Contact Info is Empty.");
			form.url.value=2;
			valMadisonFlag = false;
			return;
		}
	}
		
	for(var j=0;j<Page13ArrLen;j++)
	{
		if(splitPage13Val[j] == "" || splitPage13Val[j] == "0-0-0")
		{
			if(splitPage13Val[0]=='' && localStorage.getItem("samasjob")!='Y')
			{
				alert("The "+mandPage13Arr[j]+" Field in Compensation is Empty.");
				form.url.value=13;
				valMadisonFlag = false;
				return;
			}
		}
	}

	for(var j=0;j<Page14ArrLen;j++)
	{
		if(splitPage14Val[j] == "" || splitPage14Val[j] == "0-0-0")
		{
			alert("The "+mandPage14Arr[j]+" Field in Personal Profile is Empty");
			form.url.value=14;
			valMadisonFlag = false;
			return;
		}
	}
        
	//added this code to control the save candidate functionality from accounting vendores while create a new candiddate from that page
        if(fromAccountingVendor=='' || fromAccountingVConsultant==''){
            if((syncHRDefault == "Y" || akkupayroll=='Y') && (validateMadisonVal.indexOf("Page15|") > -1))
            {
	    for(var l=0; l<Page15ArrLen; l++)
	    {
		    if(splitPage15Val[l] == "")
		    {
			    alert("The "+mandPage15Arr[l]+" Field in Assignments is Empty.");
			    form.url.value = 15;
			    valMadisonFlag = false;
			    return;
		    }
	    }
	}
	
	if(splitPage17Val[0] == "W-2")
	{
		for(var j=1;j<Page17ArrLen;j++)
		{
			if(splitPage17Val[j] == "")
			{
				alert("The "+mandPage17Arr[j]+" Field in Tax Deductions is Empty");
				form.url.value=17;
				valMadisonFlag = false;
				return;
			}
		}
	}
        }
}

// 

function validTricomMandtory(hrmhmsessionrn) {

	// get data for tricom validation
	DynCls_Ajax_result('/BSOS/Include/emailcheck.php?navigateModuleName=getHiring&valid_tricom=yes&HRM_HM_SESSIONRN='+hrmhmsessionrn,'','','');

	var validateTricomVal = DynCls_Ajx_responseTxt;
	//alert("validateTricomVal-> "+validateTricomVal);
	var form=document.conreg;
	var validateMadisonVal = form.validateMadison_ses.value;
	//alert(validateMadisonVal);
	var splitPage213 = validateMadisonVal.split("Page2|");
	var splitPage1314 = splitPage213[1].split("Page13|");
	var splitPage1417 = splitPage1314[1].split("Page14|");
	
	if((syncHRDefault == "Y") && (validateMadisonVal.indexOf("Page15|") > -1))
	    var splitPage1415 = splitPage1417[1].split("Page15|");
	
	var page2Value = splitPage213[0];
	var page13Value = splitPage1314[0];
	var page14Value = splitPage1417[0];
	
	if((syncHRDefault == "Y") && (validateMadisonVal.indexOf("Page15|") > -1))
	{
	    var page15Value = splitPage1415[0];
	    var page17Value = splitPage1415[1];
	}
	else
	    var page17Value = splitPage1417[1];
	
	var splitPage2Val = page2Value.split("|");
	var splitPage13Val = page13Value.split("|");
	var splitPage14Val = page14Value.split("|");

	if((syncHRDefault == "Y") && (validateMadisonVal.indexOf("Page15|") > -1))
	    var splitPage15Val = page15Value.split("|");

	var splitPage17Val = page17Value.split("|");

	var flag=true;
	var mandPage1Arr=Array;
	mandPage1Arr = Array('First Name','Last Name');
	var Page1ArrLen = mandPage1Arr.length;

	var mandPage2Arr=Array;
	mandPage2Arr = Array('Address Line1','City','State','Zip');	
	var Page2ArrLen = mandPage2Arr.length;
	// asasa|asa|FL^10|2212121|Page2|||||||Page13||Page14|W-2||||Page17
	var mandPage13Arr=Array;
	var sal_prate_val = (splitPage13Val[0] == "Internal Direct") ? 'Salary' : 'Pay Rate';	
	mandPage13Arr=Array('Employee Type','Date of Hire',sal_prate_val,'Over Time Rate','Double Time Rate','Workers Comp Code');
	var Page13ArrLen = mandPage13Arr.length;

	var mandPage14Arr=Array;
	mandPage14Arr = Array('SSN');
	//mandPage14Arr = Array('Date of Birth','SSN');
	var Page14ArrLen = mandPage14Arr.length;

	var mandPage17Arr=Array;
	mandPage17Arr = Array('W-2','Total Federal Tax Allowances','Withholding state of the employee','Total State Tax Allowances');	
	var Page17ArrLen = mandPage17Arr.length;
	
	for(var i=0;i<Page2ArrLen;i++)
	{
		console.log(splitPage2Val[i]);
		if(splitPage2Val[i] == "")
		{
			alert("The "+mandPage2Arr[i]+" Field in Contact Info is Empty.");
			form.url.value=2;
			valTricomFlag = false;
			return;
		}
	}
		
	for(var j=0;j<Page13ArrLen;j++)
	{
		if(splitPage13Val[j] == "" || splitPage13Val[j] == "0-0-0")
		{
			if(splitPage13Val[0]=='' && localStorage.getItem("samasjob")!='Y')
			{
				alert("The "+mandPage13Arr[j]+" Field in Compensation is Empty.");
				form.url.value=13;
				valTricomFlag = false;
				return;
			}
		}
	}

	for(var j=0;j<Page14ArrLen;j++)
	{
		if(splitPage14Val[j] == "" || splitPage14Val[j] == "0-0-0")
		{
			alert("The "+mandPage14Arr[j]+" Field in Personal Profile is Empty");
			form.url.value=14;
			valTricomFlag = false;
			return;
		}
	}
    		
	if(splitPage17Val[0] == "W-2")
	{
		for(var j=1;j<Page17ArrLen;j++)
		{
			if(splitPage17Val[j] == "")
			{
				alert("The "+mandPage17Arr[j]+" Field in Tax Deductions is Empty");
				form.url.value=17;
				valMadisonFlag = false;
				return;
			}
		}
	}
    
}

function enableCommissionRoles()
{
	try
	{
		var rolesLen = document.getElementById("hdnRoleCount").value;
		for( var r = 0; r <= rolesLen; r++)
		{
			try
			{
				if(document.getElementById("commval"+r) != undefined)
				{
					document.getElementById("commval"+r).disabled = false;
					document.getElementById("ratetype"+r).disabled = false;
					document.getElementById("paytype"+r).disabled = false;	
				}
			}
			catch(e){}
		}
	}
	catch(e){}
}

function enableDisabledRateFields()
{
    try {
        $('.disabled_user_input_field').each(function () {
            $(this).removeAttr('disabled');
        });
    } catch(e){}
}

function getdynamicudfcols()
{
      	// Dynamic fields names generation code
	var dynamicUdfCol = $("#dynamicUdfCol").val();
	dynamicUdfCol = dynamicUdfCol.replace(/^\s+|\s+$/g,"");
	var stringVal = '';
	if(dynamicUdfCol != "" && dynamicUdfCol != null )
	{
		if(dynamicUdfCol.indexOf("|") != -1)
			var dynamicUdfFieldsarr = dynamicUdfCol.split("|");
		else {
			var dynamicUdfFieldsarr = [];
			dynamicUdfFieldsarr.push(dynamicUdfCol);	
		}
		for(inci=0;inci<dynamicUdfFieldsarr.length;inci++){		
		   dynamicFeildType = dynamicUdfFieldsarr[inci].split("-");
		   switch(dynamicFeildType[1]){
			case 'checkbox':
				try
				{
				  var inputs = document.getElementsByTagName('input');
				  var inck = inckvalues = '';	
				  for( var x = 0; x < inputs.length; x++ ){							
					  var chkName = dynamicFeildType[0]+"[]";				
					  if(inputs[x].type == "checkbox" && inputs[x].name == chkName ){										
						  if (inck == '')
							  inck += dynamicFeildType[0] + '-';
						  if(inputs[x].checked == true){						
							  //stringVal += inputs[x].value + ',';
							  inckvalues += inputs[x].value + ',';
						  }					
					  }				
				  }
				  stringVal += inckvalues;
				  stringVal = stringVal.substr(0,(stringVal.length-1));
				  stringVal += '|';
				}
				catch(e){}
			break;
			case 'checkbox_autoChk':
				try
				{		    
				    var autoSelVal = $("#"+dynamicFeildType[0]).val();
				    stringVal += autoSelVal+'|';
				}
				catch(e){}
				
			break;
			case 'radio':
				try
				{
				  var radios = document.getElementsByName(dynamicFeildType[0]);
				  for (var ii = 0, length = radios.length; ii < length; ii++) {
				      if (radios[ii].checked) {					
					  stringVal += radios[ii].value+'|';	
				      }
				  }
				}
				catch(e){}
			break;		
			case 'select':
				try
				{
				  var s = document.getElementById(dynamicFeildType[0]);			
				  var item1 = s.options[s.selectedIndex].value;
				  stringVal += item1+'|';
				}
				catch(e){}
			break;		
			default :
				try
				{
				  textVal = document.getElementById(dynamicFeildType[0]).value					
				  stringVal += textVal+'|';
				}
				catch(e){}
			break;
		   }	   	
		}
		stringVal = stringVal.substr(0,(stringVal.length-1));
		return stringVal;
	}
	else
	{
	    return "";
	}
}
function doSelectJTitles() {
	
	if ($("#jotype").val() == '') {
		alert("Please select a Job Type for Assignment");
	}
	else
	{
		/* 
			This Function used to select Job Title when Theraphy Source Enable or not 
			And also parsing the selected Custom Rate Ids.
		*/
	       if(window.document.getElementById('theraphySourceEnable') !== null){
		   
		var theraphySourceEnable = window.document.getElementById('theraphySourceEnable').value;
		if(theraphySourceEnable =="Y"){
			
		    var selectedRateValue = window.document.getElementById('selectedcustomratetypeids').value;
		    var comm_payrate = window.document.getElementById('comm_payrate').value;
		    var comm_billrate = window.document.getElementById('comm_billrate').value;
		    var over_time_pay =  document.getElementById("otrate_pay").value;
		    var over_time_bill =  document.getElementById("otrate_bill").value;
		    var double_time_pay =  document.getElementById("db_time_pay").value;
		    var double_time_bill =  document.getElementById("db_time_bill").value;
		    if(selectedRateValue != "" || comm_payrate != "" || comm_billrate !="" || over_time_pay !="" || over_time_bill !="" || double_time_pay !="" || double_time_bill !="" ){		
			alert("Changing the Assignment Name will effect the rates in Billing section.");
			var jotype = $("#jotype").val();
			joarray = jotype.split("|");
			var deptjoborder = $("#deptassignment").val();

				    var v_width  = 600;
				    var v_heigth = 440;
				    var top1=(window.screen.availHeight-v_heigth)/2;
				    var left1=(window.screen.availWidth-v_width)/2;
				    var url = "/BSOS/Sales/Req_Mngmt/jo_titles.php?jotype="+joarray[0]+"&deptjoborder="+deptjoborder+"&pfrom=assign";
				    remote=window.open(url,"parent","width="+v_width+"px,height="+v_heigth+"px,statusbar=yes,menubar=no,scrollbars=yes,left="+left1+"px,top="+top1+"px,dependent=yes,resizable=yes");
				    remote.focus();

		    }else{

			    var jotype = $("#jotype").val();
			    joarray = jotype.split("|");
			    var deptjoborder = $("#deptassignment").val();

			    var v_width  = 600;
			    var v_heigth = 440;
			    var top1=(window.screen.availHeight-v_heigth)/2;
			    var left1=(window.screen.availWidth-v_width)/2;
			    var url = "/BSOS/Sales/Req_Mngmt/jo_titles.php?jotype="+joarray[0]+"&deptjoborder="+deptjoborder+"&pfrom=assign";
			    remote=window.open(url,"parent","width="+v_width+"px,height="+v_heigth+"px,statusbar=yes,menubar=no,scrollbars=yes,left="+left1+"px,top="+top1+"px,dependent=yes,resizable=yes");
			    remote.focus();
		    }	
		}else{
			
			var jotype = $("#jotype").val();
			joarray = jotype.split("|");
			var deptjoborder = $("#deptassignment").val();
			
			var v_width  = 600;
			var v_heigth = 440;
			var top1=(window.screen.availHeight-v_heigth)/2;
			var left1=(window.screen.availWidth-v_width)/2;
			var url = "/BSOS/Sales/Req_Mngmt/jo_titles.php?jotype="+joarray[0]+"&deptjoborder="+deptjoborder+"&pfrom=assign";
			remote=window.open(url,"parent","width="+v_width+"px,height="+v_heigth+"px,statusbar=yes,menubar=no,scrollbars=yes,left="+left1+"px,top="+top1+"px,dependent=yes,resizable=yes");
			remote.focus();
			
		}
		      
	       }else{
		var jotype = $("#jotype").val();
		joarray = jotype.split("|");
		var deptjoborder = $("#deptassignment").val();

		var v_width  = 600;
		var v_heigth = 440;
		var top1=(window.screen.availHeight-v_heigth)/2;
		var left1=(window.screen.availWidth-v_width)/2;
		var url = "/BSOS/Sales/Req_Mngmt/jo_titles.php?jotype="+joarray[0]+"&deptjoborder="+deptjoborder+"&pfrom=assign";
		remote=window.open(url,"parent","width="+v_width+"px,height="+v_heigth+"px,statusbar=yes,menubar=no,scrollbars=yes,left="+left1+"px,top="+top1+"px,dependent=yes,resizable=yes");
		remote.focus();   
	       }		
	}
}
function removeTitle(){
	document.getElementById('jotitle').value	= '';
	document.getElementById('jotitlespan').innerHTML = '';
	document.getElementById('jotitlelinkspan').innerHTML = '<a href="javascript:doSelectJTitles();" class="edit-list">Select Title</a>';
}

function doPage26() {

	var checked		= true;
	form			= document.conreg;
	var hrmhmsessionrn	= form.hrmhmsessionrn.value;
	var page26name		= eval("document.conreg.page26"+hrmhmsessionrn);
	var countries		= document.getElementById("countries_sel").value;
	var states		= document.getElementById("states_sel").value;
	var cred_status		= "ACTIVE";

	if(form.addr.value != "edit")
	{
		var chk_country_flag  = 0;
		if(form.countries_sel.value == "US" || form.countries_sel.value == "")
		{
				var chk_country_flag = 1;
		}
		flag	= true;

		if (form.credential_type.value != "0" || form.credential_name.value != "" || form.credential_number.value != "" || form.acquired_date.value != "" || form.valid_from.value != "" || form.valid_to.value != "" || form.verified_by.value != "0" || form.verified_date.value != "" || form.comments.value != "" || form.states_sel.value != "" || form.download_path.value != "" || chk_country_flag == 0) {

			flag	= false;

			if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To') && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {

				if (chkspchars() == true) {

					if(chkcrenamealreadyexists() == true) {

						if(page26name.value == "") {

							page26name.value	= form.credential_type.value+"|"+form.credential_name.value+"|"+form.credential_number.value+"|"+states+"|"+form.acquired_date.value+"|"+form.valid_from.value+"|"+form.valid_to.value+"|"+form.verified_by.value+"|"+form.verified_date.value+"|"+countries+"|"+form.comments.value+"|"+cred_status+"|"+form.concredentialid.value+"||AKKENDOCS||"+form.download_path.value;

						} else {

							page26name.value	+= "^" + form.credential_type.value+"|"+form.credential_name.value+"|"+form.credential_number.value+"|"+states+"|"+form.acquired_date.value+"|"+form.valid_from.value+"|"+form.valid_to.value+"|"+form.verified_by.value+"|"+form.verified_date.value+"|"+countries+"|"+form.comments.value+"|"+cred_status+"|"+form.concredentialid.value+"||AKKENDOCS||"+form.download_path.value;
						}

						flag	= true;
					}
				}
			}
			return flag;
		}
		else
		{
			return flag;
			form.addr.value	= "old";
		}
	}
	else
	{
		alert("Click on Update to save the data or Cancel before moving to another tab.");
		flag	= false;
		return flag;
	}
}

function addPage26() {

	var checked		= true;
	form			= document.conreg;
	daction			= form.daction.value;
	form.dest.value		= 26;
	form.url.value		= 26;
	form.action		= daction;
	var hrmhmsessionrn	= form.hrmhmsessionrn.value;
	var page26name		= eval("document.conreg.page26"+hrmhmsessionrn);

	var countries	= document.getElementById("countries_sel").value;
	var states	= document.getElementById("states_sel").value;
	var cred_status	= "ACTIVE";
	var list	= "";

	if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To')  && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {

		if (chkspchars() == true) {

			if(chkcrenamealreadyexists() == true) {
				enableDisabledRateFields();
				list = form.credential_type.value+"|"+form.credential_name.value+"|"+form.credential_number.value+"|"+states+"|"+form.acquired_date.value+"|"+form.valid_from.value+"|"+form.valid_to.value+"|"+form.verified_by.value+"|"+form.verified_date.value+"|"+countries+"|"+form.comments.value+"|"+cred_status+"|"+form.concredentialid.value+"||AKKENDOCS||"+form.download_path.value;
			}
		}
	}

	if (list != "") {

		if (page26name.value != "") {
  
			page26name.value	+= "^"+list;

		} else {
  
			page26name.value	= list;
		}
                enableDisabledRateFields();
		form.submit();
	}
}

function editPage26(val)
{
	var checked		= true;
	var form		= document.conreg;
	daction			= form.daction.value;
	form.dest.value		= 26;
	form.url.value		= 26;
	form.action		= daction;
	var hrmhmsessionrn	= form.hrmhmsessionrn.value;
	var page26name		= eval("document.conreg.page26"+hrmhmsessionrn);
	page26			= page26name.value;
	sinpage26		= page26.split("^");
	reqpage26		= "";

	var countries	= document.getElementById("countries_sel").value;
	var states	= document.getElementById("states_sel").value;
	var cred_status	= "ACTIVE";

	for(i=0; i<sinpage26.length; i++)
	{
		if(i != val)
		{
			concredentialid = form.concredentialid.value;
			if(sinpage26[i].indexOf(concredentialid) > 0){
	        	sinpage26.splice(i,1);
	        }else{
	        	if(reqpage26 == "")
					reqpage26	= sinpage26[i];
				else
					reqpage26	+= "^"+ sinpage26[i];
	        }			
		}
	}
	page26name.value = reqpage26;
	if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To')  && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {
		if (chkspchars() == true) {
			if(chkcrenamealreadyexists() == true) {
                enableDisabledRateFields();
				doSaveHire(26);
			}
		}
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

function delCredentails() {

	var form		= document.conreg;
	var hrmhmsessionrn	= form.hrmhmsessionrn.value;
	var page26name		= eval("document.conreg.page26"+hrmhmsessionrn);
	var com			= "page26"+hrmhmsessionrn;

	var e			= form.elements;
	var len			= e.length;

	var selarr		= new Array();
	var count		= 0;

	for (var i=0; i < len; i++) {

		if (e[i].name == "chkcredentials") {

			if (e[i].checked) {

				selarr[count++]	= e[i].value;
			}
		}
	}

	if (count == 0) {

		alert("Select at least one record to Delete");
		return;
	}

	if(confirm("You are deleting credential(s) for this employee. Click on OK to Continue or Cancel to return.")) {

		var selnos	= "#"+selarr.join("#")+"#";
		var credentials	= "";
		var exp = "";
		var daction	= form.daction.value;

		for(i = 0; i < form.elements.length; i++)
		{
			if(form.elements[i].name == com)
			{
				exp	= page26name.value;
				break;
			}
		}

		sincredentials	= exp.split("^");

		for(i = 0; i < sincredentials.length; i++)
		{
			if (selnos.indexOf("#"+i+"#") == -1)
			{

				if(credentials == "")
				{
					credentials	= sincredentials[i];
				}
				else
				{
					credentials	+= "^"+sincredentials[i];
				}
			}
		}

		form.dest.value	= 26;
		form.url.value	= 26;
		form.action	= daction;
		
		for(i = 0;i < form.elements.length; i++)
		{
			if(form.elements[i].name == com)
			{
				page26name.value	= credentials;
				break;
			}
		}
                enableDisabledRateFields();
		form.submit();
	}
}

//Make credential status from active to inactive
function archiveCredentials() {

	var form	= document.conreg;
	var session	= form.hrmhmsessionrn.value;

	var chk_elements	= form.elements;
	var len_elements	= chk_elements.length;
	var conusername		= form.cred_conusername.value; // For Credential Archieve functionality

	var count	= 0;
	var arr_credentials	= new Array();

	for (var i = 0; i < len_elements; i++) {

		if (chk_elements[i].name == "chkcredentials") {

			if (chk_elements[i].checked) {

				arr_credentials[count++]	= chk_elements[i].value;
			}
		}
	}

	if (count == 0) {

		alert("Select at least one record to Archive");
		return;
	}

	if (confirm("Are you sure, you want to Archive the selected Credential(s) ?\nClick on OK to Continue or Cancel to return.")) {

		var all_credentials	= "";
		var con_credentials	= "";
		var sin_credentials	= document.getElementById("page26"+session).value.split("^");
		var sel_credentials	= "#"+arr_credentials.join("#")+"#";

		var credentials_info	= "";
		var credentials_docs	= "";
		var credentials_list	= "";

		for (i = 0; i < sin_credentials.length; i++) {

			if (sel_credentials.indexOf("#"+i+"#") == -1) {

				con_credentials	= sin_credentials[i];

			} else {

				credentials_info	= sin_credentials[i];
				credentials_docs	= credentials_info.split("||AKKENDOCS||");
				credentials_list	= credentials_docs[0].split("|");

				con_credentials	= credentials_list[0]+"|"+credentials_list[1]+"|"+credentials_list[2]+"|"+credentials_list[3]+"|"+credentials_list[4]+"|"+credentials_list[5]+"|"+credentials_list[6]+"|"+credentials_list[7]+"|"+credentials_list[8]+"|"+credentials_list[9]+"|"+credentials_list[10]+"|INACTIVE|"+credentials_list[12]+"||AKKENDOCS||"+credentials_docs[1];
			}

			if (all_credentials == "") {

				all_credentials	= con_credentials;

			} else {

				all_credentials	+= "^" + con_credentials;
			}
		}

		form.dest.value	= 26;
		form.url.value	= 26;
		form.action	= form.daction.value;

		document.getElementById("page26"+session).value	= all_credentials;
        enableDisabledRateFields();

        // For Credential Archive functionality
    	if (all_credentials !="") {
			var dataString = "all_credentials="+all_credentials+"&addr="+conusername;
			$.ajax({
			    url: "archiveCredentials.php",
			    type: 'POST',
			    async:false,
			    data : dataString,      
			    success: function(data) {
			    	form.submit();
			    }
			});
		};
	}
}

/* funtion used to get the data into session between the tabs */
function doPage27() {

	var checked		= true;
	form			= document.conreg;
	var hrmhmsessionrn	= form.hrmhmsessionrn.value;
	var page27name		= eval("document.conreg.page27"+hrmhmsessionrn);
	var availsess		= eval("document.conreg.availsess"+hrmhmsessionrn);
	var schdateval		= document.getElementById("schavaildate").value;	
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
      
	      var availsdate		= schdateval.replace(new RegExp('/',"gi"),"-");		
	      availsess.value		= getavailval+"|"+availsdate;
	      page27name.value		= getavailval+"|"+schdateval+"|"+smtfstr;
      
	      flag	= true;
	      return flag;
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
	    var v_width		= 200;
	    var v_heigth	= 200;
	    var top		= (window.screen.availHeight-v_heigth)/2;
	    var left		= (window.screen.availWidth-v_width)/2;

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
//For re-hire date selector in hrm>employee management,Account>>employees
function reHireDateSelector(val)
{
	form=document.forms[0];
	var ff=false;
	var date="";	
        date=getReHireFromDateVal1();        
        ff=true;
	if(ff)
	{
		sindate=date.split("/");
		var mn=sindate[0];
		var dy=sindate[1];
		var yr=sindate[2];
       	var v_width  = 200;
    	var v_heigth = 200;
    	var top=(window.screen.availHeight-v_heigth)/2;
    	var left=(window.screen.availWidth-v_width)/2;
		remote=window.open('dcalendar.php?mn='+mn+'&dy='+dy+'&yr='+yr+'&val='+val,'cal','width=200,height=200,resizable=no,scrollbars=no,status=0,left='+left+',top='+top);
		remote.focus();
	}
}

function getReHireFromDateVal1()
{
	form=document.forms[0];
	d1=form.rehire_smonth.selectedIndex;
	d2=form.rehire_sday.selectedIndex;
	d3=form.rehire_syear.selectedIndex;
	if((d1>0)&&(d2>0)&&(d3>0))
	{
		day1=form.rehire_smonth.options[d1].value;
		day2=form.rehire_sday.options[d2].value;
		day3=form.rehire_syear.options[d3].value;
		return day1+"/"+day2+"/"+day3;
	}
	else
	{
		return form.dateval.value;
	}
}

/* Added Employee Terminated date with checkbox and Close Assignments using End Date with checkbox */
function getReHirePopUpData()
{
	var asgnDay = "";
	var asgnMonth = "";
	var optionvalue = "";
	var asgnselected = "";
	var assignTerminateCloseHTML = "";

	var asgnArryMonth = new Array('','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

	for(i = 1 ; i <= 31; i++)
	{
		optionvalue = (i < 10) ? '0'+i : i;
		asgnselected = (optionvalue == asgnAlertEndDay) ? 'selected' : '';
		asgnDay+="<option value=\""+optionvalue+"\" "+asgnselected+">"+optionvalue+"</option>";
	}

	for(i = 1; i < asgnArryMonth.length; i++)
	{
		optionvalue = (i < 10) ? '0'+i : i;		
		asgnselected = (optionvalue == asgnAlertEndMonth) ? 'selected' : '';
		asgnMonth+="<option value=\""+optionvalue+"\" "+asgnselected+">"+asgnArryMonth[i]+"</option>";
	}

	var getDYear = new Date();
	var sYear = getDYear.getFullYear() - 10;
	var eYear = getDYear.getFullYear() + 20;
	
	var assignTerminateCloseHTML = "<tr><td valign=\"top\" colspan=\"2\"><fieldset><table border=\"0\" cellpadding=\"2\" cellspacing=\"2\" width=\"100%\"><tr><td valign=\"top\" colspan=\"2\"><INPUT type=checkbox value=\"Y\" name=\"terminate\" id=\"terminate\"><font size=\"1.0em\">Terminate employee with a Terminate Date of </font> <select name=\"termonth\" id=\"termonth\"><option value=\"0\">Month</option>"+asgnMonth+"</select><select name=\"terday\" id=\"terday\"><option value=\"0\">Day</option>"+asgnDay+"</select><select name=\"teryear\" id=\"teryear\"><option value=\"0\">Year</option>";

	for(var i=sYear; i<=eYear; i++)
	{
		asgnselected = (i == asgnAlertEndYear) ? 'selected' : '';
		assignTerminateCloseHTML += "<option value="+i+" "+asgnselected+">"+i+"</option>";
	}

	assignTerminateCloseHTML += "</select>&nbsp;<a href=\"javascript:calDateSelector('aterdate','terminate')\"><img src=/BSOS/images/crm/sm-icon-cal.gif width=\"14\" height=\"15\" title=\"\" border=\"0\" align=\"\"></a></td></tr><tr><td valign=\"top\"  colspan=\"2\"><INPUT type=checkbox value=\"Y\" name=\"closeasgn\" id=\"closeasgn\"><font size=\"1.0em\">Close all active assignments for employee with a closed date of </font> <select name=\"endmonth\" id=\"endmonth\"><option value=\"0\">Month</option>"+asgnMonth+"</select><select name=\"endday\" id=\"endday\"><option value=\"0\">Day</option>"+asgnDay+"</select><select name=\"endyear\" id=\"endyear\"><option value=\"0\">Year</option>";

	for(var i=sYear; i<=eYear; i++)
	{
		asgnselected = (i == asgnAlertEndYear) ? 'selected' : '';
		assignTerminateCloseHTML += "<option value="+i+" "+asgnselected+">"+i+"</option>";
	}

	assignTerminateCloseHTML += "</select>&nbsp;<a href=\"javascript:calDateSelector('aenddate','enddate')\"><img src=/BSOS/images/crm/sm-icon-cal.gif width=\"14\" height=\"15\" title=\"\" border=\"0\" align=\"\"></a></td></tr><tr><td valign=\"top\" colspan=\"2\" style=\"padding-left: 32px;\"><font size=\"1.0em\">Select the check box above to update the selected assignments end date (only the assignments that do not currently have an end date populated) and update the status to closed.</font></td></tr></table></fieldset></td></tr>";

	return assignTerminateCloseHTML;
}

//function to check Assignment Name, Job Location, Start Date, Pay Rate and Workers Comp Code entered or not, when synchr preference is enabled.
function formSyncHRValidate(modulefrom)
{
	var form = document.conreg;
        if(akkupayroll == "Y" && modulefrom == 'Hiring')
        {
            if(form.jotitle.value != ''){
                if (modulefrom == 'Hiring' && form.jotype.value == '') {
                        alert("Please select Assignment/Job Type for this Assignment.");
                        form.jotype.focus();
                        return false;
                }
                else if ($('#jrt_loc').is('input')) {
                        if(form.jrt_loc.value == '' || form.jrt_loc.value == '0') {
                            alert("The Job Location field is empty. Please select the Job Location.");
                            return false;
                        }
                }
                else if (typeof(form.worksitecode)=='object' && form.worksitecode.value=='' ) {
                        alert("WorkSite Code is empty. Please select WorkSite Code.");
                        return false;   
                }
                else if ((form.smonth.value == "0" || form.sday.value == "0" || form.syear.value == "0")) {
                        alert("Please select Start Date for this Assignment.");
                        document.getElementById("sched-start-date").className="crmsummary-edit-table-yellow";
                        return false;
                }
                else if (!is_valid_popupday(getVal(form.syear),getVal(form.smonth),getVal(form.sday),"Please select a valid Start Date for this Assignment.")) {
                        return false;
                }
                else if ($("#jotype option:selected").text() != 'Direct' && $("#jotype option:selected").text() != 'Internal Direct' && getRadValue(form.payratetype) == 'rate' && form.comm_payrate.value == '') {
                        alert("The Pay Rate field is empty. Please enter the Pay Rate.");
                        form.comm_payrate.focus();
                        return false;
                }
                else if ($("#jotype option:selected").text() != 'Direct' && $("#jotype option:selected").text() != 'Internal Direct' && getRadValue(form.payratetype) == 'open' && form.comm_open_payrate.value == '') {
                        alert("The Pay Rate field is empty. Please enter the Pay Rate.");
                        form.comm_open_payrate.focus();
                        return false;
                }
                else if (form.workcode.value == '') {
                        alert("Please select Workers Comp Code for this Assignment.");
                        form.workcode.focus();
                        return false;
                } 
                return true;
            }else {
                return true;
            }
        }
        else
        {
            if (form.jotitle.value == '') {
                    alert("The Assignment Name field is empty. Please enter the Assignment Name.");
                    form.jotitle.focus();
                    return false;
            }
            else if (modulefrom == 'Hiring' && form.jotype.value == '') {
                    alert("Please select Assignment/Job Type for this Assignment.");
                    form.jotype.focus();
                    return false;
            }
            else if ($('#jrt_loc').is('input')) {
                if(form.jrt_loc.value == '' || form.jrt_loc.value == '0') {
                    alert("The Job Location field is empty. Please select the Job Location.");
                    return false;
                }
            }
            else if (typeof(form.worksitecode)=='object' && form.worksitecode.value=='' ) {
                    alert("WorkSite Code is empty. Please select WorkSite Code.");
                    return false;   
            }
            else if ((form.smonth.value == "0" || form.sday.value == "0" || form.syear.value == "0")) {
                    alert("Please select Start Date for this Assignment.");
                    document.getElementById("sched-start-date").className="crmsummary-edit-table-yellow";
                    return false;
            }
            else if (!is_valid_popupday(getVal(form.syear),getVal(form.smonth),getVal(form.sday),"Please select a valid Start Date for this Assignment.")) {
                    return false;
            }
            else if ($("#jotype option:selected").text() != 'Direct' && $("#jotype option:selected").text() != 'Internal Direct' && getRadValue(form.payratetype) == 'rate' && form.comm_payrate.value == '') {
                    alert("The Pay Rate field is empty. Please enter the Pay Rate.");
                    form.comm_payrate.focus();
                    return false;
            }
            else if ($("#jotype option:selected").text() != 'Direct' && $("#jotype option:selected").text() != 'Internal Direct' && getRadValue(form.payratetype) == 'open' && form.comm_open_payrate.value == '') {
                    alert("The Pay Rate field is empty. Please enter the Pay Rate.");
                    form.comm_open_payrate.focus();
                    return false;
            }
            else if (form.workcode.value == '') {
                    alert("Please select Workers Comp Code for this Assignment.");
                    form.workcode.focus();
                    return false;
            } 
            return true;
        }	
}

/* function to convert string into interget */
function getParseIntValue(val)
{
	val=""+val;
	if(val.indexOf("0")==0 && val.length>1)
		val=val.substr(1);

	return parseInt(val);
}

//function to check select data available in calendar or not
function is_valid_popupday(yy,mm,dd,msg)	
{
	var dd1=dd;
	dd=(typeof dd!="object")?getParseIntValue(dd):getParseIntValue(dd.value);
	mm=(typeof mm!="object")?getParseIntValue(mm):getParseIntValue(mm.value);
	yy=(typeof yy!="object")?getParseIntValue(yy):getParseIntValue(yy.value);
	mm=mm-1;

	var date=new Date();
	date.setFullYear(yy,mm,dd);

	if(getParseIntValue(date.getFullYear())!=yy || getParseIntValue(date.getMonth())!=mm || getParseIntValue(date.getDate())!=dd)
	{
		if(msg==null)
			msg="Invalid Date";

		alert(msg);

		if(typeof dd1=="object")
			dd1.focus();
		return false;
	}
	else 
		return true;
}

function validSyncHRMandtory(getvals)
{
	var form = document.conreg;
        if(akkupayroll=='Y'){ // for validating the akkupay location in compensation tab
        var hrmhmsessionrn=form.hrmhmsessionrn.value;
        var page13name=eval("document.conreg.page13"+hrmhmsessionrn);
	var str = page13name.value;
        var compenTabValues = str.split('|');
            if(compenTabValues[3]!=''){
            var locationId= compenTabValues[3].trim();
            }
        var page17name=eval("document.conreg.page17"+hrmhmsessionrn);
        var str = page17name.value;
        if(str!=''){
	        var taxvalues = str.split("|");
	            if(taxvalues[1]!=''){
	                taxvalues[1]= taxvalues[1].trim();
	            }
	        }
	    }
        var validateSyncHRVal	= form.validateSyncHR_ses.value;
	var splitPage213	= validateSyncHRVal.split("Page2|");
	var splitPage1314	= splitPage213[1].split("Page13|");
	var splitPage1415	= splitPage1314[1].split("Page14|");
	
	var page2Value		= splitPage213[0];
	var page13Value		= splitPage1314[0];
	var page14Value		= splitPage1415[0];
	
	var splitPage2Val	= page2Value.split("|");
	var splitPage13Val	= page13Value.split("|");
	var splitPage14Val	= page14Value.split("|");

	var mandPage2Arr	= Array;
	var flag		= true;
	mandPage2Arr		= Array('Address Line1','City','State','Country','Zip','Primary Phone');
	//var Page2ArrLen		= mandPage2Arr.length;
	var Page2ArrLen		= 5;
	
	var mandPage13Arr	= Array;	
	mandPage13Arr		= Array('Date of Hire');
	var Page13ArrLen	= mandPage13Arr.length;	
	
	var mandPage14Arr	= Array;
	mandPage14Arr		= Array('Date of Birth','SSN');
	var Page14ArrLen	= mandPage14Arr.length;

	if(validateSyncHRVal.indexOf("Page15|") > -1)
	{
	    var page15Value	= splitPage1415[1];
	    var splitPage15Val	= page15Value.split("|");
	    var mandPage15Arr	= Array;
	    mandPage15Arr	= Array('Assignment Name');// do not add other array elements before Assigment name
	    var Page15ArrLen	= mandPage15Arr.length;
	}

	for(var i=0; i<Page2ArrLen; i++)
	{		
		if(splitPage2Val[i] == "" || splitPage2Val[i] == "0")
		{
			alert("The "+mandPage2Arr[i]+" Field in Contact Info is Empty.");
			form.url.value	= 2;
			valSyncHRFlag	= false;
			return;
		}
	}
	
        if(akkupayroll=='Y'){
                if(locationId==""){
                        alert("Location Field in Compensation is Empty.");
			form.url.value	= 13;
			valSyncHRFlag	= false;
			return;  
         }
        }
	for(var j=0; j<Page13ArrLen; j++)
	{
		if(splitPage13Val[j] == "" || splitPage13Val[j] == "0-0-0")
		{
			alert("The "+mandPage13Arr[j]+" Field in Compensation is Empty.");
			form.url.value	= 13;
			valSyncHRFlag	= false;
			return;
		}
	}
        
        if(akkupayroll=='Y'){
            if(compenTabValues[58]=='0' || compenTabValues[58]==''){
               alert("The Pay Schedule Name in Compensation is Empty.");
			form.url.value	= 13;
			valSyncHRFlag	= false;
			return; 
            }
        }
	for(var k=0; k<Page14ArrLen; k++)
	{
		if(splitPage14Val[k] == "" || splitPage14Val[k] == "0-0-0")
		{
			alert("The "+mandPage14Arr[k]+" Field in Personal Profile is Empty");
			form.url.value	= 14;
			valSyncHRFlag	= false;
			return;
		}
	}
	
	if(splitPage2Val[6]=='')
	{
		if(form.contactgeocode !== undefined) {
			if(form.contactgeocode.value=='')
			{
				alert('GeoCode is empty please update contact info!');
				form.url.value	= 2;
				valSyncHRFlag	= false;
				return;
	    	}
	    }
	}
         //added this code to control the save candidate functionality from accounting vendores while create a new candiddate from that page
        if(fromAccountingVendor=='' || fromAccountingVConsultant==''){
            if(validateSyncHRVal.indexOf("Page15|") > -1)
            {
                if(akkupayroll=='Y'){
                    for(var l=0; l<Page15ArrLen; l++)
                    {
                        if(mandPage15Arr[l] =='Assignment Name' && splitPage15Val[l] == "" && getvals != "YES")
                        {
                            break;
                        }else if(splitPage15Val[l] == "" && getvals != "YES"){
                            alert("The "+mandPage15Arr[l]+" Field in Assignments is Empty");
                            form.url.value	= 15;
                            valSyncHRFlag	= false;
                            return;
                        }  
                    }
                }
                else{
                    for(var l=0; l<Page15ArrLen; l++)
                    {
                        if(splitPage15Val[l] == "" && getvals != "YES")
                        {
                                alert("The "+mandPage15Arr[l]+" Field in Assignments is Empty");
                                form.url.value	= 15;
                                valSyncHRFlag	= false;
                                return;
                        }   
                    }
                }
            }
            if(akkupayroll=='Y')
            {
	 		if(str!=''){
	            if(taxvalues[0] == "W-2"){
	                if(taxvalues[1]==""){
	                    alert("Filing Status for Withholding Field in Tax Deductions is Empty.");
	                    form.url.value	= 17;
	                    valSyncHRFlag	= false;
	                    return; 
	                }
	            }
	        }
            }
    }
 }

//Function to check the DOB & SSN field is not empty when quickbooks is enabled
function validQBCMandtory()
{
	var form		= document.conreg;
	var validateSyncHRVal	= form.validateSyncHR_ses.value;
	var splitPage213	= validateSyncHRVal.split("Page2|");
	var splitPage1314	= splitPage213[1].split("Page13|");
	var splitPage1415	= splitPage1314[1].split("Page14|");

	var page14Value		= splitPage1415[0];
	

	var splitPage14Val	= page14Value.split("|");

		
	var mandPage14Arr	= Array;
	mandPage14Arr		= Array('Date of Birth','SSN');
	var Page14ArrLen	= mandPage14Arr.length;

		
	for(var k=0; k<Page14ArrLen; k++)
	{
		if(splitPage14Val[k] == "" || splitPage14Val[k] == "0-0-0")
		{
			alert("The "+mandPage14Arr[k]+" Field in Personal Profile is Empty");
			form.url.value	= 14;
			valQBCFlag	= false;
			return;
		}
	}	
}

function checkEmployeeAvailability(empid,smtimeslots) {
	var result = "";
	if (empid !="") {
		var dataString = "checkEmployeeAvailability=yes&empid="+empid+"&smtimeslots="+smtimeslots;
		$.ajax({
		    url: "/include/shift_schedule/checkrateonshift.php",
		    type: 'POST',
		    async:false,
		    data : dataString,      
		    success: function(data) {
		    	result = data;
		    }
		});
	};
	return result;
}

//function for Credentials
function getPage26()
{
	flag=true;	
	var form=document.conreg;
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	var page26name=eval("document.conreg.page26"+hrmhmsessionrn);

	var countries	= document.getElementById("countries_sel").value;
	var states	= document.getElementById("states_sel").value;
	var cred_status	= "ACTIVE";
	var list = '';
	
	if(form.mode.value=='save'){
		if (form.credential_name.value=='') {
			flag=true;
			return flag;
		}else{
			if(chkspchars()==true)
			{
				if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To')  && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {
					if (chkspchars() == true) {
						if(chkcrenamealreadyexists() == true) {
							list = form.credential_type.value+"|"+form.credential_name.value+"|"+form.credential_number.value+"|"+states+"|"+form.acquired_date.value+"|"+form.valid_from.value+"|"+form.valid_to.value+"|"+form.verified_by.value+"|"+form.verified_date.value+"|"+countries+"|"+form.comments.value+"|"+cred_status+"|"+form.concredentialid.value+"||AKKENDOCS||"+form.download_path.value;			
						}
					}
				}
				if(page26name.value!=""){
					if(form.addr.value=='edit'){
						page26name.value+="^"+list+"|"+form.concredentialid.value+"|edit-credential";
					}else{
						page26name.value+="^"+list;
					}	
				}
				else{
					if(form.addr.value=='edit'){
						page26name.value+=list+"|"+form.concredentialid.value+"|edit-credential";
					}else{
						page26name.value+=list;
					}
				}

		   		flag=true;
				return flag;
			}
		}
	}else{
		if(page26name.value=="")
		{
			if(chkspchars()==true)
			{
				if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To')  && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {
					if (chkspchars() == true) {
						if(chkcrenamealreadyexists() == true) {
							list = form.credential_type.value+"|"+form.credential_name.value+"|"+form.credential_number.value+"|"+states+"|"+form.acquired_date.value+"|"+form.valid_from.value+"|"+form.valid_to.value+"|"+form.verified_by.value+"|"+form.verified_date.value+"|"+countries+"|"+form.comments.value+"|"+cred_status+"|"+form.concredentialid.value+"||AKKENDOCS||"+form.download_path.value;
						}
					}
				}

				if(page26name.value!=""){
					if(form.addr.value=='edit'){
						page26name.value+="^"+list+"|"+form.concredentialid.value+"|edit-credential";
					}else{
						page26name.value+="^"+list;
					}
				}
				else{
					if(form.addr.value=='edit'){
						page26name.value+=list+"|"+form.concredentialid.value+"|edit-credential";
					}else{
						page26name.value+=list;
					}
				}

		   		flag=true;
				return flag;
			}
		}
		else
		{
			//code provided for diplaying the alert box
			if(chkspchars()==true)
			{
				if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To')  && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {
					if (chkspchars() == true) {
						if(chkcrenamealreadyexists() == true) {
							list = form.credential_type.value+"|"+form.credential_name.value+"|"+form.credential_number.value+"|"+states+"|"+form.acquired_date.value+"|"+form.valid_from.value+"|"+form.valid_to.value+"|"+form.verified_by.value+"|"+form.verified_date.value+"|"+countries+"|"+form.comments.value+"|"+cred_status+"|"+form.concredentialid.value+"||AKKENDOCS||"+form.download_path.value;
						}
					}
				}

				if(page26name.value!=""){
					if(form.addr.value=='edit'){
						page26name.value+="^"+list+"|"+form.concredentialid.value+"|edit-credential";
					}else{
						page26name.value+="^"+list;
					}
				}else if(page26name.value!="" && form.conreg.addr=='edit'){

				}
				else{
					if(form.addr.value=='edit'){
						page26name.value+=list+"|"+form.concredentialid.value+"|edit-credential";
					}else{
						page26name.value+=list;
					}
				}
				
		   		flag=true;
				return flag;
			}

	   		flag=false;
			return flag;
		}
	}		   
}

//function for updating credentials on adding
function addupdatePage26() {

	var checked		= true;
	form			= document.conreg;
	daction			= form.daction.value;
	form.dest.value		= 26;
	form.url.value		= 26;
	form.action		= daction;
	var hrmhmsessionrn	= form.hrmhmsessionrn.value;
	var page26name		= eval("document.conreg.page26"+hrmhmsessionrn);

	var countries	= document.getElementById("countries_sel").value;
	var states	= document.getElementById("states_sel").value;
	var cred_status	= "ACTIVE";
	var list	= "";

	if (selvalue(form.credential_type,"Credential Type") && isNameNumberOnly(form.credential_number,"Credential Number") && isvalidDate(form.acquired_date.value,'Acquired Date') && isDateCheck(form.valid_from, form.valid_to, 'Valid From', 'Valid To') && isvalidDate(form.valid_from.value,'Valid From') && isvalidDate(form.valid_to.value,'Valid To') && isvalidDate(form.verified_date.value,'Verified Date')) {

		if (chkspchars() == true) {
			if(chkcrenamealreadyexists() == true) {
				enableDisabledRateFields();
				doSaveHire(26);				
			}
		}
	}
}

//function to save credentials
function saveCredentials(val){
	document.conreg.mode.value='save';
	doSaveHire(val);
}

function doUHire(val)
{
	form=document.conreg;
	
	var hrmhmsessionrn=form.hrmhmsessionrn.value;
	
	try
	{
		var candsno = form.exist.value;
	}
	catch(e)
	{
		var candsno = "";
	}

	//this is for Accounting consulting vendors add candidates--Kiran

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

	flag=getPage26();
	var page26name=eval("document.conreg.page26"+hrmhmsessionrn);
	var str = page26name.value;

	if(flag)
	{
		if(val==26){
			document.getElementById("formsloading").style.display = 'block';
			$('.overlay').show();
		}
		form.dest.value=val;
		if(candsno == '')
		{
			if(val == 1)
			{
				var f_name = form.firstname.value;
				var l_name = form.lastname.value;
				form.action = 'chkconreg.php';
				form.submit();
			}
			else
			{
				form.action = 'chkconreg.php';
				form.submit();
			}
		}
		else
		{
			if(val == 1)
			{
				var f_name = form.firstname.value;
				var l_name = form.lastname.value;
				form.daction = 'chkconreg.php';
				form.submit();
			}
			else
			{
				form.daction = 'chkconreg.php';
				form.submit();
			}
		}
	}
}

// Shift Interval Timing Validation functions
function GetHours(d) 
{
	var h = parseInt(d.split(':')[0]);
	if (d.split(':')[1].split(' ')[1] == "PM") 
	{
		h = h + 12;
	}
	return h;
}
function GetMinutes(d) 
{
	return parseInt(d.split(':')[1].split(' ')[0]);
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