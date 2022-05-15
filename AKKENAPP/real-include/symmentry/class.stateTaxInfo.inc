<?php
include_once("class.commonSymmentryFun.inc");
include_once("../class.Symmentry.php");
/**
 * 
 */
class StateTaxInfo
{
	public $mainSymtryObj;
	public $symtryAPIObj;
	
	function __construct()
	{
		//global $username,$db;
		$this->mainSymtryObj = new Symmentry();
		$this->symtryAPIObj = new SymmetryAPI();
		//$dbObj = $db;
		
	}

	public function getFederalTaxDetails($sno)
	{
		global $username,$db;

		$select = "SELECT fx.sno,cs.FEIN,cs.company_code,fx.exempt,fx.exemption_reason,fx.expense_account,fx.liability_account,fx.company_id,fx.cuser,fx.cdate
			FROM fed_taxes fx 
			LEFT JOIN company_setup cs ON (cs.sno = fx.company_id)
			WHERE fx.sno='".$sno."' ";
		$result = mysql_query($select,$db);
		return $result;		
	}

	public function getFederalWithholdingTaxDetails($sno)
	{
		global $username,$db;

		$select = "SELECT fxd.sno AS fxdsno,fxd.dep_freq_id,fxd.effective_sdate
					FROM fed_tax_details fxd 
					LEFT JOIN fed_taxes fx ON (fxd.fedtax_id = fx.sno)
					WHERE fxd.fedtax_id='".$sno."' AND fxd.status='active' AND fx.status='active' ";
		$result = mysql_query($select,$db);
		return $result;		
	}

	public function bkpFederalTaxDetails($fxSno)
	{
		global $username,$db;

		$backupFx="UPDATE fed_taxes SET status='backup' WHERE sno='".$fxSno."'";
		mysql_query($backupFx,$db);
		$backupFxW="UPDATE fed_tax_details SET status='backup' WHERE fedtax_id='".$fxSno."'";
		mysql_query($backupFxW,$db);
	}

	public function updateFederalTaxDetails($aryVal)
	{
		global $username,$db;

		$ExpAcc = "";
		$LibAcc ="";
		$FUTAExempt = "";
		$exeReason ="";
		if ($FUTAExempt == "N") {
			$exeReason = "";
		}
		//$update = "UPDATE fed_taxes SET expense_account='".."',liability_account='".."',exempt='".."',exemption_reason='".."' WHERE sno='".."'";
		//$result = mysql_query($update,$db);

		return $result;
		
	}

	public function insertFederalTaxDetails($aryVal)
	{
		global $username,$db;

		
		$feilds = implode(",",$aryVal[0]);
		$feildVals = implode(",",$aryVal[1]);

		$update = "REPLACE INTO fed_taxes (".$feilds.")	VALUES (".$feildVals.")";
		mysql_query($update,$db);
		$fxInsertId = mysql_insert_id($db);

		return $fxInsertId;		
	}

	public function insertFederalWithholdingTaxDetails($aryVal)
	{
		global $username,$db;

		$feilds = implode(",",$aryVal[0]);
		$feildVals = implode(",",$aryVal[1]);

		$insert = "REPLACE INTO fed_tax_details (".$feilds.") VALUES (".$feildVals.")";
		$result = mysql_query($insert,$db);

		return $result;
		
	}

	/*
		Get Company Location Code
	*/

	public function getCompanyLocationCode($compId='')
	{
		global $username,$db;

		$select = "SELECT * FROM company_setup WHERE sno='".$compId."' AND status='active'";
		$result = mysql_query($select,$db);
		$row = mysql_fetch_array($result);

		return $row;
	}

	/* State Tax Details */
	public function getStateTaxInfo($sno)
	{
		global $username,$db;

		$select = "SELECT st.sno,cs.sno AS company_id,st.location_id,st.state_code,st.exempt,st.exemption_reason,st.tax_acc_number,st.tax_category_permit_number,st.expense_account,st.liability_account,st.expense_account_unemp,st.liability_account_unemp,st.expense_account_add,st.liability_account_add,st.expense_account_sui,st.liability_account_sui,cs.company_code,st.fileSUI,st.cuser,st.cdate  
			FROM state_taxes st
			LEFT JOIN company_setup cs ON (cs.sno = st.company_id)
			WHERE cs.status='active' AND st.status='active' AND st.sno='".$sno."'";

		$result = mysql_query($select,$db);

		return $result;
	}
	/* State Unemployment Tax Details */
	public function getStateTaxDetails($sno)
	{
		global $username,$db;

		$select = "SELECT st.sno,st.state_tax_id,st.rate,st.effective_sdate 
					FROM state_tax_details st 
					WHERE st.state_tax_id='".$sno."' AND st.status='active'";
		$result = mysql_query($select,$db);

		return $result;
	}
	/* State Withholding Tax Details */
	public function getStateWithholdingTaxDetails($sno)
	{
		global $username,$db;

		$select = "SELECT st.sno,st.state_tax_id,st.dep_freq_id,st.rate,st.effective_sdate 
					FROM state_tax_withhold st 
					WHERE st.state_tax_id='".$sno."' AND st.status='active'";
		$result = mysql_query($select,$db);

		return $result;
	}
	/* State Additional Tax Details */
	public function getStateAdditionalTaxDetails($sno,$uniquetaxid='')
	{
		global $username,$db;

		$select = "SELECT st.sno,st.state_tax_id,st.dep_freq_id,st.rate,st.effective_sdate,st.acc_no,st.comp_deduction,st.unique_tax_id,st.expense_account,st.liability_account 
		FROM state_add_tax st 
		WHERE st.state_tax_id='".$sno."' AND st.unique_tax_id='".$uniquetaxid."' AND st.status='active'";
		$result = mysql_query($select,$db);

		return $result;
	}

	/* State SUI SurTax Details */
	public function getStateSUISurTaxDetails($sno,$uniquetaxid='')
	{
		global $username,$db;

		$select = "SELECT st.sno,st.state_tax_id,st.dep_freq_id,st.rate,st.effective_sdate,st.unique_tax_id,st.expense_account,st.liability_account 
					FROM state_suisur_tax st 
					WHERE st.state_tax_id='".$sno."' AND st.unique_tax_id='".$uniquetaxid."' AND st.status='active'";
		$result = mysql_query($select,$db);

		return $result;
	}

	/* State Local Tax Details */
	public function getStateLocalTaxDetails($sno,$uniquetaxid='')
	{
		global $username,$db;

		$select = "SELECT sl.sno,sl.state_tax_id,sl.loc_code,sl.loc_city_tax_name,sl.loc_acc_number,sl.county,sl.city,sl.state,sl.zip,sl.unique_tax_id 
					FROM state_local_tax sl 
					WHERE sl.state_tax_id='".$sno."' AND sl.unique_tax_id='".$uniquetaxid."' AND sl.status='active'";
		$result = mysql_query($select,$db);

		return $result;
	}

	/* */
	public function checkStateIsInactive($stateObbr='',$stSno='')
	{
		global $username,$db;

		$output = "N";
		$select = "SELECT company_id FROM state_taxes WHERE sno='".$stSno."'";
		$result = mysql_query($select,$db);
		$rowCompId = mysql_fetch_row($result);

		$selectLoc = "SELECT serial_no,inactive FROM contact_manage WHERE comp_sno='".$rowCompId[0]."' AND state='".$stateObbr."' AND status <> 'BP' GROUP BY inactive ";
		$resultLoc = mysql_query($selectLoc,$db);
		if (mysql_num_rows($resultLoc)>0) {

			while ($rowLoc = mysql_fetch_row($resultLoc)) {
				if ($rowLoc[1] == "Y") {
					$output = "Y";
				}else{
					$output = "N";
				}
			}
		}
		
		if ($output == "N") {
			$output = $this->checkStateIsDeleted($stateObbr,$stSno);
		}

		return $output;
	}

