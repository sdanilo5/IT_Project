import React from 'react';

const ProfilePage = (props) => {
    return (
        <>
            <div class="row py-5 px-4">
                <div class="col-xl-8 col-md-10 col-sm-10 mx-auto">

                    <div class="bg-white shadow rounded overflow-hidden">

                        <div class="px-4 pt-0 pb-4 bg-dark">
                            <div class="media align-items-end profile-header">
                                <div class="profile mr-3">
                                    <img 
                                        src="https://bootstrapious.com/i/snippets/sn-profile/teacher.jpg" 
                                        alt="..." 
                                        width="35%" 
                                        class="rounded mb-2 mt-4 img-thumbnail" 
                                    />
                                    <a href="#" class="btn btn-dark btn-sm btn-block">Edit profile</a>
                                </div>
                                <div class="media-body mb-5 text-white">
                                    <h4 class="mt-0 mb-0">Manuella Tarly</h4>
                                    <p class="small mb-4"> 
                                        <i class="fa fa-map-marker mr-2"></i>
                                        San Farcisco
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-light p-4 d-flex justify-content-end text-center">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item">
                                    <h5 class="font-weight-bold mb-0 d-block">241</h5><small class="text-muted"> <i class="fa fa-picture-o mr-1"></i>Jokes</small>
                                </li>
                            </ul>
                        </div>

                        <div class="py-4 px-4">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h5 class="mb-0">Manuella's Jokes</h5>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 mb-2 pr-lg-1">
                                    <img src="https://bootstrapious.com/i/snippets/sn-profile/img-3.jpg" alt="" class="img-fluid rounded shadow-sm" />
                                </div>
                                <div class="col-lg-6 mb-2 pl-lg-1">
                                    <img src="https://bootstrapious.com/i/snippets/sn-profile/img-4.jpg" alt="" class="img-fluid rounded shadow-sm" />
                                </div>
                                <div class="col-lg-6 pr-lg-1 mb-2">
                                    <img src="https://bootstrapious.com/i/snippets/sn-profile/img-5.jpg" alt="" class="img-fluid rounded shadow-sm" />
                                </div>
                                <div class="col-lg-6 pl-lg-1">
                                    <img src="https://bootstrapious.com/i/snippets/sn-profile/img-6.jpg" alt="" class="img-fluid rounded shadow-sm" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfilePage;