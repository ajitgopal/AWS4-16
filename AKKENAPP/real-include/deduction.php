<?php
if (array_key_exists('HRM_HM_SESSIONRN', $_GET)) {
	if($_GET['HRM_HM_SESSIONRN']!=''){
		$conusername = $_SESSION[conusername.$HRM_HM_SESSIONRN];
	   	$que= "SELECT cc.company_id FROM consultant_compen cc WHERE cc.status='active' AND cc.username='".$conusername."' ";
	    $ssnque= "SELECT cp.ssn FROM consultant_personal cp WHERE cp.username='".$conusername."' ";
	}
}
else if(array_key_exists('emprnm', $_GET)){
	if($_GET['emprnm']!=''){
		$que= "SELECT hc.company_id FROM hrcon_compen hc WHERE hc.ustatus='active' AND hc.username='".$conusername."' ";
    	$ssnque= "SELECT hp.ssn FROM hrcon_personal hp WHERE hp.ustatus='active' AND hp.username='".$conusername."' ";
	}
	
}

$que_exe = mysql_query($que,$db);
$ccres = mysql_fetch_row($que_exe);


$ssnque_exe = mysql_query($ssnque,$db);
$ssnres = mysql_fetch_row($ssnque_exe);

$chk_ssn_val = str_replace("-","",$ssnres[0]);
$read_flag = '';
if($chk_ssn_val != '')
{
	$decrypt_ssn = $ac_aced->decrypt($chk_ssn_val);
	$emp_ssn = format_ssn($decrypt_ssn,false);
	if($emp_ssn!=''){
		$elements[39] = $emp_ssn;
		
	}
}
;
if($elements[39]!='')
	$read_flag = 'readonly';