	public function checkStateIsDeleted($stateObbr='',$stSno='')
	{
		global $username,$db;

		$output = "N";
		$select = "SELECT company_id FROM state_taxes WHERE sno='".$stSno."'";
		$result = mysql_query($select,$db);
		$rowCompId = mysql_fetch_row($result);

		$selectLoc = "SELECT serial_no,status FROM contact_manage WHERE comp_sno='".$rowCompId[0]."' AND state='".$stateObbr."' GROUP BY state,status ";
		$resultLoc = mysql_query($selectLoc,$db);
		if (mysql_num_rows($resultLoc)>0) {

			while ($rowLoc = mysql_fetch_row($resultLoc)) {
				if ($rowLoc[1] == "BP") {
					$output = "Y";
				}else{
					$output = "N";
				}
			}
		}
		
		return $output;
	}

	/* Backup the State Tax related tables */
	public function bkpStateTaxDetails($stSno='')
	{
		global $username,$db;

		$backupSt="UPDATE state_taxes SET status='backup' WHERE sno='".$stSno."'";
		mysql_query($backupSt,$db);
		$backupStW="UPDATE state_tax_details SET status='backup' WHERE state_tax_id='".$stSno."'";
		mysql_query($backupStW,$db);
		$backupStWH="UPDATE state_tax_withhold SET status='backup' WHERE state_tax_id='".$stSno."'";
		mysql_query($backupStWH,$db);	
		$backupStWA="UPDATE state_add_tax SET status='backup' WHERE state_tax_id='".$stSno."'";
		mysql_query($backupStWA,$db);
		$backupStWS="UPDATE state_suisur_tax SET status='backup' WHERE state_tax_id='".$stSno."'";
		mysql_query($backupStWS,$db);
		$backupStWL="UPDATE state_local_tax SET status='backup' WHERE state_tax_id='".$stSno."'";
		mysql_query($backupStWL,$db);		
	}

	/* Insert State Tax Details */
	public function insertStateTaxInfo($aryVal)
	{
		global $username,$db;

		$feilds = implode(",",$aryVal[0]);
		$feildVals = implode(",",$aryVal[1]);

		$insert = "REPLACE INTO state_taxes (".$feilds.") VALUES (".$feildVals.")";
		mysql_query($insert,$db);
		$fxInsertId = mysql_insert_id($db);
		return $fxInsertId;		
	}

	/* Insert State Unemployment Tax Details */
	public function insertStateTaxDetails($aryVal)
	{
		global $username,$db;

		$feilds = implode(",",$aryVal[0]);
		$feildVals = implode(",",$aryVal[1]);		

		$insert = "REPLACE INTO state_tax_details (".$feilds.") VALUES (".$feildVals.")";
		$result = mysql_query($insert,$db);

		return $result;
		
	}
	/* Insert State Withholding Tax Details */
	public function insertStateWithholdTaxDetails($aryVal)
	{
		global $username,$db;

		$feilds = implode(",",$aryVal[0]);
		$feildVals = implode(",",$aryVal[1]);		

		$insert = "REPLACE INTO state_tax_withhold (".$feilds.") VALUES (".$feildVals.")";
		$result = mysql_query($insert,$db);

		return $result;		
	}

	/* Insert State Additional Tax Details */
	public function insertStateAdditionalTaxDetails($aryVal)
	{
		global $username,$db;

		$feilds = implode(",",$aryVal[0]);
		$feildVals = implode(",",$aryVal[1]);		

		$insert = "REPLACE INTO state_add_tax (".$feilds.") VALUES (".$feildVals.")";
		$result = mysql_query($insert,$db);

		return $result;		
	}

	/* Insert State Local Tax Details */
	public function insertStateLocalTaxDetails($aryVal)
	{
		global $username,$db;

		$feilds = implode(",",$aryVal[0]);
		$feildVals = implode(",",$aryVal[1]);		

		$insert = "REPLACE INTO state_local_tax (".$feilds.") VALUES (".$feildVals.")";
		$result = mysql_query($insert,$db);

		return $result;		
	}

	/* Insert State SUI SurTax Details */
	public function insertStateSUISurTaxDetails($aryVal)
	{
		global $username,$db;

		$feilds = implode(",",$aryVal[0]);
		$feildVals = implode(",",$aryVal[1]);		

		$insert = "REPLACE INTO state_suisur_tax (".$feilds.") VALUES (".$feildVals.")";
		$result = mysql_query($insert,$db);

		return $result;		
	}

	/* Building HTML for Selected State */

