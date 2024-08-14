<?php

use App\Http\Controllers\AplicantController;
use App\Http\Controllers\Catalogs\CatalogController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerifyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Documents\DocumentController;
use App\Http\Controllers\Documents\ImportantArchievementController;
use App\Http\Controllers\Documents\RequestJustificationController;
use App\Http\Controllers\Exports\ComiteController;
use App\Http\Controllers\Mails\MessageRequestController;
use App\Http\Controllers\Payments\BankAccountController;
use App\Http\Controllers\SportProcedure\CompetitionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Jobs\Logger;
use Illuminate\Support\Facades\Artisan;

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

    Route::get('email-test', function () {
        $details = [
            ['name' => 'Ivan', 'email' => 'ivan1516hc@gmail.com', 'folio' => '123456'],
            ['name' => 'Ivan', 'email' => 'bihernandez@difzapopan.gob.mx', 'folio' => '123456'],
            ['name' => 'Benja', 'email' => 'benjaminivan1508@gmail.com', 'folio' => '123456']];

        dispatch(new App\Jobs\SendEmailBudgetJob($details));
        dd('Email is Sent.');
    });


    Route::get('send/verification/{email}', [VerifyController::class, 'resendVerificationEmail']);
    Route::post('verify/email/{email}', [VerifyController::class, 'verify']);

    Route::group([
        'middleware' => 'api',
        'prefix' => 'auth'
    ], function ($router) {
        // Rutas para mostrar y procesar el formulario de restablecimiento de contraseña
        Route::post('/password/reset/{token}', [ResetPasswordController::class, 'resetAplicant'])->name('password.update');

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
        Route::get('/request/show/{id}', [RequestsController::class, 'show']);
        Route::post('/request/update/status', [RequestsController::class, 'changeStatus']);
        Route::get('/request/verify/update/documents/{id}', [RequestsController::class, 'verifyUpdateDocument']);
        Route::get('/request/verify/update/{id}/{form}', [RequestsController::class, 'verifyUpdate']);
        //Competitions Routs
        Route::get('/request/competitions/show/{id}', [CompetitionController::class, 'show']);
        Route::post('/request/competitions/store', [CompetitionController::class, 'store']);
        Route::put('/request/competitions/update', [CompetitionController::class, 'update']);

        //Bank Accounts Routs
        Route::get('/request/bank-account/show/{id}', [BankAccountController::class, 'show']);
        Route::post('/request/bank-account/store', [BankAccountController::class, 'store']);
        Route::post('/request/bank-account/update', [BankAccountController::class, 'update']);

        //Aplicant Profile Routs
        Route::get('/profile/show', [AplicantController::class, 'show']);
        Route::put('/profile/update', [AplicantController::class, 'update']);
        Route::patch('/profile/update/password', [AplicantController::class, 'updatePassword']);

        Route::get('/read-regulations', [AplicantController::class, 'readRegulations']);

        //Documents Routs
        Route::get('/request/documents/show/{id}', [DocumentController::class, 'show']);
        Route::post('/request/documents/store', [DocumentController::class, 'store']);
        Route::post('/request/documents/change/{id}', [DocumentController::class, 'update']);

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

        Route::get('/request/search/{value}/{dateStart?}/{dateEnd?}/{exportExcel?}', [RequestsController::class, 'search']);
        Route::get('/validation/search-value/{value}', [RequestsController::class, 'searchValueValidation']);
        Route::get('/appraisal/search-value/{value}', [RequestsController::class, 'searchValueAppraisal']);

        Route::put('/request/update', [RequestsController::class, 'updateStatus']);
        Route::get('/request/sendMessageJustificacion/{id}', [RequestsController::class, 'sendMessageJustificacion']);

        Route::get('/request/message/form', [MessageRequestController::class, 'typeForm']);
        Route::get('/request/message/history', [MessageRequestController::class, 'index']);
        Route::post('/request/message/create', [MessageRequestController::class, 'store']);
        Route::get('/request/message/{id}/history', [MessageRequestController::class, 'show']);

        //Historical Routs
        Route::get('/historical/index/{dateStart?}/{dateEnd?}/{exportExcel?}', [RequestsController::class, 'showHistorical']);

        //Export excel files
        Route::post('/export/excel-comite', [ComiteController::class, 'comiteExport']);
        Route::post('/export/excel-bank-account', [App\Http\Controllers\Exports\BankAccountController::class, 'bankAccountExport']);

        //Import excel files
        Route::post('/import/excel-comite', [ComiteController::class, 'comiteImport']);

        //beneficiaries routes
        Route::get('/beneficiary/index', [AplicantController::class, 'indexBeneficiaries']);
        Route::get('/beneficiary/search-value/{value}', [AplicantController::class, 'searchBeneficiaries']);

        Route::get('/catalog/user/data', [CatalogController::class, 'getDataUser']);
        Route::get('/catalog/user/index', [CatalogController::class, 'indexUser']);
        Route::post('/catalog/user/create', [CatalogController::class, 'storeUser']);
        Route::delete('/catalog/user/delete/{id}', [CatalogController::class, 'deleteUser']);
        Route::delete('/catalog/user/restore/{id}', [CatalogController::class, 'restoreUser']);
        Route::put('/catalog/user/update', [CatalogController::class, 'updateUser']);

        Route::get('/catalog/discipline/index', [CatalogController::class, 'indexDiscipline']);
        Route::post('/catalog/discipline/create', [CatalogController::class, 'storeDiscipline']);
        Route::delete('/catalog/discipline/delete/{id}', [CatalogController::class, 'deleteDiscipline']);
        Route::delete('/catalog/discipline/restore/{id}', [CatalogController::class, 'restoreDiscipline']);
        Route::put('/catalog/discipline/update', [CatalogController::class, 'updateDiscipline']);

        Route::get('/catalog/justification/index', [CatalogController::class, 'indexJustification']);
        Route::post('/catalog/justification/create', [CatalogController::class, 'storeJustification']);
        Route::delete('/catalog/justification/delete/{id}', [CatalogController::class, 'deleteJustification']);
        Route::delete('/catalog/justification/restore/{id}', [CatalogController::class, 'restoreJustification']);
        Route::put('/catalog/justification/update', [CatalogController::class, 'updateJustification']);

        Route::get('/catalog/document/index', [CatalogController::class, 'indexDocument']);
        Route::post('/catalog/document/create', [CatalogController::class, 'storeDocument']);
        Route::delete('/catalog/document/delete/{id}', [CatalogController::class, 'deleteDocument']);
        Route::delete('/catalog/document/restore/{id}', [CatalogController::class, 'restoreDocument']);
        Route::put('/catalog/document/update', [CatalogController::class, 'updateDocument']);

        Route::get('/dashboard/count-request/{status}/{date}', [DashboardController::class, 'getCountRequest']);
        Route::get('/dashboard/count-beneficiary/{date}', [DashboardController::class, 'getCountBeneficiary']);
        Route::get('/dashboard/history-messages', [DashboardController::class, 'getHistoryMessages']);
    });

    Route::middleware('jwt.verify')->group(function () {
        //Requests
        Route::get('request', [RequestsController::class, 'index']);
    });

    Route::get('/clear-cache', function () {
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('cache:clear');
        Artisan::call('route:clear');
    });    
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
