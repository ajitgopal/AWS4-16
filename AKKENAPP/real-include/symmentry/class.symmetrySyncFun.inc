<?php  
class symmetrySync
{
	public function insertPRHBatch($mphrbatchid)
	{
		global $username,$db;

		$select = "INSERT INTO prhbatches (compid,locid,ername,eraddress1,eraddress2,ercity,erstate,erzipcode,ercountry,erphone,erfax,payschid,batchtype,payperiod,paysdate,payedate,payrdate,paydate,sup_ded,sup_garn,sup_contrib,sup_con,cdate,status,mphrbatchid) SELECT g.company_id,g.locid,c.company_name,SUBSTRING_INDEX(c.address,'|',1),SUBSTRING_INDEX(c.address,'|',-1),c.city,c.state,c.zipcode,cn.country_abbr,c.phone,c.fax,g.payschid,g.paybtype,g.payunit,g.paysdate,g.payedate,NOW(),b.paydate,g.sup_ded,g.sup_garn,g.sup_con,g.sup_con,NOW(),'BR',b.sno FROM mpHR_payUnitBatch b LEFT JOIN mpHR_payGroups g ON b.sno=g.parid LEFT JOIN contact_manage c ON g.locid=c.serial_no LEFT JOIN countries cn ON c.country=cn.sno WHERE b.sno='".$mphrbatchid."'";
		$result = mysql_query($select,$db);
		$batchId=mysql_insert_id($db);

		return $batchId;
	}

	public function insertPRHMaster($mphrgroupid,$batchId,$payDate)
	{
		global $username,$db;

		$que="INSERT INTO prhmaster(batchid,weekending,empid,empname,empssn,empdob,empaddress1,empaddress2,empcity,empstate,empzipcode,datehire,empstatus,terminateddate,division,locationCode,fedfilingstatus,fedaddlamount,statecode1,statefilingstatus1,stateallowances1,stateaddlamount1,statecode2,statefilingstatus2,stateallowances2,stateaddlamount2,paymethod)
		SELECT '".$batchId."','".$payDate."',dd.empsno,CONCAT(first_name,' ',last_name),dd.soc_sec_num,dd.birth_date,dd.address_one,dd.address_two,dd.city,dd.state,dd.zip_code,DATE_FORMAT(dd.hire_date,'%m-%d-%Y'),IF(dd.status_code='T','TERM','Active'),IF(dd.status_code='T',DATE_FORMAT(dd.status_type_date,'%m-%d-%Y'),'0000-00-00 00:00:00'),dd.division_code,locationCode,td.fed_filingstatus,td.fed_addwh_amt,td.state1_state,td.state1_filingstatus,td.state1_totalallowances,td.state1_addwh_amt,td.state2_state,td.state2_filingstatus,td.state2_totalallowances,td.state2_addwh_amt,dd.payment_method
		FROM mpHR_personData dd 
		LEFT JOIN mpHR_taxDeductions td ON dd.empsno=td.empsno AND dd.parid=td.parid AND td.process='N'
		WHERE  dd.process='N' AND dd.parid = '".$mphrgroupid."' GROUP BY dd.sno";
		mysql_query($que,$db);
	} 	

