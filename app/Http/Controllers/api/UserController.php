<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function saveUser(Request $req)
    {
        $validator = Validator::make(
            $req->all(),
            [
                'email' => 'unique:users',
            ]
        );
        if ($validator->fails()) {
            return response()->json(['status' => 'fail', 'message' => 'Invalid Data', 'errors' => $validator->errors()], 422);
        }

        $input = $req->all();

        $profile_img = Storage::put('uploads/users', $input['profile_img']);


        $userInfo = new User();
        $userInfo->name = $input['name'];
        $userInfo->email = $input['email'];
        $userInfo->phone = $input['phone'];
        $userInfo->description = $input['description'];
        $userInfo->role = 1;
        $userInfo->profile_img = $profile_img;


        if ($userInfo->save()) {
            return response(['status' => 'success', 'message' => 'User saved successfully '], 200);
        } else {
            return response(['status' => 'fail', 'message' => 'Some error occuring in saving data'], 400);
        }
    }

    public function getUser()
    {
        $allUsers = User::with('role')->get();

        if (count($allUsers) > 0) {
            return response(['status' => 'success', 'message' => '', 'data' => $allUsers], 200);
        } else {
            return response(['status' => 'fail', 'message' => 'No user found', 'data' => ''], 400);
        }
    }
}
