<?php

use App\Http\Controllers\AplicantController;
use App\Http\Controllers\Catalogs\CatalogController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BeneficiaryController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\MessageRequestController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\Documents\DocumentController;
use App\Http\Controllers\Documents\ImportantArchievementController;
use App\Http\Controllers\Documents\RequestJustificationController;
use App\Http\Controllers\Exports\ComiteController;
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
        Route::post('password/reset/{token}', [ResetPasswordController::class, 'reset'])->name('password.update');

        Route::post('/login', [AuthController::class, 'login']);
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

    //visitor
    Route::post('request/create', [RequestsController::class, 'store']);

    Route::middleware('jwt.verify')->group(function () {
        //Requests
        Route::get('request', [RequestsController::class, 'index']);

        Route::put('request/update', [RequestsController::class, 'updateStatus']);
        Route::get('request/show/{id}', [RequestsController::class, 'show']);

        Route::get('request/formData/{id}', [RequestsController::class, 'showData']);

        Route::get('request/search/{value}', [RequestsController::class, 'search']);
        Route::get('request/search-value/{value}', [RequestsController::class, 'searchValue']);

        Route::get('beneficiary/search/{value}', [BeneficiaryController::class, 'search']);
        Route::get('beneficiary/search-value/{value}', [BeneficiaryController::class, 'searchValue']);

        Route::post('creche/beneficiary/create', [BeneficiaryController::class, 'beneficiaryCreche']);
        Route::put('creche/beneficiary/update', [BeneficiaryController::class, 'updateBeneficiaryCreche']);

        Route::get('beneficiary', [BeneficiaryController::class, 'index']);
        Route::get('beneficiary/degree-room', [BeneficiaryController::class, 'getDegreeRoom']);
        Route::post('beneficiary/upload', [BeneficiaryController::class, 'uploadDocuments']);
        Route::post('beneficiary/upload/cisz', [BeneficiaryController::class, 'uploadDocumentsCisz']); //uploadDocumentsCisz
        Route::get('beneficiary/{id}', [BeneficiaryController::class, 'show']);
        Route::post('beneficiary/request/create', [BeneficiaryController::class, 'store']);
        Route::patch('beneficiary/request/update/{id}/{form_id?}', [BeneficiaryController::class, 'patch']);
        Route::post('beneficiary/change/center', [BeneficiaryController::class, 'changeCenter']);

        Route::post('parent/request/create', [BeneficiaryController::class, 'parentsStore']);
        Route::patch('parent/request/update/{id}/{form_id?}', [BeneficiaryController::class, 'patchParent']);

        Route::post('service/beneficiary/create', [BeneficiaryController::class, 'beneficiaryService']);
        Route::post('service/beneficiary/createofservice', [BeneficiaryController::class, 'beneficiaryOfService']);

        Route::post('creche/request/create', [RequestsController::class, 'store']);

        Route::get('request/beneficiary/{request_id}', [RequestsController::class, 'getBeneficiariesRequest']);
        Route::get('request/parents/document/{request_id}', [RequestsController::class, 'getParentsRequest']);
        Route::get('request/parents/{request_id}', [RequestsController::class, 'getParents']);
        Route::get('request/address/{request_id}', [RequestsController::class, 'getAddress']);

        Route::post('request/housing/create', [RequestsController::class, 'storeHousing']);
        Route::post('request/references/create', [RequestsController::class, 'storeReference']);
        Route::get('request/references/show/{id}', [RequestsController::class, 'showReferences']);
        Route::get('request/housing/show/{id}', [RequestsController::class, 'showHousing']);

        Route::post('request/changecenter', [RequestsController::class, 'changeCenter']); //Pendiente

        //Request Visitor Routs
        Route::get('visitor/request', [RequestsController::class, 'showVisitorRequest']);

        Route::post('request/update/status', [RequestsController::class, 'changeStatus']);

        //Competitions Routs
        Route::get('request/competitions/show/{id}', [CompetitionController::class, 'show']);
        Route::post('request/competitions/store', [CompetitionController::class, 'store']);

        //Bank Accounts Routs
        Route::get('request/bank-account/show/{id}', [BankAccountController::class, 'show']);
        Route::post('request/bank-account/store', [BankAccountController::class, 'store']);

        //Documents Routs
        Route::get('request/documents/show/{id}', [DocumentController::class, 'show']);
        Route::post('request/documents/store', [DocumentController::class, 'store']);

        //Important Archivement Routs
        Route::get('request/important-archivement/show', [ImportantArchievementController::class, 'show']);
        Route::post('request/important-archivement/store', [ImportantArchievementController::class, 'store']);
        Route::delete('request/important-archivement/delete/{id}', [ImportantArchievementController::class, 'delete']);

        //Justification Routs
        Route::get('request/justification/show/{id}', [RequestJustificationController::class, 'show']);
        Route::post('request/justification/store', [RequestJustificationController::class, 'store']);
        Route::get('request/justification/finish/{id}', [RequestJustificationController::class, 'finish']);
        Route::delete('request/justification/delete/{id}', [RequestJustificationController::class, 'delete']);

        //Aplicant Profile Routs
        Route::get('request/aplicant/show', [AplicantController::class, 'show']);
        Route::put('request/aplicant/update', [AplicantController::class, 'update']);
        Route::patch('request/aplicant/update/password', [AplicantController::class, 'updatePassword']);
        Route::get('request/aplicant/read-regulations', [AplicantController::class, 'readRegulations']);

        //Appraisal Routs
        Route::get('request/appraisal/index', [RequestsController::class, 'showAppraisal']);

        Route::get('request/message/form', [MessageRequestController::class, 'typeForm']);
        Route::get('request/message/history', [MessageRequestController::class, 'index']);
        Route::post('request/message/create', [MessageRequestController::class, 'store']);
        Route::get('request/message/{id}/history', [MessageRequestController::class, 'show']);

        Route::get('catalog/discipline', [CatalogController::class, 'getDataDiscipline']);
        Route::get('catalog/competition', [CatalogController::class, 'getDataCompetition']);
        Route::get('catalog/country-state/{id}', [CatalogController::class, 'getDataCountryStates']);

        //Export excel files
        Route::post('/export/excel-comite', [ComiteController::class, 'comiteExport']);
    });
});

Route::get('/creche/generar-pdf/{id}', [PDFController::class, 'generarPDF']);
Route::get('/creche/generar-cisz-pdf/{id}', [PDFController::class, 'generarCiszPDF']);
Route::get('/decodeJson', [AuthController::class, 'decodeJson']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