	public function insertPRHTaxDeductions($mphrgroupid,$batchId,$payDate)
	{
		global $username,$db;

		$que="INSERT INTO prhtaxdeductions (parid,empid,fed_filingstatus,fed_two_jobs,fed_dependents_amt,fed_other_income,fed_deductions,fed_addwh_amt,fed_exempt_fwh,fed_exempt_soc_med,fed_exempt_fui,state1_state,state1_filingstatus,state1_totalallowances,state1_personalallowances,state1_dependentallowances,state1_annual_wages,state1_additionalallowances,state1_dependentexemptions,state1_personalexemptions,state1_totaldependents,state1_residentpercent,state1_nonresidentpercent,state1_reduced_wh_amt,state1_ratetable,state1_pa_wages_only,state1_basicallowances,state1_ageandblindnessexemptions,state1_predominant_city,state1_addwh_amt,state1_exempt_swh,state1_exempt_sui,state1_exempt_local,state1_exempt_fli,state1_exempt_flb,state1_exempt_sdi,state2_state,state2_filingstatus,state2_totalallowances,state2_personalallowances,state2_dependentallowances,state2_annual_wages,state2_additionalallowances,state2_dependentexemptions,state2_personalexemptions,state2_totaldependents,state2_residentpercent,state2_nonresidentpercent,state2_reduced_wh_amt,state2_ratetable,state2_pa_wages_only,state2_basicallowances,state2_ageandblindnessexemptions,state2_predominant_city,state2_addwh_amt,state2_exempt_swh,state2_exempt_sui,state2_exempt_local,state2_exempt_fli,state2_exempt_flb,state2_exempt_sdi) 
		SELECT '".$batchId."',t.empsno,t.fed_filingstatus,t.fed_two_jobs,t.fed_dependents_amt,t.fed_other_income,t.fed_deductions,t.fed_addwh_amt,t.fed_exempt_fwh,t.fed_exempt_soc_med,t.fed_exempt_fui,t.state1_state,t.state1_filingstatus,t.state1_totalallowances,t.state1_personalallowances,t.state1_dependentallowances,t.state1_annual_wages,t.state1_additionalallowances,t.state1_dependentexemptions,t.state1_personalexemptions,t.state1_totaldependents,t.state1_residentpercent,t.state1_nonresidentpercent,t.state1_reduced_wh_amt,t.state1_ratetable,t.state1_pa_wages_only,t.state1_basicallowances,t.state1_ageandblindnessexemptions,t.state1_predominant_city,t.state1_addwh_amt,t.state1_exempt_swh,t.state1_exempt_sui,t.state1_exempt_local,t.state1_exempt_fli,t.state1_exempt_flb,t.state1_exempt_sdi,t.state2_state,t.state2_filingstatus,t.state2_totalallowances,t.state2_personalallowances,t.state2_dependentallowances,t.state2_annual_wages,t.state2_additionalallowances,t.state2_dependentexemptions,t.state2_personalexemptions,t.state2_totaldependents,t.state2_residentpercent,t.state2_nonresidentpercent,t.state2_reduced_wh_amt,t.state2_ratetable,t.state2_pa_wages_only,t.state2_basicallowances,t.state2_ageandblindnessexemptions,t.state2_predominant_city,t.state2_addwh_amt,t.state2_exempt_swh,t.state2_exempt_sui,t.state2_exempt_local,t.state2_exempt_fli,t.state2_exempt_flb,t.state2_exempt_sdi
		FROM mpHR_taxDeductions t WHERE t.process='N' AND t.parid='".$mphrgroupid."'";
		mysql_query($que,$db);
	}

	public function insertPRHEarnings($mphrgroupid,$batchId,$payDate)
	{
		global $username,$db;

		$que="INSERT INTO prhearnings(parid,empid,rowid,weekending,earningstype,earningsid,earningsname,wagetype,is_gross,is_net,custname,asgnid,asgnname,units,rate,hours,amount,locationCode,custid,worksite_code,worksite_id,wccode,wcstate,wcrate,eewcrate,expensebankid)
		SELECT '".$batchId."',pd.AC_EmpID,'0','".$payDate."',IF(pd.RefType='Time', 'timesheet', 'expense') AS earntype,el.sno,pd.pay_code,sm.ste_type,sm.is_gross,sm.is_net,pd.CustomerName,pd.AssignmentID,pd.AssignmentName,pd.hrs_units,pd.pay_rate,IF(pd.RefType='Time',pd.hrs_units,0) AS hours,(pd.hrs_units*pd.pay_rate) as amount,w.locationCode,pd.custid,pd.worksite_code,pd.worksite_id,wc.code,wc.state,rp.employer_amount,rp.amount,el.expense_acc
		FROM mpHR_payData pd 
		LEFT JOIN earnings_list el ON pd.pay_code=el.name 
		LEFT JOIN ste_manage sm ON el.type=sm.ac_type 
		LEFT JOIN contact_manage w ON pd.worksite_id=w.serial_no
		LEFT JOIN workerscomp wc ON pd.wcid=wc.workerscompid AND wc.status='active'
		LEFT JOIN rates_period rp ON rp.parentid=wc.sno AND rp.startdate<='".$payDate."' AND rp.enddate>='".$payDate."'
		WHERE pd.process='N' AND pd.parid = '".$mphrgroupid."' GROUP BY pd.sno";
		mysql_query($que,$db);
	}

