<?php

namespace App\Http\Controllers\Catalogs;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Models\CompetitionType;
use App\Models\Countries;
use App\Models\CountriesStates;
use App\Models\Discipline;
use App\Models\DocumentProcedure;
use App\Models\JustificationTypes;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CatalogController extends Controller
{
    public function getDataDiscipline()
    {
        $competitions = Discipline::all();
        // $disciplines = Discipline::all();

        return response()->json(['disciplines' => $competitions]);
    }

    public function getDataCompetition()
    {
        $conpetition_types = CompetitionType::all();
        $countries = Countries::all();

        return response()->json(['countries' => $countries, 'conpetition_types' => $conpetition_types]);
    }

    public function getDataCountryStates($id)
    {
        $country_states = CountriesStates::where('country_id', $id)->get();
        return response()->json($country_states);
    }

    public function getDataUser()
    {
        $role = Role::all();
        return response()->json($role);
    }


    // CRUD USERS
    public function indexUser()
    {
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }

        $users = User::with('role')->orderBy('name')->withTrashed()->paginate(10);
        return response()->json($users);
    }

    public function storeUser(Request $request)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        try {
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role_id = $request->role_id;
            $user->procedure_id = $request->procedure_id ?? 1;
            $user->password = $request->password;
            $user->save();
            return response()->json(['message' => 'Usuario creada con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al crear el usuario', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteUser($id)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        // Verificar si la disciplina existe
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Intentar eliminar la disciplina
        try {
            $user->delete();
            return response()->json(['message' => 'Usuario eliminado con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al eliminar el usuario', 'error' => $e->getMessage()], 500);
        }

    }

    public function restoreUser($id)
    {
        $user = Auth::guard('user')->user();

        // Verificar si el usuario está autenticado y es administrador
        if (!$user) { // Suponiendo que tienes un método hasRole() para verificar el rol del usuario
            return response()->json(['message' => 'Necesitas ser administrador'], 403);
        }

        // Intentar restaurar la disciplina
        try {
            $user = User::withTrashed()->find($id);

            if (!$user) {
                return response()->json(['message' => 'Usuario no encontrado'], 404);
            }

            $user->restore();

            return response()->json(['message' => 'Usuario reactivado con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la reactivación
            return response()->json(['message' => 'Error al reactivar el usuario', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateUser(Request $request)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        // Intentar eliminar la disciplina
        try {
            // Add your logic here for creating a new discipline using the $request data
            $user = User::find($request->id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role_id = $request->role_id;
            $user->procedure_id = $request->procedure_id ?? 1;
            if ($request->change_password == 1) {
                $user->password = $request->password;
            }
            $user->save();
            return response()->json(['message' => 'Usuario actualizado con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al actualizar el usuario', 'error' => $e->getMessage()], 500);
        }
    }

    // CRUD DISCIPLINES
    public function indexDiscipline()
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }

        $disciplines = Discipline::orderBy('name')->withTrashed()->paginate(10);
        return response()->json($disciplines);
    }

    public function storeDiscipline(Request $request)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        // Intentar eliminar la disciplina
        try {
            // Add your logic here for creating a new discipline using the $request data
            $discipline = new Discipline;
            $discipline->name = $request->name;
            $discipline->save();
            return response()->json(['message' => 'Disciplina creada con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al crear la disciplina', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteDiscipline($id)
    {
        $user = Auth::guard('user')->user();

        // Verificar si el usuario está autenticado y es administrador
        if (!$user) { // Suponiendo que tienes un método hasRole() para verificar el rol del usuario
            return response()->json(['message' => 'Necesitas ser administrador'], 403);
        }

        // Verificar si la disciplina existe
        $discipline = Discipline::find($id);
        if (!$discipline) {
            return response()->json(['message' => 'Disciplina no encontrada'], 404);
        }

        // Intentar eliminar la disciplina
        try {
            $discipline->delete();
            return response()->json(['message' => 'Disciplina eliminada con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al eliminar la disciplina', 'error' => $e->getMessage()], 500);
        }
    }

    public function restoreDiscipline($id)
    {
        $user = Auth::guard('user')->user();

        // Verificar si el usuario está autenticado y es administrador
        if (!$user) { // Suponiendo que tienes un método hasRole() para verificar el rol del usuario
            return response()->json(['message' => 'Necesitas ser administrador'], 403);
        }

        // Intentar restaurar la disciplina
        try {
            $discipline = Discipline::withTrashed()->find($id);

            if (!$discipline) {
                return response()->json(['message' => 'Disciplina no encontrada'], 404);
            }

            $discipline->restore();

            return response()->json(['message' => 'Disciplina reactivada con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la reactivación
            return response()->json(['message' => 'Error al reactivar la disciplina', 'error' => $e->getMessage()], 500);
        }
    }



    public function updateDiscipline(Request $request)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        // Intentar eliminar la disciplina
        try {
            // Add your logic here for updating the discipline with the given $id using the $request data
            $discipline = Discipline::find($request->id);
            $discipline->name = $request->name;
            $discipline->save();
            return response()->json(['message' => 'Disciplina actualizada con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al actualizar la disciplina', 'error' => $e->getMessage()], 500);
        }
    }

    // CRUD JUSTIFICATIONS_REQUESTS
    public function indexJustification()
    {
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        // Add your logic here for retrieving and returning the justifications
        $justifications = JustificationTypes::orderBy('name')->withTrashed()->paginate(10);
        return response()->json($justifications);
    }

    public function storeJustification(Request $request)
    {
        $user = Auth::guard('user')->user();
        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        // Intentar eliminar la disciplina
        try {
            // Add your logic here for creating a new justification using the $request data
            $justification = new JustificationTypes();
            $justification->name = $request->name;
            $justification->save();
            return response()->json(['message' => 'Justificación creada con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al crear la justificación', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteJustification($id)
    {
        $user = Auth::guard('user')->user();
        // Verificar si el usuario está autenticado y es administrador
        if (!$user) { // Suponiendo que tienes un método hasRole() para verificar el rol del usuario
            return response()->json(['message' => 'Necesitas ser administrador'], 403);
        }
        // Verificar si la disciplina existe
        $justification = JustificationTypes::find($id);
        if (!$justification) {
            return response()->json(['message' => 'Justificación no encontrada'], 404);
        }
        // Intentar eliminar la disciplina
        try {
            $justification->delete();
            return response()->json(['message' => 'Justificación eliminada con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al eliminar la justificación', 'error' => $e->getMessage()], 500);
        }
    }

    public function restoreJustification($id)
    {
        $user = Auth::guard('user')->user();
        // Verificar si el usuario está autenticado y es administrador
        if (!$user) { // Suponiendo que tienes un método hasRole() para verificar el rol del usuario
            return response()->json(['message' => 'Necesitas ser administrador'], 403);
        }
        // Intentar restaurar la disciplina
        try {
            $justification = JustificationTypes::withTrashed()->find($id);

            if (!$justification) {
                return response()->json(['message' => 'Justificación no encontrada'], 404);
            }
            $justification->restore();
            return response()->json(['message' => 'Justificación reactivada con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la reactivación
            return response()->json(['message' => 'Error al reactivar la justificación', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateJustification(Request $request)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        // Intentar eliminar la disciplina
        try {
            // Add your logic here for updating the justification with the given $id using the $request data
            $justification = JustificationTypes::find($request->id);
            $justification->name = $request->name;
            $justification->save();
            return response()->json(['message' => 'Justificación actualizada con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al actualizada la justificación', 'error' => $e->getMessage()], 500);
        }
    }

    // CRUD DOCUMENT_PROCEDURE
    public function indexDocument()
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }

        // Add your logic here for retrieving and returning the documents
        $documents = DocumentProcedure::orderBy('name')->withTrashed()->paginate();

        return response()->json($documents);
    }

    public function storeDocument(Request $request)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        // Intentar eliminar la disciplina
        try {
            // Add your logic here for updating the justification with the given $id using the $request data
            $document = new DocumentProcedure;
            $document->name = $request->name;
            $document->descripcion = $request->descripcion ?? '';
            $document->force = 1;
            $document->procedure_id = $request->procedure_id ?? 1;
            $document->save();
            return response()->json(['message' => 'Tipo de documento creado con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al crear el tipo de documento', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteDocument($id)
    {
        $user = Auth::guard('user')->user();

        // Verificar si el usuario está autenticado y es administrador
        if (!$user) { // Suponiendo que tienes un método hasRole() para verificar el rol del usuario
            return response()->json(['message' => 'Necesitas ser administrador'], 403);
        }

        // Verificar si la disciplina existe
        $document = DocumentProcedure::find($id);
        if (!$document) {
            return response()->json(['message' => 'Tipo de documento no encontrado'], 404);
        }

        // Intentar eliminar la disciplina
        try {
            $document->delete();
            return response()->json(['message' => 'Tipo de documento eliminado con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al eliminar la justificación', 'error' => $e->getMessage()], 500);
        }
    }

    public function restoreDocument($id)
    {
        $user = Auth::guard('user')->user();

        // Verificar si el usuario está autenticado y es administrador
        if (!$user) { // Suponiendo que tienes un método hasRole() para verificar el rol del usuario
            return response()->json(['message' => 'Necesitas ser administrador'], 403);
        }

        // Intentar restaurar la disciplina
        try {
            $document = DocumentProcedure::withTrashed()->find($id);

            if (!$document) {
                return response()->json(['message' => 'Tipo de documento no encontrado'], 404);
            }

            $document->restore();

            return response()->json(['message' => 'Tipo de documento reactivado con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la reactivación
            return response()->json(['message' => 'Error al reactivar la justificación', 'error' => $e->getMessage()], 500);
        }
    }


    public function updateDocument(Request $request)
    {
        // return response()->json($request->id);
        $user = Auth::guard('user')->user();

        if (!$user) {
            return response()->json(['message' => 'Necesitas ser administrador']);
        }
        // Intentar eliminar la disciplina
        try {
            // Add your logic here for updating the document with the given $id using the $request data
            $document = DocumentProcedure::withTrashed()->find($request->id);
        
            if (!$document) {
                return response()->json(['message' => 'Documento no encontrado'], 404);
            }
    
            $document->fill([
                'name' => $request->name ?? 'srgdf',
                'descripcion' => $request->descripcion ?? 'srgdf',
                'force' => 1,
                'procedure_id' => 1,
            ]);
    
            $document->save();
            return response()->json(['message' => 'Tipo de documento actualizado con éxito', 'code' => 200]);
        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra durante la eliminación
            return response()->json(['message' => 'Error al actualizado el tipo de documento', 'error' => $e->getMessage()], 500);
        }
    }
}