function getStates($id){
		global $db; //Added $spl_Attribute to validate when madision is enabled in accounting -> customers and vendors.
		if (AKKUPAY_WITH_SYMMETRY == "Y") {
			$state_que="select distinct(state_name),state_abbr,state_id from state_codes WHERE ste_status='Y' order by state_name";
		}else{
			$state_que="select distinct(state_name),state_abbr,state_id from state_codes where state_abbr!='' and  state_abbr!='null' order by state_name";
		}
		
		$que_res=mysql_query($state_que,$db);
		while($stateid=mysql_fetch_array($que_res))
		{   
			$stateidopt.="<option value='".$stateid[1]."' ".che($id, $stateid[1],'Y')." >".html_tls_specialchars($stateid[0],ENT_QUOTES)." </option>";
		
		}
		
		return $stateidopt;
	}


	function che($a,$b,$drop='')
	{
		if($drop!=''){
			if($a==$b)
			return "selected";
			else
			return "";

		}else{
			if($a==$b)
			return "checked";
			else
			return "";
		}
		
	}
	if(PAYROLL_PROCESS_BY_MADISON=="MADISON" || DEFAULT_AKKUPAY=="Y"){
    		$mandatory_madison_akkupay = "<font style='color:red'>*</font>";
	}
        
        if(DEFAULT_AKKUPAY=='Y')
        {
            $st_codes = "select state_id,state_abbr from state_codes where state_abbr!='' and state_abbr!='null' and state_id='".$elements[41]."' order by state_abbr";
            $st_query = mysql_query($st_codes, $db);
            $st_rows = mysql_num_rows($st_query);
            if($st_rows>0){
                $st_code_row = mysql_fetch_row($st_query);
                $restrictFlag = getPrimaryStatecodes($st_code_row[1]);
            }else{
                $restrictFlag="NO";
            }
        }
        
        if(DEFAULT_AKKUPAY=='Y')
        {
            $st_codes = "select state_id,state_abbr from state_codes where state_abbr!='' and state_abbr!='null' and state_id='".$elements[65]."' order by state_abbr";
            $st_query = mysql_query($st_codes, $db);
            $st_rows = mysql_num_rows($st_query);
            if($st_rows>0){
                $st_code_row = mysql_fetch_row($st_query);
                $restrictFlag2 = getPrimaryStatecodes($st_code_row[1]);
            }else{
                $restrictFlag2="NO";
            }
        }
        
	if(PAYROLL_PROCESS_BY_MADISON=="MADISON"){
    		$mandatory_madisons = "<font style='color:red'>*</font>";
	}
	if ($module_Flag == "AppMngmnt") 
	{
    		$mandatory_madisons = "";
    		$mandatory_madison_akkupay="";
    		$mandatory_akkupay="";
 	}
	
	function displayItem($a,$b)
	{
		$c = ($a == $b) ? '' : 'none';
		echo $c;
	}
        
	/*
		Function to display  dynamical text based on the tax value.
	*/
	function displayVal($a,$b,$val)
	{
		$c = ($a == $b) ? html_tls_specialchars($val,ENT_QUOTES) : '';
		print $c;
	}

	
	//End of the Fun(displayVal)
	// ************************************ //
	/*
		Dynamic styles assigning
	*/
		$vertexStyle = "";
		$class_styles1 = "tr2bgcolor";
		$class_styles2 = "tr1bgcolor";		
	// ******* Condition to check whether it is HRM or Accounting ********* //	
	
	// This condition is for removing the sessions if we open deduction from other than vendors... 
	// These sessions for checking consultant and consulting vendor adding and updating
	if($_SERVER['PHP_SELF'] != "/BSOS/HRM/Employee_Mngmt/newconreg17.php" && $_SERVER['PHP_SELF'] != "/BSOS/HRM/Hiring_Mngmt/newconreg17.php")
	{	
		$_SESSION["VendorEmpType"] = '';
		$_SESSION["VEmpType"] = '';		
	}
	
	

	if(PAYROLL_PROCESS_BY == "VERTEX" && ($_SERVER['PHP_SELF'] == "/BSOS/HRM/Employee_Mngmt/newconreg17.php" || $_SERVER['PHP_SELF'] == "/BSOS/Accounting/employees/newconreg17.php"))
	{
		$vertexStyle = ' style="display:none;"';
	}
 	if($VendorEmpType=="EmpVendor"&&(($VEmpType=="Vconsultant")||($VEmpType=="Vconsulting")))//for accounting vendors
    {
       $disabled="DISABLED";
	} 
	else
	{
       $disabled="";
    }
	if($deduction_Flag != "Payroll")
	{
		$class_styles1 = "tr1bgcolor";
		$class_styles2 = "tr2bgcolor";
		
     
		?>

<table>
			<tr class="NewGridTopBg">
		    	<?php
		    		$menu->showHeadingStrip1($name,$link,$heading);
		    	?>
			</tr>
			<tr>
    			<td align=center>
				<table width=100% cellpadding=0 cellspacing=0 border=0>
				<tr class=tr2bgcolor>
    				<td width=15%><font class=afontstyle>&nbsp;Tax</font></td>
    				<td colspan=2>
						<!--We neew below code and  hidden fields to provide alert while C-to-C to other option changing-->
						<?php
						
							//prasadd-get relation already exist or not...To give alert for relation breaking.
							$vque="SELECT venid FROM vendorsubcon WHERE empid='".$conusername."'";
							$vres=mysql_query($vque,$db);
							$vrowCount = mysql_num_rows($vres);
							if($vrowCount > 0)
							{
								$dbcheckstatus = "C-to-C";//If relation is there  always C-to-C...
							}
							else
							{
								$dbcheckstatus = $elements[0];
							}
							$preadonly = "";
							$payque="SELECT pm.sno FROM prhmaster pm LEFT JOIN emp_list el ON el.sno=pm.empid WHERE el.username='".$conusername."'";
							$payres=mysql_query($payque,$db);
							$prowCount = mysql_num_rows($payres);
							if($prowCount > 0)
							{
								$preadonly="DISABLED";
							}
						?>
						<input type=hidden name='vrowCount' id='vrowCount'  value=<?=$vrowCount?>>
						<input type=hidden name='previouscheckstatus' id='previouscheckstatus'  value=<?=$elements[0]?>>
						<input type=hidden name='dbcheckstatus' id='dbcheckstatus'  value=<?=$dbcheckstatus?>>
						<!--End of code and  hidden fields to provide alert while C-to-C to other option changing-->
					<div class="form-check form-check-inline">
						<input class="form-check-input" type=radio name=tax id='W-2'  onclick="Tax_change('body1');" value='W-2' <?=sent_check("W-2",$elements[0]);echo $disabled; ?>>
						<label class="form-check-label">W-2</label>
					</div>
						<?php if($VendorEmpType=="EmpVendor" && $VEmpType=="Vconsultant") {?>
					<div class="form-check form-check-inline">
							<input class="form-check-input" type=radio name=tax id='1099' onclick="Tax_change('body2');" value='1099' <?=sent_check("1099",$elements[0]); ?> >
					<label class="form-check-label">1099</label></div>
					
					<div class="form-check form-check-inline">
							<input class="form-check-input" type=radio name=tax id='C-to-C' value='C-to-C' onclick="Tax_change('body3');" <?=sent_check("C-to-C",$elements[0]); echo $disabled; ?>>
					<label class="form-check-label">C-to-C</label></div>
						<?php } else if($VendorEmpType=="EmpVendor" && $VEmpType=="Vconsulting"){ ?>
					<div class="form-check form-check-inline">
							<input class="form-check-input" type=radio name=tax id='1099' onclick="Tax_change('body2');" value='1099' <?=sent_check("1099",$elements[0]); echo $disabled;?> >
					<label class="form-check-label">1099</label></div>
					
					<div class="form-check form-check-inline">
							<input class="form-check-input" type=radio name=tax id='C-to-C' value='C-to-C' onclick="Tax_change('body3');" <?=sent_check("C-to-C",$elements[0]); ?>>
					<label class="form-check-label">C-to-C</label></div>
						<?php }else { ?>
					<div class="form-check form-check-inline">
							<input class="form-check-input" type=radio name=tax id='1099' onclick="Tax_change('body2');" value='1099' <?=sent_check("1099",$elements[0]); ?> >
					<label class="form-check-label">1099</label></div>
					<div class="form-check form-check-inline">
							<input class="form-check-input" type=radio name=tax id='C-to-C' value='C-to-C' onclick="Tax_change('body3');" <?=sent_check("C-to-C",$elements[0]);  ?>>
					<label class="form-check-label">C-to-C</label></div>
						
						<?php } ?>
					<div class="form-check form-check-inline">
							<input class="form-check-input" type=radio name=tax id='None' onclick="Tax_change('body4');" value='None' <?=sent_check("None",$elements[0]); echo $disabled; ?> >
					<label class="form-check-label">None</label></div>
					</td>
	    		</tr>
				<?php /*if(PAYROLL_PROCESS_BY!="QB" || (PAYROLL_PROCESS_BY=='QB' && PAYROLL_EMP=='Y')) */?>	
				<tbody id='body1' style="display:<?=displayItem("W-2",$elements[0]);?>">
				<?php
				}
				?>
				<?php
				if($vertexStyle == ' style="display:none;"') {
				require_once("../../Include/class.NetPayroll.php");
				require_once("nusoap.php");
				
				$selectedTaxes = $selectedTaxes1 = $chkFedWHSno = $chkSWWHSno = $stateWHChk ='';	

				$sqlTaxes = "SELECT taxsno,exempt,apply,locationtype FROM vprt_taxhan_emp_apply where status='A' AND empid='".$conusername."'";
				$resTaxes = mysql_query($sqlTaxes,$db);
				if(mysql_num_rows($resTaxes)>0){
					while($rowTaxes = mysql_fetch_row($resTaxes)){
						$sql = "SELECT taxid,sno,schdist from vprt_taxhan where sno=".$rowTaxes[0];
						$resSql = mysql_query($sql,$db);
						$row = mysql_fetch_row($resSql);
						if($rowTaxes[2] == "Y") {
							if($selectedTaxes=='')
								$selectedTaxes = $row[0].'_'.$row[2]."^".$rowTaxes[0]."^".$rowTaxes[1];
							else
								$selectedTaxes .= '|'.$row[0].'_'.$row[2]."^".$rowTaxes[0]."^".$rowTaxes[1];
								
							if($rowTaxes[3]=='residence') {	
								if($selectedTaxes1=='')
									$selectedTaxes1 = $row[0].'_'.$row[2]."^".$rowTaxes[0]."^".$rowTaxes[1];
								else
									$selectedTaxes1 .= '|'.$row[0].'_'.$row[2]."^".$rowTaxes[0]."^".$rowTaxes[1];
							}		
						}
						if($row[0] == '400') {						
							$chkFedWHSno=$row[1];	//Federal WH
						}
						
						if($row[0] == '450' && $rowTaxes[3]=='work') {
							$sqry = "SELECT sno FROM vprt_tax_emp_us_setup WHERE status='A' AND locationtype='work' AND empid='".$conusername."' AND taxsno=".$rowTaxes[0];
							$srs  = mysql_query($sqry,$db);
							$srow = mysql_fetch_row($srs);
							
							$chkSWWHSno=$srow[0];
						}
						
						if($row[0] == '450' && $rowTaxes[3]=='residence') {
							
							$sqry = "SELECT sno FROM vprt_tax_emp_us_setup WHERE status='A' AND locationtype='residence' AND empid='".$conusername."' AND taxsno=".$rowTaxes[0];
							$srs  = mysql_query($sqry,$db);
							$srow = mysql_fetch_row($srs);
							
							$chkSRWHSno=$srow[0];
							$stateWHChk = $rowTaxes[2]."|".$rowTaxes[1];
						}	
					}
				}
		 	
				$sqlEmp = "SELECT vprt_GeoCode, vprt_State, vprt_County, vprt_Local FROM emp_list WHERE username='".$conusername."'";
				$resEmp = mysql_query($sqlEmp,$db);
				$rowEmpDetails = mysql_fetch_row($resEmp);
				
				if($rowEmpDetails[0] == '' || $rowEmpDetails[0] == '0'){
					$getZipEmp = "SELECT zip FROM hrcon_general WHERE username = '".$conusername."' AND ustatus = 'active'";
					$resZipEmp = mysql_query($getZipEmp,$db);
					$rowZipEmp = mysql_fetch_row($resZipEmp);
					
					$argElements = array("EntityType"=>'Employee',"EntityId"=>$conusername,"EntityZip"=>$rowZipEmp[0]);
					
					$OBJ_NET_PAYROLL_Geo = new NetPayroll();
					$rowEmpDetails[0] = $OBJ_NET_PAYROLL_Geo->setEntityGeo($argElements);				
				}
				?>			
				<!-- Hidden fields Payroll processing -->
				<input type="hidden" name="selectedTaxes" id="selectedTaxes" value="<?php echo $selectedTaxes;?>">
				<input type="hidden" name="selectedTaxes1" id="selectedTaxes1" value="<?php echo $selectedTaxes1;?>">
				<input type="hidden" name="hdnDropVal" id="hdnDropVal" value="">
				<input type="hidden" name="hdnStateResVal" id="hdnStateResVal" value="">
				<input type="hidden" name="hdnstateWHChk" id="hdnstateWHChk" value="<?php echo $stateWHChk;?>">
				<input type="hidden" name="hdnSRWHSno" id="hdnSRWHSno" value="<?php echo $chkSRWHSno;?>">
				<input type="hidden" name="hdntaxdetailArr" id="hdntaxdetailArr" value="">
				<!-- End Hidden fields Payroll processing -->

	   			<?php
				
						
				$zipArr = explode("|",$page2);
				$empLocation = explode("|",$page13);
				$sqlEmpGeoCode = "SELECT vprt_GeoCode, zipcode FROM contact_manage WHERE serial_no=".$empLocation[3]." AND status !='BP'";
				$resEmpGeoCode = mysql_query($sqlEmpGeoCode,$db);
				$rowEmpGeoCode = mysql_fetch_row($resEmpGeoCode);
				
				$OBJ_NET_PAYROLL = new NetPayroll('Employee','',$zipArr[5],$rowEmpDetails[0]);//emp geo code
				
				if($rowEmpGeoCode[0] == '' || $rowEmpGeoCode[0] == '0'){
					$argElements = array("EntityType"=>'Location',"EntityId"=>$empLocation[3],"EntityZip"=>$rowEmpGeoCode[1]);
					$rowEmpGeoCode[0] = $OBJ_NET_PAYROLL->setEntityGeo($argElements);				
				}
	
				

				?>
				<input type="hidden" name="hdnlocID" id="hdnlocID" value="<?php echo $empLocation[3];?>">
				<tr>
			    <td colspan="3">
				<?php 
				$chkArray = array();
				$chkExArray = array();
				$tempArr = explode('|',$selectedTaxes);
				foreach($tempArr as $val)
				{
					$arr = explode("^",$val);
					$chkArray[$arr[0]] = $arr[1];
					if($arr[2]=='Y')
						array_push($chkExArray,$arr[0]);
				}

				  echo $OBJ_NET_PAYROLL->getTaxes("Employee",$rowEmpGeoCode[0],$chkArray,$chkExArray); //loc geocode
				  ?></td>
	  				<input type="hidden" name="hdnLocGeoCode" id="hdnLocGeoCode" value="<?php echo $rowEmpGeoCode[0]; ?>">
				</tr>
	<?php }?>		
    <tr>
        <td colspan="3">
            <fieldset class="deductionField">
                <legend><b>Federal Tax Withholding:</b></legend>
				<?php if(AKKUPAY_WITH_SYMMETRY == 'N'){?>
               <table width="100%" border="0" cellspacing="0" cellpadding="0">
              		<?php // if (DEFAULT_AKKUPAY == 'Y') {?>
                 	<tr class="<?= $class_styles1; ?>"<?= $vertexStyle; ?>>
                		<td width=30%><font class=afontstyle>&nbsp;Filing Status for Withholding</font>&nbsp;<?= $mandatory_akkupay; ?><?php if(TRICOM_REPORTS=='Y'){echo $mandatory_madison;}?></td>
					<td>
	                        <select name="fstatus"  id="fstatus" setName='Filing status for Withholding' <?php if(TRICOM_REPORTS=='Y'){ echo $spl_Attribute; }?> onchange="disabling_tax_allow()"> 
	                            <option value="" selected="">--Select--</option> 	
	                            <option <?= compose_sel("Single", $elements[1]); ?> value="Single">Single</option>
	                            <option <?= compose_sel("Married", $elements[1]); ?> value="Married">Married</option>
	                            <option <?=compose_sel("Head of Household",$elements[1]);?> value="Head of Household">Head of Household</option>
	                      		<option <?=compose_sel("Single or Married filing separately",$elements[1]);?> value="Single or Married filing separately">Single or Married filing separately</option>
						  		<option <?=compose_sel("Married filing jointly",$elements[1]);?> value="Married filing jointly">Married filing jointly</option>
	                         </select>
	                    </td>
					<td><font class=afontstyle>&nbsp;</font></td>
	                </tr>    
                 	<?php // }else { ?>
					<!-- <tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
	    			  	<td width=30%><font class=afontstyle>&nbsp;Filing Status for Withholding</font></td>
	    			  	<td width=30%><select name="fstatus"  id="fstatus" onchange="disabling_tax_allow()">
						  <option value=" " selected="">--Select--</option> 	
	                      <option <?=compose_sel("Single",$elements[1]);?> value="Single">Single</option>
	                      <option <?=compose_sel("Married",$elements[1]);?> value="Married">Married</option>
						  <option <?=compose_sel("Head of Household",$elements[1]);?> value="Head of Household">Head of Household</option>
	                      <option <?=compose_sel("Single or Married filing separately",$elements[1]);?> value="Single or Married filing separately">Single or Married filing separately</option>
						  <option <?=compose_sel("Married filing jointly",$elements[1]);?> value="Married filing jointly">Married filing jointly</option>
	                    </select></td> 
	    			  	<td width=40%><font class=afontstyle>&nbsp;</font></td>
	    		  	</tr> -->
	            	<?php // } ?>   
					<?php //if(PAYROLL_PROCESS_BY!="QB" || (PAYROLL_PROCESS_BY=='QB' && PAYROLL_EMP=='Y')) { ?>					
					<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
	    			  	<td width=30%><font class=afontstyle>&nbsp;</font></td>
	    			  	<td><font class=afontstyle>Employee</font></td>
	    			  	<td><font class=afontstyle>Company</font></td>
	    		  	</tr>
					<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
	    			  	<td width=30%><font class=afontstyle>&nbsp;Federal Withholding</font></td>
	    			  	<td><input name=fwh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[3]);?>" >
								&nbsp;
								<select name="selFWH" >
									<option value="%">%</option> 
									<?php displayCurrency($elements[11],"USD");  //for selecting a value you can pass a variable ?>								
								</select>					</td>
	    			  	<td><input name=cfwh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[7]);?>">
							&nbsp;
							<select name="selCFWH" >
								<option value="%">%</option>
								<?php displayCurrency($elements[15],"USD"); //for selecting a value you can pass a variable ?>								
							</select>					</td>
	    	  		</tr>
					<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
						<td width=30%><font class=afontstyle>&nbsp;Additional Federal Tax Amount withheld from check</font></td>
						<td><input name=afwh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[19]);?>" >&nbsp;
							<select name="selAFWH" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[20],"USD"); //for selecting a value you can pass a variable ?>								
							</select>						
						</td>
						<td><input name=acfwh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[21]);?>">&nbsp;
							<select name="selACFWH" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[22],"USD"); //for selecting a value you can pass a variable ?>								
							</select>						
						</td>
					</tr>
					<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
						<td width=30%><font class=afontstyle>&nbsp;Total Federal Tax Allowances&nbsp;<?php if(TRICOM_REPORTS=='Y'){echo $mandatory_madison;}else{echo "&nbsp;".$mandatory_madisons;}?></font></td>
						<?php 
							$disable = '';
							$hide = '';
							$hide_dependents = '';
							$hide_adjust = '';
							$fstatus_arr = array('Head of Household','Single or Married filing separately','Married filing jointly');
							$stat_arr_disable_tax = array('Single','Married');
							if(in_array($elements[1],$fstatus_arr)){
								$disable = 'disabled';
								//$hide = 'display:none;';
							}
								
							if(in_array($elements[1],$stat_arr_disable_tax)){
								$hide_dependents = 'display:none;';
								$hide_adjust = 'display:none;';
							}

								
						?>
					<td>
						<div class="d-flex align-items-center gap-1">
							<input type="text" name=tnum id='tnum' maxlength=2 size=2 value="<?php displayVal("W-2",$elements[0],$elements[2]);?>" setName='Total Federal Tax Allowances' <?php echo $spl_Attribute?> <?php echo $disable;?>>&nbsp;
							<div class="form-check form-check-inline mt-2">
								<input type="checkbox" class="form-check-input" name="federal_exempt" id="federal_exempt"  <?php if($elements[49] == 'N' ) { ?> value='N' <?php }else if($elements[49] == 'Y' ) { ?> value='Y' checked='checked' <?php }else{ ?> value='N' <?php } ?> onclick="changes_Exempt(this,'tnum');" >
							<label class="form-check-label">Exempt</label>
							</div>
						</div>
					</td>
							<td><font class=afontstyle>&nbsp;</font>
						</td>
							
					</tr>
	               <?php //if(DEFAULT_AKKUPAY == 'Y'){ ?>
	                <tr class="<?= $class_styles2; ?>"<?= $vertexStyle; ?>>
	                    <td width=30%><font class=afontstyle>&nbsp;Override Type</font></td>
	                    <td colspan="2">
	                        <select class="form-select w-250" name="overridetype" id="overridetype">
	                           <?php $overrideCodes = getOverrideTypeCodes($elements[62]);  
	                            echo $overrideCodes;?>	  
	                        </select>
	                    </td>
	                </tr>
	               <?php //} ?>
	               	<tr class="tr1bgcolor">
					   <td width="30%"><font class="afontstyle">&nbsp;Multiple Jobs or Spouse Works&nbsp;</font></td>
					   <td><input type="checkbox" name="multijobs_spouseworks" id="multijobs_spouseworks" value="<?php echo $elements["79"] ;?>" <?php echo ($elements["79"]=="Y")?"checked=checked":""?>></td>
					</tr>
					<tr class="tr1bgcolor" id="claim_dependents" style= <?php echo $hide_dependents;?>>
					   <td width="100%" colspan="3"><fieldset class="deductionField">
					   			<legend><font class="afontstyle">&nbsp;Claim Dependents&nbsp;</font></legend>
							   <table width="100%" border="0" cellspacing="0" cellpadding="0">
								   <tbody>
								   	<tr id="qualify_child" style= <?php echo $hide;?>>
									   <td width="30%"><font class="afontstyle">&nbsp;Qualifying Children Amount&nbsp;</font>
									   <span style="font-size:10px ">(Multiply the number of qualifying children under age 17 by $2,000)</span></td>
									   <td><input type="text" name="qualify_child_amt" id="qualify_child_amt" value="<?php echo $elements["80"] ;?>"></td>
									</tr>
									<tr id="other_dependents" style= <?php echo $hide;?>>
									   <td width="30%"><font class="afontstyle">&nbsp;Other Dependents&nbsp;</font>
									   <span style="font-size:10px ">(Multiply the number of other dependents by $500)</span></td>
									  <td><input type="text" name="other_dependents_amt" id="other_dependents_amt" value="<?php echo $elements["81"] ;?>" ></td>
									</tr>
									<tr id = "dependents_amt">
									   <td width="30%"><font class="afontstyle">&nbsp;Dependents Amount&nbsp;</font></td>
									   <td><input type="text" name="claim_dependents_total" id="claim_dependents_total" value="<?php echo $elements["82"] ;?>"></td>
									</tr>
									</tbody>
							   </table>
				   			</fieldset>
				   		</td>
					</tr>
					<tr class="tr1bgcolor" id="othr_adjust" style= <?php echo $hide_adjust;?>>
					   <td width="100%" colspan="3"><fieldset class="deductionField">
					   			<legend><font class="afontstyle">&nbsp;Other Adjustments&nbsp;</font></legend>
							   <table width="100%" border="0" cellspacing="0" cellpadding="0">
								   <tbody>
								   	<tr>
									   <td width="30%"><font class="afontstyle">&nbsp;Other income&nbsp;<span style="font-size:10px">(not from jobs)</span></font>
									   </td>
									   <td><input type="text" name="other_income_amt" id="other_income_amt" value="<?php echo $elements["83"] ;?>"></td>
									</tr>
									<tr>
									   <td width="30%"><font class="afontstyle">&nbsp;Deductions&nbsp;</font></td>
									  <td><input type="text" name="deduction_amt" id="deduction_amt" value="<?php echo $elements["84"] ;?>" ></td>
									</tr>
									</tbody>
							   </table>
				   			</fieldset>
				   		</td>
					</tr>
	            </table>
					<?php } else {?>
				<table>
				<?php 
				require_once("symmentry/class.commonSymmentryFun.inc");
				$symmentryObj = new symmentry();
				$wtx=array();
				//echo "<pre>";
				//print_r($page15);
				//print_r($elements);
							foreach($elements as $elk){
								$tks=explode("^",$elk);
								$wtx[$tks[0]]=$tks[1];
							}
							if(isset($addr))
							{
							$wtx=1;
							}
				if(!isset($addr))
				{ 
				if(!$wtx['fed_filingstatus']){
					$wtx=1;
				}
				echo $symmentryObj->getEmpFederalTaxForm($con_id,$wtx);
			    }else{
                echo $symmentryObj->getEmpFederalTaxForm($conusername,$wtx);
				}				
			?>
				</table>
					<?php } ?>
			</fieldset>
		</td>
	</tr>
	<tr>
        <td colspan="3">
            <fieldset class="deductionField">
                <legend><b>State Tax Withholding:</b></legend>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td colspan="3">
							<fieldset class="deductionField"><legend><b>State 1:<b></legend>
							
							<?php if(AKKUPAY_WITH_SYMMETRY == 'N'){?>
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
                					<?php if (DEFAULT_AKKUPAY == 'Y') { ?>
                					<tr class="<?= $class_styles2; ?>"<?= $vertexStyle; ?>>
                        				<td width=30%><font class=afontstyle>&nbsp;Withholding state of the employee&nbsp;<?= $mandatory_madison_akkupay; ?><?php if(TRICOM_REPORTS=='Y'){echo $mandatory_madison;}?></font></td>
                        				<td colspan="2">
                            				<select name="lststate" id="lststate" setName='Withholding state of the employee' <?php echo $spl_Attribute ?> onchange="addFillingStatus(this);">
                                				<option value="">-select-</option>
				                                <?php
				                                $sqrystate_codes = "select state_id,state_abbr from state_codes where state_abbr!='' AND state_abbr!='null' order by state_abbr";
				                                $srsstate_codes = mysql_query($sqrystate_codes, $db);
				                                while ($srowstate_codes = mysql_fetch_row($srsstate_codes)) {
	                                    			?>	
	                                    			<option value="<?php echo $srowstate_codes[0]; ?>"<?php
				                                    if ($elements[41] == $srowstate_codes[0]) {
				                                        echo " selected";
				                                    }
	                                    			?>><?php echo $srowstate_codes[1]; ?></option>
	                                            	<?php
                                       	 		}
                                        		?>		  
                            				</select>						
                            			</td>
                    				</tr>
                    				<tr class="<?= $class_styles1; ?>"<?= $vertexStyle; ?>>
                        				<td width=30%><font class=afontstyle>&nbsp;Filing status(state) for Withholding&nbsp;<?= $mandatory_madison_akkupay; ?></font></td>
                        				<td colspan="2">
				                            <select name="fsstatus"  id="fsstatus">
				                                <option value="">-select-</option>
				                               <?php 
				                                $sqrystate_codes = "select state_id,state_abbr from state_codes where state_abbr!='' and state_abbr!='null' and state_id='".$elements[41]."' order by state_abbr";
				                                $srsstate_codes = mysql_query($sqrystate_codes, $db);
				                                $srowstate_codes = mysql_fetch_row($srsstate_codes);
				                                $totalcdoes = mysql_num_rows($srsstate_codes);
				                                $fillingstatus = getFillingStatusCodes($srowstate_codes[1],$elements[53]);  
				                                echo $fillingstatus;
				                               ?> 		  

				                            </select>
				                            <img id="imgFillingStatusLoader" src="/BSOS/images/loading_icon_small.gif" alt="Loading" style="visibility: hidden;" width="16" border="0" height="16">
				                        </td>
				                    </tr>
                					<?php  } else { ?>
									<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
										<td width=30%><font class=afontstyle>&nbsp;Withholding state of the employee&nbsp;<?php if(TRICOM_REPORTS=='Y'){echo $mandatory_madison;}else{echo $mandatory_madisons;}?></font></td>
										<td colspan="2">
						  					<select name="lststate" id="lststate" setName='Withholding state of the employee' <?php echo $spl_Attribute ?> >
						    					<option value="">-select-</option>
												<?php
                                				$sqrystate_codes = "select state_id,state_abbr from state_codes where state_abbr!='' and state_abbr!='null' order by state_abbr";
												$srsstate_codes  = mysql_query($sqrystate_codes,$db);
												while($srowstate_codes = mysql_fetch_row($srsstate_codes))
												{
												?>	
												    <option value="<?php echo $srowstate_codes[0];?>"<?php 
												    if($elements[41]==$srowstate_codes[0]){
												    	echo " selected";
													}
													?>><?php echo $srowstate_codes[1];?></option>
												<?php
												}
												?>		  
						  					</select>						
										</td>
									</tr>
									<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
										<td width=30%><font class=afontstyle>&nbsp;Filing status(state) for Withholding<?=$mandatory_madisons;?></font></td>
										<td colspan="2">
										  	<select name="fsstatus" id="fsstatus">
												<option value=" " selected="">--Select--</option> 		  
												<option <?=compose_sel("Single",$elements[53]);?> value="Single">Single</option>
												<option <?=compose_sel("Married",$elements[53]);?> value="Married">Married</option>
												<option <?=compose_sel("Head of Household",$elements[53]);?> value="Head of Household">Head of Household</option>
												<option <?=compose_sel("Single or Married filing separately",$elements[53]);?> value="Single or Married filing separately">Single or Married filing separately</option>
												<option <?=compose_sel("Married filing jointly",$elements[53]);?> value="Married filing jointly">Married filing jointly</option>
											</select>
										</td>
									</tr>
               		 				<?php  } ?>
									<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
										<td width="30%"><font class="afontstyle">&nbsp;</font></td>
										<td><font class="afontstyle">Employee</font></td>
										<td><font class="afontstyle">Company</font></td>
									</tr>
									<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
    			  						<td width=30%><font class=afontstyle>&nbsp;State Withholding</font></td>
    			  						<td><input name=swh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[4]);?>">&nbsp;
											<select name="selSWH" >
												<option value="%">%</option>
												<?php	displayCurrency($elements[12],"USD"); //for selecting a value you can pass a variable ?>								
											</select>					
										</td>
    			  						<td><input name=cswh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[8]);?>">&nbsp;
											<select name="selCSWH" >
												<option value="%">%</option>
												<?php	displayCurrency($elements[16],"USD"); //for selecting a value you can pass a variable ?>								
											</select>					
										</td>
    		  						</tr>
									<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
										<td width=30%><font class=afontstyle>&nbsp;Additional State Tax Amount withheld from check</font></td>
										<td><input name=aswh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[23]);?>" >
											&nbsp;
											<select name="selASWH" >
												<option value="%">%</option>
												<?php	displayCurrency($elements[24],"USD"); //for selecting a value you can pass a variable ?>								
											</select>						
										</td>
										<td><input name=acswh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[25]);?>">
											&nbsp;
											<select name="selACSWH" >
												<option value="%">%</option>
												<?php	displayCurrency($elements[26],"USD"); //for selecting a value you can pass a variable ?>								
											</select>						
										</td>
									</tr>
                  					<?php //if (DEFAULT_AKKUPAY == 'Y') { ?>
									<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
                     					<input type=hidden name='restrictFlag' id='restrictFlag'  value=<?= $restrictFlag ?>>
                    					<td width=30%><font class=afontstyle>&nbsp;Total State Tax Allowances&nbsp;<?= $mandatory_madison_akkupay; ?></font></td>
									<td>
										<div class="d-flex align-items-center gap-1">
											<input name=stnum id='stnum' maxlength=2 size=2 value="<?php displayVal("W-2",$elements[0],$elements[27]);?>" setName='Total State Tax Allowances' <?php if(PAYROLL_PROCESS_BY_MADISON=='MADISON'){echo $spl_Attribute;} ?>>&nbsp;
											<div class="form-check form-check-inline mt-2">
												<input type="checkbox" class="form-check-input" name="state_exempt" id="state_exempt"  <?php if($elements[50] == 'N' ) { ?> value='N' <?php }else if($elements[50] == 'Y' ) { ?> value='Y' checked='checked' <?php }else { ?> value='N' <?php } ?> onclick="changes_Exempt(this,'stnum');">
												<label class="form-check-label">Exempt</label>
											</div>
										</div>
									</td>
										<td><font class=afontstyle>&nbsp;</font></td>
                					</tr>
                  					<?php //}else { ?>
                 					<!-- <tr class="<?= $class_styles1; ?>"<?= $vertexStyle; ?>>
                    					<td width=30%><font class=afontstyle>&nbsp;Total State Tax Allowances&nbsp;<?= $mandatory_madison; ?></font></td>
                    					<td><input name=stnum id='stnum' maxlength=2 size=2 value="<?php displayVal("W-2", $elements[0], $elements[27]); ?>" setName='Total State Tax Allowances' <?php echo $spl_Attribute ?>>&nbsp;<input type="checkbox" name="state_exempt" id="state_exempt"  <?php if ($elements[50] == 'N') { ?> value='N' <?php }elseif ($elements[50] == 'Y') { ?> value='Y' checked='checked' <?php }else{ ?> value='N' <?php } ?> onclick="changes_Exempt(this, 'stnum');"><font class=afontstyle>Exempt</font></td>
                    					<td><font class=afontstyle>&nbsp;</font></td>
                					</tr> -->   
                  					<?php //} ?>
                					<?php //if(DEFAULT_AKKUPAY == 'Y'){ ?>
				                	<tr class="<?= $class_styles2; ?>"<?= $vertexStyle; ?>>
				                        <td width=30%><font class=afontstyle>&nbsp;Override Type</font></td>
				                        <td colspan="2">
				                            <select name="state_overridetype" id="state_overridetype">
				                               <?php $overrideCodes = getOverrideTypeCodes($elements[63]);  
				                                echo $overrideCodes;?>	  
				                            </select>
				                        </td>
				                    </tr>
                					<tr class="<?= $class_styles1; ?>"<?= $vertexStyle; ?>>
                            			<td width=30%><font class=afontstyle>&nbsp;State Alternate Filing Status&nbsp;</font></td>
			                            <td colspan="2">
			                                <select class="form-select w-250" name="alt_filing_status" id="alt_filing_status">
			                                 <option value="">--select--</option>
			                                  <?php 
			                                $sqrystate_codes = "select state_id,state_abbr from state_codes where state_abbr!='' and state_abbr!='null' and state_id='".$elements[41]."' order by state_abbr";
			                                $srsstate_codes = mysql_query($sqrystate_codes, $db);
			                                $srowstate_codes = mysql_fetch_row($srsstate_codes);
			                                $totalcdoes = mysql_num_rows($srsstate_codes);
			                                $Altfillingstatus = getAltFillingStatusCodes($srowstate_codes[1],$elements[64]);  
			                                echo $Altfillingstatus;
			                               ?> 
			                                 </select>
			                            <img id="imgFillingStatusLoaderstate" src="/BSOS/images/loading_icon_small.gif" alt="Loading" style="visibility: hidden;" width="16" border="0" height="16">
			                            </td>
                        			</tr>
                    				<?php //} ?>
                				</table>
							<?php } else { 
							?>
							<table>
							<?php
							//$page2=explode("|",$page2);
							//print_r($page2[23]);
							//print_r($page2[3]);
							if(!isset($addr))
							{
								
                            if(!empty($page2[3])){
								//$page2=explode("|",$page2);
								/* $wtx=1;
								}else{ */
								$conusername=0;	
								$statecode = explode("^",$page2[3]);
								$resstatecode = explode("^",$page2[3]);
								$resstatecodeloc = $resstatecode[0].'^'.$page2[22];
								}
							
							if(isset($page15[100]) && !empty($page15[100]))
							{
								//$que2="select state from staffacc_location where sno='".$page15[11]."' and ltype in ('com','loc')";
								$que2="select state,locationCode from contact_manage where loccode='".$page15[100]."'";
								$res2=mysql_query($que2,$db);
								$row2=mysql_fetch_row($res2);
								$jrtcompany=$row2[0];
							//$statecode[0] = $jrtcompany;
							$jobstatecode[0] = $jrtcompany;
                            $jobstatecodeloc = $jobstatecode[0].'^'.$row2[1];							
							
							}else {
								$que2="select cm.state,cm.locationCode from contact_manage cm LEFT JOIN consultant_jobs cj ON cj.worksite_code=cm.loccode where cj.sno='".$page15[0]."'";
								$res2=mysql_query($que2,$db);
								$row2=mysql_fetch_row($res2);
								$jrtcompany=$row2[0];
							//$statecode[0] = $jrtcompany;
							$jobstatecode[0] = $jrtcompany;
                            $jobstatecodeloc = $jobstatecode[0].'^'.$row2[1];
								
							}
							if($con_id)
							{
								if(!empty($jobstatecode[0]) && ($jobstatecode[0]!=$resstatecode[0]))
								{
									
							//echo $symmentryObj->getEmpFederalStateForm($resstatecode[0],$con_id,$wtx);
							echo $symmentryObj->getEmpFederalStateForm($resstatecodeloc,$con_id,$wtx);
								}else{
							//echo $symmentryObj->getEmpFederalStateForm($resstatecode[0],$con_id,$wtx);
                            echo $symmentryObj->getEmpFederalStateForm($resstatecodeloc,$con_id,$wtx);							
								}
							}else{						
							$statecodeloc = $statecode[0].'^'.$page2[22];
							echo $symmentryObj->getEmpFederalStateForm($statecodeloc,$conusername,$wtx);
							}
						
							}else{
								/* $stateselect = "SELECT hg.state AS resstate, sl.state AS jobstate
											  FROM hrcon_general hg
												   LEFT JOIN hrcon_jobs hj ON hj.username = hg.username
												   LEFT JOIN staffacc_location sl ON sl.sno = hj.endclient
											 WHERE hg.username = '".$conusername."'"; */
									/*$stateselect = "SELECT hg.state AS resstate, sl.state AS jobstate,hj.cdate
													  FROM hrcon_general hg
														   LEFT JOIN hrcon_jobs hj ON hj.username = hg.username
														   LEFT JOIN staffacc_location sl ON sl.sno = hj.endclient
													 WHERE hg.username = '".$conusername."'
													 order by IF(hj.ustatus='active', '2','1') desc, hj.cdate desc";*/
									$stateselect = "SELECT el.state AS resstate, cm.state AS jobstate,hj.cdate,el.locationCode,cm.locationCode
													  FROM emp_list el
														   LEFT JOIN hrcon_jobs hj ON hj.username = el.username
														   LEFT JOIN contact_manage cm ON cm.loccode=hj.worksite_code
														   LEFT JOIN staffacc_location sl ON sl.sno = hj.endclient
													 WHERE el.username = '".$conusername."'
													 order by IF(hj.ustatus='active', '2','1') desc, hj.cdate desc";				 
								$stateresult = mysql_query($stateselect,$db);
								$slrow = mysql_fetch_row($stateresult);
								$restate = $slrow[0].'^'.$slrow[3];
								$jostate = $slrow[1].'^'.$slrow[4];
								/* if(!empty($slrow[0]) && !empty($slrow[3]))
								{ */
								 echo $symmentryObj->getEmpFederalStateForm($restate,$conusername);
								/* }else{
								 echo $symmentryObj->getEmpFederalStateForm($jostate,$conusername);	
								} */
							}
							?>
							
							</table>
							<?php } ?>
							</fieldset>
						</td>
					</tr>
					<?php 
					if(!isset($addr))
							{	
                            if(count($page15)!=1){
								//$page2=explode("|",$page2);
								/* $wtx=1;
								}else{ */
								$conusername=0;	
							    $statecode = explode("^",$page2[3]);
									if($con_id)
									{
									if($jobstatecode[0]!=$resstatecode[0])
								    { ?>
								<tr>
									<td colspan="3">
										<fieldset class="deductionField"><legend><b>State 2:<b></legend>
										<table>
									<?php echo $symmentryObj->getEmpFederalStateFormTwo($jobstatecodeloc,$con_id,$wtx);?>
											</table>
										</fieldset>
									</td>
								</tr>
									<?php }
									}else{
										if($page15[11]){
											if($jobstatecode[0]!=$statecode[0])
											{
											?>
									<tr>
										<td colspan="3">
											<fieldset class="deductionField"><legend><b>State 2:<b></legend>
											<table>
										<?php
										
									echo $symmentryObj->getEmpFederalStateFormTwo($jobstatecodeloc,$conusername,$wtx);	
											}	
									}
									?>
										</table>
									</fieldset>
								</td>
							</tr>
								
							<?php
									}
							 }
							}else{
							if(!empty($slrow[1]) && $slrow[0]!=$slrow[1])
							{
					?>
					<tr>
                    	<td colspan="3">
							<fieldset class="deductionField"><legend><b>State 2:<b></legend>
							<table>
							<?php 
							echo $symmentryObj->getEmpFederalStateFormTwo($jostate,$conusername);?>
							</table>
							</fieldset>
						</td>
					</tr>
							<?php } 
				}?>
					<?php if(AKKUPAY_WITH_SYMMETRY == 'N'){?>
                   <tr>
                    	<td colspan="3">
							<fieldset class="deductionField"><legend><b>State 2:<b></legend>
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
	                				<?php if (DEFAULT_AKKUPAY == 'Y') { ?>
	                				<tr class="<?= $class_styles2; ?>"<?= $vertexStyle; ?>>
	                        			<td width=30%><font class=afontstyle>&nbsp;Withholding state of the employee&nbsp;</font></td>
	                        			<td colspan="2">
	                            			<select name="state2_lststate" id="state2_lststate" setName='Withholding state of the employee' onchange="addFillingStatusForState()">
	                                			<option value="">-select-</option>
	                                			<?php
	                                			$sqrystate_codes = "select state_id,state_abbr from state_codes where state_abbr!='' AND state_abbr!='null' order by state_abbr";
	                            				$srsstate_codes = mysql_query($sqrystate_codes, $db);
				                                while ($srowstate_codes = mysql_fetch_row($srsstate_codes)) {
				                                    ?>	
				                                    <option value="<?php echo $srowstate_codes[0]; ?>"<?php
				                                    if ($elements[65] == $srowstate_codes[0]) {
				                                        echo " selected";
				                                    }
				                                    ?>><?php echo $srowstate_codes[1]; ?></option>
				                                    <?php
				                                }
				                                ?>		  
	                            			</select>						
	                        			</td>
	                    			</tr>
				                    <tr class="<?= $class_styles1; ?>"<?= $vertexStyle; ?>>
				                        <td width=30%><font class=afontstyle>&nbsp;Filing status(state) for Withholding&nbsp;</font></td>
				                        <td colspan="2">
				                            <select name="state2_fsstatus"  id="state2_fsstatus">
				                                <option value="">-select-</option>
				                               <?php 
				                                $sqrystate_codes = "select state_id,state_abbr from state_codes where state_abbr!='' and state_abbr!='null' and state_id='".$elements[65]."' order by state_abbr";
				                                $srsstate_codes = mysql_query($sqrystate_codes, $db);
				                                $srowstate_codes = mysql_fetch_row($srsstate_codes);
				                                $totalcdoes = mysql_num_rows($srsstate_codes);
				                                $fillingstatus = getFillingStatusCodes($srowstate_codes[1],$elements[66]);  
				                                echo $fillingstatus;
				                               ?> 		  

				                            </select>
				                            <img id="imgFillingStatusLoaderstate2" src="/BSOS/images/loading_icon_small.gif" alt="Loading" style="visibility: hidden;" width="16" border="0" height="16">
				                        </td>
				                    </tr>
	                				<?php } else { ?>
									<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
										<td width=30%><font class=afontstyle>&nbsp;Withholding state of the employee&nbsp;</font></td>
										<td colspan="2">
										  	<select name="state2_lststate" id="state2_lststate" setName='Withholding state of the employee' >
											    <option value="">-select-</option>
												<?php
					                            $sqrystate_codes = "select state_id,state_abbr from state_codes where state_abbr!='' and state_abbr!='null' order by state_abbr";
												$srsstate_codes  = mysql_query($sqrystate_codes,$db);
												while($srowstate_codes = mysql_fetch_row($srsstate_codes))
												{
													?>	
													    <option value="<?php echo $srowstate_codes[0];?>"<?php 
													    if($elements[65]==$srowstate_codes[0]){
													    	echo " selected";
														}
														?>><?php echo $srowstate_codes[1];?></option>
													<?php
												}
												?>		  
											</select>						
										</td>
									</tr>
									<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
										<td width=30%><font class=afontstyle>&nbsp;Filing status(state) for Withholding</font></td>
										<td colspan="2">
										  <select name="state2_fsstatus"  id="state2_fsstatus">
											  <option value=" " selected="">--Select--</option> 		  
											  <option <?=compose_sel("Single",$elements[66]);?> value="Single">Single</option>
											  <option <?=compose_sel("Married",$elements[66]);?> value="Married">Married</option>
											  <option <?=compose_sel("Head of Household",$elements[66]);?> value="Head of Household">Head of Household</option>
											  <option <?=compose_sel("Single or Married filing separately",$elements[66]);?> value="Single or Married filing separately">Single or Married filing separately</option>
											  <option <?=compose_sel("Married filing jointly",$elements[66]);?> value="Married filing jointly">Married filing jointly</option>
										</select>
									</td>
									</tr>
				               		<?php } ?>
									<tr class="<?= $class_styles2; ?>"<?= $vertexStyle; ?>>
				                      	<td width="30%"><font class="afontstyle">&nbsp;</font></td>
									  	<td><font class="afontstyle">Employee</font></td>
									  	<td><font class="afontstyle">Company</font></td>
				                    </tr>
									<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
				    			  		<td width=30%><font class=afontstyle>&nbsp;State Withholding</font></td>
				    			  		<td><input name=state2_swh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[67]);?>">
											&nbsp;
											<select name="state2_selSWH" >
												<option value="%">%</option>
												<?php	displayCurrency($elements[68],"USD"); //for selecting a value you can pass a variable ?>								
											</select>					
										</td>
				    			  		<td><input name=state2_cswh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[69]);?>">
											&nbsp;
											<select name="state2_selCSWH" >
												<option value="%">%</option>
												<?php	displayCurrency($elements[70],"USD"); //for selecting a value you can pass a variable ?>								
											</select>					
										</td>
				    		  		</tr>
									<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
										<td width=30%><font class=afontstyle>&nbsp;Additional State Tax Amount withheld from check</font></td>
										<td><input name=state2_aswh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[71]);?>" >
											&nbsp;
											<select name="state2_selASWH" >
												<option value="%">%</option>
												<?php	displayCurrency($elements[72],"USD"); //for selecting a value you can pass a variable ?>								
											</select>						</td>
										<td><input name=state2_acswh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[73]);?>">
											&nbsp;
											<select name="state2_selACSWH" >
												<option value="%">%</option>
												<?php	displayCurrency($elements[74],"USD"); //for selecting a value you can pass a variable ?>								
											</select>						
										</td>
									</tr>
				                  	<?php //if (DEFAULT_AKKUPAY == 'Y') { ?>
									<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
				                     	<input type=hidden name='restrictFlag2' id='restrictFlag2'  value=<?= $restrictFlag2 ?>>
				                    	<td width=30%><font class=afontstyle>&nbsp;Total State Tax Allowances&nbsp;</font></td>
									<td>
										<div class="d-flex align-items-center gap-1">
											<input name=state2_stnum id='state2_stnum' maxlength=2 size=2 value="<?php displayVal("W-2",$elements[0],$elements[75]);?>" setName='Total State Tax Allowances' >&nbsp;
											<div class="form-check form-check-inline mt-2">
												<input type="checkbox" class="form-check-input" name="state2_state_exempt" id="state2_state_exempt"  <?php if($elements[76] == 'N' ) { ?> value='N' <?php }else if($elements[76] == 'Y' ) { ?> value='Y' checked='checked' <?php }else{ ?> value='N' <?php } ?> onclick="changes_ExemptForState2(this,'state2_stnum');">
												<label class="form-check-label">Exempt</label>
											</div>
										</div>
									</td>
										<td><font class=afontstyle>&nbsp;</font></td>
				                	</tr>
				                  	<?php //}else { ?>
				                 	<!-- <tr class="<?= $class_styles1; ?>"<?= $vertexStyle; ?>>
				                    	<td width=30%><font class=afontstyle>&nbsp;Total State Tax Allowances&nbsp;</font></td>
				                    	<td><input name=state2_stnum id='state2_stnum' maxlength=2 size=2 value="<?php displayVal("W-2", $elements[0], $elements[75]); ?>" setName='Total State Tax Allowances'>&nbsp;<input type="checkbox" name="state2_state_exempt" id="state2_state_exempt"  <?php if ($elements[76] == 'N') { ?> value='N' <?php } if ($elements[76] == 'Y') { ?> value='Y' checked='checked' <?php } ?> onclick="changes_ExemptForState2(this, 'state2_stnum');"><font class=afontstyle>Exempt</font></td>
				                    	<td><font class=afontstyle>&nbsp;</font></td>
				                	</tr>  -->  
				                  	<?php //} ?>
				                	<?php //if(DEFAULT_AKKUPAY == 'Y'){ ?>
				                	<tr class="<?= $class_styles2; ?>"<?= $vertexStyle; ?>>
				                        <td width=30%><font class=afontstyle>&nbsp;Override Type</font></td>
				                        <td colspan="2">
				                            <select name="state2_overridetype" id="state2_overridetype">
				                               <?php $overrideCodes = getOverrideTypeCodes($elements[77]);  
				                                echo $overrideCodes;?>	  
				                            </select>
				                        </td>
				                    </tr>
				               		<?php //} ?>
				                </table>
							</fieldset>
						</td>
					</tr>
					<?php } ?>
				</table>
			</fieldset>
		</td>
	</tr>   