	public function insertPRHDeductions($mphrgroupid,$batchId,$payDate)
	{
		global $username,$db;

		$que="INSERT INTO prhdeductions(parid,empid,rowid,weekending,responsible,dedtype,dedid,dedname,calc_type,dedamount,limit_amount,liabilitybankid)
		SELECT parid,empid,rowid,weekending,responsible,dedtype,dedid,dedname,calc_type,dedamount,limit_amount,liabilitybankid FROM 
		(SELECT '".$batchId."' as parid,dd.empsno as empid,'0' as rowid,'".$payDate."' as weekending,'E' as responsible,'D' as dedtype,dl.sno as dedid,dd.deduct_code as dedname,dd.garn_method as calc_type,dd.amount as dedamount,limit_amount as limit_amount,dd.calc_freq as calc_freq,dl.liability_acc as liabilitybankid,
		(SELECT COUNT(1) FROM prhdeductions phd WHERE phd.responsible='E' AND phd.dedtype='D' AND phd.empid=dd.empsno AND MONTH(phd.weekending)=MONTH('".$payDate."') AND YEAR(phd.weekending)=YEAR('".$payDate."') AND phd.dedid=dl.sno) as mCount 
		FROM mpHR_deductions dd 
		LEFT JOIN deductions_list dl ON dd.deduct_code = dl.name 
		WHERE dd.process='N' AND dd.type='D' AND dd.parid = '".$mphrgroupid."' 
		AND STR_TO_DATE(dd.start_date,'%m/%d/%Y')<='".$payDate."' AND IF(dd.stop_date='',DATE_ADD(NOW(), INTERVAL 1 YEAR),STR_TO_DATE(dd.stop_date,'%m/%d/%Y'))>='".$payDate."' GROUP BY dd.sno) 
		as tempDD WHERE (tempDD.calc_freq='52' OR (tempDD.calc_freq='24' AND tempDD.mCount<2) OR (tempDD.calc_freq='12' AND tempDD.mCount=0))";
		mysql_query($que,$db);
	}

	public function insertPRHContributions($mphrgroupid,$batchId,$payDate)
	{
		global $username,$db;

		$que="INSERT INTO prhdeductions(parid,empid,rowid,weekending,responsible,dedtype,dedid,dedname,calc_type,dedamount,limit_amount,liabilitybankid)
		SELECT parid,empid,rowid,weekending,responsible,dedtype,dedid,dedname,calc_type,dedamount,limit_amount,liabilitybankid FROM 
		(SELECT '".$batchId."' as parid,dd.empsno as empid,'0' as rowid,'".$payDate."' as weekending,'M' as responsible,'C' as dedtype,dl.sno as dedid,dd.contrib_code as dedname,dd.calc_method as calc_type,dd.amount as dedamount,limit_amount as limit_amount,dd.calc_freq as calc_freq,dl.liability_acc as liabilitybankid,
		(SELECT COUNT(1) FROM prhdeductions phd WHERE phd.responsible='M' AND phd.dedtype='C' AND phd.empid=dd.empsno AND MONTH(phd.weekending)=MONTH('".$payDate."') AND YEAR(phd.weekending)=YEAR('".$payDate."') AND phd.dedid=dl.sno) as mCount 
		FROM mpHR_contributions dd 
		LEFT JOIN contributions_list dl ON dd.contrib_code = dl.name 
		WHERE dd.process='N' AND dd.parid = '".$mphrgroupid."'
		AND STR_TO_DATE(dd.start_date,'%m/%d/%Y')<='".$payDate."' AND IF(dd.stop_date='',DATE_ADD(NOW(), INTERVAL 1 YEAR),STR_TO_DATE(dd.stop_date,'%m/%d/%Y'))>='".$payDate."' GROUP BY dd.sno) 
		as tempDD WHERE (tempDD.calc_freq='52' OR (tempDD.calc_freq='24' AND tempDD.mCount<2) OR (tempDD.calc_freq='12' AND tempDD.mCount=0))";
		mysql_query($que,$db);
	}

