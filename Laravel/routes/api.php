<?php

use App\Http\Controllers\AplicantController;
use App\Http\Controllers\Catalogs\CatalogController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\Documents\DocumentController;
use App\Http\Controllers\Documents\ImportantArchievementController;
use App\Http\Controllers\Documents\RequestJustificationController;
use App\Http\Controllers\Exports\ComiteController;
use App\Http\Controllers\Mails\MessageRequestController;
use App\Http\Controllers\Payments\BankAccountController;
use App\Http\Controllers\SportProcedure\CompetitionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('cors')->group(function () {
    // Ruta para enviar el correo electrónico de restablecimiento de contraseña
    Route::post('password/reset', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');


    Route::get('send/verification/{email}', [VerifyController::class, 'resendVerificationEmail']);
    Route::post('verify/email/{email}', [VerifyController::class, 'verify']);

    Route::group([
        'middleware' => 'api',
        'prefix' => 'auth'
    ], function ($router) {
        // Rutas para mostrar y procesar el formulario de restablecimiento de contraseña
        Route::post('/password/reset/{token}', [ResetPasswordController::class, 'reset'])->name('password.update');

        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/admin-login', [AuthController::class, 'loginAdmin']);
        Route::post('/register', [AuthController::class, 'register']);

        //VALIDAR TOKEN
        Route::get('/validate', [AuthController::class, 'validarToken']);

        Route::get('/validateUserAdmin', [AuthController::class, 'validateUserAdmin']);
        Route::get('/validateUserVisitor', [AuthController::class, 'validateUserVisitor']);

        // Ruta para obtener el usuario autenticado actualmente
        Route::get('/user', [AuthController::class, 'getCurrentUser']);
        // Ruta para verificar si hay un usuario autenticado actualmente
        Route::get('/authenticated', [AuthController::class, 'isAuthenticated']);

        Route::middleware('jwt.verify')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/refresh', [AuthController::class, 'refresh']);
            Route::get('/user-profile', [AuthController::class, 'userProfile']);
        });
    });

    Route::group([
        'middleware' => 'auth:aplicant',
        'prefix' => 'aplicant'
    ], function ($router) {
        //Requests Routes
        Route::post('/request/create', [RequestsController::class, 'store']);

        Route::get('/request', [RequestsController::class, 'showVisitorRequest']);
        Route::get('request/show/{id}', [RequestsController::class, 'show']);
        Route::post('request/update/status', [RequestsController::class, 'changeStatus']);

        //Competitions Routs
        Route::get('/request/competitions/show/{id}', [CompetitionController::class, 'show']);
        Route::post('/request/competitions/store', [CompetitionController::class, 'store']);

        //Bank Accounts Routs
        Route::get('/request/bank-account/show/{id}', [BankAccountController::class, 'show']);
        Route::post('/request/bank-account/store', [BankAccountController::class, 'store']);

        //Aplicant Profile Routs
        Route::get('/profile/show', [AplicantController::class, 'show']);
        Route::put('/profile/update', [AplicantController::class, 'update']);
        Route::patch('/profile/update/password', [AplicantController::class, 'updatePassword']);

        Route::get('/read-regulations', [AplicantController::class, 'readRegulations']);

        //Documents Routs
        Route::get('/request/documents/show/{id}', [DocumentController::class, 'show']);
        Route::post('/request/documents/store', [DocumentController::class, 'store']);

        //Important Archivement Routs
        Route::get('/important-archivement/show', [ImportantArchievementController::class, 'show']);
        Route::post('/important-archivement/store', [ImportantArchievementController::class, 'store']);
        Route::delete('/important-archivement/delete/{id}', [ImportantArchievementController::class, 'delete']);

        //Justification Routs
        Route::get('/request/justification/show/{id}', [RequestJustificationController::class, 'show']);
        Route::post('/request/justification/store', [RequestJustificationController::class, 'store']);
        Route::get('/request/justification/finish/{id}', [RequestJustificationController::class, 'finish']);
        Route::delete('/request/justification/delete/{id}', [RequestJustificationController::class, 'delete']);

        Route::get('/catalog/discipline', [CatalogController::class, 'getDataDiscipline']);
        Route::get('/catalog/competition', [CatalogController::class, 'getDataCompetition']);
        Route::get('/catalog/country-state/{id}', [CatalogController::class, 'getDataCountryStates']);
    });

    Route::group([
        'middleware' => 'auth:user',
        'prefix' => 'admin'
    ], function ($router) {
        //Appraisal Routs
        Route::get('/appraisal/index', [RequestsController::class, 'showAppraisal']);
        Route::post('/appraisal/approved-budget', [ComiteController::class, 'assignmentComite']);

        Route::get('/request/formData/{id}', [RequestsController::class, 'showData']);

        Route::get('/request/search/{value}', [RequestsController::class, 'search']);
        Route::get('/validation/search-value/{value}', [RequestsController::class, 'searchValueValidation']);
        Route::get('/appraisal/search-value/{value}', [RequestsController::class, 'searchValueAppraisal']);

        Route::put('/request/update', [RequestsController::class, 'updateStatus']);

        Route::get('/request/message/form', [MessageRequestController::class, 'typeForm']);
        Route::get('/request/message/history', [MessageRequestController::class, 'index']);
        Route::post('/request/message/create', [MessageRequestController::class, 'store']);
        Route::get('/request/message/{id}/history', [MessageRequestController::class, 'show']);

        //Export excel files
        Route::post('/export/excel-comite', [ComiteController::class, 'comiteExport']);
        Route::post('/export/excel-bank-account', [App\Http\Controllers\Exports\BankAccountController::class, 'bankAccountExport']);

        //Import excel files
        Route::post('/import/excel-comite', [ComiteController::class, 'comiteImport']);

        //beneficiaries routes
        Route::get('/beneficiary/index', [AplicantController::class, 'indexBeneficiaries']);
    });

    Route::middleware('jwt.verify')->group(function () {
        //Requests
        Route::get('request', [RequestsController::class, 'index']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