<?php if(AKKUPAY_WITH_SYMMETRY == 'N'){?>	
	 <tr>
        <td colspan="3">
            <fieldset class="deductionField">
                <legend><b> Other Tax Withholding:</b></legend>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
    	  			<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
    		  			<td width=30%><font class=afontstyle>&nbsp;Social Security</font></td>
    			  		<td><input name=sswh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[5]);?>">
							&nbsp;
							<select name="selSSWH" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[13],"USD"); //for selecting a value you can pass a variable ?>								
							</select>					
						</td>
    			  		<td><input name=csswh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[9]);?>">
							&nbsp;
							<select name="selCSSWH" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[17],"USD"); //for selecting a value you can pass a variable ?>								
							</select>					
						</td>
    		  		</tr>
    		  		<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
    			  		<td width=30%><font class=afontstyle>&nbsp;Medicare</font></td>
    			  		<td><input name=mwh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[6]);?>">
							&nbsp;
							<select name="selMWH" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[14],"USD"); //for selecting a value you can pass a variable ?>								
							</select>					
						</td>
    			  		<td><input name=cmwh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[10]);?>">
							&nbsp;
							<select name="selCMWH" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[18],"USD"); //for selecting a value you can pass a variable ?>								
							</select>					
						</td>
    		  		</tr>
				</table>
			</fieldset>
		</td>
	</tr>
    <tr>
        <td colspan="3">
            <fieldset class="deductionField">
                <legend><b> Local Tax Withholding:</b></legend>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
						<td width=30%><font class=afontstyle>&nbsp;Filing status(Local) for Withholding<?=$mandatory_madisons;?></font></td>
						<td colspan="2">
						  	<select name="flstatus"  id="flstatus">
						  		<option value=" " selected="">--Select--</option> 	
		                      	<option <?=compose_sel("Single",$elements[54]);?> value="Single">Single</option>
		                      	<option <?=compose_sel("Married",$elements[54]);?> value="Married">Married</option>
		                      	<option <?=compose_sel("Head of Household",$elements[54]);?> value="Head of Household">Head of Household</option>
							  	<option <?=compose_sel("Single or Married filing separately",$elements[54]);?> value="Single or Married filing separately">Single or Married filing separately</option>
							  	<option <?=compose_sel("Married filing jointly",$elements[54]);?> value="Married filing jointly">Married filing jointly</option>
							</select>						
						</td>
					</tr>
					<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
						<td width=30%><font class=afontstyle>Local Jurisdiction</font></td>
						<td><font class=afontstyle><input type="text" name="ljur" size="30" maxlength="255" value="<?php displayVal("W-2",$elements[0],$elements[55]);?>"></font></td>
						<td><font class=afontstyle>&nbsp;</font></td>
					</tr>
					<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
						<td width=30%><font class=afontstyle>&nbsp;Total Local Tax Allowances&nbsp;<?=$mandatory_madisons;?></font></td>
						<td>
						<div class="d-flex align-items-center gap-1">
							<input name='lonum' id='lonum' maxlength=2 size=2 value="<?php displayVal("W-2", $elements[0], $elements[56]); ?>" setName='Total Local Tax Allowances' <?php if(PAYROLL_PROCESS_BY_MADISON=='MADISON'){echo $spl_Attribute;} ?>>&nbsp;
							<div class="form-check form-check-inline mt-2">
								<input type="checkbox"  class="form-check-input" name="local_exempt" id="local_exempt" <?php if ($elements[57] == 'N') { ?> value='N' <?php } else if ($elements[57] == 'Y') { ?> value='Y' checked='checked' <?php }else { ?> value='N' <?php } ?>onclick="changes_Exempt(this, 'lonum');">
								<label class="form-check-label">Exempt</label>
							</div>
						</div>
					</td>
						<td><font class=afontstyle>&nbsp;</font></td>
					</tr>
					<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
						<td width=30%><font class=afontstyle>&nbsp;Additional Local Tax Amount withheld from check</font></td>
						<td><input name=alwh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[58]);?>" >
							&nbsp;
							<select name="selALWH" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[59],"USD"); //for selecting a value you can pass a variable ?>								
							</select>						
						</td>
						<td><input name=aclwh size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[60]);?>">
							&nbsp;
							<select name="selACLWH" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[61],"USD"); //for selecting a value you can pass a variable ?>								
							</select>						
						</td>
					</tr>
					<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
						<td width=30%><input name=llwh1 size=30 maxlength=255 value="<?php echo ($elements[28])? html_tls_specialchars($elements[28],ENT_QUOTES) : "Local Withholding 1";?>"></td>
						<td><input name=lwh1 size=5 maxlength=10 value="<? displayVal("W-2",$elements[0],$elements[29]);?>">
							&nbsp;
							<select name="selLWH1" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[30],"USD"); //for selecting a value you can pass a variable ?>								
							</select>						
						</td>
						<td><input name=clwh1 size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[34]);?>">
							&nbsp;
							<select name="selCLWH1" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[35],"USD"); //for selecting a value you can pass a variable ?>								
							</select>						
						</td>
					</tr>
					<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
						<td width=30%><input name=llwh2 size=30 maxlength=255 value="<?php echo ($elements[31])? html_tls_specialchars($elements[31],ENT_QUOTES) : "Local Withholding 2";?>"></td>
						<td><input name=lwh2 size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[32]);?>">
							&nbsp;
							<select name="selLWH2" >
								<option value="%">%</option> 
								<?php	displayCurrency($elements[33],"USD"); //for selecting a value you can pass a variable ?>
							</select>						
						</td>
						<td><input name=clwh2 size=5 maxlength=10 value="<?php displayVal("W-2",$elements[0],$elements[36]);?>">
							&nbsp;
							<select name="selCLWH2" >
								<option value="%">%</option>
								<?php	displayCurrency($elements[37],"USD"); //for selecting a value you can pass a variable ?>
							</select>						
						</td>
					</tr>
                    <tr class="<?= $class_styles2; ?>"<?= $vertexStyle; ?>>
						<td width=30%><font class=afontstyle>School District</font></td>
						<td><font class=afontstyle><input type="text" name="school_district" size="30" maxlength="" value="<?php echo $elements[78]; ?>"></font></td>
						<td><font class=afontstyle>&nbsp;</font></td>
					</tr>
				</table>
			</fieldset>
		</td>
	</tr> 
	<tr>
    	<td colspan="3">
			<fieldset class="deductionField">
				<legend><b> Other Payroll Info:</b></legend>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<?php
						$ChkVarVal = ($deduction_Flag != "Payroll")? "W-2" : $elements[0]; //To know the condition it belongs 
					?>
					<!--<tr class="<?=$class_styles2;?>"<?=$vertexStyle;?>>
						<td width=30%><font class=afontstyle>Payroll Provider ID#</font></td>
						<td><font class=afontstyle><input type="text" name="ppi" size="30" maxlength="255" value="<?php echo $elements[38];?>"></font></td>
						<td><font class=afontstyle>&nbsp;</font></td>
					</tr>-->
					<input type="hidden" name="ppi" size="30" maxlength="255" value="">
					
					<tr class="<?=$class_styles1;?>"<?=$vertexStyle;?>>
						<td width=30%><font class=afontstyle>Company Code</font></td>
						<td><font class=afontstyle><input type="text" name="companycode" id="companycode" size="30" maxlength="255" value="<?php echo $elements[52];?>"></font></td>
						<td><font class=afontstyle>&nbsp;</font></td>
					</tr>
                </table>
            </fieldset>      
        </td>
    </tr>  
