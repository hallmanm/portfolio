<?php
	if($_POST['action'] == 'load'){
		// echo shell_exec('cd ~/Code/akamai-netstorage; git pull;');
	}else{
	  if($_POST['action'] == 'save'){
	    $file = 'saved/saved.json';
	  }else if($_POST['action'] == 'auto_save'){
	    $file = 'saved/auto_saved.json';
	  }else if($_POST['action'] == 'zone'){
	    $time = $_POST['time'];
	    if($time!=''){
	    	$commit = 'ZONE TEST for '.$time;
	    }else{
	    	$commit = 'ZONE TEST';
	    }
	  }else if($_POST['action'] == 'prod'){
	    $jira = $_POST['jira_ticket'];
	    $commit = $jira.' PRODUCTION READY';
	  }

	  if(isset($commit)) {
	  	if($_POST['action']=='prod'){
	  		$file = 'zone/app_cards.json prod/app_cards.json';

	  		file_put_contents('zone/app_cards.json', $_POST['json']);
	  		file_put_contents('prod/app_cards.json', $_POST['json']);
	  	}else{
	  		$file = 'zone/app_cards.json';

	  		file_put_contents('zone/app_cards.json', $_POST['json']);
	  	}

	  	// echo shell_exec('cd ~/Code/akamai-netstorage; git add '.$file.'; git commit -m "'.$commit.'"; git push;');
	  }else{
	  	file_put_contents($file, $_POST['json']);
	  }
	}
?>