	public function insertPRHGarnishments($mphrgroupid,$batchId,$payDate)
	{
		global $username,$db;

		$que="INSERT INTO prhdeductions(parid,empid,rowid,weekending,responsible,dedtype,dedid,dedname,calc_type,dedamount,limit_amount,liabilitybankid,docket_no,date_issued,sdu_state,sdu_case_id,sdu_fips_no)
		SELECT '".$batchId."' as parid,dd.empsno as empid,'0' as rowid,'".$payDate."' as weekending,'E' as responsible,'G' as dedtype,dl.sno as dedid,dd.deduct_code as dedname,dd.garn_method as calc_type,dd.amount as dedamount,limit_amount as limit_amount,dl.liability_acc as liabilitybankid,dd.docket_no,dd.date_issued,dd.sdu_state,dd.sdu_case_id,dd.sdu_fips_no
		FROM mpHR_deductions dd 
		LEFT JOIN deductions_list dl ON dd.deduct_code = dl.type  
		WHERE dd.process='N' AND dd.type='G' AND dd.parid = '".$mphrgroupid."' 
		AND STR_TO_DATE(dd.start_date,'%m/%d/%Y')<='".$payDate."' AND IF(dd.stop_date='',DATE_ADD(NOW(), INTERVAL 1 YEAR),STR_TO_DATE(dd.stop_date,'%m/%d/%Y'))>='".$payDate."'";
		mysql_query($que,$db);
	}