<?php } ?>
    <?php 
    if($deduction_Flag != "Payroll")
	{
		//if(PAYROLL_PROCESS_BY!="QB" || (PAYROLL_PROCESS_BY=='QB' && PAYROLL_EMP=='Y')) 
		//{
			$hrmpage14 = explode("|",$_SESSION[page14.$HRM_HM_SESSIONRN]);

			if($elements[39]=='')
			{
				$contssn = $hrmpage14[4]; 
			}else{
				$contssn = $elements[39];
			}
			
	?>		
	</tbody>
	
		<tbody id='body2' style="display:<?=displayItem("1099",$elements[0]);?>">
		
		<tr class=tr1bgcolor>
    		<td colspan='3'>&nbsp;</td>
		</tr>
		
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>Contractor's SSN</font><font class=sfontstyle>*</font></td>
			<td colspan=2><input type='text' id='cssn' name="contractor_ssn" size=15 maxlength=11 value="<?php echo $contssn;?>" <?=$read_flag?>></td>
		</tr>
		<tr class=tr1bgcolor>
			<td width=15%><font class=afontstyle>First Name</font><font class=sfontstyle>*</font></td>
			<td colspan=2><input type='text' name="fname" maxlength="255" id="fname" size='35' value="<?php displayVal("1099",$elements[0],$elements[40]);?>" ></td>
		</tr>
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>Middle Name</font></td>					
			<td colspan=2><input type='text' size='35' name="mname" maxlength="255" id="mname" value="<?php displayVal("1099",$elements[0],$elements[41]);?>" ></td>
		</tr>
		<tr class=tr1bgcolor>
			<td width=15%><font class=afontstyle>Last Name</font><font class=sfontstyle>*</font></td>
			<td colspan=2><input type='text' size='35' name="lname" maxlength="255" id="lname" value="<?php displayVal("1099",$elements[0],$elements[42]);?>" ></td>
		</tr>
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>Address 1</font><font class=sfontstyle>*</font></td>
			<td colspan=2><input type='text' size='35' name="address1" maxlength="255" id="address1" value="<?=$mailAd[15]?>" ></td>
		</tr>
		<tr class=tr1bgcolor>
			<td width=15%><font class=afontstyle>Address 2</font></td>
			<td colspan=2><input type='text' size='35' name="address2" maxlength="255" id="address2" value="<?=$mailAd[16]?>" ></td>
		</tr>
		<tr class=tr1bgcolor>
			<td width=15%><font class=afontstyle>City</font><font class=sfontstyle>*</font></td>
			<td colspan=2><input type='text' size='35' name="city" maxlength="50" id="city" value="<?=$mailAd[17]?>" ></td>
		</tr>
		<tr class=tr1bgcolor>
			<td width=15%><font class=afontstyle>State</font><font class=sfontstyle>*</font></td>
			<td colspan=2>
				<select style="width:171px" name="state" id="state">
					<option value=''>--Select--</option>
					<?php
						echo getStates($state_code[0]);
					 ?>
				</select>
			</td>
		</tr>
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>Zip</font><font class=sfontstyle>*</font></td>
			<td ><input type='text' name="zip" maxlength="20" id="zip" value="<?=$mailAd[20]?>" ></td>
		</tr>
		<input type="hidden" name='ccode' id='ccode' value="<?=$ccres[0]?>" /> 
			
		<tr class=tr1bgcolor>
			<td width=30%><font class=afontstyle></font></td>
			<td><font class=afontstyle></font></td>
			<td><font class=afontstyle>&nbsp;</font></td>
		</tr>
		
					
	</tbody>
		
	<tbody id='body3' style="display:<?php displayItem("C-to-C",$elements[0]);?>">
		<tr class=tr1bgcolor>
		  	<td colspan='3'>&nbsp;</td>
		</tr>
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>Contractor's Federal EIN #</font></td>
			<td colspan=2><input type='text' id='cfein' size='35' name="contractor_fein" maxlength="255" value="<?php displayVal("C-to-C",$elements[0],$elements[39]); ?>" ></td>
		</tr>				
		<tr class=tr1bgcolor>
			<td width=15%><font class=afontstyle>Vendor Name</font><font class=sfontstyle>*</font></td>
			<td colspan=2>
			<?php
			
			$getCand_Que="SELECT emp.username AS empuser,cl.username AS cluser,emp.empterminated as terminated FROM emp_list emp, candidate_list cl WHERE cl.candid=CONCAT('emp',emp.sno) and emp.username='$con_id'";
            			$isHired=(substr($con_id,0,3) == 'emp')? 1 :0;
			$candidateRes=mysql_query($getCand_Que,$db);
			$candidateValue=mysql_fetch_row($candidateRes);
			
			/** Sanghamitra: To check weather bill is generated for vendor or not.**/
			
			$isVenBillGenerated=0;$isTerminated='N';
			$candUsernameQue = "SELECT username as uid FROM candidate_list  WHERE candid='".$con_id."'";
			$candRes=mysql_query($candUsernameQue,$db);
			$candUSername=mysql_fetch_assoc($candRes);

			/** Query to get the vendorid and assignment of a candidate/employee **/
            $vendorQue = "SELECT vendorsubcon.venid, vendorsubcon.subid AS candidate,hrcon_jobs.pusername,staffacc_cinfo.sno as csno FROM vendorsubcon LEFT JOIN hrcon_jobs ON vendorsubcon.empid=hrcon_jobs.username LEFT JOIN staffacc_cinfo on staffacc_cinfo.username=vendorsubcon.venid WHERE vendorsubcon.subid = '".$candUSername['uid']."'";
			
			$vendorRes = mysql_query($vendorQue,$db);
			
            if(mysql_num_rows($vendorRes) <= 0){
				$vendorid = ''; $pusername='';$ven_cand='';
			}else{
			
				$vendoridRes=mysql_fetch_assoc($vendorRes);
				$vendoracc= explode('acc',$vendoridRes['venid']);
				$vendorid = $vendoridRes['csno'];
				$pusername=$vendoridRes['pusername'];
				$ven_cand= $vendoridRes['candidate'];
			}
			if(!empty($pusername)){ // if  assignments are generated
				
				/** Query to check weather bill is generated for this vendor who is associated with perticular employee/candidate **/
			    $isVenBillGeneratedQue="SELECT count(cvbill.client_id) AS     count,cvbillitem.billid,cvbillitem.pusername,vendorsubcon.venid FROM vendorsubcon LEFT JOIN cvbill ON cvbill.client_id = vendorsubcon.venid LEFT JOIN cvbillitem ON cvbillitem.billid = cvbill.billnumber WHERE vendorsubcon.subid = '".$ven_cand."' AND cvbill.status = 'CR' AND cvbillitem.pusername='".$pusername."'";

                		    $isVenBillGeneratedRes=mysql_query($isVenBillGeneratedQue,$db);
			    $isVenBill = mysql_fetch_assoc($isVenBillGeneratedRes);
	
			    $isVenBillGenerated=$isVenBill['count'];
			}
           		       if($isHired){
		           /*sanghamitra: check if employee/consultant is terminated or not **/ 
		           $employeeId = explode('emp',$con_id);
			   $isTerminatedQuery= mysql_query("SELECT empterminated FROM emp_list where sno='".$employeeId[1]."'",$db);
			   $isTerminatedRes = mysql_fetch_row($isTerminatedQuery);
			   $isTerminated = $isTerminatedRes[0];
			}
			
			
            ?>
			<input type="hidden" name='reset_business_name' id='reset_business_name' value="<?php echo html_tls_specialchars($elements[48],ENT_QUOTES);?>" /> 
			<input type="hidden" name='reset_addressc1' id='reset_addressc1' value="<?php displayVal("C-to-C",$elements[0],$elements[43]);?>" /> 
			<input type="hidden" name='reset_addressc2' id='reset_addressc2' value="<?php displayVal("C-to-C",$elements[0],$elements[44]);?>" /> 
			<input type="hidden" name='reset_city2' id='reset_city2' value="<?php displayVal("C-to-C",$elements[0],$elements[45]);?>" /> 
			<input type="hidden" name='reset_state2' id='reset_state2' value="<?php displayVal("C-to-C",$elements[0],$elements[46]);?>" />
			<input type="hidden" name='reset_zip2' id='reset_zip2' value="<?php displayVal("C-to-C",$elements[0],$elements[47]);?>" />
			
			<input type="hidden" name='parent' id='parent' value="<?=$vendorid?>" /> 
			
			<input type="hidden" name='isvendorBillFlag' id='isvendorBillFlag' value="<?php echo $isVenBillGenerated; ?>" /> 
			<input type="hidden" name='isHired' id='isHired' value="<?php echo $isHired; ?>" />
			
			<input type="hidden" name='isterminatedFlag' id='isterminatedFlag' value="<?php echo $isTerminated; ?>" /> 
			
			<span id="businessGridfield"><input class="form-control w-250" type="<?php if(trim($elements[48])==""){ ?>hidden<?php }else{?>text<?php }?>" size='35' name="business_name" maxlength="250" id="business_name" value="<?php echo html_tls_specialchars($elements[48],ENT_QUOTES);?>" onchange="javascript: return QuickVendorsResp(this.value)"  disabled ></span>
			<span id="showLinks"><a href="javascript:checkVendorBills('yes','existing');"><font class=linkrow>select vendor</font></a> | <a href="javascript:checkVendorBills('N','new')"><font class=linkrow>new vendor</font></a> </span> <span id="hideLinks" style="display:none;"> <a href="javascript:disableField('Y')"><font class=linkrow>reset</font></a></span>  <span id="errorDiv" class="sfontstyle"></span></td>
		</tr> 
		
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>Address</font></td>
			<td colspan=2><input type='text' size='35' name="addressc1" maxlength="255" id="addressc1" value="<?php displayVal("C-to-C",$elements[0],$elements[43]);?>" disabled></td>
		</tr>
		<tr class=tr1bgcolor>
			<td width=15%><font class=afontstyle>&nbsp;</font></td>
			<td colspan=2><input type='text' size='35' name="addressc2" maxlength="255" id="addressc2" value="<?php displayVal("C-to-C",$elements[0],$elements[44]);?>" disabled></td>
		</tr>
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>City</font></td>
			<td colspan=2><input type='text' size='35' name="city2" maxlength="50" id="city2" value="<?php displayVal("C-to-C",$elements[0],$elements[45]);?>" disabled></td>
		</tr>
		<tr class=tr1bgcolor>
			<td width=15%><font class=afontstyle>State</font></td>
			<td colspan=2><input type='text' name="state2" maxlength="50" id="state2" value="<?php displayVal("C-to-C",$elements[0],$elements[46]);?>" disabled></td>
		</tr>				
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>Zip</font></td>
			<td colspan=2><input type='text' name="zip2" maxlength="20" id="zip2" value="<?php displayVal("C-to-C",$elements[0],$elements[47]);?>" disabled></td>
		</tr>
		
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>&nbsp;Payroll Provider ID#</font></td>
			<td colspan=2><input type='text' size='35' name="ppi3" maxlength="255" id="ppi3" value="<?php echo $elements[38];?>"></td>
		</tr>	
		<tr class=tr1bgcolor>
			
			<td width=30%><font class=afontstyle>Company Code</font></td>
			<td><font class=afontstyle><input type="text" name="companycode3" id="companycode3" size="30" maxlength="255" value="<?php echo $elements[52];?>"></font></td>
			<td><font class=afontstyle>&nbsp;</font></td>
		</tr>
		
	</tbody>
				
	<tbody id='body4' style="display:<?php displayItem("None",$elements[0]);?>">
		
		<tr class=tr2bgcolor>
			<td width=15%><font class=afontstyle>&nbsp;Payroll Provider ID#</font></td>
			<td colspan=2><input type='text' id='ppid' size='35' name="ppi4" maxlength="255" value="<?php echo $elements[38];?>"></td>
	
	</tr>

			<tr class=tr2bgcolor>
				<td width=30%><font class=afontstyle>Company Code</font></td>
				<td><font class=afontstyle><input type="text" name="companycode4" id="companycode4" size="30" maxlength="255" value="<?php echo $elements[52];?>"></font></td>
				<td><font class=afontstyle>&nbsp;</font></td>
			</tr>
			<tr class=tr1bgcolor>
				<td width=30%><font class=afontstyle>&nbsp;</font></td>
				<td><font class=afontstyle>&nbsp;</font></td>
				<td><font class=afontstyle>&nbsp;</font></td>
			</tr>

		</tbody>
		<?php //} ?>
		</table>
		</td>
    </tr>
	
	<tr class="NewGridBotBg">
		<?php			
			if($_SERVER['PHP_SELF'] == "/BSOS/HRM/Employee_Mngmt/newconreg17.php" || $_SERVER['PHP_SELF'] == "/BSOS/HRM/Hiring_Mngmt/newconreg17.php"){
				//$menu->showHeadingStrip1($name2,$link2,$heading2);
			}else{
				//$menu->showHeadingStrip1($name,$link,$heading);
			}
		?>
	</tr>
<?php
}
?>
 <?php getJQLibs(['jquery','jqueryUI']);  ?>