	public function getFederalTaxInformation($locSno)
	{
		$resultFTD = $this->getFederalTaxDetails($locSno);
		$rowFTD = mysql_fetch_array($resultFTD);
		$federalId = $this->mainSymtryObj->formateFederal($rowFTD[1]);
		$exempt_reason = $rowFTD['exemption_reason'];
		$companyCode = $rowFTD[2];
		$exempt = ($rowFTD['exempt'] == "" ? "N" : $rowFTD['exempt']);
		$showReason = 'style="display:none;"';
		$checkExempt = getChk($exempt,"Y");
		if ($exempt == "Y") {
			$showReason = 'style="display:block;"';
		}
		$fxsno = $rowFTD[0];
		$compsno = $rowFTD['company_id'];
		$cuser = $rowFTD['cuser'];
		$cdate = $rowFTD['cdate'];
		$expAcc = $rowFTD['expense_account'];
		$libAcc = $rowFTD['liability_account'];
		
		$cloneInfo = "";
		$i=0;
		$resultFTXD = $this->getFederalWithholdingTaxDetails($fxsno);
		if (mysql_num_rows($resultFTXD)>0) {
			while ($rowFXTD = mysql_fetch_array($resultFTXD) ) {

				$whTxSnoVal = $rowFXTD[0];
				$depFre = $rowFXTD[1];
				$year = date("m/d/Y", strtotime($rowFXTD[2]));
				
				if ($i==0) {
					$addEditDel='<td id="deletebuttonWH_'.$i.'" width="10%" colspan="1">
								&nbsp;<span onclick="cloneFedWithHoldingTaxRow('.$i.');">
									<i class="fa fa-plus"></i>
								</span>&nbsp;
								<span onclick="editFedWithHoldingTaxRow('.$i.');">
									<i class="fa fa-pencil"></i>
								</span>
							</td>';
				}else{
					$addEditDel='<td id="deletebuttonWH_'.$i.'" width="10%" colspan="1">
								&nbsp;<span onclick="editFedWithHoldingTaxRow('.$i.');">
									<i class="fa fa-pencil"></i>
								</span>&nbsp;
								<span onclick="delFedWithHoldingTaxRow('.$i.');">
									<i class="fa fa-trash"></i>
								</span>
							</td>';
				}

				$cloneInfo .='<tr class="tr1bgcolor newFedWithHoldingTaxInfo" id="tr_WHclone_'.$i.'">
							<td width="20%">
								<input type="hidden" name="whtxSno[]" id="whtxSno_'.$i.'" value="'.$whTxSnoVal.'" >
								<select id="fillReqdepFreq_'.$i.'" name="fillReqdepFreq[]">
									'.$this->mainSymtryObj->getDepoistFrequencyOptions("Fed",$depFre,"Y").'
								</select>								
							</td>														
							<td width="20%">
								<select id="yearQuaterList_'.$i.'" name="yearQuaterList[]">
									'.$this->mainSymtryObj->getYearQuarterListOptions($year).'
								</select> 
							</td>
							'.$addEditDel.'
						</tr>';			
				$i++;
			}
		}else{
			$cloneInfo .='<tr class="tr1bgcolor newFedWithHoldingTaxInfo" id="tr_WHclone_'.$i.'">
							<td width="20%">
								<input type="hidden" name="whtxSno[]" id="whtxSno_'.$i.'" value="" >
								<select id="fillReqdepFreq_'.$i.'" name="fillReqdepFreq[]">
									'.$this->mainSymtryObj->getDepoistFrequencyOptions("Fed","","Y").'
								</select>
							</td>														
							<td width="20%">
								<select id="yearQuaterList_'.$i.'" name="yearQuaterList[]">
									'.$this->mainSymtryObj->getYearQuarterListOptions("").'
								</select> 
							</td>
							<td id="deletebuttonWH_'.$i.'" width="10%" colspan="2">
								&nbsp;<span onclick="cloneFedWithHoldingTaxRow('.$i.');">
									<i class="fa fa-plus"></i>
								</span>&nbsp;
								<span onclick="editFedWithHoldingTaxRow('.$i.');">
									<i class="fa fa-pencil"></i>
								</span>
							</td>
						</tr>';
		}

		$html = '<!--Federal Tax Information-->
		<tr>
			<td align=center>
				<fieldset>
  					<legend>Federal Tax Information</legend>
					<table cellspacing=0 cellpadding=0 width=100% border=0 class="customlocation">
						<tr class=tr1bgcolor>
							<td width=20%>
								<font class=afontstyle>&nbsp;Federal ID</font>
								<font class=sfontstyle>*</font>
							</td>
							<td width="10%" >
	                        	<input readonly="" name="fedId" id="fedId" value="'.$federalId.'">         
							</td>							
							<td width="20%">
								<font class=afontstyle>Company Code</font>
								<font class=sfontstyle>*</font>
							</td>
	                        <td width="10%">
	                        	<input readonly="" name="companyCode" id="companyCode" value="'.$companyCode.'">            
							</td>
						</tr>
					</table>
					<fieldset>
	  					<legend>Federal Withholding Tax</legend>
						<table cellspacing=0 cellpadding=0 width=100% border=0 class="customlocation">
							<tr class="tr1bgcolor">
								<td width="20%" >
									<font class=afontstyle>&nbsp;Filing requirement & Deposit Frequency</font>
									<font class=sfontstyle>*</font>									
								</td>
								<td width="20%" >
									<font class=afontstyle>&nbsp;Effective Date</font>
									<font class=sfontstyle>*</font>									
								</td>
								<td width="10%" id="deletebuttonWH" colspan="1">
									<font class=afontstyle>&nbsp;</font>
								</td>
							</tr>							
							'.$cloneInfo.'
						</table>
					</fieldset>
					<fieldset>
		  				<legend>Unemployment Tax</legend>
						<table cellspacing=0 cellpadding=0 width=100% border=0 class="customlocation">
							<tr class=tr1bgcolor>
								<td width="30%" colspan="3"><font class=afontstyle>&nbsp;Federal Unemployment Tax (FUTA) Exempt</font>
									&nbsp;<input type="checkbox" name="futaExempt" id="futaExempt" onchange="enableExemptionReason();" '.$checkExempt.' value="'.$exempt.'"> 
								</td>
							</tr>
							<tr class=tr1bgcolor id="ExemptionReason" '.$showReason.'>
								<td width="50%">
									<label class="form-label"><span class="text-danger">*</span>Exempt Reason</label>
									<select id="exeReason" name="exeReason">
										'.$this->mainSymtryObj->getExemptionReasonOptions($exempt_reason).'
									</select>
								</td>
							</tr>
						</table>
					</fieldset>	
					<table cellspacing=0 cellpadding=0 width=100% border=0 class="customlocation">
		  				<tr class=tr1bgcolor>
							<td width=20%>
								<font class=afontstyle>&nbsp;Expense Account</font></font>
							</td>							
							<td width="10%">
								<select id="expAccUnemp" name="expAccUnemp">
									'.$this->mainSymtryObj->getExpenseAccountOptions($expAcc).'				
								</select>
							</td>

							<td width=20%>
								<font class=afontstyle>&nbsp;Liability Account</font></font>
							</td>							
							<td width="10%">
								<select id="libAccUnemp" name="libAccUnemp">
									'.$this->mainSymtryObj->getLiabilityAccountOptions($libAcc).'			
								</select>
							</td>
						</tr>
					</table>	
				</fieldset>			
			</td>
		</tr>
		<input type="hidden" name="fxSno" name="fxSno" value="'.$fxsno.'">
		<input type="hidden" name="compSno" name="compSno" value="'.$compsno.'">
		<input type="hidden" name="cuser" name="cuser" value="'.$cuser.'">
		<input type="hidden" name="cdate" name="cdate" value="'.$cdate.'">';

		$output = $html;

		return $output;


	}

	public function checkStateWithholdingAccName($abbr='')
	{
		global $username,$db;
		$output = false;

		$whAccNameArray = array("Fed","GA","IA","IL","IN","KS","KY","LA","MI","MO","NJ","NY","OH","PA","VA","WI","CO","OR");

		if (in_array($abbr, $whAccNameArray)) {
			$output = true;
		}
		return $output;
	}

	public function checkStateUnemploymentAccName($abbr='')
	{
		global $username,$db;
		$output = false;
		$uneAccNameArray = array("FL","GA","IA","IL","IN","KS","KY","LA","MI","MO","OH","PA","TN","TX","VA","WI","CO");
		if (in_array($abbr, $uneAccNameArray)) {
			$output = true;
		}

		return $output;		
	}

	public function getStateWithholdingAccName($abbr='')
	{
		global $username,$db;
		$output = "Withholding Account Number";
		$whAccNameArray = array("Fed"=>"Federal Employer Identification Number",
			"GA"=>"Withholding Number",
			"IA"=>"Withholding Permit Number",
			"IL"=>"Withholding Account Number",
			"IN"=>"Tax Identification Number",
			"KS"=>"Withholding Account Number",
			"KY"=>"Withholding Tax Account Number",
			"LA"=>"Revenue Account Number",
			"MI"=>"Withholding Account Number",
			"MO"=>"Withholding Account Number",
			"NJ"=>"Employer Registration Number",
			"NY"=>"Employer Withholding Identification Number",
			"OH"=>"Withholding Account Number",
			"PA"=>"Withholding Tax Account Number",
			"VA"=>"Withholding Tax Account Number",
			"WI"=>"DOR Tax Number",
			"CO"=>"Withholding Account Number",
			"OR"=>"Withholding Account Number"
		);

		if (array_key_exists($abbr, $whAccNameArray)) {
			$output = $whAccNameArray[$abbr];
		}
		return $output;
	}

	public function getStateUnemploymentAccName($abbr='')
	{
		global $username,$db;
		$output = "UI Account Number";
		$uneAccNameArray = array("FL"=>"Reemployment Tax Account Number",
			"GA"=>"DOL Account Number",
			"IA"=>"UI Account Number",
			"IL"=>"UI Account Number",
			"IN"=>"SUTA Account Number",
			"KS"=>"UI Account Number",
			"KY"=>"UI Employer Account Number",
			"LA"=>"Unemployment Tax Employer Account Number",
			"MI"=>"Employer Account Number",
			"MO"=>"Employer Account Number",
			"OH"=>"Employer Account Number",
			"PA"=>"UC Account Number",
			"TN"=>"Employer Account Number",
			"TX"=>"TWC Tax Account Number",
			"VA"=>"VA VEC Account Number",
			"WI"=>"DWD UI Account Number",
			"CO"=>"UI Account Number"
		);
		
		if (array_key_exists($abbr, $uneAccNameArray)) {
			$output = $uneAccNameArray[$abbr];
		}
		return $output;
	}