	public function insertPRHTaxes($mphrgroupid,$batchId,$payDate)
	{
		global $username,$db;

		$whexempts = array("fed_exempt_fica" => "fed_exempt_soc_med", "fed_exempt_futa" => "fed_exempt_fui","fed_exempt_medi" => "fed_exempt_soc_med","fed_exempt_fit" => "fed_exempt_fwh","fed_exempt_medi2" => "fed_exempt_soc_med","state1_exempt_sit" => "state1_exempt_swh","state1_exempt_local" => "state1_exempt_local","state1_exempt_sui" => "state1_exempt_sui","state1_exempt_fli" => "state1_exempt_fli","state1_exempt_sdi" => "state1_exempt_sdi","state2_exempt_sit" => "state2_exempt_swh","state2_exempt_local" => "state2_exempt_local","state2_exempt_sui" => "state2_exempt_sui","state2_exempt_fli" => "state2_exempt_fli","state2_exempt_sdi" => "state2_exempt_sdi");

		$que="INSERT INTO prhtaxes(parid,empid,rowid,weekending,responsible,isExempt,taxid,taxname,locationCode,isResident,wageBase,gross,taxrate)
		SELECT parid,empid,rowid,weekending,responsible,isExempt,taxid,taxname,locationCode,isResident,wageBase,SUM(gross) as gross,rate
		FROM (
		SELECT '".$batchId."' as parid,pd.AC_EmpID as empid,'0' as rowid,'".$payDate."' as weekending,IF(ste.isEmployerTax,'M','E') as responsible,IF(ste.isEmployerTax='1' AND (ste.subTaxType='SUI' OR ste.subTaxType='SUI_SC') AND st.exempt='Y','1',IF(ste.stateAbbreviation=pwh.state1_state,CONCAT('state1_exempt_',LOWER(ste.subTaxType)),CONCAT('state2_exempt_',LOWER(ste.subTaxType)))) as isExempt,ste.uniqueTaxID as taxid,ste.description as taxname,ste.locationCode as locationCode,'0' as isResident,ste.wageBase as wageBase,SUM(IF(sm.is_gross='1',pd.hrs_units*pd.pay_rate,0)) as gross, 
		ROUND(IF(ste.isEmployerTax='1',IF(ste.subTaxType='SUI',((SELECT sui.rate FROM state_tax_details sui WHERE sui.state_tax_id=st.sno AND sui.status='active' AND sui.effective_sdate<='".$payDate."' ORDER BY sui.effective_sdate DESC LIMIT 1)/100),IF(ste.subTaxType='SUI_SC',(SELECT sui_sc.rate FROM state_suisur_tax sui_sc WHERE sui_sc.unique_tax_id=ste.uniqueTaxID AND sui_sc.state_tax_id=st.sno AND sui_sc.status='active' AND sui_sc.effective_sdate<='".$payDate."' ORDER BY sui_sc.effective_sdate DESC LIMIT 1),IF(ste.subTaxType='Addl',(SELECT addl.rate FROM state_add_tax addl WHERE addl.unique_tax_id=ste.uniqueTaxID AND addl.state_tax_id=st.sno AND addl.status='active' AND addl.effective_sdate<='".$payDate."' ORDER BY addl.effective_sdate DESC LIMIT 1),ste.rate))),ste.rate),6) as rate 
		FROM mpHR_payData pd 
		LEFT JOIN mpHR_payGroups mg ON mg.sno=pd.parid  
		LEFT JOIN steLocationTaxIds ste ON pd.locationCode=ste.locationCode 
		LEFT JOIN state_taxes st ON st.company_id=mg.company_id AND st.state_code=ste.stateAbbreviation AND st.status='active' 
		LEFT JOIN mpHR_taxDeductions pwh ON pd.AC_EmpId=pwh.empsno AND pd.parid=pwh.parid
		LEFT JOIN earnings_list el ON pd.pay_code=el.name 
		LEFT JOIN ste_manage sm ON el.type=sm.ac_type 
		WHERE pd.process='N' AND pd.parid = '".$mphrgroupid."' 
		GROUP BY pd.AC_EmpId,ste.UniqueTaxId
		UNION ALL
		SELECT '".$batchId."' as parid,pd.AC_EmpID as empid,'0' as rowid,'".$payDate."' as weekending,IF(ste.isEmployerTax,'M','E') as responsible,IF(ste.isEmployerTax='1' AND ste.subTaxType='FUTA' AND ft.exempt='Y','1',CONCAT('fed_exempt_',LOWER(ste.subTaxType))) as isExempt,ste.uniqueTaxID as taxid,ste.description as taxname,ste.locationCode as locationCode,'1' as isResident,ste.wageBase as wageBase,SUM(IF(sm.is_gross='1',pd.hrs_units*pd.pay_rate,0)) as gross, ROUND(IF(ste.subTaxType='FUTA',ste.rate/10,ste.rate),6) as rate 
		FROM mpHR_payData pd
		LEFT JOIN mpHR_payGroups mg ON mg.sno=pd.parid  
		LEFT JOIN steLocationTaxIds ste ON ste.stateCode='00' 
		LEFT JOIN fed_taxes ft ON ft.company_id=mg.company_id AND ft.status='active' 
		LEFT JOIN mpHR_taxDeductions pwh ON pd.AC_EmpId=pwh.empsno AND pd.parid=pwh.parid
		LEFT JOIN earnings_list el ON pd.pay_code=el.name 
		LEFT JOIN ste_manage sm ON el.type=sm.ac_type 
		WHERE pd.process='N' AND pd.parid = '".$mphrgroupid."' 
		GROUP BY pd.AC_EmpId,ste.UniqueTaxId
		UNION ALL 
		SELECT '".$batchId."' as parid,pd.empsno as empid,'0' as rowid,'".$payDate."' as weekending,IF(ste.isEmployerTax,'M','E') as responsible,IF(ste.isEmployerTax='1' AND (ste.subTaxType='SUI' OR ste.subTaxType='SUI_SC') AND st.exempt='Y','1',IF(ste.stateAbbreviation=pwh.state1_state,CONCAT('state1_exempt_',LOWER(ste.subTaxType)),CONCAT('state2_exempt_',LOWER(ste.subTaxType)))) as isExempt,ste.uniqueTaxID as taxid,ste.description as taxname,ste.locationCode as locationCode,'1' as isResident,ste.wageBase as wageBase,0 as gross, 
		ROUND(IF(ste.isEmployerTax='1',IF(ste.subTaxType='SUI',((SELECT sui.rate FROM state_tax_details sui WHERE sui.state_tax_id=st.sno AND sui.status='active' AND sui.effective_sdate<='".$payDate."' ORDER BY sui.effective_sdate DESC LIMIT 1)/100),IF(ste.subTaxType='SUI_SC',(SELECT sui_sc.rate FROM state_suisur_tax sui_sc WHERE sui_sc.unique_tax_id=ste.uniqueTaxID AND sui_sc.state_tax_id=st.sno AND sui_sc.status='active' AND sui_sc.effective_sdate<='".$payDate."' ORDER BY sui_sc.effective_sdate DESC LIMIT 1),IF(ste.subTaxType='Addl',(SELECT addl.rate FROM state_add_tax addl WHERE addl.unique_tax_id=ste.uniqueTaxID AND addl.state_tax_id=st.sno AND addl.status='active' AND addl.effective_sdate<='".$payDate."' ORDER BY addl.effective_sdate DESC LIMIT 1),ste.rate))),ste.rate),6) as rate 
		FROM mpHR_personData pd 
		LEFT JOIN mpHR_payGroups mg ON mg.sno=pd.parid  
		LEFT JOIN steLocationTaxIds ste ON pd.locationCode=ste.locationCode 
		LEFT JOIN state_taxes st ON st.company_id=mg.company_id AND st.state_code=ste.stateAbbreviation AND st.status='active' 
		LEFT JOIN mpHR_taxDeductions pwh ON pd.empsno=pwh.empsno AND pd.parid=pwh.parid
		WHERE ((pwh.state2_state='' AND ste.taxType NOT IN ('Federal','State')) OR (pwh.state2_state!='' AND ste.taxType NOT IN ('Federal'))) AND pd.process='N' AND pd.parid = '".$mphrgroupid."' 
		GROUP BY pd.empsno,ste.UniqueTaxId) as taxes GROUP BY taxes.empid, taxes.taxid";
		mysql_query($que,$db);

		// We do not have exempt for Additional Taxes either at Employee or Employer. 99% these taxes are not caldulated until the wages are reached certain amounts. So we will consider of this option in V2.
		$uque="UPDATE prhtaxes SET isExempt='' WHERE isExempt IN ('state1_exempt_addl','state2_exempt_addl') AND parid='".$batchId."'";
		mysql_query($uque,$db);

		$eque="select * from prhtaxes where isExempt NOT IN ('1','') AND parid='".$batchId."'";
		$eres=mysql_query($eque,$db);
		while($erow=mysql_fetch_assoc($eres))
		{
			$wque="SELECT IF(".$whexempts[$erow['isExempt']]."='Y','1','') as newExempt FROM prhtaxdeductions WHERE empid='".$erow['empid']."' AND parid='".$erow['parid']."'";
			$wres=mysql_query($wque,$db);
			$wrow=mysql_fetch_assoc($wres);

			$uque="UPDATE prhtaxes SET isExempt='".$wrow['newExempt']."' WHERE sno='".$erow['sno']."'";
			mysql_query($uque,$db);
		}
	}