<script language="javascript">
	
  <?php
	if($deduction_Flag != "Payroll")
	{
	?>
	function Tax_change(dis_body){
		//if(checkstatus!="QB" || (checkstatus=='QB' && checkpayroll=='Y'))
		//{
			var dynamicAlertMessage = '<?php echo $tabTitle;?>';
			var accountsFlag = true;
			if(dynamicAlertMessage == 'Employee Management')
			{
				var dynDisplayMsg = 'Employee';
			}
			else
			{
				var dynDisplayMsg = 'Candidate';
			}
			var pre_status = document.getElementById("previouscheckstatus").value;
			var pre_status_before = document.getElementById("previouscheckstatus").value;	//This is for Accounts setup alert perpose.
			var vrowCount =  document.getElementById("vrowCount").value;
			var pre_db_tax_status = document.getElementById("dbcheckstatus").value; //initial db stored value
			if(document.getElementById("W-2").checked == true)
			{
				document.getElementById("previouscheckstatus").value = "W-2";
			}
			else if(document.getElementById("1099").checked == true)
			{
				document.getElementById("previouscheckstatus").value = "1099";
			}
			else if(document.getElementById("None").checked == true)
			{
				document.getElementById("previouscheckstatus").value = "None";
			}
			else if(document.getElementById("C-to-C").checked == true)
			{
				document.getElementById("previouscheckstatus").value = "C-to-C";
			}
			if(dynamicAlertMessage == 'Employee Management' || dynamicAlertMessage == 'Hiring Management')
			{
				//This below code for Compensation tab Accounts setup (income, expense,payroll liability etc) changing to default setup.
				//places: Hiring Management,Employee Management,Accountining employees
				var pre_status_after = document.getElementById("previouscheckstatus").value;
				if(pre_status_before != pre_status_after)
				{
					accountsFlag = confirm("Changing the tax type will set the employee accounts to default.")
					if(accountsFlag == false)
					{
						document.getElementById(pre_status_before).checked = true;
						document.getElementById("previouscheckstatus").value = pre_status_before;
						return;
					}
				}	//End of accounts setup default alert...
			}
			
			if(pre_status == "C-to-C" && pre_db_tax_status == "C-to-C" && vrowCount > 0)
			{
				if(dis_body != "body3")
				{
					if(!confirm("Changing the tax type will remove the association between the "+dynDisplayMsg+" and it's corresponding consulting vendor. Are you sure you want to change the tax type?"))
					{
						document.getElementById('W-2').checked = false;
						document.getElementById('1099').checked = false;
						document.getElementById('None').checked = false;
						document.getElementById('C-to-C').checked = true;
						document.getElementById("previouscheckstatus").value = "C-to-C";
						return;
					}
				}
			}
			
			for(var i=1;i<5; i++){
				document.getElementById('body'+i).style.display = 'none';
			}//End of for(;;)
			document.getElementById(dis_body).style.display = '';			
			//For focus the Text boxes
			switch(dis_body){
				case 'body2':
					document.getElementById('cssn').focus();
				break;
				case 'body3':
					document.getElementById('cfein').focus();
				break;
				case 'body4':
					document.getElementById('ppid').focus();
				break;
				default:
					//if(checkstatus!="QB" || (checkstatus=='QB' && checkpayroll=='Y'))
						focus_element("W-2",document.getElementById("federal_exempt").value,document.getElementById("state_exempt").value,document.getElementById("local_exempt").value,document.getElementById("state2_state_exempt").value)
				break;
			}//End of the switch()
	//	}	
	}//End of the Func(Tax_change)
	function focus_element(id,val1,val2,val3,val4)
	{
        var akkupayFlag = '<?php echo DEFAULT_AKKUPAY ; ?>';	
		switch(id)
		{
			case '1099':
				document.getElementById('cssn').focus();
			break;
			case 'C-to-C':
				document.getElementById('cfein').focus();
			break;
			case 'None':
				document.getElementById('ppid').focus();
			break;
			default:
				document.getElementById('body1').style.display = '';
				document.getElementById('W-2').checked = true;
				if(val1 == 'Y'){
					document.getElementById('tnum').disabled = true;
					document.getElementById("federal_exempt").checked = true;
					document.getElementById("federal_exempt").value = 'Y';
                   // if(akkupayFlag=='Y'){
                        document.getElementById("overridetype").disabled =  true;
                   // }
				}
				else
				{
					document.getElementById('tnum').value = (document.getElementById('tnum').value) ? document.getElementById('tnum').value : '';
                    //if(akkupayFlag=='Y'){
                        document.getElementById("overridetype").disabled =  false;
                   // }
				}//End of the if-else{}
				if(val2 == 'Y'){
					document.getElementById('stnum').disabled = true;
					document.getElementById("state_exempt").checked = true;
					document.getElementById("state_exempt").value = 'Y';
                    //if(akkupayFlag=='Y'){
                        document.getElementById("state_overridetype").disabled =  true;
                    //}
				}	
				else
				{
					document.getElementById('stnum').value = (document.getElementById('stnum').value) ? document.getElementById('stnum').value : '';
                    //if(akkupayFlag=='Y'){
                       	document.getElementById("state_overridetype").disabled =  false;
                   // }
				}//End of the if-else{}	
				if(val3 == 'Y'){
					document.getElementById('lonum').disabled = true;
					document.getElementById("local_exempt").checked = true;
					document.getElementById("local_exempt").value = 'Y';
				}	
				else
				{
					document.getElementById('lonum').value = (document.getElementById('lonum').value) ? document.getElementById('lonum').value : '';
				}//End of the if-else{}							
                                if(val4 == 'Y'){
					document.getElementById('state2_stnum').disabled = true;
					document.getElementById("state2_state_exempt").checked = true;
					document.getElementById("state2_state_exempt").value = 'Y';
                   // if(akkupayFlag=='Y'){
                        document.getElementById("state2_overridetype").disabled =  true;
                   // }
				}	
				else
				{
					document.getElementById('state2_stnum').value = (document.getElementById('state2_stnum').value) ? document.getElementById('state2_stnum').value : '';
                   // if(akkupayFlag=='Y'){
                        document.getElementById("state2_overridetype").disabled =  false;
                    //}
            	}
			break;
		}//End of switch()
	  /*}
	  else
	  {
		  if(id=="")
		  document.getElementById('W-2').checked = true;  
	  }*/
	}//End of the Func()
	<?php
	}
	else
	{
	?>
		function focus_payAccount(val1,val2)
		{
			if(val1 == 'Y'){
				document.getElementById('tnum').disabled = true;
				document.getElementById("federal_exempt").checked = true;
				document.getElementById("federal_exempt").value = 'Y';
			}
			else
			{
				document.getElementById('tnum').value = (document.getElementById('tnum').value) ? document.getElementById('tnum').value : '';
			}//End of the if-else{}
			if(val2 == 'Y'){
				document.getElementById('stnum').disabled = true;
				document.getElementById("state_exempt").checked = true;
				document.getElementById("state_exempt").value = 'Y';
			}	
			else
			{
				document.getElementById('stnum').value = (document.getElementById('stnum').value) ? document.getElementById('stnum').value : '';
			}//End of the if-else{}			
		}//End of the Func(focus_payAccount)
	<?php
	}
	?>
	//Enabling Disabling the TextBox based on the Check box val
	function changes_Exempt(obj,id,amt)
	{
		var cObj = document.getElementById(id);
		var akkupayFlag = '<?php echo DEFAULT_AKKUPAY ; ?>';
		if (obj.checked)
		{
		    /*if(akkupayFlag=='Y')
		    {*/
		        var restrictFlag = document.getElementById('restrictFlag').value;
		        if(restrictFlag=='YES'){
		            if(id=='stnum'){
		                cObj.value = ''; 
		            }else{
		                cObj.value = '0';  
		            }
		        }else{
		           cObj.value = '0'; 
		        }
		        if(id!='lonum'){
		            checkOverrideType(id,obj);
		        }
		    /*}
		    else
		    {
		        cObj.value = '0';
		    }*/
		    cObj.disabled =  true;
		    obj.value = 'Y';
		}
		else
		{
		    cObj.value = (amt != '') ? '' : amt;
		    cObj.disabled =  false;
		    obj.value = 'N';
		    cObj.focus();
		    /*if(akkupayFlag=='Y')
		    {*/
		    	form=document.conreg;
		    	var fstatus = form.fstatus.value;
		    	var fstatus_arr = ['Head of Household','Single or Married filing separately','Married filing jointly'];
				if(fstatus_arr.includes(fstatus)){
		        	form.tnum.disabled=true;
		        	form.tnum.value=0;
		    	}else{
		    		form.tnum.disabled=false;
		    	}
		    	checkOverrideType(id,obj);
		        
		    /*}else{
		    	form=document.conreg;
		    	var fstatus = form.fstatus.value;
		    	var fstatus_arr = ['Head of Household','Single or Married filing separately','Married filing jointly'];
				if(fstatus_arr.includes(fstatus)){
					form.tnum.disabled=true;
		        	form.tnum.value=0;
		    	}else{
		    		form.tnum.disabled=false;
		    	}
		    }*/
		}
	}
        
    function changes_ExemptForState2(obj,id,amt)
	{
        var cObj = document.getElementById(id);
        var akkupayFlag = '<?php echo DEFAULT_AKKUPAY ; ?>';
        if (obj.checked)
        {
            /*if(akkupayFlag=='Y')
            {*/
                var restrictFlag2 = document.getElementById('restrictFlag2').value;
                if(restrictFlag2=='YES'){
                   cObj.value = ''; 
                }else{
                   cObj.value = '0'; 
                }
                checkOverrideType(id,obj);
            /*}else{
                cObj.value = '0';
            }*/
            cObj.disabled =  true;
            obj.value = 'Y';
        }
        else
        {
            cObj.value = (amt != '') ? '' : amt;
            cObj.disabled =  false;
            obj.value = 'N';
            cObj.focus();
            /*if(akkupayFlag=='Y')
            {*/
                checkOverrideType(id,obj);
           // }
        }
	}
        
    function checkOverrideType(id,obj){
        switch(id) {
            case 'tnum':
                var overRideObj = document.getElementById('overridetype');
                if(obj.checked){
                    overRideObj.disabled =  true;
                    overRideObj.value = 'B';
                }else{
                    overRideObj.disabled =  false;
                }
            break;
            case 'stnum':
                var overRideObj = document.getElementById('state_overridetype');
                if(obj.checked){
                    overRideObj.disabled =  true;
                    overRideObj.value = 'B';
                }else{
                    overRideObj.disabled =  false;
                }
            break;
            case 'state2_stnum':
                var overRideObj = document.getElementById('state2_overridetype');
                if(obj.checked){
                    overRideObj.disabled =  true;
                    overRideObj.value = 'B';
                }else{
                    overRideObj.disabled =  false;
                }
            break;
        }
    }

  function disabling_tax_allow(){
    form=document.conreg;
    var fstatus = form.fstatus.value;
    var fstatus_arr = ['Head of Household','Single or Married filing separately','Married filing jointly'];
    var stat_arr_disable_tax = ['Single','Married'];

    if(fstatus_arr.indexOf(fstatus) >= 0){
    	form.tnum.disabled=true;
		form.tnum.value=0;
		form.qualify_child_amt.value=0;
    	form.other_dependents_amt.value=0;
		document.getElementById("claim_dependents").style.display = "";
		document.getElementById("othr_adjust").style.display = "";
		

    }else if(stat_arr_disable_tax.indexOf(fstatus) >= 0){
    	form.tnum.disabled=false;
		form.federal_exempt.disabled=false;
    	form.qualify_child_amt.value=0;
    	form.other_dependents_amt.value=0;
    	form.claim_dependents_total.value=0;
    	form.other_income_amt.value=0;
    	form.deduction_amt.value=0;
		document.getElementById("claim_dependents").style.display = "none";
		document.getElementById("othr_adjust").style.display = "none";
    }else{
    	document.getElementById("qualify_child").style.display = "";
		document.getElementById("other_dependents").style.display = "";
		document.getElementById("claim_dependents").style.display = "";
		document.getElementById("othr_adjust").style.display = "";
    }
}
            
	
<?php
if($vertexStyle == ' style="display:none;"') {
	if($chkFedWHSno!='')
	{
		$sqlWithHolding = "SELECT  IF(nr_cert = 'Y', 'true', 'false'), jur_int_treat, awh, fillsno, pexempt,pamount,sexempt,samount FROM vprt_tax_emp_us_setup WHERE assid='' AND empid='".$conusername."' AND status='A' AND taxsno=".$chkFedWHSno;	
		$resWithHolding = mysql_query($sqlWithHolding,$db);
		$rowWithHolding = mysql_fetch_row($resWithHolding);
?>
		try{
			document.getElementById("txtFedWH").value="<?php echo $rowWithHolding[2];?>";
			document.getElementById("lstFedFsts").value="<?php echo $rowWithHolding[3];?>";
			document.getElementById("txtFedPexempt").value="<?php echo $rowWithHolding[4];?>";
		}catch(e){}
<?php
	}
	if($chkSWWHSno!='')
	{
		$sqlSWWHolding = "SELECT  IF(nr_cert = 'Y', 'true', 'false'), jur_int_treat, awh, fillsno, pexempt,pamount,sexempt,samount FROM vprt_tax_emp_us_setup WHERE  sno=".$chkSWWHSno;	
		$resSWWHolding = mysql_query($sqlSWWHolding,$db);
		$rowSWWHolding = mysql_fetch_row($resSWWHolding);
?>
		try{
			document.getElementById("txtLocStateWH").value="<?php echo $rowSWWHolding[2];?>";
			document.getElementById("lstLocFilSts").value="<?php echo $rowSWWHolding[3];?>";
			document.getElementById("txtLocPexempt").value="<?php echo $rowSWWHolding[4];?>";
			document.getElementById("txtLocPamt").value="<?php echo $rowSWWHolding[5];?>";
			document.getElementById("txtLocSexempt").value="<?php echo $rowSWWHolding[6];?>";
			document.getElementById("txtLocSamt").value="<?php echo $rowSWWHolding[7];?>";
			document.getElementById("chkNonResident").checked="<?php echo $rowSWWHolding[0];?>";
			document.getElementById("lstJuriIntr").value="<?php echo $rowSWWHolding[1];?>";

		}catch(e){}
<?php
	}
	
	if($chkSRWHSno!='')
	{
		$sqlSRWHolding = "SELECT CONCAT_WS('|',awh,fillsno,pexempt,pamount,sexempt,samount) FROM vprt_tax_emp_us_setup WHERE sno=".$chkSRWHSno;
		$resSRWHolding = mysql_query($sqlSRWHolding,$db);
		$rowSRWHolding = mysql_fetch_row($resSRWHolding);
		if($rowSRWHolding[0 !='']){
?>
			document.getElementById("hdnStateResVal").value="<?php echo $rowSRWHolding[0];?>";
<?php
		}
	}
?>		
	function showHideTaxes(val)
	{
		var obj = document.getElementById(val);

		if(obj.style.display=="none")
			obj.style.display = "";
		else
			obj.style.display = "none";	
	}
	
	
	function QueryTaxNames(geo, divID)
	{
		document.getElementById(divID).innerHTML = "";
		var geoList     = document.getElementById(geo);
		var selectedGeo = geoList.options[geoList.selectedIndex].value;
		var selectedTaxes = document.getElementById('selectedTaxes1').value;
		
		var url     = "/BSOS/HRM/Contact_Us/QueryTaxNames.php";
		var rtype   = "rtype";
		var content = "&callFrom=TaxDeduction&locId=<?php echo $conusername;?>&filter="+encodeURIComponent(document.getElementById("hdnLocGeoCode").value)+"&filter1="+encodeURIComponent(selectedGeo)+"&selectedTaxes="+encodeURIComponent(selectedTaxes);
		var funName = "QueryTaxNames_ChangeHandler('"+divID+"')";
		DynCls_Ajax_result(url,rtype,content,funName);
	}
	
	function QueryTaxNames_ChangeHandler(divID)
	{
		document.getElementById(divID).innerHTML = DynCls_Ajx_responseTxt;	
		
		try{
			
			if(document.getElementById('hdnStateResVal').value != ''){
				var arr = document.getElementById('hdnStateResVal').value.split('|');
				var arr1 = document.getElementById('hdnstateWHChk').value.split('|');
	
				document.getElementById("chkStateResidence").checked         = (arr1[0] == "Y") ? true : false;
				document.getElementById("exemptchkStateResidence").checked   = (arr1[1] == "Y") ? true : false;
				document.getElementById("tdchkStateResidence").style.display = (arr1[0] == "Y") ? "" : "none";
				
				document.getElementById("txtResStateWH").value=arr[0];
				document.getElementById("lstResFilSts").value=arr[1];
				document.getElementById("txtResPexempt").value=arr[2];
				document.getElementById("txtResPamt").value=arr[3];
				document.getElementById("txtResSexempt").value=arr[4];
				document.getElementById("txtResSamt").value=arr[5];
				
				
				
			}
		}catch(e){}
	}
	
	function enableTaxLink(obj)
	{
		if(obj.id == "chkStateResidence") {	
			var lnk = document.getElementById("tdchkStateResidence");
			
			if(lnk.style.display == "none")
				lnk.style.display = "";
			else
				lnk.style.display = "none";
		}		
	}
	
	function setTaxDetails(locationId,taxId,taxName,taxSno,taxGeoCode)
	{
		var v_width  = 700;
		var v_heigth = 650;
		
		if(taxGeoCode == "")
			var taxGeoCode="";
		locationId = "<?php echo $empLocation[3];?>";
		
		var top1=(window.screen.availHeight-v_heigth)/2;
		var left1=(window.screen.availWidth-v_width)/2;
		var url = "/BSOS/HRM/Contact_Us/setTaxDetails.php?openFrom=employee&taxID="+taxId+"&locationId="+locationId+"&taxFName="+taxName+"&taxSno="+taxSno+"&taxGeoCode="+taxGeoCode;
		window.open(url,"_blank","width=740,height=350,statusbar=no,menubar=no,scrollbars=yes,left="+left1+"px,top="+top1+"px,dependent=no,resizable=yes");	
	}
<?php }
	if($module_Flag == "AppMngmnt" && (trim($elements[48])!='') )
	{
		?>
		$(document).ready(function(){
			disableField_AppMngmnt('N');
			document.getElementById("showLinks").style.display = "none";
			document.getElementById("hideLinks").style.display = "inline";
		});			
		<?php
	}
