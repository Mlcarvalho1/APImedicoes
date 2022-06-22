angular.module("measurementsApp").controller('profilePicEditionModalCtrl', function($uibModalInstance, $scope, patientId, patientService){
    
    const onSelectGroupImage = ($file) => {
        console.log($file);
    }

    const save = () => {
            patientService.changeProfilePic({
            foto: $scope.ProfilePic,
            patient_id: patientId
        }).then(() => {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Foto de perfil trocada com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => $uibModalInstance.close())
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.data.msg,
            });
            console.log(error);
        });
    }

    const cancel = () => {
        $uibModalInstance.dismiss();
    }

    $scope.save = save;
    $scope.cancel = cancel;
    $scope.onSelectGroupImage = onSelectGroupImage;
});