	public function insertPRHDeposits($mphrgroupid,$batchId,$payDate)
	{
		global $username,$db;

		$dque="INSERT INTO prhdeposits (parid,empid,acc_type,transit_number,acc_number,camount,calctype) 
		SELECT * FROM (
		SELECT '".$batchId."',d.empsno,d.acct_type1,d.transit_no1,d.account_no1,d.dep_amount1,d.dep_method1 FROM mpHR_deposits d WHERE d.transit_no1!='' AND d.account_no1!='' AND d.process='N' AND d.parid = '".$mphrgroupid."'
		UNION ALL
		SELECT '".$batchId."',d.empsno,d.acct_type2,d.transit_no2,d.account_no2,d.dep_amount2,d.dep_method2 FROM mpHR_deposits d WHERE d.transit_no2!='' AND d.account_no2!='' AND d.process='N' AND d.parid = '".$mphrgroupid."'
		UNION ALL
		SELECT '".$batchId."',d.empsno,d.acct_type3,d.transit_no3,d.account_no3,d.dep_amount3,d.dep_method3 FROM mpHR_deposits d WHERE d.transit_no3!='' AND d.account_no3!='' AND d.process='N' AND d.parid = '".$mphrgroupid."'
		) as dep ORDER BY dep.empsno";
		mysql_query($dque,$db);
	}
	