?>
    /**sanghamitra: check for validations to change/add vendor**/
    function checkVendorBills(val,mode){
		var bussi_name =document.getElementById("business_name").value;
		var isvendorBillFlag= document.getElementById("isvendorBillFlag").value;
		var isHired = document.getElementById("isHired").value;
                var dynamic_message_dis1 = (isHired == '0') ?', Once Hired':'';
		var dynamic_message_dis2 = (isHired == '0') ?' applicant ':' employee ';
		var isEmpTerminated = document.getElementById("isterminatedFlag").value;
		if(isEmpTerminated == 'N'){//if employee not terminated
		    if(isvendorBillFlag == '0'){
				if(bussi_name !=''){
					if(!confirm("You are changing the vendor associated with this candidate. This will update recruiter info on the candidate record in CRM"+dynamic_message_dis1+". Click on OK to continue or Cancel to return."))
					{
							return; 
					}
				}
		
			    if(mode == 'new'){ disableField(val); }else{ parent_popup(val); } 
			}else{
				
				alert("Bills have been created, So You can't change the Vendor associated with this "+dynamic_message_dis2);
			}
		}else{ //if employee terminated allow to change the recruiter
			      if(!confirm("You are changing the vendor associated with this candidate. This will update recruiter info on the candidate record in CRM"+dynamic_message_dis1+". Click on OK to continue or Cancel to return."))
					{
							return; 
					}
				  if(mode == 'new'){ disableField(val); }else{ parent_popup(val); } 
	    }
	}
	function disableField(val) {
		
       
		if(val == 'Y'){
			var addressc1 = document.getElementById("addressc1").disabled = true;
			var addressc2 = document.getElementById("addressc2").disabled = true;
			var city2 = document.getElementById("city2").disabled = true;
			var state2 = document.getElementById("state2").disabled = true;
			var zip2 = document.getElementById("zip2").disabled = true;
			disableTextbox('N');
			TextboxClear();
			document.getElementById("errorDiv").innerHTML='';
			
			document.getElementById("business_name").value = document.getElementById("reset_business_name").value;
			document.getElementById("addressc1").value = document.getElementById("reset_addressc1").value;
			document.getElementById("addressc2").value = document.getElementById("reset_addressc2").value;
			document.getElementById("city2").value = document.getElementById("reset_city2").value;
			document.getElementById("state2").value = document.getElementById("reset_state2").value;
			document.getElementById("zip2").value = document.getElementById("reset_zip2").value;
			
	    }if(val == 'N'){ 
			var addressc1 = document.getElementById("addressc1").disabled = false; 
			var addressc2 = document.getElementById("addressc2").disabled = false;
			var city2 = document.getElementById("city2").disabled = false;
			var state2 = document.getElementById("state2").disabled = false;
			var zip2 = document.getElementById("zip2").disabled = false;
			var business_name =  document.getElementById("business_name").disabled = false;
			document.getElementById("business_name").value = '';
			disableTextbox('Y');
			TextboxClear();
			document.getElementById("errorDiv").innerHTML='';
			
	
		}
	}
	function disableField_AppMngmnt(val) {
		var addressc1 = document.getElementById("addressc1").disabled = false; 
		var addressc2 = document.getElementById("addressc2").disabled = false;
		var city2 = document.getElementById("city2").disabled = false;
		var state2 = document.getElementById("state2").disabled = false;
		var zip2 = document.getElementById("zip2").disabled = false;
		var business_name =  document.getElementById("business_name").disabled = false;		
		document.getElementById("errorDiv").innerHTML='';		
	}
	function TextboxClear(){
		var business_name = document.getElementById("business_name").value = '';
		var addressc1 = document.getElementById("addressc1").value = '';			
		var addressc2 = document.getElementById("addressc2").value = '';
		var city2 = document.getElementById("city2").value = '';
		var state2 = document.getElementById("state2").value = '';
		var zip2 = document.getElementById("zip2").value = '';		
		document.getElementById("parent").value = '';
			
	}
	function disableTextbox(type){
	
		if(type == 'Y')
		{
			document.getElementById("showLinks").style.display = "none";
			document.getElementById("hideLinks").style.display = "inline";
			$("#businessGridfield").html("<input class='form-control w-250' type='text' id='business_name' name='business_name' size='35' maxlength='255' value='' onchange='javascript: return QuickVendorsResp(this.value)' disabled />");
			document.forms['conreg'].elements['business_name'].disabled = false;
			document.getElementById("business_name").value = '';
			document.getElementById("parent").value = '';	
		}
		if(type == 'N')
		{
			document.getElementById("showLinks").style.display = "inline";
			document.getElementById("hideLinks").style.display = "none";
			$("#businessGridfield").html("<input class='form-control w-250' type='text' id='business_name' name='business_name' size='35' maxlength='255' value='' onchange='javascript: return QuickVendorsResp(this.value)'/>");	
			document.forms['conreg'].elements['business_name'].disabled = true;
			document.getElementById("business_name").value = '';	
			document.getElementById("parent").value = '';			
		}
	}
	function parent_popup(id){
		/* var v_width  = 500; */
		var v_width  = window.screen.availWidth * 0.50;
		var v_heigth = 315;
		var top1=(window.screen.availHeight-v_heigth)/2;
		var left1=(window.screen.availWidth-v_width)/2;	
		var url = "/BSOS/Accounting/clients/parent_info.php?compSno=&chk_comp=&Rnd=";
		url = url+"&vendors_hrm=yes";
		remote_pop=window.open(url,"parent","width="+v_width+"px,height="+v_heigth+"px,statusbar=no,menubar=no,scrollbars=yes,left="+left1+"px,top="+top1+"px,dependent=yes,resizable=yes");
		remote_pop.focus();
	}
	
	function QuickVendorsResp(cname)
	{
		document.getElementById("errorDiv").innerHTML='';
		if(cname!=''){
			var b_type = document.getElementById('business_name').getAttribute("type");			
			if(document.getElementById('business_name').disabled==false && b_type=='text'){		
				var xmlhttp;
				if (window.XMLHttpRequest)
				  {// code for IE7+, Firefox, Chrome, Opera, Safari
				  xmlhttp=new XMLHttpRequest();
				  }
				else
				  {// code for IE6, IE5
				  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				  }
				xmlhttp.onreadystatechange=function()
				  {
				  if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						var resp = xmlhttp.responseText;				
						if(resp!=''){							
							document.getElementById("business_name").value = '';
							document.getElementById("errorDiv").innerHTML=xmlhttp.responseText;													
						}else
						{
							document.getElementById("errorDiv").innerHTML='';
						}
					}
				  }
				xmlhttp.open("GET","/include/vendors_ajax_info.php?cname="+cname,false);
				xmlhttp.send();
			}
		}
	}

	$("#multijobs_spouseworks").click(function(){
		var multijobs_spouseworks = $("#multijobs_spouseworks").val();
		if(multijobs_spouseworks == "Y")
		{
			$("#multijobs_spouseworks").val("N");
		}else{
			$("#multijobs_spouseworks").val("Y");
		}
	})
 $(document).ready(function(){
$('#ccode').change(function(){
            var ccodeval = $(this).val();
             $.ajax({
                 method: 'POST',
                 url: "getvalues.php",
                 data: {
                     'ccode' : ccodeval,
                     'type'  : 'loccode',
                 },
                 success: callback = function(response)
                 {
                   $('#locationcode').html(response);
                 }
             });
            });	
});	
</script>
<style type="text/css">
.ProfileNewUI .deductionField{
	margin:5px 0px !important;
}
.ProfileNewUI .deductionField legend{
	font-size:13px !important;
}
</style>