	/*
		Checking Withholding Tax for State

	*/
	public function checkStateWHTax($abbr='')
	{
		global $username,$db;

		// Checking WithHolding Tax
		$selectWHT = "SELECT sno FROM steUniqueTaxIds WHERE stateAbbreviation='".$abbr."' AND subTaxType='SIT'";
		$resultWHT = mysql_query($selectWHT,$db);

		return $resultWHT;
	}

	public function checkStateSUITax($abbr='')
	{
		global $username,$db;

		// State Unemployment Insurance (SUI) Setup
		$selectSUI = "SELECT sno,uniqueTaxID,taxType,subTaxType,description,rate FROM steUniqueTaxIds WHERE stateAbbreviation='".$abbr."' AND subTaxType='SUI' AND isEmployerTax='1'";
		$resultSUI = mysql_query($selectSUI,$db);

		return $resultSUI;
	}

	public function checkStateSUISCTax($abbr='')
	{
		global $username,$db;

		// Reemployment Service Fund
		$selectSUISC = "SELECT sno,uniqueTaxID,taxType,subTaxType,description,rate FROM steUniqueTaxIds WHERE stateAbbreviation='".$abbr."' AND subTaxType='SUI_SC' AND isEmployerTax='1'";
		$resultSUISC = mysql_query($selectSUISC,$db);

		return $resultSUISC;
	}

	public function checkStateADDTax($abbr='')
	{
		global $username,$db;

		// Additional Taxes
		$selectADD = "SELECT sno,uniqueTaxID,taxType,subTaxType,description,rate FROM steUniqueTaxIds WHERE stateAbbreviation='".$abbr."' AND subTaxType='Addl' AND isEmployerTax='1'";
		$resultADD = mysql_query($selectADD,$db);

		return $resultADD;
	}

	public function checkStateLOCTax($abbr='')
	{
		global $username,$db;

		// Local Taxes
		$selectLOC = "SELECT sno,uniqueTaxID,taxType,subTaxType,description,rate FROM steUniqueTaxIds WHERE stateAbbreviation='".$abbr."' AND taxType NOT IN('Federal','State') AND isEmployerTax='1'";
		$resultLOC = mysql_query($selectLOC,$db);

		return $resultLOC;
	}