	Public function pullbackemployee($batchsno,$empsno,$status,$type)
	{
		global $db;

		$output = '';

		$sque="SELECT pgids FROM mpHR_payUnitBatch mb, prhbatches pb WHERE pb.mphrbatchid=mb.sno AND pb.sno='".$batchsno."'";
		$sres=mysql_query($sque,$db);
		$srow=mysql_fetch_assoc($sres);

		$mphrgroupid=$srow['pgids'];

		$uque="UPDATE timesheet_hours t, emp_list e SET t.payroll='', t.mphr='N' WHERE t.username=e.username AND t.mphr='Y' AND t.payroll='".$mphrgroupid."' AND e.sno IN (".$empsno.")";
		mysql_query($uque,$db);

		$uque="UPDATE expense t, par_expense p, emp_list e SET t.payroll='', t.mphr='N' WHERE t.parid=p.sno AND p.username=e.username AND t.mphr='Y' AND t.payroll='".$mphrgroupid."' AND e.sno IN (".$empsno.")";
		mysql_query($uque,$db);

		$dque="DELETE FROM prhmaster WHERE batchid='".$batchsno."' AND empid IN (".$empsno.")";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhtaxdeductions WHERE parid='".$batchsno."' AND empid IN (".$empsno.")";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhearnings WHERE parid='".$batchsno."' AND empid IN (".$empsno.")";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhdeductions WHERE parid='".$batchsno."' AND empid IN (".$empsno.")";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhtaxes WHERE parid='".$batchsno."' AND empid IN (".$empsno.")";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhdeposits WHERE parid='".$batchsno."' AND empid IN (".$empsno.")";
		mysql_query($dque,$db);

		$sque="SELECT COUNT(1) as cnt FROM prhmaster WHERE batchid='".$batchsno."'";
		$sres=mysql_query($sque,$db);
		$srow=mysql_fetch_assoc($sres);
		if($sres && $srow['cnt']==0)
		{
			$dque="DELETE FROM prhbatches WHERE sno='".$batchsno."'";
			mysql_query($dque,$db);
			echo 'alldeleted';
		}else{
			echo 'deleted';
		}		
	}

	public function pullbackbatch($batchsno,$status,$type)
	{
		global $db;

		$sque="SELECT pgids FROM mpHR_payUnitBatch mb, prhbatches pb WHERE pb.mphrbatchid=mb.sno AND pb.sno='".$batchsno."'";
		$sres=mysql_query($sque,$db);
		$srow=mysql_fetch_assoc($sres);

		$mphrgroupid=$srow['pgids'];

		$uque="UPDATE timesheet_hours t SET t.payroll='', t.mphr='N' WHERE t.mphr='Y' AND t.payroll='".$mphrgroupid."'";
		mysql_query($uque,$db);

		$uque="UPDATE expense t SET t.payroll='', t.mphr='N' WHERE t.mphr='Y' AND t.payroll='".$mphrgroupid."'";
		mysql_query($uque,$db);

		$dque="DELETE FROM prhmaster WHERE batchid='".$batchsno."'";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhtaxdeductions WHERE parid='".$batchsno."'";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhearnings WHERE parid='".$batchsno."'";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhdeductions WHERE parid='".$batchsno."'";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhtaxes WHERE parid='".$batchsno."'";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhdeposits WHERE parid='".$batchsno."'";
		mysql_query($dque,$db);

		$dque="DELETE FROM prhbatches WHERE sno='".$batchsno."'";
		mysql_query($dque,$db);
		
		echo 'deleted';
	}

