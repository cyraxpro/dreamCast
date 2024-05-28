<?php

if (!function_exists('pre')) {
	function pre($data = '', $status = FALSE)
	{
		echo "<pre>";
		print_r($data);
		echo "</pre>";
		if (!$status) {
			die;
		}
	}
}

// For API
if (!function_exists('pree')) {
	function pree($data = '', $status = FALSE)
	{
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($data);
		if (!$status) {
			die;
		}
	}
}


if(!function_exists('data_exists')) {
	function data_exists($data, $keys =''){
		foreach($data as $key => $val){
			if($val->type == $keys){
				return $val->content;
			}
		}
	}
}

if(!function_exists('social_exists')) {
	function social_exists($data, $keys =''){
		foreach($data as $val){
			if($val->section_name == $keys){
				return $val->content;
			}
		}
	}
}