	public function buildDynamicStateTaxHtml($abbr='',$locSno='')
	{
		global $username,$db;

		$requiredFieldAry = array();

		$stateName = $this->mainSymtryObj->getStateName($abbr);

		$result = $this->getStateTaxInfo($locSno);
		$row = mysql_fetch_array($result);

		$stateTxSno = $row['sno'];
		$exempt = ($row['exempt'] == "" ? "N" : $row['exempt']);
		$showReason = 'style="display:none;"';
		$checkExempt ='';
		if ($exempt == "Y") {
			$showReason = 'style="display:block;"';
			$checkExempt = getChk($exempt,"Y");
		}
		$exempt_reason = $row['exemption_reason']; 
		$taxAccNo = $row['tax_acc_number'];
		$taxPermitNo = $row['tax_category_permit_number'];
		$companyCode = $row['company_code'];
		$cuser = $row['cuser'];
		$cdate = $row['cdate'];
		$compsno = $row['company_id'];
		$locId = $row['location_id'];
		$stCode = $row['state_code'];
		$expAcc = $row['expense_account'];
		$libAcc = $row['liability_account'];
		$expAccUnemp = $row['expense_account_unemp'];
		$libAccUnemp = $row['liability_account_unemp'];
		

		$exeOptionReason = "";
	 	$resultER = $this->mainSymtryObj->getExemptionReason(); 	 	
	 	while ($rowER = mysql_fetch_array($resultER)) {
	 		$sele = "";
	 		$sele = getSel($exempt_reason,$rowER[0]);										 		
	 		$exeOptionReason .= "<option value='".$rowER[0]."' ".$sele." >".$rowER[1]."</option>";
	 	}

		$html = '<!-- '.$stateName.' Tax Information-->
		<tr>
			<td align=center>
				<fieldset>
  					<legend>'.$stateName.' Tax Information</legend>
					<table class="customlocation">
						<tr class=tr1bgcolor>							
							<td width="10%">
								<font class=afontstyle>Company Code</font>
								<font class=sfontstyle>*</font>
							</td>
	                        <td width="10%" colspan="2">
	                        	<input readonly="" name="companyCode" id="companyCode" value="'.$companyCode.'">            
							</td>
						</tr>
					</table>';
		array_push($requiredFieldAry, "companyCode");
		// Checking Withholding TAX for the state
		$isWHTax = $this->checkStateWHTax($abbr);
		if (mysql_num_rows($isWHTax)>0) {
			
			array_push($requiredFieldAry, "fillReqdepFreq[]");
			array_push($requiredFieldAry, "yearQuaterList[]");
			$resultWTXD = $this->getStateWithholdingTaxDetails($stateTxSno);						
			$ii=0;
			$cloneWithHoldInfo="";
			if (mysql_num_rows($resultWTXD)>0) {
				while ($rowWTX = mysql_fetch_array($resultWTXD)) {			

					$whTxSnoVal = $rowWTX['sno'];
					$freqVal = $rowWTX['dep_freq_id'];
					$year = date("m/d/Y", strtotime($rowWTX['effective_sdate']));
					
					if ($ii==0) {
						$addEditDelW='<td id="deletebuttonWH_'.$ii.'" width="10%" colspan="1">
									&nbsp;<a role="button" onclick="cloneFedWithHoldingTaxRow('.$ii.');">
										<i class="fa fa-plus"></i>
									</a>&nbsp;
									<a role="button" onclick="editFedWithHoldingTaxRow('.$ii.');">
										<i class="fa fa-pencil"></i>
									</a>
								</td>';
					}else{
						$addEditDelW='<td id="deletebuttonWH_'.$ii.'" width="10%" colspan="1">
									&nbsp;<a role="button" onclick="editFedWithHoldingTaxRow('.$ii.');">
										<i class="fa fa-pencil"></i>
									</a>&nbsp;
									<a role="button" onclick="delFedWithHoldingTaxRow('.$ii.');">
										<i class="fa fa-trash"></i>
									</a>
								</td>';
					}

					$cloneWithHoldInfo .='<tr class="newFedWithHoldingTaxInfo" id="tr_WHclone_'.$ii.'">
						<td width="10%">
							<input type="hidden" id="whtxSno_'.$ii.'" name="whtxSno[]" value="'.$whTxSnoVal.'" >
							<select id="fillReqdepFreq_'.$ii.'" name="fillReqdepFreq[]">
							'.$this->mainSymtryObj->getDepoistFrequencyOptions($abbr,$freqVal,"Y").'
							</select>
						</td>														
						<td width="10%">
							<select id="yearQuaterList_'.$ii.'" name="yearQuaterList[]">
								'.$this->mainSymtryObj->getYearQuarterListOptions($year).'
							</select> 
						</td>
						'.$addEditDelW.'
					</tr>';
					$ii++;
				}			
			}else{
				$cloneWithHoldInfo .='<tr class="newFedWithHoldingTaxInfo" id="tr_WHclone_'.$ii.'">
					<td width="10%">
						<input type="hidden" id="whtxSno_'.$ii.'" name="whtxSno[]" value="" >
						<select id="fillReqdepFreq_'.$ii.'" name="fillReqdepFreq[]">
						'.$this->mainSymtryObj->getDepoistFrequencyOptions($abbr,"","Y").'
						</select>
					</td>														
					<td width="10%">
						<select id="yearQuaterList_'.$ii.'" name="yearQuaterList[]">
							'.$this->mainSymtryObj->getYearQuarterListOptions("").'
						</select> 
					</td>
					<td id="deletebuttonWH_'.$ii.'" width="10%" colspan="1">
						<a role="button" onclick="cloneFedWithHoldingTaxRow('.$ii.');">
							<i class="fa fa-plus"></i>
						</a>
						<a role="button" onclick="editFedWithHoldingTaxRow('.$ii.');">
							<i class="fa fa-pencil"></i>
						</a>
					</td>
				</tr>';
			}

			$WHAccNameStr = '';
			$iswithHoldingAccName = $this->checkStateWithholdingAccName($abbr);
			if ($iswithHoldingAccName) {
				$withHoldingAccName = $this->getStateWithholdingAccName($abbr);
				$WHAccNameStr = '<tr class="tr1bgcolor">
								<td width="30%">
									<font class="afontstyle">&nbsp;'.$withHoldingAccName.'</font>
									<font class=sfontstyle>*</font>
								</td>
								<td width="30%" colspan="2">
									<input type="text" name="permitNo" id="permitNo" onkeyup=validateWHNumber(event,this,"'.$abbr.'"); value="'.$taxPermitNo.'">
								</td>								
							</tr>';
			}

			$html .= '<fieldset>
	  					<legend>'.$abbr.' Withholding Tax</legend>
						<table class="customlocation" width="100%" cellspacing="0" cellpadding="0" border="0">
							'.$WHAccNameStr.'
							<tr class="tr1bgcolor">
								<td width="30%">
									<font class="afontstyle">&nbsp;Deposit Frequency</font>
									<font class=sfontstyle>*</font>
								</td>
								<td width="30%">
									<font class="afontstyle">Effective Date</font>
									<font class=sfontstyle>*</font>
								</td>
								<td colspan="1" width="20%">
									<font class="afontstyle"></font>
								</td>
							</tr>
							'.$cloneWithHoldInfo.'
							<tr class=tr1bgcolor>
								<td width=20%>
									<font class=afontstyle>&nbsp;Expense Account</font></font>
								</td>							
								<td width="10%">
									<select id="expAcc" name="expAcc">
										'.$this->mainSymtryObj->getExpenseAccountOptions($expAcc).'
									</select>
								</td>
								
								<td width="20%">
									<font class=afontstyle>Liability Account</font>
								</td>
			                    <td width="10%">
			                    	<select id="libAcc" name="libAcc">
			                    		'.$this->mainSymtryObj->getLiabilityAccountOptions($libAcc).'
			                    	</select>
			                    </td>
							</tr>
						</table>
					</fieldset>';
		}
		// END
		// State Unemployment Insurance (SUI) Setup
		$isSUITax = $this->checkStateSUITax($abbr);
		if (mysql_num_rows($isSUITax)>0){

			array_push($requiredFieldAry, "rateUnemp[]");
			array_push($requiredFieldAry, "yearQuaterListUnemp[]");
			array_push($requiredFieldAry, "suiExempt");

			$cloneSUIInfo = "";
			$i=0;
			$resultFTXD = $this->getStateTaxDetails($stateTxSno);
			if (mysql_num_rows($resultFTXD)>0) {
				while ($rowFXTD = mysql_fetch_array($resultFTXD) ) {
					$unEmpSnoVal = $rowFXTD['sno'];
					$rateVal = $rowFXTD['rate'];
					$year = date("m/d/Y", strtotime($rowFXTD['effective_sdate']));
					if ($i==0) {
						$addEditDel='<td id="deletebuttonUnemp_'.$i.'" width="10%" colspan="1">
									&nbsp;<a role="button" onclick="cloneFLUnemploymentRow('.$i.');">
										<i class="fa fa-plus"></i>
									</a>&nbsp;
									<a role="button" onclick="editFLUnemploymentRow('.$i.');">
										<i class="fa fa-pencil"></i>
									</a>
								</td>';
					}else{
						$addEditDel='<td id="deletebuttonUnemp_'.$i.'" width="10%" colspan="1">
									&nbsp;<a role="button" onclick="editFLUnemploymentRow('.$i.');">
										<i class="fa fa-pencil"></i>
									</a>&nbsp;
									<a role="button" onclick="delFLUnemploymentRow('.$i.');">
										<i class="fa fa-trash fa-lg"></i>
									</a>
								</td>';
					}
					$cloneSUIInfo .='<tr class="tr1bgcolor newFLUnemployment" id="tr_clone_'.$i.'">
									<td width="10%">
										<input type="hidden" id="unempSno_'.$i.'" name="unempSno[]" value="'.$unEmpSnoVal.'">
										<span><input type="text" name="rateUnemp[]" id="rateUnemp_'.$i.'" value="'.$rateVal.'" onkeyup=validateRate(event,"rateUnemp",this); >%</span>
									</td>														
									<td width="10%">
										<select id="yearQuaterListUnemp_'.$i.'" name="yearQuaterListUnemp[]">
											'.$this->mainSymtryObj->getYearQuarterListOptions($year).'
										</select> 
									</td>
									'.$addEditDel.'
								</tr>';
				
					$i++;
				}
			}else{
				$cloneSUIInfo .='<tr class="tr1bgcolor newFLUnemployment" id="tr_clone_'.$i.'">
								<td width="10%">
								<input type="hidden" id="unempSno_'.$i.'" name="unempSno[]" value="">
									<span><input type="text" name="rateUnemp[]" id="rateUnemp_'.$i.'" value="" onkeyup=validateRate(event,"rateUnemp",this); >%</span>
								</td>														
								<td width="10%">
									<select id="yearQuaterListUnemp_'.$i.'" name="yearQuaterListUnemp[]">
										'.$this->mainSymtryObj->getYearQuarterListOptions("").'
									</select> 
								</td>
								<td id="deletebuttonUnemp_'.$i.'" width="10%" colspan="1">
									&nbsp;<a role="button" onclick="cloneFLUnemploymentRow('.$i.');">
										<i class="fa fa-plus"></i>
									</a>&nbsp;
									<a role="button" onclick="editFLUnemploymentRow('.$i.');">
										<i class="fa fa-pencil"></i>
									</a>
								</td>
							</tr>';
			}

			//Reemployment Service Fund (SUI SC)
			$SUISCTax ='';
			$isSUISCTax = $this->checkStateSUISCTax($abbr);
			if (mysql_num_rows($isSUISCTax)>0) {
				
				//array_push($requiredFieldAry, "rateSUISur[]");
				//array_push($requiredFieldAry, "yearQuaterListSUISur[]");
				
				$SUISurTaxInfo='';
				$x=0;

				while ($rowSuiScTax = mysql_fetch_array($isSUISCTax)) {
					
					$rateAdVal = "0.00";
					$rateSuiScTaxVal = $rowSuiScTax["rate"];
					$uniqueTaxIDVal = $rowSuiScTax["uniqueTaxID"];

					array_push($requiredFieldAry, "rateSUISur[".$x."][]");
					array_push($requiredFieldAry, "yearQuaterListSUISur[".$x."][]");
					$cloneSuiScInfo = "";
					$z=0;
					$resultSUI = $this->getStateSUISurTaxDetails($stateTxSno,$uniqueTaxIDVal);
					if (mysql_num_rows($resultSUI)>0) {
						while ($rowSUI = mysql_fetch_array($resultSUI)) {
							$suiSurTxSnoVal = $rowSUI['sno'];
							$rateVal = $rowSUI['rate'];
							$year = date("m/d/Y", strtotime($rowSUI['effective_sdate']));
							$expAccSUISur = $rowSUI['expense_account'];
							$libAccSUISur = $rowSUI['liability_account'];
							if ($z==0) {
								$addEditDelSUI='<td id="deletebuttonSUISur_'.$x.'_'.$z.'" width="10%" colspan="1">
											&nbsp;<a role="button" onclick="cloneFLSUISurTaxRow('.$x.','.$z.');">
												<i class="fa fa-plus"></i>
											</a>&nbsp;
											<a role="button" onclick="editFLSUISurTaxRow('.$x.','.$z.');">
												<i class="fa fa-pencil"></i>
											</a>
										</td>';
							}else{
								$addEditDelSUI='<td id="deletebuttonSUISur_'.$x.'_'.$z.'" width="10%" colspan="1">
											&nbsp;<a role="button" onclick="editFLSUISurTaxRow('.$x.','.$z.');">
												<i class="fa fa-pencil"></i>
											</a>&nbsp;
											<a role="button" onclick="delFLSUISurTaxRow('.$x.','.$z.');">
												<i class="fa fa-trash"></i>
											</a>
										</td>';

							}

							$cloneSuiScInfo .='<tr class="tr1bgcolor newFLSUISurTax'.$x.'" id="tr_SUIclone_'.$x.'_'.$z.'">
								<td width="10%">
									<input type="hidden" id="SUISurSno_'.$x.'_'.$z.'" name="SUISurSno['.$x.'][]" value="'.$suiSurTxSnoVal.'">
									<select id="rateSUISur_'.$x.'_'.$z.'" name="rateSUISur['.$x.'][]">
									<option value="0.00" '.getSel($rateVal,"0.00").' >0.00</option>
									<option value="'.$rateSuiScTaxVal.'" '.getSel($rateVal,$rateSuiScTaxVal).' >'.$rateSuiScTaxVal.'</option>
									</select>									
								</td>
																						
								<td width="10%">
									<select id="yearQuaterListSUISur_'.$x.'_'.$z.'" name="yearQuaterListSUISur['.$x.'][]">
										'.$this->mainSymtryObj->getYearQuarterListOptions($year).'
									</select> 
								</td>
								'.$addEditDelSUI.'																
							</tr>';
							$z++;
						}
					}else{
						
						$cloneSuiScInfo .='<tr class="tr1bgcolor newFLSUISurTax'.$x.'" id="tr_SUIclone_'.$x.'_0">
								<td width="10%">
									<input type="hidden" id="SUISurSno_'.$x.'_0" name="SUISurSno['.$x.'][]" value="">
									<select id="rateSUISur_'.$x.'_0" name="rateSUISur['.$x.'][]">
									<option value="0.00" '.getSel($rateVal,"0.00").'>0.00</option>
									<option value="'.$rateSuiScTaxVal.'" '.getSel($rateVal,$rateSuiScTaxVal).'>'.$rateSuiScTaxVal.'</option>
									</select>									
								</td>
																						
								<td width="10%">
									<select id="yearQuaterListSUISur_'.$x.'_0" name="yearQuaterListSUISur['.$x.'][]">
										'.$this->mainSymtryObj->getYearQuarterListOptions("").'
									</select> 
								</td>	
								<td id="deletebuttonSUISur_'.$x.'_0" width="10%" colspan="1">
									&nbsp;<a role="button" onclick="cloneFLSUISurTaxRow('.$x.',0);">
										<i class="fa fa-plus"></i>
									</a>&nbsp;
									<a role="button" onclick="editFLSUISurTaxRow('.$x.',0);">
										<i class="fa fa-pencil"></i>
									</a>
								</td>																
							</tr>';
					}
					$SUISurTaxInfo .= '<fieldset><legend>'.$rowSuiScTax["description"].'</legend>
	  					<table cellspacing=0 cellpadding=0 width=100% border=0 class="customlocation">
							<tr class="tr1bgcolor">
								<td width="30%">
									<font class="afontstyle">Rate</font>
									<font class=sfontstyle>*</font>
								</td>
								<td width="30%">
									<font class="afontstyle">Effective Date</font>
									<font class=sfontstyle>*</font>
								</td>
								<td colspan="1" width="20%">
									<font class="afontstyle"></font>
								</td>
							</tr>
							'.$cloneSuiScInfo.'
							<tr class=tr1bgcolor>
								<td width=20%>
									<font class=afontstyle>&nbsp;Expense Account</font></font>
								</td>	
								<input type="hidden" id="uniqueTaxIdSUISur_'.$x.'" name="uniqueTaxIdSUISur['.$x.'][]" value="'.$uniqueTaxIDVal.'">						
								<td width="10%">
									<select id="expAccSUISur_'.$x.'" name="expAccSUISur['.$x.'][]">
										'.$this->mainSymtryObj->getExpenseAccountOptions($expAccSUISur).'									
									</select>
								</td>
								
								<td width="20%">
									<font class=afontstyle>Liability Account</font>
								</td>
			                    <td width="10%">
			                    	<select id="libAccSUISur_'.$x.'" name="libAccSUISur['.$x.'][]">
			                    		'.$this->mainSymtryObj->getLiabilityAccountOptions($libAccSUISur).'
			                    	</select>
			                    </td>
							</tr>
						</table></fieldset>';
						$x++;
				}

				$SUISCTax = '<fieldset>
  					<legend>'.$abbr.' SUI Surtax</legend>
					<table class="customlocation" width="100%" cellspacing="0" cellpadding="0" border="0">
						<tr class=tr1bgcolor>
							<td width="20%" colspan="3"><font class=afontstyle>&nbsp;
							</td>									
						</tr>
					</table>
					'.$SUISurTaxInfo.'
				</fieldset>';
			}

			$isunEmploymentAccName = $this->checkStateUnemploymentAccName($abbr);
			$uneAccNameStr='';
			if ($isunEmploymentAccName) {
				$unEmploymentAccName = $this->getStateUnemploymentAccName($abbr);
				$uneAccNameStr='<tr class=tr1bgcolor>
								<td width=30% >
									<font class=afontstyle>&nbsp;'.$unEmploymentAccName.'</font>
									<font class=sfontstyle>*</font>
								</td>						
								<td width="30%" colspan="2">
									<input type="text" name="taxAccNo" id="taxAccNo" onkeyup=validateAccNumber(event,this,"'.$abbr.'"); value="'.$taxAccNo.'"> 
								</td>
							</tr>';
			}

			$html .='<fieldset>
	  					<legend>'.$abbr.' State Unemployment Insurance (SUI) Setup</legend>
						<table cellspacing=0 cellpadding=0 width=100% border=0 class="customlocation">
							'.$uneAccNameStr.'
							<tr class=tr1bgcolor>
								<td colspan="3">
									<font class=afontstyle>&nbsp;<b>'.$abbr.' Unemployment (SUI) </b></font></font>			
								</td>
							</tr>
							<tr class="tr1bgcolor">
								<td width="20%" >
									<font class=afontstyle>&nbsp;Rate</font>
									<font class=sfontstyle>*</font>									
								</td>
								<td width="20%" >
									<font class=afontstyle>&nbsp;Effective Date</font>
									<font class=sfontstyle>*</font>									
								</td>
								<td width="10%" colspan="1">
									<font class=afontstyle>&nbsp;</font>
								</td>
							</tr>
							'.$cloneSUIInfo.'
							<tr class=tr1bgcolor>
								<td width="20%" colspan="3"><font class=afontstyle>&nbsp;'.$abbr.' SUI Exempt</font>
									&nbsp;<input type="checkbox" name="suiExempt" id="suiExempt" onchange="suiExemptReason();" '.$checkExempt.' value="'.$exempt.'"> 
								</td>
							</tr>
							<tr id="suiExemptReason" '.$showReason.'>
								<td colspan="3">
									<div class="row">
										<div class="col-6">
											<label class="form-label"><span class="text-danger">*</span>Exempt Reason</label>
											<select id="exeReason" name="exeReason">
												'.$exeOptionReason.'
											</select> 
										</div>
									</div>
								</td>
							</tr>
			  				<tr>
								<td colspan="3">
									<div class="row">
										<div class="col">
											<label class="form-label">Expense Account</label>
											<select class="form-select" id="expAccUnemp" name="expAccUnemp">
												'.$this->mainSymtryObj->getExpenseAccountOptions($expAccUnemp).'
											</select>
										</div>
										<div class="col">
											<label class="form-label">Liability Account</label>
											<select id="libAccUnemp" name="libAccUnemp">
												'.$this->mainSymtryObj->getLiabilityAccountOptions($libAccUnemp).'
											</select>
										</div>
									</div>
								</td>
							</tr>
						</table>
						'.$SUISCTax.'	
					</fieldset>';

		}
		// END

		// Additional Taxes
		$isADDTax = $this->checkStateADDTax($abbr);
		if (mysql_num_rows($isADDTax)>0){
			
			$cloneAdditionalInfo = "";
			$y=0;
			$AddTaxInfo = "";
			while ($rowAddTax = mysql_fetch_array($isADDTax)) {

				$x=0;
				$rateAdVal = "0.00";
				$rateAdTaxVal = $rowAddTax["rate"];
				$uniqueTaxIDVal = $rowAddTax["uniqueTaxID"];
				$descriptionVal	= $rowAddTax["description"];
				array_push($requiredFieldAry, "rateAdd[".$y."][]");
				array_push($requiredFieldAry, "yearQuaterListAdd[".$y."][]");

				$cloneAdditionalInfo = "";
				$resultFTAD = $this->getStateAdditionalTaxDetails($stateTxSno,$uniqueTaxIDVal);
				if (mysql_num_rows($resultFTAD)>0) {
					while ($rowFXAD = mysql_fetch_array($resultFTAD) ) {

						$addtxSnoVal = $rowFXAD['sno'];
						$rateAdVal = $rowFXAD['rate'];
						$yearAd = date("m/d/Y", strtotime($rowFXAD['effective_sdate']));
						$expAccAdd = $rowFXAD['expense_account'];
						$libAccAdd = $rowFXAD['liability_account'];
						$adAccNoVal = $rowFXAD['acc_no'];
						if ($x==0) {
							$addEditDelADD='<td id="deletebuttonAdd_'.$y.'_'.$x.'" width="10%" >
										&nbsp;<a role="button" onclick="cloneFLAdditionalRow('.$y.','.$x.');">
											<i class="fa fa-plus"></i>
										</a>&nbsp;
										<a role="button" onclick="editFLAdditionalRow('.$y.','.$x.');">
											<i class="fa fa-pencil"></i>
										</a>
									</td>';
						}else{
							$addEditDelADD='<td id="deletebuttonAdd_'.$y.'_'.$x.'" width="10%" >
										&nbsp;<a role="button" onclick="editFLAdditionalRow('.$y.','.$x.');">
											<i class="fa fa-pencil"></i>
										</a>&nbsp;
										<a role="button" onclick="delFLAdditionalRow('.$y.','.$x.');">
											<i class="fa fa-trash"></i>
										</a>
									</td>';
						}
						$cloneAdditionalInfo .='<tr class="tr1bgcolor newFLAdditional'.$y.'" id="tr_ADDclone_'.$y.'_'.$x.'">
							<td width="20%">
								<input type="text" id="addAccNo_'.$y.'_'.$x.'" name="addAccNo['.$y.'][]" value="'.$adAccNoVal.'" onkeyup=validateAccNumber(event,this,"'.$abbr.'"); >
							</td>
							<td width="20%">
								<input type="hidden" id="addTxSno_'.$y.'_'.$x.'" name="addTxSno['.$y.'][]" value="'.$addtxSnoVal.'" >
								<select id="rateAdd_'.$y.'_'.$x.'" name="rateAdd['.$y.'][]">
								<option value="0.00" '.getSel($rateAdVal,"0.00").'>0.00</option>
								<option value="'.$rateAdTaxVal.'" '.getSel($rateAdVal,$rateAdTaxVal).'>'.$rateAdTaxVal.'</option>
								</select>									
							</td>														
							<td width="20%">
								<select id="yearQuaterListAdd_'.$y.'_'.$x.'" name="yearQuaterListAdd['.$y.'][]">
									'.$this->mainSymtryObj->getYearQuarterListOptions($yearAd).'
								</select> 
							</td>
							'.$addEditDelADD.'								
						</tr>';
						$x++;
					}
				}else{
					$cloneAdditionalInfo .='<tr class="tr1bgcolor newFLAdditional'.$y.'" id="tr_ADDclone_'.$y.'_0">
						<td width="20%">
							<input type="text" id="addAccNo_'.$y.'_'.$x.'" name="addAccNo['.$y.'][]" value="'.$adAccNoVal.'" onkeyup=validateAccNumber(event,this,"'.$abbr.'"); >
						</td>
						<td width="20%">
							<input type="hidden" id="addTxSno_'.$y.'_'.$x.'" name="addTxSno['.$y.'][]" value="" >
							<select id="rateAdd_'.$y.'_0" name="rateAdd['.$y.'][]">
							<option value="0.00" '.getSel($rateAdVal,"0.00").'>0.00</option>
							<option value="'.$rateAdTaxVal.'" '.getSel($rateAdVal,$rateAdTaxVal).'>'.$rateAdTaxVal.'</option>
							</select>									
						</td>
						<td width="20%">
							<select id="yearQuaterListAdd_'.$y.'_0" name="yearQuaterListAdd['.$y.'][]" >
							'.$this->mainSymtryObj->getYearQuarterListOptions("").'
							</select> 
						</td>
						<td id="deletebuttonAdd_'.$y.'_0" width="10%" >
							&nbsp;<a role="button" onclick="cloneFLAdditionalRow('.$y.',0);">
								<i class="fa fa-plus"></i>
							</a>&nbsp;
							<a role="button" onclick="editFLAdditionalRow('.$y.',0);">
								<i class="fa fa-pencil"></i>
							</a>
						</td>								
					</tr>';
				}
				
				$AddTaxInfo .= '<fieldset><legend>'.$rowAddTax["description"].'</legend>
	  					<table cellspacing=0 cellpadding=0 width=100% border=0 class="customlocation">
							<tr class="tr1bgcolor">
								<td width="20%">
									<font class="afontstyle">Account Number</font>
								</td>
								<td width="30%">
									<font class="afontstyle">Rate</font>
									<font class=sfontstyle>*</font>
								</td>
								<td width="30%">
									<font class="afontstyle">Effective Date</font>
									<font class=sfontstyle>*</font>
								</td>
								<td width="20%">
									<font class="afontstyle"></font>
								</td>
							</tr>
							'.$cloneAdditionalInfo.'
							<tr class=tr1bgcolor>
								<td width=20%>
									<font class=afontstyle>&nbsp;Expense Account</font></font>
								</td>
								<input type="hidden" id="addTaxName_'.$y.'" name="addTaxName['.$y.'][]" value="'.$descriptionVal.'">	
								<input type="hidden" id="uniqueTaxIdAdd_'.$y.'" name="uniqueTaxIdAdd['.$y.'][]" value="'.$uniqueTaxIDVal.'">						
								<td width="10%">
									<select id="expAccAdd_'.$y.'" name="expAccAdd['.$y.'][]">
										'.$this->mainSymtryObj->getExpenseAccountOptions($expAccAdd).'									
									</select>
								</td>
								
								<td width="20%">
									<font class=afontstyle>Liability Account</font>
								</td>
			                    <td width="10%">
			                    	<select id="libAccAdd_'.$y.'" name="libAccAdd['.$y.'][]">
			                    		'.$this->mainSymtryObj->getLiabilityAccountOptions($libAccAdd).'
			                    	</select>
			                    </td>
							</tr>
						</table></fieldset>';
				$y++;
			}
			

			$html .= '<fieldset>
	  					<legend>Additional Taxes</legend>
						<table class="customlocation" width="100%" cellspacing="0" cellpadding="0" border="0">
							<tr class="tr1bgcolor">
								<td colspan="3">
									<font class=afontstyle>&nbsp;</font>	
								</td>
							</tr>
						</table>	
						'.$AddTaxInfo.'						
					</fieldset>';

		}
		// END

		// Local Taxes
		$isLOCTax = $this->checkStateLOCTax($abbr);
		if (mysql_num_rows($isLOCTax)>0){

			$l=0;
			$localTaxInfo = "";
			while($rowLcTx = mysql_fetch_assoc($isLOCTax))
			{
				$taxName = $rowLcTx["description"];
				$locUnixTaxId = $rowLcTx["uniqueTaxID"];
				$rowcompLocCode = $this->getCompanyLocationCode($compsno);
				$compLocCode = $rowcompLocCode['location_code'];
				$m=0;
				$resultFTLC = $this->getStateLocalTaxDetails($stateTxSno,$locUnixTaxId);
				if (mysql_num_rows($resultFTLC)>0){

					while ($rowLC = mysql_fetch_array($resultFTLC)) {
						
						$locTxSnoVal = $rowLC['sno'];
						$loccode = $rowLC['loc_code'];
						if($rowLC['loc_code'] == ""){
							$loccode = $compLocCode;
						}else{
							$loccode = $rowLC['loc_code'];
						}
						if($rowLC['loc_city_tax_name'] == ""){
							$locTaxName = $taxName;
						}else{
							$locTaxName = $rowLC['loc_city_tax_name'];
						}
						$locAccNum = $rowLC['loc_acc_number'];

						$localTaxInfo .= '<fieldset><legend>'.$locTaxName.'</legend><table class="customlocation" width="100%" cellspacing="0" cellpadding="0" border="0">
							<tr class="tr1bgcolor">
							<td width="20%">
								<font class="afontstyle">&nbsp;Location Code</font>
							</td>
							<td width="10%" >
								<input type="hidden" name="locTxSno[][]" id="locTxSno_'.$l.'_'.$m.'" value="'.$locTxSnoVal.'" >
								<input type="hidden" name="uniqueTaxIdLoc[][]" id="uniqueTaxIdLoc_'.$l.'_0" value="'.$locUnixTaxId.'" >
								<input type="text" name="locTaxCode[][]" id="locTaxCode_'.$l.'_'.$m.'" value="'.$loccode.'" disabled>
							</td>
							<td width="20%">
								<font class="afontstyle">&nbsp;Tax Name</font>
							</td>
							<td width="10%">
								<input type="text" name="loctaxname[][]" id="loctaxname_'.$l.'_'.$m.'" value="'.$locTaxName.'" disabled>
							</td>					
						</tr>
						<tr class="tr1bgcolor">					
							<td width="20%">
								<font class=afontstyle>&nbsp;Account Number</font>
							</td>
							<td width="20%">
								<input type="text" name="locAccNum[][]" id="locAccNum_'.$l.'_'.$m.'" value="'.$locAccNum.'">
							</td>
							<td width="20%">
								<font class=afontstyle>&nbsp;</font>
							</td>
							<td width="10%">
								<font class=afontstyle>&nbsp;</font>
							</td>
						</tr>
						</table></fieldset>';

						$l++;
					}
				}else{
					$localTaxInfo .= '<fieldset><legend>'.$taxName.'</legend>
					<table class="customlocation" width="100%" cellspacing="0" cellpadding="0" border="0">
					<tr class="tr1bgcolor">
						<td width="20%">
							<font class="afontstyle">&nbsp;Location Code</font>
						</td>
						<td width="10%" >
							<input type="hidden" name="locTxSno[][]" id="locTxSno_'.$l.'_0" value="" >
							<input type="hidden" name="uniqueTaxIdLoc[][]" id="uniqueTaxIdLoc_'.$l.'_0" value="'.$locUnixTaxId.'" >
							
							<input type="text" name="locTaxCode[][]" id="locTaxCode_'.$l.'_0" value="'.$compLocCode.'" disabled>
						</td>
						<td width="20%">
							<font class="afontstyle">&nbsp;Tax Name</font>
						</td>
						<td width="10%">
							<input type="text" name="loctaxname[][]" id="loctaxname_'.$l.'_0" value="'.$taxName.'" >
						</td>								
					</tr>
					<tr class="tr1bgcolor">								
						<td width="20%">
							<font class=afontstyle>&nbsp;Account Number</font>
						</td>
						<td width="20%">
							<input type="text" name="locAccNum[][]" id="locAccNum_'.$l.'_0" onkeyup=validateAccNumber(event,this,"'.$abbr.'"); value="" >
						</td>
						<td width="20%">
							<font class=afontstyle>&nbsp;</font>
						</td>
						<td width="10%">
							<font class=afontstyle>&nbsp;</font>
						</td>
					</tr>
					</table></fieldset>';
				}
				$l++;
			}
			$html .='<fieldset>
	  					<legend>Local Tax Information</legend>
						<table class="customlocation" width="100%" cellspacing="0" cellpadding="0" border="0">							
							<tr class="tr1bgcolor">
								<td width="20%" colspan="3">
									<font class="afontstyle">&nbsp;Your Local taxes Are:</font>
								</td>
							</tr>
						</table>
						'.$localTaxInfo.'
					</fieldset>';

		}

		$requiredFieldstr = "'".implode("','", $requiredFieldAry)."'";

		$html .='</fieldset>			
			</td>
		</tr>
		<input type="hidden" id="requiredFields" name="requiredFields" value="'.$requiredFieldstr.'">
		<input type="hidden" id="stSno" name="stSno" value="'.$stateTxSno.'">
		<input type="hidden" id="compSno" name="compSno" value="'.$compsno.'">
		<input type="hidden" id="locSno" name="locSno" value="'.$locId.'">
		<input type="hidden" id="stCode" name="stCode" value="'.$stCode.'">
		<input type="hidden" id="cuser" name="cuser" value="'.$cuser.'">
		<input type="hidden" id="cdate" name="cdate" value="'.$cdate.'"> 
		<!-- '.$stateName.' Tax Information END -->';

		return $html;
	}
}

?>