	// Below functions are not required. We do not need to clean up the mpHR_* data as we need it for Audits. 
	private  function delpullbackemployee($mphrbatchid,$empid,$mstrempcnt)
	{
		global $db,$username;

		$batchid=explode(",",$mphrbatchid);
		for($i=0;$i<count($batchid);$i++)
		{
			for($j=0;$j<count($empids);$j++)
			{
				$sque="SELECT process, pgids, paybtype FROM mpHR_payUnitBatch WHERE sno='".$batchid[$i]."'";
				$sres=mysql_query($sque,$db);
				$srow=mysql_fetch_row($sres);

				$stque="SELECT RefID FROM mpHR_payData WHERE RefType='Time' AND parid='".$srow[1]."' AND AC_EmpID='".$empids[$j]."'";
				$stres=mysql_query($stque,$db);
				while($strow=mysql_fetch_row($stres))
				{
					$tuque="UPDATE timesheet_hours SET mphr='N' WHERE (payroll='' OR payroll IS NULL) AND sno IN ('".str_replace(",","','",$strow[0])."')";
					mysql_query($tuque,$db);
				}

				$stque="SELECT RefID FROM mpHR_payData WHERE RefType='Expense' AND parid='".$srow[1]."' AND AC_EmpID='".$empids[$j]."'";
				$stres=mysql_query($stque,$db);
				while($strow=mysql_fetch_row($stres))
				{
					$euque="UPDATE expense SET mphr='N' WHERE (payroll='' OR payroll IS NULL) AND sno IN ('".str_replace(",","','",$strow[0])."')";
					mysql_query($euque,$db);
				}

				$dedque="DELETE FROM mpHR_deductions WHERE parid='".$srow[1]."' AND empsno='".$empids[$j]."' ";
				mysql_query($dedque,$db);
			
				$cque="DELETE FROM mpHR_contributions WHERE parid='".$srow[1]."' AND empsno='".$empids[$j]."' ";
				mysql_query($cque,$db);
				
				$dque="DELETE FROM mpHR_deposits WHERE parid='".$srow[1]."' AND empsno='".$empids[$j]."' ";
				mysql_query($dque,$db);
			
				$pque="DELETE FROM mpHR_personData WHERE parid='".$srow[1]."' AND empsno='".$empids[$j]."' ";
				mysql_query($pque,$db);

				$pdque="DELETE FROM mpHR_payData WHERE parid='".$srow[1]."' AND AC_EmpID='".$empids[$j]."'";
				mysql_query($pdque,$db);

				if($selcntres[0] == '1')
				{
					$pgque="DELETE FROM mpHR_payGroups WHERE sno='".$srow[1]."' ";
					mysql_query($pgque,$db);
				}

				//exit();
			}
		}
	}

	private  function delpullbackbatch($mphrbatchid)
	{
		global $db,$username;

		$batchid=explode(",",$mphrbatchid);
		for($i=0;$i<count($batchid);$i++)
		{
			$sque="SELECT process, pgids, paybtype FROM mpHR_payUnitBatch WHERE sno='".$batchid[$i]."'";
			$sres=mysql_query($sque,$db);
			$srow=mysql_fetch_row($sres);

			$stque="SELECT RefID FROM mpHR_payData WHERE RefType='Time' AND parid='".$srow[1]."' ";
			$stres=mysql_query($stque,$db);
			while($strow=mysql_fetch_row($stres))
			{
				$tuque="UPDATE timesheet_hours SET mphr='N' WHERE (payroll='' OR payroll IS NULL) AND sno IN ('".str_replace(",","','",$strow[0])."')";
				mysql_query($tuque,$db);
			}

			$stque="SELECT RefID FROM mpHR_payData WHERE RefType='Expense' AND parid='".$srow[1]."'";
			$stres=mysql_query($stque,$db);
			while($strow=mysql_fetch_row($stres))
			{
				$euque="UPDATE expense SET mphr='N' WHERE (payroll='' OR payroll IS NULL) AND sno IN ('".str_replace(",","','",$strow[0])."')";
				mysql_query($euque,$db);
			}
		
			$dedque="DELETE FROM mpHR_deductions WHERE parid='".$srow[1]."' ";
			mysql_query($dedque,$db);

			$cque="DELETE FROM mpHR_contributions WHERE parid='".$srow[1]."' ";
			mysql_query($cque,$db);
			
			$dque="DELETE FROM mpHR_deposits WHERE parid='".$srow[1]."' ";
			mysql_query($dque,$db);
		
			$pque="DELETE FROM mpHR_personData WHERE parid='".$srow[1]."' ";
			//mysql_query($pque,$db);

			$pdque="DELETE FROM mpHR_payData WHERE parid='".$srow[1]."'";
			//mysql_query($pdque,$db);
		
			//with this the batch is completely deleting
			//$pgque="DELETE FROM mpHR_payGroups WHERE sno='".$srow[1]."'";
			//mysql_query($pgque,$db);
					
			//echo $upgque="UPDATE mpHR_payGroups set parid=0 WHERE sno IN ('".str_replace(",","','",$srow[1])."') AND parid='".$batchid[$i]."'";
			//mysql_query($upgque,$db);
					
			$upbque="UPDATE mpHR_payUnitBatch SET process='S' WHERE sno='".$batchid[$i]."'";  //sno = paygroup parid
			mysql_query($upbque,$db);
		}
	}
}
?>